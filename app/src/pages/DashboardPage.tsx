import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, Resume } from "../api/client";
import { Brand, Field } from "../components/ui";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import ResumeSidebar from "../components/ResumeSidebar";
import AIChatHelper from "../components/AIChatHelper";

type Draft = {
  email: string;
  company: string;
  jobTitle: string;
  subject: string;
  body: string;
};

const blank: Draft = {
  email: "",
  company: "",
  jobTitle: "",
  subject: "",
  body: "",
};

export default function DashboardPage() {
  const [draft, setDraft] = useState<Draft>(blank);

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <div className="grid grid-cols-[minmax(230px,0.76fr)_minmax(360px,1.35fr)_minmax(275px,0.9fr)] max-lg:grid-cols-[minmax(220px,0.7fr)_minmax(340px,1.3fr)] max-sm:grid-cols-1 gap-[17px] max-w-[1440px] mx-auto py-[27px] px-4 sm:px-[18px] md:px-[54px] items-start">
        <ResumeSidebar />

        <AIChatHelper onChange={(data: Draft) => setDraft(data)} />

        <aside className="bg-white border border-[#dfded6] rounded-[13px] p-[21px] max-sm:p-[18px]">
          <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold text-left">
            Always editable
          </p>
          <h2 className="mb-[22px] text-[21px] tracking-[-0.7px] font-medium text-[#1c1c1a] text-left">
            Email preview
          </h2>
          <Field
            label="Recipient email"
            type="email"
            value={draft.email}
            onChange={(value) => setDraft({ ...draft, email: value })}
          />
          <Field
            label="Company"
            value={draft.company}
            onChange={(value) => setDraft({ ...draft, company: value })}
          />
          <Field
            label="Job title"
            value={draft.jobTitle}
            onChange={(value) => setDraft({ ...draft, jobTitle: value })}
          />
          <Field
            label="Subject"
            value={draft.subject}
            onChange={(value) => setDraft({ ...draft, subject: value })}
          />
          <label className="grid gap-[7px] mb-[17px] text-[#373a35] text-[13px] font-[750] text-left">
            <span>Email body</span>
            <textarea
              rows={12}
              value={draft.body}
              onChange={(event) =>
                setDraft({ ...draft, body: event.target.value })
              }
              placeholder="Your generated email will appear here."
              className="w-full border border-[#d4d4cd] rounded-lg px-[12px] py-[11px] outline-none text-[#242622] bg-white font-normal focus:border-[#39735f] focus:ring-4 focus:ring-[#39735f]/20 transition-all resize-y"
            />
          </label>
          <button
            className="w-full rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] disabled:cursor-not-allowed disabled:opacity-60"
            disabled
          >
            Connect Gmail in Settings to create a draft
          </button>
        </aside>
      </div>
    </div>
  );
}
