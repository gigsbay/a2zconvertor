"use client";

import { useMemo, useState } from "react";

const tones = ["Friendly", "Professional", "Concise", "Warm"];
const recipients = ["Customer", "Client", "Colleague", "Manager", "Support team"];

function sentenceCase(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : "Your request";
}

export default function EmailTemplateGenerator() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("Customer");
  const [tone, setTone] = useState("Professional");
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => {
    const cleanPurpose = sentenceCase(purpose);
    const greeting =
      tone === "Friendly" || tone === "Warm" ? "Hi" : "Hello";
    const signoff =
      tone === "Concise"
        ? "Thanks"
        : tone === "Warm"
          ? "Kind regards"
          : "Best regards";

    return {
      subject: `${cleanPurpose}`,
      body: `${greeting} ${recipient.toLowerCase()},\n\nI am writing about ${cleanPurpose.toLowerCase()}.\n\nHere are the key details:\n- Context: [add a short note]\n- Requested action: [add what you need]\n- Timeline: [add date or priority]\n\nPlease let me know if you need anything else from me.\n\n${signoff},\n[Your name]`,
    };
  }, [purpose, recipient, tone]);

  async function copyEmail() {
    await navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <h1 className="mb-4 text-4xl font-black">Email Template Generator</h1>
      <p className="mb-8 text-slate-400">
        Build a ready-to-edit email using simple templates. No external service
        is used.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          placeholder="Purpose, e.g. follow up on invoice"
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 md:col-span-3"
        />
        <select
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {recipients.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          value={tone}
          onChange={(event) => setTone(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {tones.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          {copied ? "Copied" : "Copy Email"}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="mb-3 text-sm font-semibold text-blue-300">
          Subject: {email.subject}
        </p>
        <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-200">
          {email.body}
        </pre>
      </div>
    </div>
  );
}
