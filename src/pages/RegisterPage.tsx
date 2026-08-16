import { KeyboardEvent, useState, useEffect } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { createPortfolio, getPortfolioBySlug } from "../lib/portfolioStore";
import { useAuth } from "../lib/AuthContext";
import { useLanguage, ValidPaths } from "../lib/LanguageContext";
import Swal from "sweetalert2";

/* ─── Types ─────────────────────────────────────────────── */
type ResumeRow = { title: string; org: string; period: string; summary: string };

type FormData = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  image: string;
  linkedin: string;
  github: string;
  intro: string;
  about: string;
  skills: string[];
  experiences: ResumeRow[];
  education: ResumeRow[];
};

type StepErrors = Record<string, string>;

const emptyRow = (): ResumeRow => ({ title: "", org: "", period: "", summary: "" });

const initialData: FormData = {
  firstName: "", lastName: "", title: "", email: "",
  phone: "", location: "", birthDate: "", image: "",
  linkedin: "", github: "",
  intro: "", about: "",
  skills: [],
  experiences: [emptyRow()],
  education: [emptyRow()],
};

const SUGGESTED_SKILLS: Record<"no" | "en", string[]> = {
  no: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "SQL", "MongoDB", "Tailwind CSS", "Git",
    "Figma", "UX Design", "Dataanalyse", "Maskinlæring", "AWS",
  ],
  en: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "SQL", "MongoDB", "Tailwind CSS", "Git",
    "Figma", "UX Design", "Data Analysis", "Machine Learning", "AWS",
  ],
};

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 shadow-sm";

const inputErrCls =
  "w-full rounded-xl border border-red-400 bg-red-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 shadow-sm";

const labelCls = "block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2";

/* ─── Validation ─────────────────────────────────────────── */
function validateStep(step: number, data: FormData, t: (path: ValidPaths) => string): StepErrors {
  const errors: StepErrors = {};

  if (step === 1) {
    if (!data.firstName.trim())  errors.firstName = t("register.errorFirstName");
    if (!data.title.trim())      errors.title     = t("register.errorTitle");
    if (!data.email.trim())      errors.email     = t("register.errorEmail");
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = t("register.errorEmailInvalid");
    if (!data.location.trim())   errors.location  = t("register.errorLocation");
  }

  if (step === 2) {
    if (!data.intro.trim())          errors.intro  = t("register.errorIntro");
    if (!data.about.trim())          errors.about  = t("register.errorAbout");
    if (data.skills.length === 0)    errors.skills = t("register.errorSkills");
  }

  if (step === 3) {
    const hasExp = data.experiences.some((r) => r.title.trim());
    const hasEdu = data.education.some((r) => r.title.trim());
    if (!hasExp) errors.experiences = t("register.errorExp");
    if (!hasEdu) errors.education   = t("register.errorEdu");
  }

  return errors;
}

/* ────────────────────────────────────────────────────────── */
export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get("edit");
  const { t, language } = useLanguage();
  
  const [step, setStep]       = useState(1);
  const [data, setData]       = useState<FormData>(initialData);
  const [errors, setErrors]   = useState<StepErrors>({});
  const [skillInput, setSkillInput] = useState("");
  const { user } = useAuth();

  const STEPS = [
    { id: 1, label: t("register.step1"),    icon: "👤" },
    { id: 2, label: t("register.step2"),       icon: "💡" },
    { id: 3, label: t("register.step3"), icon: "🎓" },
  ];

  useEffect(() => {
    if (!editSlug || !user) return;
    const existing = getPortfolioBySlug(editSlug);
    if (!existing) return;

    if (existing.email !== user.email && user.role !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    setData({
      firstName: existing.firstName,
      lastName: existing.lastName,
      title: existing.title,
      email: existing.email,
      phone: existing.phone,
      location: existing.location,
      birthDate: existing.birthDate,
      image: existing.image,
      linkedin: existing.linkedin ?? "",
      github: existing.github ?? "",
      intro: existing.intro,
      about: existing.about,
      skills: existing.skills.map(s => s.name),
      experiences: existing.experiences.length ? existing.experiences : [emptyRow()],
      education: existing.education.length ? existing.education : [emptyRow()],
    });
  }, [editSlug, user, navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const set = (field: keyof FormData, value: unknown) =>
    setData((d) => ({ ...d, [field]: value }));

  const clearError = (field: string) =>
    setErrors((e) => { const next = { ...e }; delete next[field]; return next; });

  const setRow = (
    section: "experiences" | "education",
    idx: number,
    field: keyof ResumeRow,
    value: string
  ) =>
    setData((d) => {
      const rows = [...d[section]];
      rows[idx] = { ...rows[idx], [field]: value };
      return { ...d, [section]: rows };
    });

  const addRow    = (s: "experiences" | "education") =>
    setData((d) => ({ ...d, [s]: [...d[s], emptyRow()] }));
  const removeRow = (s: "experiences" | "education", idx: number) =>
    setData((d) => ({ ...d, [s]: d[s].filter((_, i) => i !== idx) }));

  const addSkill = (s: string) => {
    const trimmed = s.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      setData((d) => ({ ...d, skills: [...d.skills, trimmed] }));
      clearError("skills");
    }
  };
  const removeSkill = (s: string) =>
    setData((d) => ({ ...d, skills: d.skills.filter((k) => k !== s) }));

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
      setSkillInput("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({ title: t("register.errorDialogTitle"), text: t("register.imageTooLarge"), icon: "error" });
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => { set("image", reader.result as string); };
    reader.readAsDataURL(file);
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data, t);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const stepErrors = validateStep(3, data, t);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }

    const skillsText    = data.skills.join("\n");
    const experienceText = data.experiences
      .filter((r) => r.title.trim())
      .map((r) => `${r.title} | ${r.org} | ${r.period} | ${r.summary}`)
      .join("\n");
    const educationText = data.education
      .filter((r) => r.title.trim())
      .map((r) => `${r.title} | ${r.org} | ${r.period} | ${r.summary}`)
      .join("\n");

    let portfolio;
    try {
      portfolio = createPortfolio({
        firstName: data.firstName, lastName: data.lastName,
        title: data.title, email: data.email, phone: data.phone,
        location: data.location, birthDate: data.birthDate, image: data.image,
        linkedin: data.linkedin, github: data.github,
        intro: data.intro, about: data.about,
        skillsText, experienceText, educationText,
      }, editSlug || undefined);
    } catch (err: any) {
      Swal.fire({ title: t("register.errorDialogTitle"), text: err.message || t("register.saveErrorGeneric"), icon: "error" });
      return;
    }

    Swal.fire({
      title: t("register.saveSuccessTitle"),
      text: editSlug ? t("register.updatedText") : t("register.createdText"),
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    navigate(`/portfolio/${portfolio.slug}`);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const field = (name: string) => (errors[name] ? inputErrCls : inputCls);

  return (
    <div className="min-h-screen px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Title */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600">
            {t("register.badge")}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {editSlug ? t("register.titleEdit") : t("register.titleCreate")}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600">
            {t("register.subtitle")}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            {STEPS.map((s) => (
              <button
                key={s.id} type="button"
                onClick={() => s.id < step && setStep(s.id)}
                className={[
                  "flex items-center gap-2 text-xs font-semibold transition",
                  s.id === step ? "text-brand-700" : s.id < step ? "cursor-pointer text-emerald-600" : "text-slate-400",
                ].join(" ")}
              >
                <span className={[
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm transition font-bold",
                  s.id === step    ? "border-brand-600 bg-brand-600 text-white"
                  : s.id < step   ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 bg-white text-slate-400",
                ].join(" ")}>{s.id < step ? "✓" : s.id}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-600 transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

          {/* Step header */}
          <div className="border-b border-brand-100 bg-brand-50/50 px-8 py-7">
            <p className="text-2xl">{STEPS[step - 1].icon}</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              {t("register.stepPrefix")} {step} — {STEPS[step - 1].label}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6 px-8 py-8">

              {/* ══ STEP 1 ══ */}
              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>{t("register.firstName")}</label>
                      <input className={field("firstName")} placeholder={t("register.firstNamePlaceholder")}
                        value={data.firstName}
                        onChange={(e) => { set("firstName", e.target.value); clearError("firstName"); }} />
                      {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>{t("register.lastName")}</label>
                      <input className={inputCls} placeholder={t("register.lastNamePlaceholder")}
                        value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>{t("register.title")}</label>
                    <input className={field("title")} placeholder={t("register.titlePlaceholder")}
                      value={data.title}
                      onChange={(e) => { set("title", e.target.value); clearError("title"); }} />
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>{t("register.email")}</label>
                      <input type="email" className={field("email")} placeholder={t("register.emailPlaceholder")}
                        value={data.email}
                        onChange={(e) => { set("email", e.target.value); clearError("email"); }} />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>{t("register.phone")}</label>
                      <input type="tel" className={inputCls} placeholder={t("register.phonePlaceholder")}
                        value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>{t("register.location")}</label>
                      <input className={field("location")} placeholder={t("register.locationPlaceholder")}
                        value={data.location}
                        onChange={(e) => { set("location", e.target.value); clearError("location"); }} />
                      {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>{t("register.birthDate")}</label>
                      <input className={inputCls} placeholder={t("register.birthDatePlaceholder")}
                        value={data.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>{t("register.photoUpload")}</label>
                    <div className="mt-1 flex items-center gap-4">
                      {data.image && (
                        <img src={data.image} alt={t("register.photoPreview")}
                          className="h-16 w-16 rounded-full border-2 border-brand-100 object-cover shadow-sm"
                          onError={(e) => (e.currentTarget.style.display = "none")} />
                      )}
                      <label className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-4 text-sm font-medium text-slate-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 flex-1 text-center">
                        {t("register.uploadPrompt")}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>{t("register.linkedin")}</label>
                      <input className={inputCls} placeholder={t("register.linkedinPlaceholder")}
                        value={data.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>{t("register.github")}</label>
                      <input className={inputCls} placeholder={t("register.githubPlaceholder")}
                        value={data.github} onChange={(e) => set("github", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* ══ STEP 2 ══ */}
              {step === 2 && (
                <>
                  <div>
                    <label className={labelCls}>{t("register.introTitle")}</label>
                    <p className="mb-2 text-xs text-slate-400">{t("register.introSubtitle")}</p>
                    <textarea rows={3} className={field("intro") + " resize-none"}
                      placeholder={t("register.introPlaceholder")}
                      value={data.intro}
                      onChange={(e) => { set("intro", e.target.value); clearError("intro"); }} />
                    {errors.intro && <p className="mt-1 text-xs text-red-500">{errors.intro}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>{t("register.aboutTitle")}</label>
                    <p className="mb-2 text-xs text-slate-400">{t("register.aboutSubtitle")}</p>
                    <textarea rows={5} className={field("about") + " resize-none"}
                      placeholder={t("register.aboutPlaceholder")}
                      value={data.about}
                      onChange={(e) => { set("about", e.target.value); clearError("about"); }} />
                    {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>{t("register.skillsTitle")}</label>
                    <p className="mb-2 text-xs text-slate-400">{t("register.skillsSubtitle")}</p>
                    <div className={[
                      "flex flex-wrap gap-2 rounded-xl border bg-white px-4 py-3 transition focus-within:ring-4 shadow-sm",
                      errors.skills
                        ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100"
                        : "border-slate-300 focus-within:border-brand-500 focus-within:ring-brand-100",
                    ].join(" ")}>
                      {data.skills.map((s) => (
                        <span key={s} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-brand-100 text-brand-700">
                          {s}
                          <button type="button" onClick={() => removeSkill(s)} className="leading-none text-brand-400 hover:text-brand-700">×</button>
                        </span>
                      ))}
                      <input
                        className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                        placeholder={t("register.skillsPlaceholder")}
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKey}
                      />
                    </div>
                    {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTED_SKILLS[language].filter((s) => !data.skills.includes(s)).map((s) => (
                        <button key={s} type="button" onClick={() => addSkill(s)}
                          className="rounded-full border px-3 py-1 text-xs font-bold transition border-slate-300 bg-slate-50 text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ══ STEP 3 ══ */}
              {step === 3 && (
                <>
                  {/* Experiences */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className={labelCls + " mb-0"}>{t("register.expTitle")}</label>
                      <button type="button" onClick={() => addRow("experiences")}
                        className="text-xs font-semibold text-brand-600 transition hover:text-brand-800">
                        {t("register.addBtn")}
                      </button>
                    </div>
                    {errors.experiences && <p className="mb-2 text-xs text-red-500">{errors.experiences}</p>}
                    <div className="space-y-4">
                      {data.experiences.map((row, idx) => (
                        <div key={idx} className="relative space-y-3 rounded-2xl border p-5 border-slate-200 bg-slate-50/50 shadow-sm">
                          {data.experiences.length > 1 && (
                            <button type="button" onClick={() => removeRow("experiences", idx)}
                              className="absolute right-4 top-4 text-lg leading-none text-slate-400 transition hover:text-red-500">×</button>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className={labelCls}>{t("register.jobTitle")}</label>
                              <input className={inputCls} placeholder={t("register.jobTitlePlaceholder")}
                                value={row.title} onChange={(e) => { setRow("experiences", idx, "title", e.target.value); clearError("experiences"); }} />
                            </div>
                            <div>
                              <label className={labelCls}>{t("register.company")}</label>
                              <input className={inputCls} placeholder={t("register.companyPlaceholder")}
                                value={row.org} onChange={(e) => setRow("experiences", idx, "org", e.target.value)} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>{t("register.period")}</label>
                            <input className={inputCls} placeholder={t("register.periodPlaceholder")}
                              value={row.period} onChange={(e) => setRow("experiences", idx, "period", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>{t("register.description")}</label>
                            <textarea rows={2} className={inputCls + " resize-none"} placeholder={t("register.descriptionExpPlaceholder")}
                              value={row.summary} onChange={(e) => setRow("experiences", idx, "summary", e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className={labelCls + " mb-0"}>{t("register.eduTitle")}</label>
                      <button type="button" onClick={() => addRow("education")}
                        className="text-xs font-semibold text-brand-600 transition hover:text-brand-800">
                        {t("register.addBtn")}
                      </button>
                    </div>
                    {errors.education && <p className="mb-2 text-xs text-red-500">{errors.education}</p>}
                    <div className="space-y-4">
                      {data.education.map((row, idx) => (
                        <div key={idx} className="relative space-y-3 rounded-2xl border p-5 border-slate-200 bg-slate-50/50 shadow-sm">
                          {data.education.length > 1 && (
                            <button type="button" onClick={() => removeRow("education", idx)}
                              className="absolute right-4 top-4 text-lg leading-none text-slate-400 transition hover:text-red-500">×</button>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className={labelCls}>{t("register.degree")}</label>
                              <input className={inputCls} placeholder={t("register.degreePlaceholder")}
                                value={row.title} onChange={(e) => { setRow("education", idx, "title", e.target.value); clearError("education"); }} />
                            </div>
                            <div>
                              <label className={labelCls}>{t("register.school")}</label>
                              <input className={inputCls} placeholder={t("register.schoolPlaceholder")}
                                value={row.org} onChange={(e) => setRow("education", idx, "org", e.target.value)} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>{t("register.period")}</label>
                            <input className={inputCls} placeholder={t("register.periodPlaceholder")}
                              value={row.period} onChange={(e) => setRow("education", idx, "period", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>{t("register.description")}</label>
                            <textarea rows={2} className={inputCls + " resize-none"} placeholder={t("register.descriptionEduPlaceholder")}
                              value={row.summary} onChange={(e) => setRow("education", idx, "summary", e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t px-8 py-6 border-slate-200 bg-slate-50">
              {step > 1 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-bold shadow-sm transition border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100">
                  {t("register.backBtn")}
                </button>
              ) : <span />}

              {step < STEPS.length ? (
                <button type="button" onClick={goNext}
                  className="rounded-full bg-gradient-to-r from-brand-500 to-accent-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-200 transition hover:-translate-y-0.5 hover:from-brand-600 hover:to-accent-700">
                  {t("register.nextBtn")}
                </button>
              ) : (
                <button type="submit"
                  className="rounded-full bg-gradient-to-r from-brand-500 to-accent-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-300 transition hover:-translate-y-0.5 hover:from-brand-600 hover:to-accent-700">
                  {editSlug ? t("register.saveChanges") : t("register.createBtn")}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          {t("register.stepPrefix")} {step} {t("register.stepOf")} {STEPS.length} — {STEPS[step - 1].label}
        </p>
      </div>
    </div>
  );
}
