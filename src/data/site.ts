export type Candidate = {
  name: string;
  title: string;
  image: string;
  slug?: string;
};

export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  summary: string;
};

export type PortfolioSkill = {
  name: string;
  image?: string;
  description: string;
};

export type PortfolioRecord = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  image: string;
  linkedin?: string;
  github?: string;
  intro: string;
  about: string;
  skills: PortfolioSkill[];
  experiences: ExperienceItem[];
  education: ExperienceItem[];
};

export const navLinks = [
  { label: "Hjem", to: "/", labelKey: "home" },
  { label: "Om Oss", to: "/#about", labelKey: "about" },
  { label: "Registrer", to: "/register", labelKey: "register" },
];

export const baseCandidates: Candidate[] = [
  { name: "Boishakhi", title: "Programvareutvikler", image: "/Images/image/Mukta.jpeg", slug: "boishakhi" },
  { name: "Varsha", title: "IT-administrasjon", image: "/Images/image/Varsha.jpeg", slug: "varsha" },
  { name: "Syedha", title: "Dataforsker", image: "/Images/image/Farzana.jpeg", slug: "syedha" },
  { name: "Vinithra", title: "Programvareutvikler", image: "/Images/image/VIni.jpeg", slug: "vinithra" },
  { name: "Aarcha", title: "PhD, Forsker", image: "/Images/image/archa.jpeg", slug: "aarcha" },
  { name: "Soumya", title: "Dataanalytiker", image: "/Images/image/smoya.jpeg", slug: "soumya" },
  { name: "Kristine", title: "Prosjektleder", image: "/Images/image/woman.png", slug: "kristine" },
  { name: "Amalie", title: "UX Designer", image: "/Images/image/woman.png", slug: "amalie" },
  { name: "Sofia", title: "Frontend Utvikler", image: "/Images/image/woman.png", slug: "sofia" },
  { name: "Nora", title: "Backend Utvikler", image: "/Images/image/woman.png", slug: "nora" },
  { name: "Ingrid", title: "DevOps Engineer", image: "/Images/image/woman.png", slug: "ingrid" },
  { name: "Maria", title: "Sikkerhetsanalytiker", image: "/Images/image/woman.png", slug: "maria" },
];

export const staticPortfolios: PortfolioRecord[] = [
  {
    slug: "boishakhi",
    firstName: "Boishakhi",
    lastName: "Ghosh",
    fullName: "Boishakhi Ghosh",
    shortName: "Boishakhi",
    title: "Front-End Developer",
    email: "bgmukta11@gmail.com",
    phone: "+47 000 00 000",
    location: "Dhaka, Bangladesh",
    birthDate: "15 April 1996",
    image: "/Images/image/Mukta.jpeg",
    intro:
      "Front-End Developer med bakgrunn i testing, moderne frontend og kontinuerlig laering. Trives i team som bygger kvalitet, gode opplevelser og positiv effekt.",
    about:
      "Jeg liker a bygge brukervennlige nettsider og er spesielt interessert i frontend og testing. Akkurat na jobber jeg med flere prosjekter og utvikler meg videre i moderne webteknologi.",
    skills: [
      {
        name: "Vanilla JavaScript",
        image: "/Images/image/icons/js.png",
        description: "Prosjekterfaring med interaktive grensesnitt og solid grunnforstaelse for frontend.",
      },
      {
        name: "Node.js",
        image: "/Images/image/icons/nodejs.png",
        description: "Komfortabel med grunnleggende backend og samspill mellom frontend og tjenester.",
      },
      {
        name: "React",
        image: "/Images/image/icons/react.png",
        description: "Bygger moderne komponentbaserte losninger og jobber aktivt videre med rammeverket.",
      },
      {
        name: "MongoDB",
        image: "/Images/image/icons/mongo.png",
        description: "Utforsker databaser i moderne webstakker sammen med SQL- og PostgreSQL-erfaring.",
      },
    ],
    experiences: [
      {
        title: "Front-End Developer",
        org: "Inno-Scribe",
        period: "Nov 2025 - Present",
        summary: "Jobber med frontend, AI-stottede arbeidsflyter, Tailwind CSS og automasjon.",
      },
      {
        title: "Technical Support",
        org: "Media Mondays Oslo",
        period: "Jun 2024 - Jun 2025",
        summary: "Bidro med teknisk stotte, rapportering, markedsundersokelser og arrangementsgjennomforing.",
      },
      {
        title: "Software Tester",
        org: "Data Soft System LTD",
        period: "Jun 2019 - Jul 2019",
        summary: "Skrev testtilfeller og jobbet med manuell testing, funksjonell testing og integrasjonstesting.",
      },
    ],
    education: [
      {
        title: "MSc in Computer Science",
        org: "Ostfold University",
        period: "Sep 2022 - Jun 2025",
        summary: "Fordypning i interaction design og informasjonssikkerhet.",
      },
      {
        title: "BSc in Computer Science",
        org: "IUBAT",
        period: "Jan 2016 - Dec 2019",
        summary: "Studerte blant annet datastrukturer, algoritmer, Java, C#, C, C++ og databaser.",
      },
      {
        title: "Microsoft Learner",
        org: "INNO-SCI",
        period: "Jun 2023 - Aug 2023",
        summary: "Fullforte sertifiseringer innen Azure Fundamentals og Security Compliance.",
      },
    ],
  },
  {
    slug: "varsha",
    firstName: "Varsha",
    lastName: "P",
    fullName: "Varsha P",
    shortName: "Varsha",
    title: "IT-administrasjon",
    email: "varsha@eksempel.no",
    phone: "+47 000 00 001",
    location: "Oslo, Norway",
    birthDate: "10 March 1994",
    image: "/Images/image/Varsha.jpeg",
    intro: "Erfaren IT-administrator med fokus på systemvedlikehold og optimalisering.",
    about: "Jeg brenner for å sikre at IT-infrastrukturen kjører knirkefritt, med spesielt fokus på skyteknologi og nettverkssikkerhet.",
    skills: [
      { name: "Systemadministrasjon", description: "Vedlikehold av servere og nettverk." },
      { name: "Azure / AWS", description: "Grunnleggende skytjenester og drift." },
    ],
    experiences: [
      { title: "IT Administrator", org: "TechCorp AS", period: "Jan 2022 - Nå", summary: "Drift av interne nettverk og brukersupport." }
    ],
    education: [
      { title: "BSc IT Operations", org: "OsloMet", period: "2018 - 2021", summary: "Fokus på infrastruktur og skysikkerhet." }
    ]
  },
  {
    slug: "syedha",
    firstName: "Syedha",
    lastName: "F",
    fullName: "Syedha F",
    shortName: "Syedha",
    title: "Dataforsker",
    email: "syedha@eksempel.no",
    phone: "+47 000 00 002",
    location: "Oslo, Norway",
    birthDate: "05 August 1993",
    image: "/Images/image/Farzana.jpeg",
    intro: "Analytisk dataforsker med ekspertise innen maskinlæring og statistisk analyse.",
    about: "Jeg elsker å dykke ned i store datasett for å finne verdifull innsikt og bygge prediktive modeller.",
    skills: [
      { name: "Python / Pandas", description: "Ekspertise i datamanipulering og analyse." },
      { name: "Machine Learning", description: "Bygger prediktive modeller med scikit-learn og TensorFlow." },
    ],
    experiences: [
      { title: "Data Scientist", org: "DataCorp", period: "Mar 2021 - Nå", summary: "Utvikler ML-modeller for kundeprediksjon." }
    ],
    education: [
      { title: "MSc Data Science", org: "UiO", period: "2019 - 2021", summary: "Spesialisering i kunstig intelligens og maskinlæring." }
    ]
  },
  {
    slug: "vinithra",
    firstName: "Vinithra",
    lastName: "S",
    fullName: "Vinithra S",
    shortName: "Vinithra",
    title: "Programvareutvikler",
    email: "vinithra@eksempel.no",
    phone: "+47 000 00 003",
    location: "Oslo, Norway",
    birthDate: "22 September 1995",
    image: "/Images/image/VIni.jpeg",
    intro: "Lidenskapelig fullstack-utvikler som bygger skalerbare og moderne webløsninger.",
    about: "Jeg har en sterk bakgrunn i JavaScript-økosystemet og elsker å løse komplekse problemer på både frontend og backend.",
    skills: [
      { name: "React", description: "Utvikling av moderne brukergrensesnitt." },
      { name: "TypeScript", description: "Typet sikkerhet for store applikasjoner." },
    ],
    experiences: [
      { title: "Fullstack Developer", org: "WebSystems", period: "Aug 2020 - Nå", summary: "Utvikling av SaaS-plattformer for bedriftsmarkedet." }
    ],
    education: [
      { title: "BSc Software Engineering", org: "NTNU", period: "2017 - 2020", summary: "Algoritmer, databaser og moderne webutvikling." }
    ]
  },
  {
    slug: "aarcha",
    firstName: "Aarcha",
    lastName: "R",
    fullName: "Aarcha R",
    shortName: "Aarcha",
    title: "PhD, Forsker",
    email: "aarcha@eksempel.no",
    phone: "+47 000 00 004",
    location: "Oslo, Norway",
    birthDate: "12 December 1990",
    image: "/Images/image/archa.jpeg",
    intro: "Forsker med doktorgrad i bioteknologi og lidenskap for innovasjon.",
    about: "Min forskning fokuserer på bærekraftige løsninger og data-drevet analyse av biologiske systemer.",
    skills: [
      { name: "Forskning", description: "Design og gjennomføring av komplekse studier." },
      { name: "Dataanalyse", description: "Statistisk analyse av forskningsdata." },
    ],
    experiences: [
      { title: "Postdoc Forsker", org: "UiO", period: "Jan 2021 - Nå", summary: "Leder prosjekter innen bærekraftig bioteknologi." }
    ],
    education: [
      { title: "PhD Bioteknologi", org: "NMBU", period: "2016 - 2020", summary: "Fokus på miljøvennlige prosesser." }
    ]
  },
  {
    slug: "soumya",
    firstName: "Soumya",
    lastName: "K",
    fullName: "Soumya K",
    shortName: "Soumya",
    title: "Dataanalytiker",
    email: "soumya@eksempel.no",
    phone: "+47 000 00 005",
    location: "Oslo, Norway",
    birthDate: "18 November 1994",
    image: "/Images/image/smoya.jpeg",
    intro: "Analytisk og detaljorientert dataanalytiker med fokus på forretningsinnsikt.",
    about: "Jeg oversetter komplekse data til handlingsbar innsikt for å hjelpe bedrifter med å ta bedre beslutninger.",
    skills: [
      { name: "SQL", description: "Avanserte spørringer og databaseoptimalisering." },
      { name: "PowerBI / Tableau", description: "Visualisering av data og dashboard-utvikling." },
    ],
    experiences: [
      { title: "Data Analyst", org: "FinansGruppen", period: "Feb 2022 - Nå", summary: "Rapportering og analyse av finansielle trender." }
    ],
    education: [
      { title: "BSc Økonomi & Administrasjon", org: "BI", period: "2018 - 2021", summary: "Fokus på kvantitativ metode og finans." }
    ]
  }
];

export const teamMembers = [
  {
    name: "Rusha",
    title: "Grunder og leder",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/04/rushapic.jpg",
    description:
      "Rusha er grunder og leder av Nettverkshuset, hvor hun jobber med a skape et inkluderende og stottende fellesskap for alle.",
  },
  {
    name: "Trine",
    title: "Kurslaerer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFl5aolx3ASmA/profile-displayphoto-crop_800_800/B4DZnudh1JIEAI-/0/1760642343653?e=1764806400&v=beta&t=Uc9QGOnluDCiJ4nA--2cYDnxthNVgMhyjVHSfdtNuSU",
    description:
      "Trine er kursholder hos Nettverkshuset og underviser i motiverende kommunikasjon, coaching og helseadferd.",
  },
  {
    name: "Sangitaa",
    title: "Digital ekspert",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/06/sangitaanew.png",
    description:
      "Sangitaa bidrar med webutvikling og digital markedsforing, og gjor digitale ideer om til brukervennlige losninger.",
  },
  {
    name: "Trisha",
    title: "Prosjektkoordinator",
    image: "https://www.nettverkshuset.no/wp-content/uploads/2025/05/trisha.png",
    description:
      "Trisha bidrar med struktur, planlegging og koordinering for a skape aktivitet, utvikling og fellesskap.",
  },
];
