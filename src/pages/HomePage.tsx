import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePortfolioCards } from "../hooks/usePortfolioCards";
import { useCountUp } from "../hooks/useCountUp";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { deletePortfolio } from "../lib/portfolioStore";
import { teamMembers } from "../data/site";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export function HomePage() {
  const candidates = usePortfolioCards();
  const candidateCount = useCountUp(candidates.length);
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [subscribeEmail, setSubscribeEmail] = useState("");

  useEffect(() => {
    if (location.hash === "#about") {
      const el = document.getElementById("about");
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    }
  }, [location.hash]);

  const handleDelete = (slug: string) => {
    Swal.fire({
      title: t("home.deleteConfirmTitle"),
      text: t("home.deleteConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#54b435",
      cancelButtonColor: "#ef4444",
      confirmButtonText: t("home.deleteConfirmBtn"),
      cancelButtonText: t("home.deleteCancelBtn")
    }).then((result) => {
      if (result.isConfirmed) {
        deletePortfolio(slug);
        Swal.fire({
          title: t("home.deleteSuccessTitle"),
          text: t("home.deleteSuccessText"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleSubscribe = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    Swal.fire({
      title: t("home.subscribeSuccessTitle"),
      text: t("home.subscribeSuccessText"),
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    setSubscribeEmail("");
  };

  return (
    <>
      <section className="mx-auto grid min-h-[70vh] max-w-[1140px] items-start gap-14 px-6 pt-6 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <h1 className="font-serif text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl lg:text-[4rem]">
            {t("home.title1")} <span className="text-brand-600">{t("home.title2")}</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-lg leading-relaxed text-slate-600 sm:text-xl">
            {t("home.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={user ? "/register" : "/login"}
              className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-200 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
            >
              {t("home.createPortfolio")}
            </Link>
            <a
              href="#about"
              className="rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
            >
              {t("home.aboutUs")}
            </a>
          </div>
          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">{candidateCount}+</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{t("home.candidates")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">{t("home.fast")}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{t("home.portfolioCreation")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">{t("home.live")}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{t("home.showcasePages")}</p>
            </div>
          </div>
        </div>
        <div className="animate-float flex justify-center lg:justify-end relative">
          <img
            src="/Images/image/cover.png"
            alt="Illustrasjon for Scale Up"
            className="max-h-[460px] w-full max-w-[570px] rounded-3xl object-cover shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
          />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1140px] px-6">
        <div className="animate-fade-up text-center">
          <h2 className="font-serif text-4xl font-extrabold text-slate-900 sm:text-5xl">
            {t("home.ourCandidates1")} <span className="text-brand-600">{t("home.ourCandidates2")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 sm:text-xl">
            {t("home.ourCandidatesSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {candidates.map((candidate) => {
            const hasProfile = Boolean(candidate.slug);

            return (
              <article
                key={candidate.slug ?? candidate.name}
                className="card-lift animate-fade-up flex flex-col rounded-3xl border-2 border-b-8 border-r-8 border-slate-200 bg-white px-6 py-8 text-center shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="mx-auto h-28 w-28 rounded-full border-4 border-brand-50 object-cover shadow-sm"
                />
                <h3 className="mt-5 text-xl font-bold text-slate-900">{candidate.name}</h3>
                <p className="mt-2 min-h-12 text-sm font-medium text-slate-500">{candidate.title}</p>
                <div className="mt-auto pt-6 space-y-2">
                  {hasProfile ? (
                    <Link
                      to={`/portfolio/${candidate.slug}`}
                      className="inline-block w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {t("home.portfolioBtn")}
                    </Link>
                  ) : (
                    <span className="inline-block w-full rounded-full bg-slate-50 px-5 py-3 text-sm font-bold text-slate-400">
                      {t("home.comingSoon")}
                    </span>
                  )}
                  {user?.role === "admin" && hasProfile && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/register?edit=${candidate.slug}`)}
                        className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                      >
                        {t("home.editBtn")}
                      </button>
                      <button
                        onClick={() => handleDelete(candidate.slug!)}
                        className="rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                      >
                        {t("home.deleteBtn")}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="about" className="mx-auto mt-32 max-w-[1140px] scroll-mt-24 px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 shadow-sm">
              {t("about.badge")}
            </span>
            <h2 className="mt-8 font-serif text-4xl font-extrabold text-slate-900 sm:text-5xl">{t("about.title")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              {t("about.subtitle")}
            </p>
          </div>
          <div className="animate-float grid grid-cols-2 gap-4 sm:gap-6">
            <img
              src="/Images/image/group.jpeg"
              alt={t("about.activityAlt")}
              className="card-lift h-64 w-full rounded-3xl object-cover shadow-sm"
            />
            <img
              src="/Images/image/header_bg.png"
              alt={t("about.communityAlt")}
              className="card-lift h-64 w-full rounded-3xl object-cover shadow-sm sm:translate-y-8"
            />
          </div>
        </div>

        <div className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-extrabold text-slate-900">{t("about.teamTitle")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t("about.teamSubtitle")}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {teamMembers.map((member) => (
              <article key={member.name} className="card-lift animate-fade-up grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[220px_1fr]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[220px] w-full rounded-2xl object-cover shadow-sm"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/Images/image/woman.png";
                  }}
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900">{t("about.meet")}{member.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-brand-600">{member.title}</p>
                  <p className="mt-4 leading-relaxed text-slate-600">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-center font-serif text-4xl font-extrabold text-slate-900">{t("about.partners")}</h2>
          <div className="marquee mt-10 rounded-3xl border border-slate-200 bg-white py-8 shadow-sm">
            <div className="marquee-track opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <img src="/Images/image/partners.png" alt={t("about.partners")} className="marquee-image" />
              <img src="/Images/image/partners.png" alt="" aria-hidden="true" className="marquee-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1140px] px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src="/Images/image/subscirbe.png" alt="Scale Up group" className="h-full w-full object-cover min-h-[300px]" />
          </div>
          <div className="px-8 py-12 md:w-1/2 flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 sm:text-4xl">{t("home.subscribeTitle")}</h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {t("home.subscribeSubtitle")}
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder={t("home.emailPlaceholder")}
                className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                required
              />
              <button type="submit" className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-200 transition duration-300 hover:bg-brand-700">
                {t("home.subscribeBtn")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
