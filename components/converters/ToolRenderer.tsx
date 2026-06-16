import FaviconGenerator from "@/components/FaviconGenerator";
import ImageConverter from "@/components/converters/ImageConverter";
import ImageCompressor from "@/components/ImageCompressor";
import ImageResizer from "@/components/ImageResizer";
import ImageCropper from "@/components/ImageCropper";
import ImageRotator from "@/components/ImageRotator";
import ImageToBase64 from "@/components/ImageToBase64";
import ImageToPdf from "@/components/ImageToPdf";
import ImageWatermark from "@/components/ImageWatermark";
import ImageFlipper from "@/components/ImageFlipper";
import PdfToImage from "@/components/PdfToImage";
import PdfMerge from "@/components/PdfMerge";
import PdfSplit from "@/components/PdfSplit";
import PdfCompress from "@/components/PdfCompress";
import PdfExtractPages from "@/components/PdfExtractPages";
import PdfRotate from "@/components/PdfRotate";
import PdfDeletePages from "@/components/PdfDeletePages";
import ImageGrayscale from "@/components/ImageGrayscale";

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
  "favicon-generator": <FaviconGenerator />,
  "image-to-pdf": <ImageToPdf />,
  "watermark-image": <ImageWatermark />,
  "flip-image": <ImageFlipper />,
  "pdf-to-image": <PdfToImage />,
  "pdf-merge": <PdfMerge />,
  "pdf-split": <PdfSplit />,
  "compress-pdf": <PdfCompress />,
  "extract-pdf-pages": <PdfExtractPages />,
  "rotate-pdf": <PdfRotate />,
  "delete-pdf-pages": <PdfDeletePages />,
  "grayscale-image": <ImageGrayscale />,
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
