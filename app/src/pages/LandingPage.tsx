import { Link } from "react-router-dom";
import { Brand, Icon } from "../components/ui";
import { LandingHeader } from "../components/LandingHeader";

const cards: ["sparkle" | "file" | "mail" | "shield", string, string][] = [
  [
    "sparkle",
    "AI email generation",
    "Turn a job description and your experience into a thoughtful first draft.",
  ],
  [
    "file",
    "Resume workspace",
    "Keep the right PDF resume ready for the right opportunity.",
  ],
  [
    "mail",
    "Gmail, on your terms",
    "Review everything, then create a draft or send it yourself.",
  ],
  [
    "shield",
    "Privacy-first",
    "Your conversation is session-only and your AI key is encrypted.",
  ],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-[#1c1c1a]">
      <LandingHeader />

      <section className="max-w-[950px] mx-auto text-center px-7 pt-18 pb-24 max-sm:py-[85px] max-sm:px-5 max-sm:text-left">
        <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold">
          A calmer way to apply
        </p>
        <h1 className="mb-5 text-[clamp(43px,7vw,78px)] tracking-[-4px] leading-[0.99] font-normal text-[#1c1c1a] max-sm:tracking-[-2.5px]">
          Thoughtful job emails,
          <br />
          <em className="not-italic text-[#39735f] font-serif font-normal">
            without the busywork.
          </em>
        </h1>
        <p className="max-w-[620px] mx-auto text-[#62655e] text-[18px] leading-[1.65]">
          Bring your resume, a job description, and your own AI key. Generate a
          professional email you always control.
        </p>
        <div className="flex items-center justify-center gap-[23px] mt-[34px] max-sm:flex-col max-sm:items-start">
          <Link
            className="rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] hover:-translate-y-[1px] transition-transform duration-150 shadow-sm inline-flex items-center gap-2"
            to="/register"
          >
            Create your workspace{" "}
            <Icon name="arrow" className="w-[18px] h-[18px] text-current" />
          </Link>
          <a
            href="#how"
            className="text-[#3b554a] font-semibold hover:underline"
          >
            See how it works
          </a>
        </div>
      </section>

      <section className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 max-w-[1220px] mx-auto px-7 pb-[100px] max-sm:pb-[65px] max-sm:px-[18px]">
        {cards.map(([icon, title, copy]) => (
          <article
            key={title}
            className="bg-white border border-[#dfded6] rounded-[13px] p-5"
          >
            <Icon name={icon} />
            <h2 className="mt-4 mb-[10px] text-[16px] tracking-[-0.5px] font-medium text-[#1c1c1a]">
              {title}
            </h2>
            <p className="text-[#6b6d67] text-[14px] leading-[1.6]">{copy}</p>
          </article>
        ))}
      </section>

      <section
        id="how"
        className="bg-[#e9eee7] py-[95px] px-7 text-center max-sm:py-[65px] max-sm:px-[18px] max-sm:text-left"
      >
        <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold">
          Four simple steps
        </p>
        <h2 className="text-[clamp(30px,4vw,48px)] tracking-[-2px] font-medium text-[#1c1c1a]">
          From vacancy to Gmail draft.
        </h2>
        <ol className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-w-[1050px] mx-auto mt-[45px] max-sm:mt-[25px] p-0 list-none">
          {[
            "Upload your PDF resume",
            "Paste the job description",
            "Generate and edit the email",
            "Create a Gmail draft or send it",
          ].map((step, idx) => (
            <li
              key={step}
              className="p-[22px] font-semibold text-[#343733] text-[14px] leading-[1.6]"
            >
              <span className="block mb-[14px] text-[#39735f] text-[13px] tracking-[0.1em] font-extrabold">
                0{idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <footer className="py-[35px] px-7 text-center text-[#74766e] text-[14px]">
        Built for focused, human-controlled job applications.
      </footer>
    </div>
  );
}
