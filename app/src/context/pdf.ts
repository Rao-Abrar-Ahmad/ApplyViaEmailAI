import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

export async function extractPdfText(file: File) {
  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: buffer,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return text.trim();
}

export function buildResumeUrl(publicId: string) {
  return `https://res.cloudinary.com/dlgomp72n/raw/upload/${publicId}.pdf`;
}
