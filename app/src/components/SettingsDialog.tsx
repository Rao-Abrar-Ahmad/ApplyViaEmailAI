import { useEffect, useState } from "react";
import { api } from "../api/client";
import {
  Settings2,
  User,
  BriefcaseBusiness,
  MapPin,
  Globe,
  Mail,
  LoaderCircle,
  LogOut,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Settings } from "../lib/types";

import { Brain, Code2, Trophy, CheckCircle2, Link2 } from "lucide-react";
import { Button, Field, TextArea } from "./ui";
import { Github, Linkedin } from "./ui/icons";
import { Separator } from "./ui/seperator";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import AISettings from "./AISection";
import ProfileSettings from "./ProfileSettings";
import GmailSettings from "./GmailSettings";

const emptySettings: Settings = {
  id: "",
  userId: "",
  headline: "",
  experience: 0,
  location: "",
  portfolio: "",
  github: "",
  linkedin: "",
  skills: "",
  achievements: "",
  customPrompt: "",
  gmailConnected: false,
  gmailTokens: null,
  createdAt: 0,
  updatedAt: 0,
};

const tabs = [
  {
    id: "profile",
    label: "Personal Information",
    icon: User,
  },
  {
    id: "ai",
    label: "AI Instructions",
    icon: Brain,
  },
  {
    id: "gmail",
    label: "Connect Gmail",
    icon: Mail,
  },
];

const SettingsDialog = () => {
  const [tab, setTab] = useState<"profile" | "ai" | "gmail">("profile");
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<Settings>(emptySettings);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const response = await api.settings();

      setSettings(response);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      void loadSettings();
    }
  }, [open]);

  const updateField = <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const save = async () => {
    try {
      setSaving(true);

      await api.updateSettings(settings);

      setOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    setTab("profile");
    loadSettings();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-10 h-10 rounded-full border border-[#ddd] bg-white hover:bg-[#f5f5f5] transition grid place-items-center">
          <Settings2 className="w-5 h-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] !max-w-6xl h-[90vh] p-0 overflow-hidden bg-[#fafaf7] rounded sm:flex">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-[#fafaf7] flex md:flex-col">
          {/* Header */}

          <div className="hidden md:block p-5">
            <h2 className="font-bold text-lg">Settings</h2>

            <p className="text-sm text-gray-500">Manage your account</p>
          </div>

          {/* Tabs */}

          <div className="flex md:flex-col overflow-x-auto md:overflow-visible p-2 md:p-5 gap-2 flex-1">
            {tabs.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as any)}
                  className={cn(
                    "flex items-center justify-center md:justify-start gap-2 whitespace-nowrap rounded-lg px-4 py-3 transition-all text-sm",

                    tab === item.id
                      ? "bg-[#39735f] text-white"
                      : "hover:bg-[#ecece8]",
                  )}
                >
                  <Icon className="w-4 h-4" />

                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout */}

          <div className="hidden md:block p-5 pt-0">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
              onClick={() => void signOut()}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <LoaderCircle className="w-7 h-7 animate-spin text-[#39735f]" />
            </div>
          ) : (
            <>
              {tab === "profile" && (
                <ProfileSettings settings={settings} onUpdated={setSettings} />
              )}

              {tab === "ai" && (
                <AISettings settings={settings} onUpdated={setSettings} />
              )}

              {tab === "gmail" && (
                <GmailSettings settings={settings} onUpdated={setSettings} />
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
