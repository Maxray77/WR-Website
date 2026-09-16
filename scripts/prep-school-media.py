#!/usr/bin/env python3
"""Prepare school outreach media for /education-outreach.

Photos: HEIC/JPEG in, EXIF-rotated, resized, faces blurred.
Drawings: resized, and the NAME / CLASS / ROLL NO. block redacted — the
children's names never go on the site.

Face detection is a FIRST PASS, not a guarantee. Haar misses downward-angled
faces, which is the common pose when children are drawing. Always review every
output by eye and add any miss to the per-file "extra" boxes before shipping.

Usage:
  python3 scripts/prep-school-media.py <src-dir> <out-dir> <slug> [boxes.json]

boxes.json maps an OUTPUT filename to:
  {"sabrang-02.jpg": {"extra": [[1200, 300, 90, 100]],
                      "exclude": [[0, 0, 800, 600]]}}
"extra"   - faces the detector missed, blurred in addition.
"exclude" - regions where detections are DISCARDED. Projector screens are the
            usual case: Haar reads slide text and logos as faces, and blurring
            the helpline number off a slide defeats the point of the photo.
A bare list is treated as "extra".
"""
import cv2, json, os, sys, glob
import numpy as np
from PIL import Image, ImageOps

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()          # iPhone files are often HEIC behind a .jpg name
except ImportError:
    pass

MAX_EDGE = 1600
QUALITY = 86
# The printed form's NAME / CLASS / ROLL NO. block, as a fraction of the sheet.
# Deliberately generous: handwritten names run past the printed labels.
NAME_BLOCK = (0.035, 0.035, 0.300, 0.190)

H = cv2.data.haarcascades
CASCADES = [cv2.CascadeClassifier(H + n) for n in (
    "haarcascade_frontalface_default.xml",
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_profileface.xml",
)]
PROF = CASCADES[2]


def detect(img, scale=1.05, neighbours=4, minfrac=0.010):
    g = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))
    m = max(16, int(min(img.shape[:2]) * minfrac))
    boxes = []
    for c in CASCADES:
        boxes += [tuple(map(int, r)) for r in c.detectMultiScale(g, scale, neighbours, minSize=(m, m))]
    w = g.shape[1]
    for (x, y, bw, bh) in PROF.detectMultiScale(cv2.flip(g, 1), scale, neighbours, minSize=(m, m)):
        boxes.append((int(w - x - bw), int(y), int(bw), int(bh)))
    return boxes


def drop_inside(boxes, zones):
    """Discard detections whose centre falls in a no-blur zone."""
    if not zones:
        return boxes
    kept = []
    for (x, y, w, h) in boxes:
        cx, cy = x + w / 2, y + h / 2
        if not any(zx <= cx <= zx + zw and zy <= cy <= zy + zh for (zx, zy, zw, zh) in zones):
            kept.append((x, y, w, h))
    return kept


def blur_regions(img, boxes, pad=0.32):
    out = img.copy()
    h, w = img.shape[:2]
    for (x, y, bw, bh) in boxes:
        px, py = int(bw * pad), int(bh * pad)
        x0, y0 = max(0, x - px), max(0, y - py)
        x1, y1 = min(w, x + bw + px), min(h, y + bh + py)
        roi = out[y0:y1, x0:x1]
        if roi.size == 0:
            continue
        k = max(21, (int(max(x1 - x0, y1 - y0) / 2.0) | 1))
        b = cv2.GaussianBlur(cv2.GaussianBlur(roi, (k, k), 0), (k, k), 0)
        mask = np.zeros(roi.shape[:2], np.uint8)
        cv2.ellipse(mask, ((x1 - x0) // 2, (y1 - y0) // 2),
                    ((x1 - x0) // 2, (y1 - y0) // 2), 0, 0, 360, 255, -1)
        mask = cv2.GaussianBlur(mask, (41, 41), 0)[..., None] / 255.0
        out[y0:y1, x0:x1] = (b * mask + roi * (1 - mask)).astype(np.uint8)
    return out


def load_resized(path):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    return cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)


def redact_name_block(img):
    h, w = img.shape[:2]
    x0, y0, x1, y1 = NAME_BLOCK
    cv2.rectangle(img, (int(x0 * w), int(y0 * h)), (int(x1 * w), int(y1 * h)),
                  (255, 255, 255), -1)
    return img


def main():
    src, out, slug = sys.argv[1], sys.argv[2], sys.argv[3]
    extra = json.load(open(sys.argv[4])) if len(sys.argv) > 4 and os.path.exists(sys.argv[4]) else {}
    os.makedirs(out, exist_ok=True)
    files = sorted(f for f in glob.glob(os.path.join(src, "*"))
                   if f.lower().endswith((".jpg", ".jpeg", ".png", ".heic")))
    photos = [f for f in files if os.path.basename(f).lower().startswith("img")]
    drawings = [f for f in files if f not in photos]

    for i, f in enumerate(sorted(drawings), 1):
        name = f"{slug}-drawing-{i:02d}.jpg"
        img = redact_name_block(load_resized(f))
        cv2.imwrite(os.path.join(out, name), img, [cv2.IMWRITE_JPEG_QUALITY, QUALITY, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
        print(f"  drawing {name:28} {img.shape[1]}x{img.shape[0]}  name block redacted")

    for i, f in enumerate(sorted(photos), 1):
        name = f"{slug}-{i:02d}.jpg"
        img = load_resized(f)
        cfg = extra.get(name, {})
        if isinstance(cfg, list):
            cfg = {"extra": cfg}
        auto = detect(img)
        zones = [tuple(z) for z in cfg.get("exclude", [])]
        kept = drop_inside(auto, zones)
        man = [tuple(b) for b in cfg.get("extra", [])]
        cv2.imwrite(os.path.join(out, name), blur_regions(img, kept + man),
                    [cv2.IMWRITE_JPEG_QUALITY, QUALITY, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
        print(f"  photo   {name:28} {img.shape[1]}x{img.shape[0]}  auto={len(auto):3} "
              f"dropped={len(auto)-len(kept):2} manual={len(man)}  REVIEW BY EYE")


if __name__ == "__main__":
    main()
