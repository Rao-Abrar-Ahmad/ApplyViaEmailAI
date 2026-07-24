import { useState } from "react";
import { api } from "../api/client";
import { Button, Field, TextArea } from "./ui";
import {
  User,
  BriefcaseBusiness,
  MapPin,
  Globe,
  LoaderCircle,
} from "lucide-react";
import { Github, Linkedin } from "./ui/icons";
import { Settings } from "../lib/types";

interface Props {
  settings: Settings;
  onUpdated(settings: Settings): void;
}

export default function ProfileSettings({ settings, onUpdated }: Props) {
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const save = async () => {
    try {
      setSaving(true);

      await api.updateSettings({
        headline: form.headline,
        experience: form.experience,
        location: form.location,
        portfolio: form.portfolio,
        github: form.github,
        linkedin: form.linkedin,
        skills: form.skills,
        achievements: form.achievements,
      });

      onUpdated(form);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-[#20211e]">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-[#777]">
          This information helps AI personalize your job applications.
        </p>
      </div>

      {/* Professional */}

      <section className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Headline"
            value={form.headline}
            onChange={(v) => update("headline", v)}
          />

          <Field
            label="Years of Experience"
            type="number"
            value={form.experience as any}
            onChange={(v) => update("experience", Number(v))}
          />

          <Field
            label="Location"
            value={form.location}
            onChange={(v) => update("location", v)}
          />

          <Field
            label="Portfolio"
            value={form.portfolio}
            onChange={(v) => update("portfolio", v)}
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Professional Links</h3>

          <p className="text-sm text-[#777]">
            Optional links shown in your generated applications.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Field
            label="GitHub"
            value={form.github}
            onChange={(v) => update("github", v)}
          />

          <Field
            label="LinkedIn"
            value={form.linkedin}
            onChange={(v) => update("linkedin", v)}
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Skills</h3>

          <p className="text-sm text-[#777]">
            Separate multiple skills using commas.
          </p>
        </div>

        <TextArea
          label="Technical Skills"
          rows={5}
          value={form.skills}
          onChange={(v) => update("skills", v)}
          placeholder="React, Next.js, TypeScript, Shopify, Tailwind CSS..."
        />
        <div>
          <h3 className="font-semibold text-lg">Achievements</h3>

          <p className="text-sm text-[#777]">
            Mention measurable accomplishments.
          </p>
        </div>

        <TextArea
          label="Achievements"
          rows={7}
          value={form.achievements}
          onChange={(v) => update("achievements", v)}
          placeholder={`Built SaaS products

Designed 100+ Shopify stores

Improved conversion rates

Built internal dashboards`}
        />
      </section>

      {/* Footer */}

      <div className="pt-6 border-t flex justify-end">
        <Button
          onClick={save}
          disabled={saving}
          className="min-w-[180px] flex items-center justify-center gap-2"
        >
          {saving && <LoaderCircle className="w-4 h-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
