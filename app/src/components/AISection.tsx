import { useEffect, useState } from "react";
import { Brain, LoaderCircle, Sparkles } from "lucide-react";
import { api } from "../api/client";
import { Settings } from "../lib/types";
import { Button } from "./ui";

interface Props {
  settings: Settings;
  onUpdated(settings: Settings): void;
}

export default function AISettings({ settings, onUpdated }: Props) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCustomPrompt(settings.customPrompt || "");
  }, [settings]);

  async function save() {
    try {
      setSaving(true);

      await api.updateSettings({
        ...settings,
        customPrompt,
      });

      onUpdated({
        ...settings,
        customPrompt,
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#39735f]/10 p-2">
          <Brain className="w-5 h-5 text-[#39735f]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#20211e]">AI Instructions</h2>

          <p className="mt-1 text-sm text-[#6b6d67]">
            Customize how the AI writes your job application emails.
          </p>
        </div>
      </div>

      {/* Instructions */}

      <section className="rounded-xl border border-[#e5e5df] bg-[#fcfcfa] p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39735f]" />

            <h3 className="text-lg font-semibold">Custom Instructions</h3>
          </div>

          <p className="mt-2 text-sm text-[#777]">
            These instructions are automatically included with every AI request.
            Use them to define your preferred writing style, tone, or anything
            you always want the AI to remember.
          </p>
        </div>

        <textarea
          rows={6}
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder={`Examples:

• Keep emails under 200 words.

• Write in a confident but humble tone.

• Mention Shopify experience whenever relevant.

• Focus on measurable achievements.

• Avoid generic introductions.

• End with a short call to action.

• Never exaggerate my experience.`}
          className="w-full rounded-lg border border-[#d4d4cd] bg-white px-4 py-3 text-sm leading-6 outline-none resize-none focus:border-[#39735f] focus:ring-4 focus:ring-[#39735f]/20"
        />

        <div className="rounded-lg bg-[#f3f8f5] border border-[#d8e8dd] p-4">
          <p className="text-sm text-[#4d6357]">
            <strong>Tip:</strong> You don't need to describe your skills here.
            Your profile information and uploaded resume are already included
            automatically. Use this section only for writing preferences or
            special instructions.
          </p>
        </div>
      </section>

      {/* Footer */}

      <div className="flex justify-end border-t pt-6">
        <Button
          onClick={save}
          disabled={saving}
          className="min-w-[170px] flex items-center justify-center gap-2"
        >
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Save Instructions
        </Button>
      </div>
    </div>
  );
}
