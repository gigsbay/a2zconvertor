import ImageConverter from "@/components/converters/ImageConverter";
import ImageCompressor from "@/components/ImageCompressor";
import ImageResizer from "@/components/ImageResizer";
import ImageCropper from "@/components/ImageCropper";
import ImageRotator from "@/components/ImageRotator";
import ImageToBase64 from "@/components/ImageToBase64";
import ImageToIco from "@/components/ImageToIco";
import ImageToPdf from "@/components/ImageToPdf";

type Tool = {
  slug: string;
  title: string;
  description: string;
  inputFormat: string;
  inputLabel: string;
  outputFormat: string;
  outputLabel: string;
};

export default function ToolRenderer({ tool }: { tool: Tool }) {
  const customTools: Record<string, React.ReactNode> = {
  "compress-image": <ImageCompressor />,
  "resize-image": <ImageResizer />,
  "crop-image": <ImageCropper />,
  "rotate-image": <ImageRotator />,
  "image-to-base64": <ImageToBase64 />,
  "image-to-ico": <ImageToIco />,
  "image-to-pdf": <ImageToPdf />,
};
  return (
    customTools[tool.slug] ?? (
      <ImageConverter
        title={tool.title}
        inputFormat={tool.inputFormat}
        inputLabel={tool.inputLabel}
        outputFormat={tool.outputFormat}
        outputLabel={tool.outputLabel}
        description={tool.description}
      />
      
    )
  );
}