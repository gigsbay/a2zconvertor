"use client";

import { FormEvent, ReactNode, useState } from "react";
import GeneratorResultSection from "./GeneratorResultSection";
import {
  extractKeywords,
  hashtag,
  titleCase,
  variedOutputs,
} from "@/utils/generatorUtils";

function useCopy() {
  const [copied, setCopied] = useState("");
  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  }
  return { copied, copy };
}

function Shell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
      <h1 className="text-4xl font-black">{title}</h1>
      <p className="mt-4 max-w-3xl leading-7 text-slate-400">{description}</p>
      {children}
    </div>
  );
}

const inputClass =
  "rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500";
const buttonClass =
  "rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500";

export function ImprovedHashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("General");
  const [generation, setGeneration] = useState(0);
  const [groups, setGroups] = useState<Record<string, string[]> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event?: FormEvent) {
    event?.preventDefault();
    const words = extractKeywords(topic);
    if (!words.length) return;
    const root = hashtag(words.join(""));
    const seed = `${topic}-${category}-${generation + 1}`;
    setGroups({
      Broad: variedOutputs(
        [...words.map((word) => `#${hashtag(word)}`), "#tips", "#ideas", "#community", "#guide"],
        `${seed}-broad`,
        7
      ),
      Niche: variedOutputs(
        words.flatMap((word) => [
          `#${hashtag(word)}tips`,
          `#${hashtag(word)}ideas`,
          `#learn${hashtag(word)}`,
        ]),
        `${seed}-niche`,
        8
      ),
      Intent: variedOutputs(
        [
          `#start${root}`,
          `#improve${root}`,
          `#${root}howto`,
          `#${root}guide`,
          `#discover${root}`,
          `#practice${root}`,
          `#${hashtag(category)}tips`,
        ],
        `${seed}-intent`,
        7
      ),
      "Branded/content": variedOutputs(
        [
          `#${root}series`,
          `#${root}notes`,
          `#${root}explained`,
          `#${root}weekly`,
          `#my${root}`,
          `#${root}stories`,
          `#${root}content`,
        ],
        `${seed}-brand`,
        7
      ),
    });
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Hashtag Generator" description="Generate grouped, rule-based hashtag suggestions from your topic. Review each tag for relevance; hashtags do not guarantee reach.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_auto]">
        <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic or keywords" className={inputClass} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {["General", "Business", "Lifestyle", "Travel", "Food"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <button className={buttonClass}>{groups ? "Regenerate" : "Generate"}</button>
      </form>
      {groups && <div className="mt-10 grid gap-10">{Object.entries(groups).map(([title, items]) => <GeneratorResultSection key={title} title={`${title} hashtags`} items={items} copied={copied} onCopy={copy} />)}</div>}
    </Shell>
  );
}

const titleTemplates = [
  "How to {topic} Without Overcomplicating It",
  "7 Practical {topic} Ideas to Try",
  "{topic} for Beginners: Start Here",
  "9 Common {topic} Mistakes and How to Fix Them",
  "{topic} vs the Alternatives: What Matters?",
  "5 Quick Tips for Better {topic}",
  "Struggling with {topic}? Try This Approach",
  "The Simple {topic} Checklist",
  "What Nobody Explains About {topic}",
  "A Step-by-Step Guide to {topic}",
  "Before You Start {topic}, Read This",
  "The Pros and Cons of {topic}",
  "How to Solve the Most Common {topic} Problem",
  "10 Useful Lessons About {topic}",
  "Is {topic} Worth Your Time?",
];

export function ImprovedBlogTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [generation, setGeneration] = useState(0);
  const [titles, setTitles] = useState<string[] | null>(null);
  const { copied, copy } = useCopy();

  function generate(event?: FormEvent) {
    event?.preventDefault();
    const subject = titleCase(topic);
    if (!subject) return;
    setTitles(
      variedOutputs(
        titleTemplates.map((item) => item.replaceAll("{topic}", subject)),
        `${topic}-${generation + 1}`,
        12
      )
    );
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Blog Title Generator" description="Generate varied title ideas using transparent writing templates. Edit the result for your audience and search intent.">
      <form onSubmit={generate} className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Blog topic" className={`${inputClass} min-w-0 flex-1`} />
        <button className={buttonClass}>{titles ? "Regenerate" : "Generate"}</button>
      </form>
      {titles && <div className="mt-10"><GeneratorResultSection title="Title ideas" items={titles} copied={copied} onCopy={copy} /></div>}
    </Shell>
  );
}

type EmailResult = {
  subjects: string[];
  body: string;
  short: string;
  followUp: string;
};

export function ImprovedEmailTemplateGenerator() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [message, setMessage] = useState("");
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState<EmailResult | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    const p = purpose.trim();
    const r = recipient.trim();
    const m = message.trim();
    if (!p || !r || !m) return;
    const greeting = tone === "Friendly" ? "Hi" : "Hello";
    const close = tone === "Warm" ? "Kind regards" : tone === "Concise" ? "Thanks" : "Best regards";
    const subjects = variedOutputs(
      [`Regarding ${p}`, `${p}: next steps`, `A quick note about ${p}`, `Follow-up on ${p}`, `${p} for ${r}`],
      `${p}-${r}-${generation + 1}`,
      3
    );
    setResult({
      subjects,
      body: `${greeting} ${r},\n\nI am writing about ${p.toLowerCase()}.\n\n${m}\n\nPlease let me know if you have any questions or need additional information.\n\n${close},\n[Your name]`,
      short: `${greeting} ${r},\n\nA quick note about ${p.toLowerCase()}: ${m}\n\n${close},\n[Your name]`,
      followUp: `${greeting} ${r},\n\nI wanted to follow up on my earlier message about ${p.toLowerCase()}. ${m}\n\nWhen convenient, please let me know the next step.\n\n${close},\n[Your name]`,
    });
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Email Template Generator" description="Generate a complete, ready-to-edit email from your purpose, recipient and key message. No external service is used.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
        <input required value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className={inputClass} />
        <input required value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient type or name" className={inputClass} />
        <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>
          {["Professional", "Friendly", "Warm", "Concise"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Key message or action needed" rows={3} className={`${inputClass} md:row-span-2`} />
        <button className={buttonClass}>{result ? "Regenerate" : "Generate"}</button>
      </form>
      {result && (
        <div className="mt-10 grid gap-10">
          <GeneratorResultSection title="Subject line options" items={result.subjects} copied={copied} onCopy={copy} />
          <GeneratorResultSection title="Complete email" items={[result.body]} copied={copied} onCopy={copy} />
          <GeneratorResultSection title="Shorter version" items={[result.short]} copied={copied} onCopy={copy} />
          <GeneratorResultSection title="Follow-up version" items={[result.followUp]} copied={copied} onCopy={copy} />
        </div>
      )}
    </Shell>
  );
}

function summarizeText(text: string, count: number) {
  const sentences =
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()) ?? [];
  const words = text.toLowerCase().match(/[a-z0-9]+/g)?.filter((word) => word.length > 2) ?? [];
  const frequencies = new Map<string, number>();
  words.forEach((word) => frequencies.set(word, (frequencies.get(word) ?? 0) + 1));
  const sentenceWords = (value: string) =>
    value.toLowerCase().match(/[a-z0-9]+/g)?.filter((word) => word.length > 2) ?? [];
  const ranked = sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: sentenceWords(sentence).reduce(
        (total, word) => total + (frequencies.get(word) ?? 0),
        0
      ),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const chosen = ranked
    .slice(0, Math.min(count, ranked.length))
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence);
  return {
    short: chosen.join(" "),
    bullets: ranked.slice(0, Math.min(5, ranked.length)).map((item) => item.sentence),
    takeaways: [...frequencies.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => titleCase(word)),
  };
}

export function ImprovedTextSummarizer() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<ReturnType<typeof summarizeText> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    if (text.trim().length < 40) return;
    setResult(summarizeText(text, count));
  }

  return (
    <Shell title="Text Summarizer" description="Create a faithful rule-based summary using sentence relevance and keyword frequency. The tool does not invent new facts.">
      <form onSubmit={generate} className="mt-8">
        <textarea required minLength={40} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste at least a few sentences to summarize" rows={10} className={`${inputClass} w-full`} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-semibold text-slate-300">Short summary length: {count} sentences
            <input type="range" min="2" max="5" value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-2 block w-56" />
          </label>
          <button className={buttonClass}>{result ? "Regenerate" : "Generate"}</button>
        </div>
      </form>
      {result && (
        <div className="mt-10 grid gap-10">
          <GeneratorResultSection title="Short summary" items={[result.short]} copied={copied} onCopy={copy} />
          <GeneratorResultSection title="Bullet summary" items={result.bullets} copied={copied} onCopy={copy} />
          <GeneratorResultSection title="Key takeaways" items={result.takeaways} copied={copied} onCopy={copy} />
        </div>
      )}
    </Shell>
  );
}

const captionOpeners: Record<string, string[]> = {
  Friendly: ["Here is something useful about", "A quick thought on", "Let us talk about", "Sharing a lesson from", "One thing I enjoy about"],
  Funny: ["Plot twist: today is about", "Nobody asked, but here is", "My current personality is", "A mildly dramatic update on", "Apparently we are learning"],
  Professional: ["A practical perspective on", "A useful lesson from", "Three things to consider about", "A clearer approach to", "What experience taught me about"],
  Aesthetic: ["A quiet moment for", "Notes from", "Currently inspired by", "Small details from", "A softer look at"],
  Bold: ["Stop overlooking", "Let us be direct about", "This is your sign to rethink", "The truth about", "Make room for better"],
};

export function ImprovedInstagramCaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [emoji, setEmoji] = useState(true);
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState<Record<string, string[]> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    const subject = topic.trim();
    if (!subject) return;
    const seed = `${subject}-${tone}-${generation + 1}`;
    const marks = emoji ? [" \u2728", " \ud83d\udcf8", " \ud83d\udcdd", " \ud83d\udca1", " \u2764\ufe0f"] : ["", "", "", "", ""];
    const captions = captionOpeners[tone].map(
      (opener, index) =>
        `${opener} ${subject}.${marks[index]} ${[
          "Here is the part worth remembering.",
          "The small details made the biggest difference.",
          "This is what the process looked like in practice.",
          "A useful starting point is often simpler than expected.",
          "Your experience may be different, and that is worth discussing.",
        ][index]}`
    );
    setResult({
      "Main captions": variedOutputs(captions, `${seed}-main`, 5),
      "Short captions": variedOutputs(
        [
          `${subject}, made practical.`,
          `A fresh look at ${subject}.`,
          `Notes from the ${subject} process.`,
          `One useful ${subject} lesson.`,
          `Small steps toward better ${subject}.`,
          `${subject}: the honest version.`,
          `Today is for learning ${subject}.`,
        ],
        `${seed}-short`,
        5
      ),
      "CTA lines": variedOutputs(
        [
          `What is your experience with ${subject}?`,
          `Save this for your next ${subject} project.`,
          `Share this with someone learning about ${subject}.`,
          `Which ${subject} step would you try first?`,
          `Follow for more practical ${subject} ideas.`,
          `Add your best ${subject} tip below.`,
        ],
        `${seed}-cta`,
        5
      ),
    });
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Instagram Caption Generator" description="Generate five main captions, five short captions and five CTA lines from your topic and selected tone. Suggestions are template-based.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_auto_auto]">
        <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Post topic or niche" className={inputClass} />
        <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>
          {Object.keys(captionOpeners).map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className={`${inputClass} flex items-center gap-3`}><input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} /> Emoji cues</label>
        <button className={buttonClass}>{result ? "Regenerate" : "Generate"}</button>
      </form>
      {result && <div className="mt-10 grid gap-10">{Object.entries(result).map(([title, items]) => <GeneratorResultSection key={title} title={title} items={items} copied={copied} onCopy={copy} />)}</div>}
    </Shell>
  );
}

export function ImprovedTiktokHashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState<Record<string, string[]> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    const words = extractKeywords(topic);
    const audienceWords = extractKeywords(audience);
    if (!words.length || !audienceWords.length) return;
    const root = hashtag(words.join(""));
    const people = hashtag(audienceWords.join(""));
    const seed = `${topic}-${audience}-${generation + 1}`;
    setResult({
      Broad: variedOutputs([`#${root}`, "#creatortips", "#learnontiktok", "#howto", "#contentideas", "#community"], `${seed}-b`, 6),
      Niche: variedOutputs(words.flatMap((word) => [`#${hashtag(word)}tips`, `#learn${hashtag(word)}`, `#${hashtag(word)}community`]), `${seed}-n`, 7),
      "Content style": variedOutputs([`#${root}tutorial`, `#${root}explained`, `#${root}checklist`, `#${root}story`, `#${root}review`, `#${root}behindthescenes`], `${seed}-c`, 6),
      Audience: variedOutputs([`#${people}`, `#${root}for${people}`, `#${people}tips`, `#helping${people}`, `#${people}community`, `#learnwith${people}`], `${seed}-a`, 6),
    });
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="TikTok Hashtag Generator" description="Generate broad, niche, content-style and audience hashtags. Use only relevant tags; no hashtag set guarantees reach or virality.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Niche or topic" className={inputClass} />
        <input required value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Audience" className={inputClass} />
        <button className={buttonClass}>{result ? "Regenerate" : "Generate"}</button>
      </form>
      {result && <div className="mt-10 grid gap-10">{Object.entries(result).map(([title, items]) => <GeneratorResultSection key={title} title={`${title} hashtags`} items={items} copied={copied} onCopy={copy} />)}</div>}
    </Shell>
  );
}

const youtubeTemplates = [
  "How to {topic}: A Clear Tutorial",
  "{topic} for Beginners: Start Here",
  "7 {topic} Mistakes to Avoid",
  "{topic} vs {alternative}: What Should You Choose?",
  "The Fastest Practical Way to Improve {topic}",
  "Your Complete {topic} Checklist",
  "Struggling with {topic}? Try This",
  "10 Things I Wish I Knew About {topic}",
  "A Simple Step-by-Step {topic} Guide",
  "The Honest Truth About {topic}",
  "5 Quick {topic} Tips That Save Time",
  "Before You Try {topic}, Watch This",
  "What Beginners Get Wrong About {topic}",
  "I Tested a Better Approach to {topic}",
];

export function ImprovedYoutubeTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Mixed");
  const [generation, setGeneration] = useState(0);
  const [titles, setTitles] = useState<string[] | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    const subject = titleCase(topic);
    if (!subject) return;
    const alternative = style === "Review" ? "the Alternative" : "Another Method";
    setTitles(
      variedOutputs(
        youtubeTemplates.map((item) =>
          item.replaceAll("{topic}", subject).replaceAll("{alternative}", alternative)
        ),
        `${topic}-${style}-${generation + 1}`,
        10
      )
    );
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="YouTube Title Generator" description="Generate ten varied title ideas with approximate character counts. A clear title helps set expectations but cannot guarantee views.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-[1fr_220px_auto]">
        <input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Video topic" className={inputClass} />
        <select value={style} onChange={(e) => setStyle(e.target.value)} className={inputClass}>
          {["Mixed", "Tutorial", "Beginner", "Review", "Fast method"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <button className={buttonClass}>{titles ? "Regenerate" : "Generate"}</button>
      </form>
      {titles && <div className="mt-10"><GeneratorResultSection title="Title ideas" items={titles} copied={copied} onCopy={copy} metadata={(item) => `${item.length} characters${item.length <= 60 ? " - concise" : " - consider shortening"}`} /></div>}
    </Shell>
  );
}

export function ImprovedSocialBioGenerator() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [platform, setPlatform] = useState("Instagram");
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState<Record<string, string[]> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    const brand = name.trim();
    const topic = niche.trim();
    if (!brand || !topic) return;
    const seed = `${brand}-${topic}-${tone}-${platform}-${generation + 1}`;
    const voice = tone.toLowerCase();
    setResult({
      "Short bio": variedOutputs([
        `${brand} | ${voice} ${topic} ideas for ${platform}.`,
        `${topic} made clearer by ${brand}.`,
        `${brand}: practical ${topic}, shared ${voice === "professional" ? "clearly" : "honestly"}.`,
      ], `${seed}-short`, 1),
      "Professional bio": variedOutputs([
        `${brand} shares practical ${topic} guidance, useful examples and thoughtful resources for people who want to make progress.`,
        `${brand} helps the ${platform} community understand ${topic} through clear resources and realistic examples.`,
        `Practical ${topic} education from ${brand}, created for people who value a ${voice} approach.`,
      ], `${seed}-professional`, 1),
      "Creator-style bio": variedOutputs([
        `Learning, testing and sharing ${topic} in public.\nCreated by ${brand} for curious ${platform} users.`,
        `Behind the process of ${topic}.\nExperiments, lessons and useful notes from ${brand}.`,
        `${brand} documents the real work behind ${topic} for the ${platform} community.`,
      ], `${seed}-creator`, 1),
      "Punchy bio": variedOutputs([
        `${topic}, without the noise.\nBy ${brand}.`,
        `Better ${topic}. Clearer ideas. ${brand}.`,
        `${brand} makes ${topic} feel less complicated.`,
      ], `${seed}-punchy`, 1),
      "CTA line": variedOutputs([
        `Follow ${brand} for practical ${topic} ideas.`,
        `Start with the latest ${topic} post.`,
        `Explore more ${topic} resources below.`,
        `Join the conversation about ${topic}.`,
      ], seed, 1),
    });
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Social Media Bio Generator" description="Generate platform-aware bio formats from your real name, niche and tone. Edit every claim so it accurately represents you.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name or brand" className={inputClass} />
        <input required value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Niche" className={inputClass} />
        <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>{["Friendly", "Professional", "Playful", "Bold", "Minimal"].map((item) => <option key={item}>{item}</option>)}</select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputClass}>{["Instagram", "TikTok", "YouTube", "LinkedIn", "X"].map((item) => <option key={item}>{item}</option>)}</select>
        <button className={`${buttonClass} md:col-span-2`}>{result ? "Regenerate" : "Generate"}</button>
      </form>
      {result && <div className="mt-10 grid gap-10">{Object.entries(result).map(([title, items]) => <GeneratorResultSection key={title} title={title} items={items} copied={copied} onCopy={copy} />)}</div>}
    </Shell>
  );
}

const ideaTemplates: Record<string, string[]> = {
  Educational: [
    "Explain the first step a {audience} should take with {niche}.",
    "Break down a common {niche} mistake using a {platform} example.",
    "Create a checklist for reaching {goal} through {niche}.",
    "Compare two approaches to {niche} for {audience}.",
    "Answer one specific question {audience} asks about {niche}.",
    "Define an important {niche} term in plain language.",
  ],
  Entertaining: [
    "Show expectation versus reality when {audience} try {niche}.",
    "Create a myth-or-fact post about {niche}.",
    "Turn a familiar {niche} frustration into a short {platform} story.",
    "Make a choose-one poll about two {niche} options.",
    "Share a light, honest reaction to a common {niche} habit.",
    "Recreate a relatable day in the life of {audience}.",
  ],
  Promotional: [
    "Demonstrate how your offer helps {audience} with one {niche} problem.",
    "Share a before-and-after {niche} workflow focused on {goal}.",
    "Answer a real objection {audience} have before buying.",
    "Show one feature in a practical {platform} scenario.",
    "Explain who your {niche} offer is best suited to.",
    "Create a transparent next-step post for {goal}.",
  ],
  "Personal/behind-the-scenes": [
    "Share why you started working on {niche}.",
    "Show the process behind one recent {niche} result.",
    "Describe a lesson that changed your approach to {goal}.",
    "Share one small {niche} win and what made it possible.",
    "Explain what you are currently testing for {audience}.",
    "Show a realistic behind-the-scenes moment from your {platform} workflow.",
  ],
};

export function ImprovedContentIdeasGenerator() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [goal, setGoal] = useState("Engagement");
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState<Record<string, string[]> | null>(null);
  const { copied, copy } = useCopy();

  function generate(event: FormEvent) {
    event.preventDefault();
    if (!niche.trim() || !audience.trim()) return;
    const replacements = { niche: niche.trim(), audience: audience.trim(), platform, goal: goal.toLowerCase() };
    const seed = `${niche}-${audience}-${platform}-${goal}-${generation + 1}`;
    setResult(
      Object.fromEntries(
        Object.entries(ideaTemplates).map(([group, templates]) => [
          group,
          variedOutputs(
            templates.map((item) =>
              Object.entries(replacements).reduce(
                (text, [key, value]) => text.replaceAll(`{${key}}`, value),
                item
              )
            ),
            `${seed}-${group}`,
            5
          ),
        ])
      )
    );
    setGeneration((value) => value + 1);
  }

  return (
    <Shell title="Content Ideas Generator" description="Generate twenty specific, rule-based ideas grouped by content purpose. Suggestions use your niche, audience, platform and goal.">
      <form onSubmit={generate} className="mt-8 grid gap-4 md:grid-cols-2">
        <input required value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Niche" className={inputClass} />
        <input required value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Audience" className={inputClass} />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputClass}>{["Instagram", "TikTok", "YouTube", "LinkedIn", "X"].map((item) => <option key={item}>{item}</option>)}</select>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className={inputClass}>{["Followers", "Leads", "Engagement", "Sales"].map((item) => <option key={item}>{item}</option>)}</select>
        <button className={`${buttonClass} md:col-span-2`}>{result ? "Regenerate" : "Generate"}</button>
      </form>
      {result && <div className="mt-10 grid gap-10">{Object.entries(result).map(([title, items]) => <GeneratorResultSection key={title} title={title} items={items} copied={copied} onCopy={copy} />)}</div>}
    </Shell>
  );
}
