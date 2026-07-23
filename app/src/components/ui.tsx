import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function Brand({
  type = "landing",
}: {
  type?: "landing" | "dashboard";
}) {
  return (
    <Link
      className="text-[#20211e] text-[19px] font-extrabold tracking-[-0.8px] hover:opacity-90 transition-opacity"
      to={type === "landing" ? "/" : "/dashboard"}
    >
      Apply<span className="text-[#39735f]">Via</span>EmailAI
    </Link>
  );
}

export function Icon({
  name,
  className,
}: {
  name: "sparkle" | "file" | "mail" | "shield" | "arrow";
  className?: string;
}) {
  const icons = {
    sparkle: Sparkles,
    file: FileText,
    mail: Mail,
    shield: ShieldCheck,
    arrow: ArrowRight,
  };
  const IconComponent = icons[name];
  return (
    <IconComponent
      className={className || "w-[28px] h-[28px] text-[#39735f] shrink-0"}
      aria-hidden="true"
      strokeWidth={1.8}
    />
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-[7px] mb-[17px] text-[#373a35] text-[13px] font-[750] text-left">
      <span className="block">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[#d4d4cd] rounded-lg px-[12px] py-[11px] outline-none text-[#242622] bg-white font-normal focus:border-[#39735f] focus:ring-4 focus:ring-[#39735f]/20 transition-all"
      />
    </label>
  );
}
