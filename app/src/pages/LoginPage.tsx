import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Brand, Field } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.signIn(email, password);
      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center content-center gap-[35px] p-7">
      <Brand />
      <form
        onSubmit={submit}
        className="w-full max-w-[460px] bg-white border border-[#dfded6] rounded-[13px] p-[38px]"
      >
        <p className="mb-[13px] text-[#39735f] text-[12px] uppercase tracking-[0.14em] font-extrabold text-left">
          Welcome back
        </p>
        <h1 className="mb-[28px] text-[34px] tracking-[-1.5px] font-medium text-[#1c1c1a] text-left">
          Log in
        </h1>
        {error && (
          <p
            className="mb-[18px] rounded-lg p-[11px_12px] text-[14px] leading-[1.4] border border-[#e7bfbb] bg-[#fff3f1] text-[#963b32] text-left"
            role="alert"
          >
            {error}
          </p>
        )}
        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <button
          className="w-full rounded-lg px-[15px] py-[10px] font-semibold text-white bg-[#39735f] border border-[#2f6553] hover:not-disabled:-translate-y-[1px] transition-transform duration-150 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          disabled={busy}
        >
          {busy ? "Please wait…" : "Log in"}
        </button>
        <p className="mt-[22px] text-[#74766e] text-[14px] text-center">
          New here?{" "}
          <Link
            to="/register"
            className="text-[#39735f] font-[750] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
