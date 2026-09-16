"""Face-blur pass for /education-outreach photos.

Haar detection gets ~90% of faces; the remaining misses are supplied by hand
via EXTRA (a per-file list of x,y,w,h boxes) after visual review. Detection is
a first pass, never the guarantee.
"""
import cv2, sys, os, json, numpy as np

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

def blur_faces(img, boxes, pad=0.32):
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
        blurred = cv2.GaussianBlur(roi, (k, k), 0)
        blurred = cv2.GaussianBlur(blurred, (k, k), 0)   # second pass: unrecoverable
        mask = np.zeros(roi.shape[:2], np.uint8)
        cv2.ellipse(mask, ((x1 - x0) // 2, (y1 - y0) // 2),
                    ((x1 - x0) // 2, (y1 - y0) // 2), 0, 0, 360, 255, -1)
        mask = (cv2.GaussianBlur(mask, (41, 41), 0)[..., None] / 255.0)
        out[y0:y1, x0:x1] = (blurred * mask + roi * (1 - mask)).astype(np.uint8)
    return out

EXTRA = json.load(open(sys.argv[2])) if len(sys.argv) > 2 and os.path.exists(sys.argv[2]) else {}
outdir = sys.argv[1]
os.makedirs(outdir, exist_ok=True)
report = {}
for f in sorted(os.listdir("public/education")):
    if not f.startswith("event-"):
        continue
    src = os.path.join("public/education", f)
    img = cv2.imread(src)
    auto = detect(img)
    manual = [tuple(b) for b in EXTRA.get(f, [])]
    cv2.imwrite(os.path.join(outdir, f), blur_faces(img, auto + manual),
                [cv2.IMWRITE_JPEG_QUALITY, 86, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    report[f] = {"auto": len(auto), "manual": len(manual), "size": f"{img.shape[1]}x{img.shape[0]}"}
    print(f"{f:16} {report[f]['size']:10} auto={len(auto):3} manual={len(manual)}")
