# Scale Up Digital Portfolio 🌟

Build your digital presence, one portfolio at a time.

## About the Project 📃

Scale Up Digital Portfolio is a modern platform built for participants of the **Scale Up course** at [Nettverkshuset](https://www.nettverkshuset.no/). It empowers candidates to create stunning, shareable digital portfolios in minutes — no design skills required.

Employers and collaborators can explore all candidates from a clean landing page and dive into individual portfolio pages with a single click. Admins have full control over candidate profiles through a role-based dashboard, while candidates manage their own content with a guided, step-by-step form.

The platform runs entirely in the browser with Firebase Authentication for secure login and real-time language switching between Norwegian and English throughout every page.

## Project Overview 📊

**Objective:** Provide Scale Up course participants with a professional digital presence that showcases their skills, experience, and education to potential employers and collaborators.

**Target Audience:** Candidates enrolled in the Scale Up programme, recruiters, and partner organisations at Nettverkshuset.

**Key Metrics:**

- Portfolio Creation Time: < 5 minutes
- Supported Languages: Norwegian 🇳🇴 and English 🇬🇧
- Authentication Providers: Google OAuth + Email/Password
- Deployment: Netlify with continuous deployment from GitHub

## ✨ Key Features

### 1. Portfolio Builder

- Create a professional portfolio through a **3-step guided form** (Personal Info → Skills → Experience & Education)
- Live form validation with clear error messages at each step
- Upload a profile photo directly from your device
- Add unlimited skills, work experience rows, and education entries
- Portfolios are instantly available as a public shareable page at `/portfolio/your-name`
- Edit your portfolio at any time — all changes reflected immediately

### 2. Public Portfolio Pages

- Each candidate gets a dedicated, standalone portfolio page
- Sections include: Hero, About Me, Skills, Experience Timeline, and Education Timeline
- Direct email and LinkedIn contact buttons built into every page
- Language toggle (NO/EN) available directly on the portfolio navbar

### 3. Candidate Grid (Home Page)

- Browse all candidates in a responsive card grid
- Each card shows name, title, and a link to the full portfolio
- Live updates across browser tabs when portfolios are added or edited

### 4. Role-Based Access

- **Candidates:** Create and edit their own portfolio only
- **Admins:** Edit or delete any portfolio from the home page grid
- Role is verified server-side via Firebase Firestore — not client-writable storage

### 5. Authentication

- **Google OAuth** for candidates — one-click sign in
- **Email/Password** via Firebase Auth for admin accounts
- Admin role assigned through Firestore (`roles/{uid}` with `admin: true`) — no hardcoded credentials
- Unauthenticated users are redirected to login before accessing protected routes

### 6. i18n — Language Switch

- Full Norwegian / English translation across every page and component
- Switch language at any time using the NO/EN toggle in the navbar
- Type-safe translation keys enforced at compile time

### 7. Fully Responsive

- Optimised for desktop, tablet, and mobile
- Sticky navigation, smooth scroll-to-section, and animated hero sections

## Tech Stack 🛠️

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | React 19 + TypeScript   |
| Build Tool      | Vite                    |
| Styling         | Tailwind CSS v4         |
| Routing         | React Router v7         |
| Authentication  | Firebase Authentication |
| Role Management | Firebase Firestore      |
| Storage         | Browser localStorage    |
| Deployment      | Netlify                 |

## Installation ⚙️

Clone the repo and install dependencies:

```bash
git clone https://github.com/Boishakhi11/Scale-up-project.git
cd Scale-up-project
npm install
```

Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> Without real Firebase credentials the app still runs with dummy fallback values — authentication will not work but the UI is fully browsable.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build   # type-check + build → dist/
npm run preview # preview the production build locally
```

### Admin Setup

To grant admin access to an account:

1. Create the user in **Firebase Console → Authentication → Users**
2. Enable **Firestore** and create a document: collection `roles`, document ID = user UID, field `admin: true`
3. Set Firestore security rules so only the owner can read their role document

## Contributing 🤝

Steps to contribute:

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📜

Distributed under the MIT License. See `LICENSE` for more information.

## Contact 📬

🔗 **Live URL:** [Scale Up Digital Portfolio](https://scale-up-woman.netlify.app/)

**Boishakhi Ghosh Mukta** — bgmukta11@gmail.com

**Project Link:** [https://github.com/boishakhi-mukta/Scale-up-project](https://github.com/boishakhi-mukta/Scale-up-project)
