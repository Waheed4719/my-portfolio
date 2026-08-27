export type Project = {
  image: string;
  title: string;
  github: string;
  description: string;
  technologies: string[];
  link: string;
};

export type Experience = {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
};

export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type StackItem = {
  icon: string;
  title: string;
  description: string;
};

export type Technology = {
  name: string;
  icon: string;
};

export const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Stack', href: '#stack' },
  { name: '3D', href: '#showcase' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/waheed-uddin-ahmed-09143a1b2/',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Waheed4719',
    icon: 'github',
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~015a4a1d12148116c9',
    icon: 'upwork',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/wahid.ahmed.96/',
    icon: 'facebook',
  },
];

export const stacks: StackItem[] = [
  {
    icon: 'react',
    title: 'React',
    description:
      'Dynamic, responsive UIs with a focus on performance and accessibility.',
  },
  {
    icon: 'typescript',
    title: 'TypeScript',
    description: 'Robust, maintainable code with fewer bugs and clearer types.',
  },
  {
    icon: 'node',
    title: 'Node.js',
    description: 'Scalable server-side apps that handle real traffic and data.',
  },
  {
    icon: 'nuxt',
    title: 'Nuxt',
    description: 'SSR Vue apps optimized for SEO and smooth navigation.',
  },
  {
    icon: 'next',
    title: 'Next.js',
    description: 'Production React with App Router, SSR, and edge-ready APIs.',
  },
  {
    icon: 'vue',
    title: 'Vue',
    description: 'Modern interfaces that integrate cleanly with any stack.',
  },
];

export const projects: Project[] = [
  {
    image: '/images/MyHealth.png',
    title: 'Call My Doctor',
    github: '',
    description:
      'Mobile app for virtual doctor consultations with video, audio, calendar, maps, and patient reports.',
    technologies: ['React Native', 'Socket.io', 'Express', 'MongoDB'],
    link: '',
  },
  {
    image: '/images/PavementAI.png',
    title: 'Asset Intel',
    github: '',
    description:
      'Pavement defect monitoring with interactive maps and ML-powered crack detection.',
    technologies: ['AWS', 'React TS', 'Python', 'Maps'],
    link: 'http://cityscan-roadeye-app-st-albert-dev.s3-website-us-west-2.amazonaws.com/performance-monitoring/road/pavement/performance-map',
  },
  {
    image: '/images/Medfix.png',
    title: 'Medfix Healthcare',
    github: '',
    description:
      'SaaS telehealth platform with video, calendar, blogs, maps, and Stripe Connect.',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    link: '',
  },
  {
    image: '/images/Jurisnexa.png',
    title: 'Jurisnexa',
    github: '',
    description:
      'Legal SaaS for virtual consultations, firm management, and multi-role workflows.',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    link: '',
  },
  {
    image: '/images/Xukini.png',
    title: 'Xukini',
    github: '',
    description:
      'Food-business platform for ordering, lessons, chef hiring, and payments.',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    link: '',
  },
  {
    image: '/images/Collect-Car.png',
    title: 'Collect Car',
    github: '',
    description: '3D car showcase with smooth animations and responsive layout.',
    technologies: ['React', 'Next.js', 'Tailwind', 'Three.js'],
    link: 'https://collect-car.vercel.app/',
  },
  {
    image: '/images/Pokedex.png',
    title: 'Pokedex',
    github: '',
    description: 'Pokemon encyclopedia with search, filters, and favorites.',
    technologies: ['React', 'Next.js', 'Tailwind'],
    link: 'https://pokedex-next-eight-lovat.vercel.app',
  },
  {
    image: '/images/fizzi-clone.png',
    title: 'Fizzi',
    github: '',
    description: '3D beverage landing page clone with scroll-driven animations.',
    technologies: ['React', 'Next.js', 'Three.js', 'Tailwind'],
    link: 'https://fizzi-clone.vercel.app/',
  },
  {
    image: '/images/TushpaLab.png',
    title: 'Tushpa Lab',
    github: '',
    description: 'Marketing site for a premium beverage brand.',
    technologies: ['React', 'Next.js'],
    link: 'https://www.tushpalab.am/en',
  },
  {
    image: '/images/Wishbux.png',
    title: 'Wishbux',
    github: 'https://github.com/Waheed4719/Wishbux',
    description: 'Animated landing page with polished motion design.',
    technologies: ['React', 'Tailwind', 'Framer Motion'],
    link: 'https://wishbux.vercel.app/',
  },
  {
    image: '/images/RocketRails.png',
    title: 'Rocket Rails',
    github: '',
    description: 'Team task management with project boards and workflows.',
    technologies: ['Nuxt', 'Vue 3', 'Tailwind', 'Headless UI'],
    link: 'https://rocket-rails.vercel.app/',
  },
];

export const services: Service[] = [
  {
    icon: 'globe',
    title: 'Website Development',
    description:
      'Custom websites built for usability, accessibility, and performance.',
  },
  {
    icon: 'design',
    title: 'Website Design',
    description:
      'Distinct, engaging interfaces with modern UX patterns.',
  },
  {
    icon: 'api',
    title: 'API Creation',
    description:
      'Scalable, documented APIs for integrations and microservices.',
  },
  {
    icon: 'chart',
    title: 'Performance Optimization',
    description:
      'Caching, compression, and profiling to make apps feel instant.',
  },
  {
    icon: 'bug',
    title: 'Bug Fixing',
    description:
      'Fast debugging and QA to keep releases stable and shippable.',
  },
];

export const technologies: Technology[] = [
  { name: 'HTML 5', icon: '/tech/html.png' },
  { name: 'CSS 3', icon: '/tech/css.png' },
  { name: 'JavaScript', icon: '/tech/javascript.png' },
  { name: 'TypeScript', icon: '/tech/typescript.png' },
  { name: 'React', icon: '/tech/reactjs.png' },
  { name: 'Redux', icon: '/tech/redux.png' },
  { name: 'Tailwind', icon: '/tech/tailwind.png' },
  { name: 'Node.js', icon: '/tech/nodejs.png' },
  { name: 'MongoDB', icon: '/tech/mongodb.png' },
  { name: 'Three.js', icon: '/tech/threejs.svg' },
  { name: 'Git', icon: '/tech/git.png' },
  { name: 'Figma', icon: '/tech/figma.png' },
  { name: 'Docker', icon: '/tech/docker.png' },
];

export const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    company_name: 'CityScan Technologies',
    icon: '/logos/cityScan-logo.png',
    iconBg: '#E6DEDD',
    date: 'June 2022 – December 2025',
    points: [
      'Built in-house web apps with React and Material UI.',
      'Integrated backend APIs and improved UX across monitoring tools.',
      'Participated in code reviews and mentored junior developers.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company_name: 'Inevex Solutions',
    icon: '/logos/inevex-solutions-logo.png',
    iconBg: '#ffffff',
    date: 'October 2020 – Present',
    points: [
      'Shipped React and Next.js products with Express backends.',
      'Implemented responsive design and cross-browser compatibility.',
      'Collaborated on architecture and deployment pipelines.',
    ],
  },
  {
    title: 'React Developer',
    company_name: 'Medfix Healthcare',
    icon: '/logos/medfix-logo.jpg',
    iconBg: '#fff',
    date: 'March 2020 – June 2021',
    points: [
      'Maintained telehealth web apps with React and real-time features.',
      'Ensured responsive layouts and accessibility standards.',
      'Reviewed code and improved component libraries.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company_name: 'IHealthScreen',
    icon: '/logos/ihealthscreen-logo.jpg',
    iconBg: '#fff',
    date: 'March 2020 – September 2020',
    points: [
      'Built mobile apps with React Native, Express, and Socket.io.',
      'Worked with designers and PMs on patient-facing features.',
      'Delivered cross-platform releases on tight timelines.',
    ],
  },
];

export const BLACK_SP_MODEL_URL = '/models/black-sp.glb';
export const BLACK_SP_ANIMATION = 'mixamo.com';
export const BLACK_SP_ANIMATIONS = ['mixamo.com'] as const;

export type ShowcaseApp = {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  color: string;
  previewVideo: string;
};

export const showcaseApps: ShowcaseApp[] = [
  {
    title: 'Collect Car',
    subtitle: '3D automotive showcase',
    description:
      'Interactive car viewer with smooth WebGL animations and a responsive layout.',
    url: 'https://collect-car.vercel.app/',
    color: '#ff4a57',
    previewVideo: '/showcase/collect-car.mp4',
  },
  {
    title: 'Fizzi',
    subtitle: 'Scroll-driven 3D landing',
    description:
      'Beverage brand experience with scroll-linked camera moves and product reveals.',
    url: 'https://fizzi-clone.vercel.app/',
    color: '#6366f1',
    previewVideo: '/showcase/fizzi.mp4',
  },
];
