const faqs = [
  {
    question: "Is A2ZConvertor free to use?",
    answer:
      "Yes. The current tools are free to use online without account registration.",
  },
  {
    question: "Are files uploaded to a server?",
    answer:
      "Many tools process files directly in your browser. Some workflows depend on browser support, and each tool page explains important output limitations where needed.",
  },
  {
    question: "Can I request a new tool?",
    answer:
      "Yes. Use the Request a Tool page to suggest new converters, editors or improvements to existing tools.",
  },
  {
    question: "Which tool categories are available?",
    answer:
      "A2ZConvertor currently includes image, PDF, audio and video tools, with more launch-ready utilities planned.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-4xl font-black tracking-tight md:text-5xl">
          Homepage FAQ
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <h3 className="mb-2 text-xl font-bold">{faq.question}</h3>
              <p className="leading-7 text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
