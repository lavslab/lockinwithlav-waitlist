
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // SEND SIGNUP TO SUPABASE THROUGH OUR SECURE API
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          instagram,
          consent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      // Only show confirmation after a successful API response.
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F3EF] px-5 py-10 text-[#352C29]">
      <div className="mx-auto max-w-md">

        {/* LOGO */}
        <header className="mb-10 text-center">

          <div className="mb-12 text-center">
            <div className="font-serif text-[34px] font-normal leading-none tracking-[0.14em] text-[#292321]">
              LOCK IN
            </div>

            <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.42em] text-[#B18B82]">
              WITH LAV
            </div>
          </div>

          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#AC8178]">
            THE JANUARY 2027 EDITION
          </p>

          <h1 className="font-serif text-5xl leading-tight">
            Your next chapter
            <br />
            starts here.
            <span className="ml-2 text-[#B68E86]">♡</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#826F68]">
            75 days of showing up for yourself.
        
          </p>
        </header>

        {/* DATE */}
        <div className="mb-7 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#DCC7BF]" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A98279]">
            JANUARY 01 — MARCH 16
          </span>

          <div className="h-px w-12 bg-[#DCC7BF]" />
        </div>

        {/* SIGNUP CARD */}
        <section className="rounded-[24px] border border-[#E6D6D0] bg-[#FFFCFA] p-7 shadow-[0_12px_40px_rgba(90,60,50,0.05)]">

          {submitted ? (
            <div className="py-12 text-center">

              <div className="mb-5 text-5xl text-[#B68E86]">
                ♡
              </div>

              <h2 className="font-serif text-3xl">
                You're on the list! ♡
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#826F68]">
                Your January lock-in starts here.
                <br />
                Keep an eye on your inbox for what's next.
              </p>

              <p className="mt-8 font-serif italic text-[#AD8179]">
                see you january 1st. ♡
              </p>

            </div>
          ) : (
            <>
              <div className="mb-8 text-center">

                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B18B82]">
                  THE JANUARY LIST
                </p>

                <h2 className="font-serif text-3xl">
                  You're invited.
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#8B7770]">
                  Leave your details to be first to hear about
                  the January 1st launch.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* FIRST NAME */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C746D]"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    required
                    maxLength={100}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="w-full rounded-xl border border-[#E9DBD5] bg-[#FAF6F3] px-4 py-3.5 text-sm outline-none focus:border-[#B68E86]"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C746D]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#E9DBD5] bg-[#FAF6F3] px-4 py-3.5 text-sm outline-none focus:border-[#B68E86]"
                  />
                </div>

                {/* INSTAGRAM */}
                <div>
                  <label
                    htmlFor="instagram"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C746D]"
                  >
                    Instagram · optional
                  </label>

                  <input
                    id="instagram"
                    maxLength={100}
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@username"
                    className="w-full rounded-xl border border-[#E9DBD5] bg-[#FAF6F3] px-4 py-3.5 text-sm outline-none focus:border-[#B68E86]"
                  />
                </div>

                {/* CONSENT */}
                <label className="flex cursor-pointer items-start gap-3 pt-2">

                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#AD8179]"
                  />

                  <span className="text-xs leading-5 text-[#826F68]">
                    I'd like to receive updates about the Lock In
                    With Lav January 2027 challenge by email.
                    I understand I can unsubscribe.
                  </span>

                </label>

                {/* ERROR MESSAGE */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-center text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full rounded-xl bg-[#AD8179] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#976E67] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Adding you to the list..."
                    : "Put me on the list ♡"}
                </button>

                <p className="text-center text-[11px] leading-5 text-[#A08C85]">
                  No payment required. No commitment just yet.
                </p>

              </form>
            </>
          )}

        </section>

        {/* FOOTER */}
        <footer className="mt-10 text-center">

          <p className="font-serif text-lg italic text-[#B18B82]">
            see you january 1st. ♡
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#A99790]">
            LOCK IN WITH LAV © 2027
          </p>

        </footer>

      </div>
    </main>
  );
}
