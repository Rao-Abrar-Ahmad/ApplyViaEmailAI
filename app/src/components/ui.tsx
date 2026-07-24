import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "../lib/utils";

export const Button = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}) => {
  const buttonVariants = {
    variant: {
      default: "bg-[#39735f] text-white hover:bg-[#39735f]/90",
      outline: "border border-[#d4d4cd] text-[#373a35] hover:bg-[#39735f]/10",
      ghost: "hover:bg-[#39735f]/10",
    },
    size: {
      default: "px-[12px] py-[11px] text-[13px] font-[750]",
      sm: "px-[10px] py-[9px] text-[12px] font-[750]",
      lg: "px-[14px] py-[13px] text-[14px] font-[750]",
    },
  };
  const variantClass = buttonVariants.variant[variant];
  const sizeClass = buttonVariants.size[size];
  return (
    <button className={cn(variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  );
};

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

export function TextArea({
  label,
  value,
  onChange,
  rows = 5,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "grid gap-[7px] text-[#373a35] text-[13px] font-[750] text-left",
        className,
      )}
    >
      <span>{label}</span>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#d4d4cd] rounded-lg px-[12px] py-[11px] outline-none text-[#242622] bg-white resize-none font-normal focus:border-[#39735f] focus:ring-4 focus:ring-[#39735f]/20 transition-all"
      />
    </label>
  );
}
