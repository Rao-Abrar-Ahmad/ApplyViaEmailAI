import { LoaderCircle, Mail, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

import { api } from "../api/client";
import { Button } from "./ui";
import { Settings } from "../lib/types";

interface Props {
  settings: Settings;
  onUpdated(settings: Settings): void;
}

export default function GmailSettings({ settings, onUpdated }: Props) {
  const [loading, setLoading] = useState(false);

  async function connectGmail() {
    try {
      setLoading(true);

      // Redirect to your OAuth endpoint
      window.location.href = "/api/auth/google";
    } finally {
      setLoading(false);
    }
  }

  async function disconnectGmail() {
    if (!confirm("Disconnect your Gmail account?")) return;

    try {
      setLoading(true);

      await api.disconnectGmail();

      onUpdated({
        ...settings,
        gmailConnected: false,
        gmailTokens: null,
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#39735f]/10 p-2">
          <Mail className="w-5 h-5 text-[#39735f]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#20211e]">
            Gmail Integration
          </h2>

          <p className="mt-1 text-sm text-[#6b6d67]">
            Connect your Gmail account to send job application emails directly
            from ApplyViaEmailAI.
          </p>
        </div>
      </div>

      {/* Status */}

      <section className="rounded-xl border border-[#e5e5df] bg-[#fcfcfa] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Connection Status</h3>

            <p className="mt-2 text-sm text-[#777]">
              Your Gmail account is used only for sending emails on your behalf.
            </p>
          </div>

          {settings.gmailConnected ? (
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              Connected
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-600">
              <XCircle className="w-4 h-4" />
              Not Connected
            </div>
          )}
        </div>
      </section>

      {/* Information */}

      <section className="rounded-xl border border-[#e5e5df] bg-[#fcfcfa] p-6 space-y-4">
        <h3 className="font-semibold text-lg">
          What happens after connecting?
        </h3>

        <ul className="space-y-3 text-sm text-[#666] list-disc pl-5">
          <li>Send job application emails directly from your Gmail account.</li>
          <li>Your drafted emails can be sent with one click.</li>
          <li>Your Gmail credentials are never exposed to other users.</li>
          <li>You can disconnect your account at any time.</li>
        </ul>
      </section>

      {/* Actions */}

      <div className="flex justify-end border-t pt-6">
        {settings.gmailConnected ? (
          <Button
            variant="outline"
            disabled={loading}
            onClick={disconnectGmail}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Disconnect Gmail
          </Button>
        ) : (
          <Button
            disabled={loading}
            onClick={connectGmail}
            className="flex items-center gap-2"
          >
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            <Mail className="h-4 w-4" />
            Connect Gmail
          </Button>
        )}
      </div>
    </div>
  );
}
