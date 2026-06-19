export type MonetizationPlacement = {
  id: string;
  label: "Sponsored" | "Recommended";
  title: string;
  description: string;
  href: string;
  cta: string;
  contexts: ("tool" | "category" | "resource" | "comparison")[];
};

export const monetizationPlacements: MonetizationPlacement[] = [
  {
    id: "sponsored-tool-slot",
    label: "Sponsored",
    title: "Featured software partner",
    description:
      "A reserved placement for a relevant file, productivity or document software partner.",
    href: "/partners",
    cta: "Explore partnership options",
    contexts: ["tool", "category"],
  },
  {
    id: "recommended-software-slot",
    label: "Recommended",
    title: "Need a full desktop workflow?",
    description:
      "This space can recommend trusted software when a browser tool is not enough for a complex workflow.",
    href: "/partners",
    cta: "View partner information",
    contexts: ["resource", "comparison"],
  },
  {
    id: "affiliate-resource-slot",
    label: "Recommended",
    title: "Compare specialist software",
    description:
      "A clearly disclosed placement for useful software, hosting, privacy or storage products.",
    href: "/partners",
    cta: "See how recommendations work",
    contexts: ["resource"],
  },
];

export function getPlacement(
  context: MonetizationPlacement["contexts"][number],
  index = 0
) {
  const matches = monetizationPlacements.filter((placement) =>
    placement.contexts.includes(context)
  );
  return matches[index % matches.length];
}
