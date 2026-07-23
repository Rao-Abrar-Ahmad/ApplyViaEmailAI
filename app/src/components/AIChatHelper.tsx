import React, { useState } from "react";
import { api } from "../api/client";

type Draft = {
  email: string;
  company: string;
  jobTitle: string;
  subject: string;
  body: string;
};

const AIChatHelper = ({ onChange }: { onChange: (data: Draft) => void }) => {
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [notice, setNotice] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setBusy(true);
    setNotice("");
    try {
      const result = await api.generate([{ role: "user", content: prompt }]);
      onChange({
        email: result.email,
        company: result.company,
        jobTitle: result.jobTitle,
        subject: result.subject,
        body: result.body,
      });
      setNotice("Email generated. Review it before creating a Gmail draft.");
    } catch (err) {
      setNotice(
        err instanceof Error ? err.message : "Unable to generate an email.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="bg-white border border-[#dfded6] rounded-[13px] p-[21px] max-sm:p-[18px] flex flex-col">
      <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold text-left">
        Session-only conversation
      </p>
      <h2 className="mb-3 text-[21px] tracking-[-0.7px] font-medium text-[#1c1c1a] text-left">
        Application assistant
      </h2>
      {notice && (
        <p className="text-[#a3463b] text-[13px] mb-[10px]">{notice}</p>
      )}
      <div className="flex-1 pb-[27px] px-[3px] text-left">
        <p className="text-[#6b6d67] text-[14px] leading-[1.6]">
          Paste the role and any instructions. Your selected resume and profile
          are used securely by the Worker.
        </p>
      </div>
      <label className="grid gap-[7px] mb-[17px] text-[#373a35] text-[13px] font-[750] text-left">
        <span>Job description or follow-up</span>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={9}
          placeholder="Paste a job description here…"
          className="w-full border border-[#d4d4cd] rounded-lg px-[12px] py-[11px] outline-none text-[#242622] bg-white font-normal focus:border-[#39735f] focus:ring-4 focus:ring-[#39735f]/20 transition-all resize-y"
        />
      </label>
      <button
        className="w-full rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] hover:not-disabled:-translate-y-[1px] transition-transform duration-150 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        disabled={busy || !prompt.trim()}
        onClick={() => void generate()}
      >
        {busy ? "Generating…" : "Generate email →"}
      </button>
    </section>
  );
};

export default AIChatHelper;
