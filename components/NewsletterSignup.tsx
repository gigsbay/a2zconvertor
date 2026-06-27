"use client";

import { FormEvent, useId, useState } from "react";

export default function NewsletterSignup({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const emailId = useId();
  const formAction = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION?.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (formAction) return;

    event.preventDefault();
    const subject = "A2ZConvertor newsletter signup";
    const body = `Please add this email to A2ZConvertor updates:\n\n${email.trim()}`;
    window.location.href = `mailto:contact@a2zconvertor.co.uk?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      className={
        compact
          ? "rounded-2xl border border-white/10 bg-slate-900/70 p-5"
          : "border-y border-white/10 bg-slate-900/40 px-6 py-16"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-4xl"}>
        <h2 className={compact ? "text-xl font-black" : "text-3xl font-black"}>
          Get new free tools and creator tips.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
          Be first to know when we launch new converters, PDF tools and
          browser-based productivity tools.
        </p>

        <form
          action={formAction || undefined}
          method={formAction ? "post" : undefined}
          onSubmit={handleSubmit}
          className={`mt-5 flex gap-3 ${compact ? "flex-col" : "flex-col sm:flex-row"}`}
        >
          <label className="sr-only" htmlFor={emailId}>
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
          <input type="hidden" name="source" value="a2zconvertor" />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            {formAction ? "Subscribe" : "Join by email"}
          </button>
        </form>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          {formAction
            ? "Your email is sent to the configured newsletter provider."
            : "No newsletter provider is connected yet. This opens your email app; we do not fake a stored subscription."}
        </p>
      </div>
    </section>
  );
}
