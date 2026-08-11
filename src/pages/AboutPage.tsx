import { teamMembers } from "../data/site";
import { useLanguage } from "../lib/LanguageContext";

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-[1140px] px-6 py-12 lg:py-24">
      <section className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="animate-fade-up">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
            {t("about.badge")}
          </span>
          <h1 className="mt-8 font-serif text-5xl font-extrabold text-slate-900 sm:text-6xl">{t("about.title")}</h1>
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
      </section>

      <section className="mt-32">
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
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-indigo-600">{member.title}</p>
                <p className="mt-4 leading-relaxed text-slate-600">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-32">
        <h2 className="text-center font-serif text-4xl font-extrabold text-slate-900">{t("about.partners")}</h2>
        <div className="marquee mt-10 rounded-3xl border border-slate-200 bg-white py-8 shadow-sm">
          <div className="marquee-track opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <img src="/Images/image/partners.png" alt={t("about.partners")} className="marquee-image" />
            <img src="/Images/image/partners.png" alt="" aria-hidden="true" className="marquee-image" />
          </div>
        </div>
      </section>
    </div>
  );
}
