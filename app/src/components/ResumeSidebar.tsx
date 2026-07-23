import React, { useEffect, useRef, useState } from "react";
import { api, Resume } from "../api/client";
import { Loader2, X } from "lucide-react";
import { buildResumeUrl, extractPdfText } from "../context/pdf";
import { FileText, Trash2 } from "lucide-react";

const ResumeSidebar = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [notice, setNotice] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function remove(id: string) {
    try {
      await api.deleteResume(id);
      await load();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Unable to delete.");
    }
  }

  async function upload(file: File) {
    if (resumes.length >= 3) {
      setNotice("Maximum 3 resumes allowed.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setNotice("Only PDF files are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Maximum file size is 5 MB.");
      return;
    }

    try {
      setUploading(true);
      setNotice("");

      const extractedText = await extractPdfText(file);

      await api.uploadResume(file, extractedText);

      await load();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const load = () =>
    api
      .resumes()
      .then(setResumes)
      .catch((err) => setNotice(err.message));

  useEffect(() => {
    load();
  }, []);
  return (
    <aside className="bg-white border border-[#dfded6] rounded-[13px] p-[21px] max-sm:p-[18px]">
      <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold text-left">
        Your documents
      </p>
      {notice && (
        <p className="text-[#a3463b] text-[13px] mb-[10px]">{notice}</p>
      )}
      <h2 className="mb-[22px] text-[21px] tracking-[-0.7px] font-medium text-[#1c1c1a] text-left">
        Resumes{" "}
        <small className="text-[#85877f] text-[13px] font-semibold ml-1">
          {resumes.length}/3
        </small>
      </h2>

      <div
        className={`block  ${
          uploading || resumes.length === 3
            ? "pointer-events-none cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          const file = e.dataTransfer.files[0];

          if (file) upload(file);
        }}
      >
        <label className="grid place-items-center gap-[7px] min-h-[120px] p-[18px] border border-dashed border-[#aab9ac] rounded-[9px] text-center text-[#38624e] mb-[10px]">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) upload(file);

              e.target.value = "";
            }}
            disabled={uploading || resumes.length === 3}
          />
          {uploading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <b className="text-[#39735f] text-[13px] tracking-[0.1em] font-extrabold uppercase">
                Upload a PDF
              </b>
              <small className="text-[#6b6d67] text-[14px] leading-[1.6]">
                PDF parsing is the next implementation step.
              </small>
            </>
          )}
        </label>
      </div>
      {resumes.length === 0 ? (
        <p className="text-[#6b6d67] text-sm leading-6 text-center py-8">
          No resumes uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="relative rounded-xl border border-[#dfded6] bg-white p-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                aria-label={`Delete ${resume.name}`}
                onClick={() => remove(resume.id)}
                className="absolute top-1 right-1 rounded-full p-1 text-[#a3463b] hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50">
                  <FileText className="h-4 w-4 text-red-500" />
                </div>

                <h3
                  className="mt-3 w-full truncate text-xs font-semibold text-gray-900 cursor-pointer"
                  title={resume.name}
                  onClick={() =>
                    window.open(buildResumeUrl(resume.r2Key), "_blank")
                  }
                >
                  {resume.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500 text-xs">
                  {(resume.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>

                {resume.uploadedAt && (
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(resume.uploadedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default ResumeSidebar;
