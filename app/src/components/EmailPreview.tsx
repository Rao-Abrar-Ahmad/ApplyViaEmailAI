import React, { useState } from "react";
import { Field } from "./ui";

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

const EmailPreview = () => {
  const [draft, setDraft] = useState<Draft>(blank);
  return (
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
          onChange={(event) => setDraft({ ...draft, body: event.target.value })}
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
  );
};

export default EmailPreview;
