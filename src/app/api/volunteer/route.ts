import { NextRequest, NextResponse } from "next/server";

/**
 * Volunteer application API route.
 *
 * Currently stores submissions in-memory (dev) and logs them.
 * In production, replace with real persistence + email notification.
 */

const applications: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, location, role, dates, about } = body;

    // Basic validation
    if (!name || !email || !role || !about) {
      return NextResponse.json(
        { error: "Name, email, role, and about are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const application = {
      name,
      email,
      phone: phone || null,
      location: location || null,
      role,
      dates: dates || null,
      about,
      timestamp: new Date().toISOString(),
    };

    applications.push(application);
    console.log("[Volunteer Application]", JSON.stringify(application, null, 2));

    return NextResponse.json(
      { success: true, message: "Application received. We'll review and get back to you within a week." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
