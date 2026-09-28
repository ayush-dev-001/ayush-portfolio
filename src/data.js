// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Ayush Tripathi',
  role: 'Software Development Engineer',
  roles: ['Full-Stack Developer', 'Next.js Engineer', 'Backend Builder', 'Problem Solver'],
  tagline:
    'I build production-grade web platforms: auth systems, APIs and real-time features used by real users.',
  location: 'Punjab, India',
  // Email stored in two parts (user, domain) to keep it away from spam scrapers.
  emailParts: ['ayushtripathi1604', 'gmail.com'],
  // No phone number here on purpose: everything in this file is public in the site's code.
  github: 'https://github.com/ayush-dev-001',
  linkedin: 'https://www.linkedin.com/in/ayush-tripathi-3a7071325/',
  resume: './Ayush_Tripathi_CV.pdf', // put your PDF in /public with this name
  photo: './profile.webp', // light-mode photo in /public (profile.png is the original)
  photoDark: './profile-dark.webp', // dark-mode photo (optional; falls back to `photo`)
  // 'cover'  = photo with its own background, fills the whole card (current photo)
  // 'cutout' = transparent PNG with no background, stands on the lavender card
  photoStyle: 'cover',
  badge: 'Turning ideas into production-ready software',
  headline: ['Building Scalable', 'Web Experiences'],
  about: [
    "I'm a Computer Science undergraduate at Lovely Professional University (CGPA 9.00/10) who ships software that runs in production.",
    "As a freelance software engineer I've merged four MERN codebases into one Next.js platform with 140+ API routes. I've also built auth for 940+ users and set up zero-downtime deployments on VPS infrastructure.",
    'I like the parts that have to work: authentication, API design, data modelling, testing and CI/CD. I also enjoy competitive problem solving.',
  ],
}

export const stats = [
  { value: '140+', label: 'API routes shipped', detail: 'Unified Next.js platform', icon: 'code', tone: 'peach' },
  { value: '940+', label: 'Production users', detail: 'JWT, OTP & OAuth auth', icon: 'users', tone: 'lavender' },
  { value: '75', label: 'E2E tests automated', detail: '100% pass rate with Playwright', icon: 'check', tone: 'mint' },
  { value: '1st', label: 'Algo Arena 2.0', detail: 'Among 1,000+ participants', icon: 'trophy', tone: 'peach' },
  { value: '2', label: 'Live freelance products', detail: 'FUZO & SSB with ISV', icon: 'rocket', tone: 'lavender' },
  { value: '9.00', label: 'CGPA out of 10', detail: 'B.Tech CSE, LPU', icon: 'cap', tone: 'mint' },
]

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Java', 'Python', 'JavaScript'] },
  { group: 'Web', items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase'] },
  { group: 'DevOps & Testing', items: ['Playwright', 'CI/CD', 'PM2', 'Nginx', 'Cloudflare', 'Git'] },
  { group: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'] },
  { group: 'Soft Skills', items: ['Problem Solving', 'Analytical Thinking', 'Communication', 'Leadership', 'Teamwork'] },
]

export const experience = [
  {
    company: 'FUZO',
    role: 'Freelance Software Engineer',
    period: "Aug 2026 – Present",
    status: 'Live',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Gemini AI', 'Google APIs'],
    live: 'https://www.fuzo.app/',
    points: [
      'Developed a full-stack Next.js application with authentication, chat, rewards and user management across 16 routes.',
      'Architected a Supabase backend for authentication, PostgreSQL data access, real-time messaging and REST APIs.',
      'Integrated Google Places, Gemini AI, YouTube and Directions APIs to power AI-driven, location-aware features.',
      'Designed a dynamic leaderboard with scope and time-based rankings using live backend data.',
      'Revamped the UI/UX across settings, profile and dashboard pages, and built reusable, typed API services.',
    ],
  },
  {
    company: 'SSB with ISV',
    role: 'Freelance Software Engineer',
    period: 'Jul 2026 – Present',
    status: 'Live',
    stack: ['Next.js', 'MERN', 'JWT / OAuth', 'Razorpay', 'Playwright', 'Nginx'],
    live: 'https://ssbwithisv.in/',
    points: [
      'Migrated four MERN repositories into a unified Next.js platform with 140+ backend API routes.',
      'Engineered JWT, OTP and OAuth authentication (Google, Facebook, LinkedIn, Apple) for 940+ production users.',
      'Integrated Zoho CRM, Razorpay and third-party REST APIs to streamline onboarding and payments.',
      'Automated a 75-test Playwright E2E suite achieving a 100% pass rate across production releases.',
      'Deployed on a VPS with PM2, Nginx and Cloudflare with zero downtime, and set up CI/CD pipelines.',
    ],
  },
]

export const projects = [
  {
    title: 'FlagFlow',
    subtitle: 'Feature Flag Management System',
    period: 'Aug 2026 – Present',
    description:
      'A multi-tenant feature flag platform. Teams create, target and audit flags, and client apps fetch all of a user’s flags in a single request.',
    highlights: [
      '14 REST APIs for auth, flags, teams and audits',
      'Multi-tenant isolation of flags, members and audit logs',
      '3-role RBAC with expiring (48h) email invitations',
      'JWT + API-key middleware for dashboard and SDK clients',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Context API'],
    github: 'https://github.com/ayush-dev-001/FlagFlow',
    live: '',
  },
  {
    title: 'EcoPickup',
    subtitle: 'Smart Waste Management System',
    period: 'Mar 2026 – May 2026',
    description:
      'A team-built platform connecting users, collection workers and admins, with live task updates and role-based dashboards.',
    highlights: [
      'Real-time task updates between users and workers via Socket.io',
      'JWT-based RBAC with bcrypt for Users, Workers and Admins',
      'Responsive dashboards and REST APIs for collection workflows',
      'Refined MongoDB schema for maintainability and performance',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'bcrypt'],
    github: 'https://github.com/ayush-dev-001/EcoPickup',
    live: '',
  },
]

export const achievements = [
  { title: '1st Place, Algo Arena 2.0 coding hackathon', detail: 'Among 1,000+ participants', date: 'Apr 2026' },
  { title: 'University Honour Roll', detail: 'Excellent academic performance, AY 2023–24', date: 'Nov 2025' },
  { title: '1st Runner-Up, Tech Giants presentation competition', detail: 'Organized by LPU CPE', date: 'Nov 2024' },
]

export const certificates = [
  { title: 'Database Management System Part-1', issuer: 'Infosys Springboard', date: 'Aug 2026' },
  { title: 'JavaScript Developer Certification', issuer: 'freeCodeCamp', date: 'Apr 2026' },
  { title: 'GenAI Fundamentals', issuer: 'Disha AI', date: 'Jun 2025' },
  { title: 'SQL (Intermediate)', issuer: 'HackerRank', date: 'May 2025' },
]

export const education = [
  {
    school: 'Lovely Professional University',
    place: 'Phagwara, Punjab',
    degree: 'B.Tech, Computer Science and Engineering',
    score: 'CGPA 9.00 / 10',
    period: 'Aug 2024 – Present',
  },
  {
    school: 'Lucknow Public School',
    place: 'Lucknow, Uttar Pradesh',
    degree: 'Senior Secondary (CBSE)',
    score: '87%',
    period: '2023',
  },
  {
    school: 'Blooming Buds School',
    place: 'Sant Kabir Nagar, Uttar Pradesh',
    degree: 'Secondary (CBSE)',
    score: '85%',
    period: '2021',
  },
]
