import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, storeSubmission } from "@/lib/redis";

const MAX_FIELD_LENGTH = 500;
const MAX_NOTES_LENGTH = 3000;
const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    // Rate limiting — reuse the contact limiter (5/hr per IP)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await checkRateLimit("contact", ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    // Extract text fields
    const fields: Record<string, string> = {};
    const requiredFields = [
      "reporterName",
      "reporterEmail",
      "birdCondition",
      "sightingDate",
      "city",
      "locationDescription",
    ];

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        // Length check
        if (key === "notes" && value.length > MAX_NOTES_LENGTH) {
          return NextResponse.json(
            { error: "Notes are too long." },
            { status: 400 }
          );
        }
        if (key !== "notes" && value.length > MAX_FIELD_LENGTH) {
          return NextResponse.json(
            { error: `Field "${key}" is too long.` },
            { status: 400 }
          );
        }
        // Block header injection
        if (/[\r\n]/.test(value)) {
          return NextResponse.json(
            { error: "Invalid characters in input." },
            { status: 400 }
          );
        }
        fields[key] = value;
      }
    }

    // Validate required fields
    for (const field of requiredFields) {
      if (!fields[field]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    // Validate email format (basic)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.reporterEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Process photos — extract metadata (we log details; actual file storage
    // would require a blob store like Vercel Blob in production)
    const photoInfo: { name: string; size: number; type: string }[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("photo_") && value instanceof File) {
        if (photoInfo.length >= MAX_PHOTOS) break;
        if (value.size > MAX_PHOTO_SIZE) {
          return NextResponse.json(
            { error: `Photo "${value.name}" exceeds the 10 MB limit.` },
            { status: 400 }
          );
        }
        photoInfo.push({
          name: value.name,
          size: value.size,
          type: value.type,
        });
      }
    }

    // Build the report object
    const report = {
      ...fields,
      photoCount: photoInfo.length,
      photos: photoInfo,
      submittedAt: new Date().toISOString(),
      ip,
    };

    // Store in Redis (or log to console if Redis not configured)
    await storeSubmission("tagged-bird-report", report);

    // Log for visibility
    console.log("📋 Tagged bird report received:", {
      tagId: fields.tagId || "(not provided)",
      species: fields.species,
      city: fields.city,
      reporter: fields.reporterName,
      photos: photoInfo.length,
    });

    return NextResponse.json({
      success: true,
      message: "Tagged bird report submitted successfully.",
    });
  } catch (err) {
    console.error("Tagged bird report error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
