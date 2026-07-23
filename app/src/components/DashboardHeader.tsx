import { useNavigate } from "react-router-dom";
import { Brand } from "./ui";
import { useAuth } from "../context/AuthContext";

export function DashboardHeader() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <header className="min-h-[76px] flex items-center justify-between px-4 sm:px-[18px] md:px-[54px] border-b border-[#deddd5] bg-[#f7f6f2]">
      <Brand type="dashboard" />
      <div className="flex items-center gap-4">
        <span className="text-[#60635e] text-[14px]">
          {user.name || user.email}
        </span>
        <button
          className="rounded-lg px-[6px] py-[10px] font-semibold text-[#444842] hover:text-[#20211e] transition-colors"
          onClick={() => void signOut().finally(() => navigate("/"))}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
