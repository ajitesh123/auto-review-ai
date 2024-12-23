import { useState, useCallback } from 'react';
import { buildClassNames } from '@utils/classnames';
import { FileUp } from 'lucide-react';
import { getDocument } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface BasePdfUploaderProps {
  onPdfUpload: (content: string) => void;
  className?: string;
  inputId: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function BasePdfUploader({
  onPdfUpload,
  className,
  inputId,
  containerClassName,
  labelClassName,
}: BasePdfUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const extractPdfText = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const processPdfFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      console.error('Invalid file type');
      return;
    }

    try {
      setIsProcessing(true);
      const arrayBuffer = await file.arrayBuffer();
      const extractedText = await extractPdfText(arrayBuffer);
      setFileName(file.name);
      onPdfUpload(extractedText);
    } catch (error) {
      console.error('Error processing PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processPdfFile(file);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processPdfFile(file);
      }
    },
    []
  );

  return (
    <div className={buildClassNames('p-2', containerClassName)}>
      <div
        className={buildClassNames(
          'flex items-center justify-center min-h-10 p-2 rounded-lg border border-dashed border-gray-600 transition-all duration-200 bg-gray-900',
          isDragging ? 'border-accent-blue bg-accent-blue-active' : '',
          fileName ? 'border-solid border-accent-green' : '',
          isProcessing
            ? 'border-accent-blue bg-accent-blue-active opacity-70 cursor-not-allowed'
            : '',
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
          id={inputId}
          disabled={isProcessing}
        />
        <label
          htmlFor={inputId}
          className={buildClassNames(
            'flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-cyan-200 transition-colors',
            isProcessing ? 'cursor-not-allowed' : '',
            labelClassName
          )}
        >
          <FileUp className="h-4 w-4" />
          <span className="text-xs">
            {isProcessing ? 'Processing...' : fileName || 'Upload PDF context'}
          </span>
        </label>
      </div>
    </div>
  );
}
