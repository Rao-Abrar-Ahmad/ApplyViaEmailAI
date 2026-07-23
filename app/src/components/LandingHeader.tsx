import { Link } from "react-router-dom";
import { Brand } from "./ui";
import { useAuth } from "../context/AuthContext";

export function LandingHeader() {
  const { user } = useAuth();
  return (
    <nav className="min-h-[76px] flex items-center justify-between max-w-[1220px] mx-auto px-7 max-sm:px-[18px] border-b border-[#deddd5]">
      <Brand />
      <div className="flex items-center gap-4">
        {user ? (
          <Link
            className="rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] hover:-translate-y-[1px] transition-transform duration-150 shadow-sm"
            to="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="rounded-lg px-[6px] py-[10px] font-semibold text-[#444842] hover:text-[#20211e] transition-colors"
            to="/login"
          >
            Log in
          </Link>
        )}
        {!user && (
          <Link
            className="rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] hover:-translate-y-[1px] transition-transform duration-150 shadow-sm"
            to="/register"
          >
            Get started
          </Link>
        )}
      </div>
    </nav>
  );
}
