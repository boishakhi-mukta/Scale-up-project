import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import Swal from "sweetalert2";

export function LoginPage() {
  const { loginWithEmailPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loginWithEmailPassword(email, password);
      Swal.fire({
        title: t("login.successTitle"),
        text: t("login.successText"),
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/");
    } catch (err: any) {
      const code: string = err?.code ?? "";
      const message =
        code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found"
          ? t("login.errorInvalidCredentials")
          : code === "auth/too-many-requests"
          ? t("login.errorTooManyRequests")
          : t("login.errorGeneric");
      Swal.fire({ title: t("login.errorTitle"), text: message, icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    try {
      await loginWithGoogle();
      Swal.fire({
        title: t("login.successTitle"),
        text: t("login.successText"),
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 shadow-sm";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="bg-brand-50/50 border-b border-brand-100 px-8 py-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t("login.title")}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {t("login.subtitle")}
          </p>
        </div>

        <div className="px-8 py-6">
          {/* Google OAuth */}
          <div className="mb-6 space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={isAuthenticating || isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition disabled:opacity-50"
            >
              {isAuthenticating ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {t("login.google")}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-semibold text-slate-400">
                  {t("login.or")}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
                {t("login.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("login.emailPlaceholder")}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
                {t("login.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isAuthenticating}
              className="mt-6 w-full rounded-xl bg-linear-to-r from-brand-500 to-accent-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-brand-600 hover:to-accent-700 hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? t("login.loggingIn") : t("login.loginAs")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
