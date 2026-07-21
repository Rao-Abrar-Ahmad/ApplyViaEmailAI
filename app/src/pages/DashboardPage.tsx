import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, Resume, User } from "../api/client";
import { Brand, Field } from "../components/ui";
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
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState<Draft>(blank);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const load = () =>
    api
      .resumes()
      .then(setResumes)
      .catch((err) => setNotice(err.message));
  useEffect(() => {
    api
      .user()
      .then(setUser)
      .then(load)
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate]);
  const generate = async () => {
    if (!prompt.trim()) return;
    setBusy(true);
    setNotice("");
    try {
      const result = await api.generate([{ role: "user", content: prompt }]);
      setDraft({
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
  if (!user) return <main className="center">Loading workspace…</main>;
  return (
    <main className="workspace">
      <header>
        <Brand />
        <div>
          <span className="user">{user.name || user.email}</span>
          <button
            className="plain"
            onClick={() => void api.signOut().finally(() => navigate("/"))}
          >
            Log out
          </button>
        </div>
      </header>
      {notice && <p className="notice">{notice}</p>}
      <div className="grid px-0">
        <aside className="panel">
          <p className="eyebrow">Your documents</p>
          <h2>
            Resumes <small>{resumes.length}/3</small>
          </h2>
          <label className="upload">
            <input type="file" accept="application/pdf" disabled />
            <b>Upload a PDF</b>
            <small>PDF parsing is the next implementation step.</small>
          </label>
          {resumes.length === 0 ? (
            <p className="empty">
              No resumes yet. Add one to give the assistant context.
            </p>
          ) : (
            resumes.map((resume) => (
              <div
                className={`resume ${resume.active ? "active" : ""}`}
                key={resume.id}
              >
                <button
                  onClick={() => void api.selectResume(resume.id).then(load)}
                >
                  {resume.name}
                  <small>{resume.active ? "Active resume" : "Select"}</small>
                </button>
                <button
                  aria-label={`Delete ${resume.name}`}
                  onClick={() => void api.deleteResume(resume.id).then(load)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </aside>
        <section className="panel chat">
          <p className="eyebrow">Session-only conversation</p>
          <h2>Application assistant</h2>
          <div className="empty grow">
            <h3>Start with the job description.</h3>
            <p>
              Paste the role and any instructions. Your selected resume and
              profile are used securely by the Worker.
            </p>
          </div>
          <label className="field">
            <span>Job description or follow-up</span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={9}
              placeholder="Paste a job description here…"
            />
          </label>
          <button
            className="button full"
            disabled={busy || !prompt.trim()}
            onClick={() => void generate()}
          >
            {busy ? "Generating…" : "Generate email →"}
          </button>
        </section>
        <aside className="panel">
          <p className="eyebrow">Always editable</p>
          <h2>Email preview</h2>
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
          <label className="field">
            <span>Email body</span>
            <textarea
              rows={12}
              value={draft.body}
              onChange={(event) =>
                setDraft({ ...draft, body: event.target.value })
              }
              placeholder="Your generated email will appear here."
            />
          </label>
          <button className="button full" disabled>
            Connect Gmail in Settings to create a draft
          </button>
        </aside>
      </div>
    </main>
  );
}
