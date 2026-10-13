
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 415 }
      );
    }

    const origin = request.headers.get("origin");

    const allowedOrigins = new Set(
  [
    "http://localhost:3000",
    "https://join.lockinwithlav.com",
    "https://lockinwithlav-waitlist.vercel.app",
    "https://lockinwithlav-waitlist-l2a74cb1c-lavslab.vercel.app",
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
  ].filter((value): value is string => Boolean(value))
);

    if (!origin || !allowedOrigins.has(origin)) {
      return NextResponse.json(
        { error: "Request not allowed." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const firstName =
      typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const instagram =
      typeof body.instagram === "string"
        ? body.instagram.trim()
        : "";

    const consent = body.consent === true;

    // Hidden spam-trap field. Real visitors leave it blank.
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    if (
      firstName.length < 1 ||
      firstName.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      instagram.length > 100 ||
      !consent
    ) {
      return NextResponse.json(
        { error: "Please check your information." },
        { status: 400 }
      );
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      console.error("Missing Supabase server credentials.");
      return NextResponse.json(
        { error: "Sign-ups are temporarily unavailable." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase
      .from("january_waitlist")
      .insert({
        first_name: firstName,
        email,
        instagram: instagram || null,
        consent,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          alreadyJoined: true,
        });
      }

      console.error("Waitlist insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Waitlist unexpected error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 400 }
    );
  }
}
