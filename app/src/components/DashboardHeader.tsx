import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Brand, Button } from "./ui";
import { useAuth } from "../context/AuthContext";
import SettingsDialog from "./SettingsDialog";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user) return null;

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 border-b border-[#deddd5] bg-[#f7f6f2]/90 backdrop-blur">
      <div className="h-[72px] px-5 lg:px-10 flex items-center justify-between">
        {/* Left */}

        <Brand type="dashboard" />

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* User */}

          <div className="hidden sm:flex items-center gap-3 rounded-xl border border-[#dfded6] bg-white px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-[#39735f] text-white font-bold flex items-center justify-center text-sm">
              {initials}
            </div>

            <div className="leading-tight">
              <p className="text-[14px] font-semibold text-[#222]">
                {user?.name || "User"}
              </p>

              <p className="text-[12px] text-[#777]">{user?.email}</p>
            </div>
          </div>

          {/* Settings */}

          <SettingsDialog />

          {/* Logout */}

          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            onClick={() => void signOut().finally(() => navigate("/"))}
          >
            <LogOut className="w-4 h-4" />

            <span className="hidden md:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
