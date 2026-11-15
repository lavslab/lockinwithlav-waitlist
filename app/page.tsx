"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, instagram, consent }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = "mt-1.5 w-full rounded-xl border border-[#E7D8D1] bg-[#FBF8F6] px-3.5 py-2.5 text-sm text-[#38241D] outline-none transition placeholder:text-[#B9A59E] focus:border-[#B58C85]";
  const labelClass = "block text-[10px] font-medium uppercase tracking-[0.14em] text-[#92756D]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F3F0] text-[#38241D]">
      <div className="mx-auto max-w-6xl px-5 pb-7 pt-5 sm:px-8 lg:px-12 lg:pt-8">
        
<header className="flex items-center justify-between gap-3 border-b border-[#E8DAD4] pb-4">
  <Image
    src="/lock-in-logo.png"
    alt="Lock In With Lav"
    width={168}
    height={112}
    className="h-auto w-[105px] object-contain sm:w-[140px]"
  />

  <p className="text-right text-[9px] uppercase tracking-[0.16em] text-[#A47C74]">
    THE JANUARY LOCK IN
  </p>
</header>


        <div className="grid items-center gap-4 pt-2 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:pt-5">
          <section className="min-w-0">
           
            <h1 className="mt-2 max-w-xl font-serif text-[clamp(2.45rem,5.4vw,5.1rem)] leading-[1.04] tracking-[-0.035em]">
              Your next chapter <span className="italic text-[#B58C85]">starts here.</span>
            </h1>
            <p className="mt-2 max-w-lg text-[13px] leading-6 text-[#806B64] sm:text-[15px]">
             You're invited. ♡ 
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#A47C74]">Starts January 1, 2027</p>

         
{/* Compact app preview before signup on mobile */}
<div
  className="relative mx-auto mt-5 mb-6 h-[245px] max-w-[320px] lg:hidden"
  aria-label="Preview of the Today dashboard and Lock In Circle"
>
  <div className="absolute left-[18%] top-3 w-[92px] -rotate-[9deg] overflow-hidden rounded-[15px] border-[3px] border-[#38241D] bg-[#38241D] shadow-[0_10px_25px_rgba(56,36,29,.17)] min-[380px]:w-[102px]">
    <Image
      src="/circle-preview.png"
      alt="The Lock In Circle community screen"
      width={832}
      height={1792}
      className="h-auto w-full"
    />
  </div>

  <div className="absolute right-[18%] top-0 w-[102px] rotate-[7deg] overflow-hidden rounded-[15px] border-[3px] border-[#38241D] bg-[#38241D] shadow-[0_12px_28px_rgba(56,36,29,.2)] min-[380px]:w-[112px]">
    <Image
      src="/today-preview.png"
      alt="Today commitments inside Lock In With Lav"
      width={832}
      height={1792}
      className="h-auto w-full"
    />
  </div>
</div>


            {/* Larger app preview on desktop. */}
            <div className="relative mt-7 hidden h-[365px] items-start justify-center lg:flex xl:h-[420px]">
              <div className="absolute left-[15%] top-6 w-[170px] -rotate-[7deg] overflow-hidden rounded-[29px] border-[6px] border-[#38241D] bg-[#38241D] shadow-[0_20px_45px_rgba(56,36,29,.18)] xl:w-[195px]">
                <Image src="/circle-preview.png" alt="The Lock In Circle inside the app" width={832} height={1792} className="h-auto w-full" />
              </div>
              <div className="absolute right-[18%] top-0 w-[180px] rotate-[6deg] overflow-hidden rounded-[29px] border-[6px] border-[#38241D] bg-[#38241D] shadow-[0_24px_55px_rgba(56,36,29,.2)] xl:w-[205px]">
                <Image src="/today-preview.png" alt="Daily commitments on the Today screen" width={832} height={1792} className="h-auto w-full" />
              </div>
            </div>
          </section>

          <section id="join" className="rounded-[24px] border border-[#E6D6D0] bg-[#FFFCFA] px-5 py-6 shadow-[0_12px_40px_rgba(90,60,50,.05)] sm:px-8 sm:py-8">
            {submitted ? (
              <div className="py-12 text-center" role="status">
                <div className="text-4xl text-[#B58C85]">♡</div>
                <h2 className="mt-4 font-serif text-3xl">You’re on the list! ♡</h2>
                <p className="mt-3 text-sm leading-6 text-[#806B64]">Your January lock-in starts here. Keep an eye on your inbox for what’s next.</p>
                <p className="mt-7 font-serif italic text-[#A47C74]">see you january 1st. ♡</p>
              </div>
            ) : (
              <>
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#B18B82]">YOU’RE INVITED</p>
                <h2 className="mt-2 text-center font-serif text-[30px] leading-tight">Get on the list. ♡</h2>
                <p className="mt-2 text-center text-[12px] leading-5 text-[#8B7770]">Be first to know when the January challenge opens.</p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First name</label>
                    <input id="firstName" required maxLength={100} autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email address</label>
                    <input id="email" type="email" required maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="instagram" className={labelClass}>Instagram · optional</label>
                    <input id="instagram" maxLength={100} autoComplete="off" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@username" className={fieldClass} />
                  </div>
                  <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                    <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#AD8179]" />
                    <span className="text-[11px] leading-[1.5] text-[#826F68]">I’d like email updates about the Lock In With Lav January 2027 challenge. I can unsubscribe anytime.</span>
                  </label>
                  {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full rounded-full bg-[#38241D] px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#56392E] disabled:opacity-60">
                    {loading ? "Adding you to the list..." : "Put me on the list ♡"}
                  </button>
                  <p className="text-center text-[10px] text-[#A08C85]">No payment required. No commitment just yet.</p>
                </form>
              </>
            )}
          </section>
        </div>

        <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[#E8DAD4] pt-5 text-center text-[10px] text-[#A08C85] sm:flex-row">
          <span className="font-serif text-sm italic text-[#B18B82]">one day at a time. ♡</span>
          <span>© 2027 LOCK IN WITH LAV</span>
        </footer>
      </div>
    </main>
  );
}
