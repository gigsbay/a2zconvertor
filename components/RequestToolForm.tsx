"use client";

import { FormEvent, useState } from "react";

export default function RequestToolForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!toolName.trim() || !description.trim()) {
      setError("Please add the requested tool name and a short description.");
      return;
    }

    const body = [
      `Requested tool: ${toolName.trim()}`,
      category.trim() ? `Category: ${category.trim()}` : "Category: Not specified",
      name.trim() ? `Name: ${name.trim()}` : "Name: Not provided",
      email.trim() ? `Email: ${email.trim()}` : "Email: Not provided",
      "",
      "Description:",
      description.trim(),
    ].join("\n");

    const mailto = `mailto:support@a2zconvertor.co.uk?subject=${encodeURIComponent(
      `Tool request: ${toolName.trim()}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Name" value={name} onChange={setName} />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextField
          label="Requested tool name"
          value={toolName}
          onChange={setToolName}
          required
        />
        <TextField
          label="Tool category"
          value={category}
          onChange={setCategory}
          placeholder="Image, PDF, audio, video..."
        />
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-300">
          Description <span className="text-blue-300">*</span>
        </span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={6}
          placeholder="Tell us what the tool should do, file formats it should support, and any workflow details."
          className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
        />
      </label>

      {error && (
        <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black"
      >
        Open Email Request
      </button>

      <p className="mt-4 text-sm text-slate-500">
        This opens your email app with a prefilled message. A2ZConvertor does
        not save requests to a database yet.
      </p>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
        {required && <span className="text-blue-300"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-blue-500"
      />
    </label>
  );
}
