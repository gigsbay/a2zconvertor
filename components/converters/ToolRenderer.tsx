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
import PdfWatermark from "@/components/PdfWatermark";
import PdfPageNumbers from "@/components/PdfPageNumbers";
import PdfOrganize from "@/components/PdfOrganize";
import PdfCrop from "@/components/PdfCrop";
import MemeGenerator from "@/components/MemeGenerator";
import VideoMetadataViewer from "@/components/VideoMetadataViewer";
import AudioMetadataViewer from "@/components/AudioMetadataViewer";
import Mp4ToAudio from "@/components/Mp4ToAudio";
import Mp3Cutter from "@/components/Mp3Cutter";
import AudioVolumeChanger from "@/components/AudioVolumeChanger";
import VideoToGif from "@/components/VideoToGif";
import VideoCompressor from "@/components/VideoCompressor";
import AudioConverter from "@/components/AudioConverter";
import VideoThumbnailExtractor from "@/components/VideoThumbnailExtractor";
import HashtagGenerator from "@/components/HashtagGenerator";
import BlogTitleGenerator from "@/components/BlogTitleGenerator";
import EmailTemplateGenerator from "@/components/EmailTemplateGenerator";
import TextSummarizer from "@/components/TextSummarizer";
import TextCaseConverter from "@/components/TextCaseConverter";

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
  "watermark-pdf": <PdfWatermark />,
  "add-page-numbers-pdf": <PdfPageNumbers />,
  "organize-pdf": <PdfOrganize />,
  "crop-pdf": <PdfCrop />,
  "meme-generator": <MemeGenerator />,
  "video-metadata": <VideoMetadataViewer />,
  "audio-metadata": <AudioMetadataViewer />,
  "mp4-to-mp3": <Mp4ToAudio />,
  "mp3-cutter": <Mp3Cutter />,
  "change-audio-volume": <AudioVolumeChanger />,
  "video-to-gif": <VideoToGif />,
  "compress-video": <VideoCompressor />,
  "audio-converter": <AudioConverter />,
  "video-thumbnail-extractor": <VideoThumbnailExtractor />,
  "hashtag-generator": <HashtagGenerator />,
  "blog-title-generator": <BlogTitleGenerator />,
  "email-template-generator": <EmailTemplateGenerator />,
  "text-summarizer": <TextSummarizer />,
  "text-case-converter": <TextCaseConverter />,
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
