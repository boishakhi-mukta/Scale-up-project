import { Link, useNavigate } from "react-router-dom";
import { usePortfolioCards } from "../hooks/usePortfolioCards";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { deletePortfolio } from "../lib/portfolioStore";
import Swal from "sweetalert2";
import { useState } from "react";

export function HomePage() {
  const candidates = usePortfolioCards();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleDelete = (slug: string) => {
    Swal.fire({
      title: "Are you sure to delete this profile?",
      text: "Er du sikker på at du vil slette denne profilen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ja, slett den!",
      cancelButtonText: "Avbryt"
    }).then((result) => {
      if (result.isConfirmed) {
        deletePortfolio(slug);
        Swal.fire({
          title: "Slettet!",
          text: "Porteføljen har blitt slettet.",
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
      title: "Suksess!",
      text: "Takk for din interesse. Vi tar kontakt snart!",
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
      <section className="mx-auto grid max-w-[1140px] gap-14 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="animate-fade-up">
          <h1 className="font-serif text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl lg:text-[4rem]">
            {t("home.title1")} <span className="text-indigo-600">{t("home.title2")}</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-lg leading-relaxed text-slate-600 sm:text-xl">
            {t("home.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={user ? "/register" : "/login"}
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              {t("home.createPortfolio")}
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
            >
              {t("home.aboutUs")}
            </Link>
          </div>
          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">{candidates.length}+</p>
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
            {t("home.ourCandidates1")} <span className="text-indigo-600">{t("home.ourCandidates2")}</span>
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
                  className="mx-auto h-28 w-28 rounded-full border-4 border-indigo-50 object-cover shadow-sm"
                />
                <h3 className="mt-5 text-xl font-bold text-slate-900">{candidate.name}</h3>
                <p className="mt-2 min-h-12 text-sm font-medium text-slate-500">{candidate.title}</p>
                <div className="mt-auto pt-6 space-y-2">
                  {hasProfile ? (
                    <Link
                      to={`/portfolio/${candidate.slug}`}
                      className="inline-block w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-300 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
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
                className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-5 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                required
              />
              <button type="submit" className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition duration-300 hover:bg-indigo-700">
                {t("home.subscribeBtn")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
