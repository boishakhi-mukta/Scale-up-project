import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { navLinks } from "../data/site";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { getAllPortfolios } from "../lib/portfolioStore";
import Swal from "sweetalert2";

const navClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
    isActive
      ? "bg-white text-brand-700 shadow-sm ring-1 ring-brand-100"
      : "text-slate-600 hover:bg-white/80 hover:text-slate-950",
  ].join(" ");

const mobileNavClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-xl px-4 py-3 text-base font-semibold transition",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-700 hover:bg-slate-50",
  ].join(" ");

export function AppLayout() {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userPortfolio = user ? getAllPortfolios().find(p => p.email === user.email) : undefined;

  const handleLogout = () => {
    setShowMenu(false);
    setMobileMenuOpen(false);
    logout();
    Swal.fire({
      title: t("layout.logoutSuccessTitle"),
      text: t("layout.logoutSuccessText"),
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowMenu(false);
    setMobileMenuOpen(false);
    if (user?.role === "candidate") {
      navigate(userPortfolio ? `/portfolio/${userPortfolio.slug}` : "/register");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#f8fafc] text-slate-900 selection:bg-brand-500/30 selection:text-brand-900 flex flex-col">
      {/* Soft Background */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,#d5ead8_0%,rgba(255,255,255,0)_70%)]" />

      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4 px-6 py-4">
          <NavLink to="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]" onClick={() => setMobileMenuOpen(false)}>
            <img src="/Images/image/logo.png" alt="Nettverkshuset logo" className="h-14 w-auto object-contain lg:h-24" />
          </NavLink>

          {/* Desktop controls */}
          <div className="hidden items-center gap-4 lg:flex">
            <nav className="flex flex-wrap items-center gap-1 rounded-full p-1 text-base bg-slate-100/80 shadow-inner shadow-slate-200/60">
              {navLinks.map((link) => {
                const targetPath = (!user && link.to === "/register") ? "/login" : link.to;
                return (
                  <NavLink key={link.to} to={targetPath} className={navClassName} end={link.to === "/"}>
                    {link.labelKey ? t(`nav.${link.labelKey}` as any) : link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Language Controls */}
            <div className="flex p-1 rounded-full bg-slate-100/80 shadow-inner">
              <button
                onClick={() => setLanguage("no")}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === "no" ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                NO
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${language === "en" ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                EN
              </button>
            </div>

            {/* Auth Control */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-sm font-bold text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-1"></span>
                  )}
                  <span className="truncate max-w-[120px]">{user.name}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 py-1 flex flex-col z-50">
                    <button
                      onClick={handleProfileClick}
                      className="px-4 py-2 text-sm text-left font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {t("layout.profile")}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-left font-semibold text-red-600 hover:bg-red-50"
                    >
                      {t("layout.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-xs font-bold text-white shadow-md transition-all hover:from-brand-600 hover:to-brand-700 hover:shadow-lg hover:-translate-y-0.5"
              >
                {t("layout.login")}
              </button>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label={mobileMenuOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl px-6 py-5 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const targetPath = (!user && link.to === "/register") ? "/login" : link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={targetPath}
                    className={mobileNavClassName}
                    end={link.to === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.labelKey ? t(`nav.${link.labelKey}` as any) : link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Language Controls */}
            <div className="mt-4 flex p-1 w-fit rounded-full bg-slate-100/80 shadow-inner">
              <button
                onClick={() => setLanguage("no")}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${language === "no" ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                NO
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${language === "en" ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              >
                EN
              </button>
            </div>

            {/* Auth Control */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              {user ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-1 py-2">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                    <span className="truncate text-sm font-bold text-slate-800">{user.name}</span>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="block rounded-xl px-4 py-3 text-left text-base font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {t("layout.profile")}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block rounded-xl px-4 py-3 text-left text-base font-semibold text-red-600 hover:bg-red-50"
                  >
                    {t("layout.logout")}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
                  className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:from-brand-600 hover:to-brand-700 hover:shadow-lg"
                >
                  {t("layout.login")}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mx-auto mt-auto w-full max-w-[1140px] px-6 pb-10 pt-20">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xl font-bold text-slate-900">Nettverkshuset</p>
              <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
                {t("layout.footerDesc")}
              </p>
            </div>
            <img src="/Images/image/logo.png" alt="Nettverkshuset logo" className="h-28 w-auto object-contain" />
            <div className="flex gap-6 text-sm font-semibold text-slate-700">
              <a className="transition hover:text-brand-600" href="https://www.linkedin.com/company/nettverkshuset.no/posts/?feedView=all" target="_blank" rel="noreferrer" title="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a className="transition hover:text-brand-600" href="https://www.facebook.com/p/Nettverkshuset-61568715764908/" target="_blank" rel="noreferrer" title="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a className="transition hover:text-brand-600" href="https://www.instagram.com/nettverkshuset/" target="_blank" rel="noreferrer" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-sm border-t border-slate-100 text-slate-500">
            {t("layout.copyright")} {new Date().getFullYear()} by{" "}
            <a href="https://www.nettverkshuset.no/" target="_blank" rel="noreferrer" className="font-semibold text-brand-600 hover:underline transition-colors">
              Nettverkshuset
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
