import { BasePdfUploader } from '@components/BasePdfUploader';

interface PdfUploaderProps {
  onPdfUpload: (content: string) => void;
}

export function PdfUploader({ onPdfUpload }: PdfUploaderProps) {
  return (
    <div className="border-b border-border-stroke">
      <BasePdfUploader onPdfUpload={onPdfUpload} inputId="sidebar-pdf-input" />
    </div>
  );
}
