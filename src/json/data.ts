import AssetIntelImage from '../assets/images/PavementAI.png';
import MedfixImage from '../assets/images/Medfix.png';
import MernChatImage from '../assets/images/MernChat.png';
import MyHealthImage from '../assets/images/MyHealth.png';
import LegaltekImage from '../assets/images/Legaltek.png';
import XukiniImage from '../assets/images/Xukini.png';
import MetaverseImage from '../assets/images/Metaverse.png';
import UphomeImage from '../assets/images/Uphome.png';
import BoxmindImage from '../assets/images/Boxmind.png';
import WishbuxImage from '../assets/images/Wishbux.png';
import MelaniesPortfolioImage from '../assets/images/MelaniePortfolio.png';
import FoodDeliveryAppImage from '../assets/images/Food Delivery.png';
import NewsAppImage from '../assets/images/News App.png';
import GPTArticlesImage from '../assets/images/GPTArticles.png';
import CodeRedImage from '../assets/images/CodeRed.png';

import {
    css,
    reactjs,
    typescript,
    javascript,
    tailwind,
    redux,
    mongodb,
    html,
    git,
    docker,
    figma,
    nodejs,
    threejs,
    CityScanLogo,
    InevexSolutionsLogo,
    MedfixLogo,
    IHealthscreenLogo
} from '../assets';

export const stacks = [
    {
        icon: 'react',
        title: 'React',
        description:
            'I use React to build dynamic and responsive user interfaces that are easy to maintain and update, with a focus on performance and accessibility.'
    },
    {
        icon: 'typescript',
        title: 'Typescript',
        description:
            'I use Typescript to write more robust and maintainable code, with fewer bugs and clearer documentation.'
    },
    {
        icon: 'node',
        title: 'Node JS',
        description:
            'I use Node to build scalable and high-performance server-side applications that can handle large amounts of data and traffic.'
    },
    {
        icon: 'express',
        title: 'Express',
        description: `I use Express to build fast and scalable web applications, with a flexible and modular architecture that allows me to customize my projects to my clients' needs.`
    },
    {
        icon: 'next',
        title: 'Next JS',
        description:
            'I use Next to build server-rendered React applications that can be optimized for search engines and provide a better user experience, with faster page load times and smoother navigation.'
    },
    {
        icon: 'vue',
        title: 'Vue',
        description:
            'I use Vue to build modern and intuitive user interfaces that are easy to customize and integrate with other tools and frameworks.'
    }
];

export const projects = [
    {
        image: CodeRedImage,
        title: `Code Red`,
        github: 'https://github.com/Waheed4719/Code-Red',
        description:
            'A problem solving platform for developers to share their solutions and learn from others.',
        technologies: ['Next JS', 'TailwindCSS', 'Firebase', 'CodeMirror'],
        link: 'https://code-red-one.vercel.app/'
    },
    {
        image: AssetIntelImage,
        title: 'Asset Intel',
        github: '',
        description:
            'A Web application for monitoring and reporting pavement defects using interactive maps and search/filter functionality, with machine learning-powered crack detection.',
        technologies: ['AWS', 'React TS', 'Python', 'Maps'],
        link: 'http://cityscan-roadeye-app-stage.s3-website-us-west-2.amazonaws.com/performance-monitoring/road/pavement/performance-map'
    },
    {
        image: MyHealthImage,
        title: 'My Health App',
        github: '',
        description:
            'A mobile application for virtual doctor consultations with video, audio, calendar, Google Maps integration, and patient report generation',
        technologies: ['React Native', 'SocketIo', 'ExpressJS', 'MongoDB'],
        link: 'https://play.google.com/store/apps/details?id=com.ihs.myhealth'
    },
    {
        image: MedfixImage,
        title: 'Medfix Healthcare',
        github: '',
        description:
            'A SaaS web application for virtual doctor consultations with video, audio, calendar, blogs, Google Maps and Stripe Connect integration.',
        technologies: ['React', 'Socket.io', 'MongoDB', 'ExpressJS'],
        link: 'https://test.medfixhealth.com'
    },
    {
        image: FoodDeliveryAppImage,
        title: 'Food Delivery App',
        github: 'https://github.com/Waheed4719/Food-delivery-App',
        description:
            'A mobile application for ordering food from restaurants, with features such as online ordering, payment processing, and delivery tracking. (In Progress)',
        technologies: ['React Native', 'SocketIo', 'ExpressJS', 'MongoDB'],
        link: ''
    },
    {
        image: NewsAppImage,
        title: 'News App',
        github: 'https://github.com/Waheed4719/News-App',
        description:
            'A mobile application for reading news from different sources, with features such as search, bookmarking, and sharing. (In Progress)',
        technologies: ['Android', 'Java', 'NewsAPI', 'Retrofit'],
        link: ''
    },
    {
        image: LegaltekImage,
        title: 'Legaltek',
        github: '',
        description:
            'A SaaS web application for virtual lawyer consultations, lawfirm management, and client communication, with video, audio, calendar and Google Maps integration, catering to the needs of 3 types of users: clients, lawyers, and lawfirm',
        technologies: ['React', 'Socket.io', 'MongoDB', 'ExpressJS'],
        link: ''
    },
    {
        image: XukiniImage,
        title: 'Xukini',
        github: '',
        description:
            'A SaaS web application for creating and managing food businesses, learning and teaching food-related lessons, and hiring professional chefs, with features such as online ordering, calendar integration, payment processing, etc',
        technologies: ['React', 'Socket.io', 'MongoDB', 'ExpressJS'],
        link: ''
    },
    {
        image: MernChatImage,
        title: 'Mern Chat App',
        github: 'https://github.com/Waheed4719/Mern-Chat-App',
        description:
            'A Web application for real time chat and media sharing using Neophormic design.',
        technologies: ['React', 'SocketIo', 'ExpressJS', 'MongoDB'],
        link: 'https://mern-chat-app-dilc.onrender.com'
    },
    {
        image: UphomeImage,
        title: 'Uphome',
        github: 'https://github.com/Waheed4719/UpHome',
        description:
            'A web application is a professional platform for searching rental properties in different locations. Users can apply filters like price, number of bedrooms, and furniture to refine their search results.',
        technologies: ['React', 'TailwindCSS'],
        link: 'https://uphome.vercel.app/'
    },
    {
        image: MetaverseImage,
        title: 'Metaverse Page',
        github: 'https://github.com/Waheed4719/Metaverse',
        description:
            'A Single page design for metaverse with smooth animations, responsiveness and day/night toggle.',
        technologies: ['React', 'Next JS', 'Framer Motion'],
        link: 'https://metaverse-six-sigma.vercel.app/'
    },
    {
        image: BoxmindImage,
        title: 'Boxmind',
        github: 'https://github.com/Waheed4719/Boxmind',
        description: 'A Single page design with grid layout, responsiveness and day/night toggle.',
        technologies: ['React', 'Next JS', 'TailwindCSS'],
        link: 'https://boxmind.vercel.app/'
    },
    {
        image: WishbuxImage,
        title: 'Wishbux',
        github: 'https://github.com/Waheed4719/Wishbux',
        description: 'A Landing page design with beautiful animations and responsiveness.',
        technologies: ['React', 'TailwindCSS', 'Framer Motion'],
        link: 'https://wishbux.vercel.app/'
    },
    {
        image: GPTArticlesImage,
        title: 'GPT Articles',
        github: '',
        description:
            'A web application for generating literature review based on multiple uploaded articles using GPT-3.',
        technologies: ['Next JS', 'TailwindCSS', 'Framer Motion'],
        link: 'https://gpt-articles.vercel.app/'
    },
    {
        image: MelaniesPortfolioImage,
        title: `Melanie's Portfolio`,
        github: '',
        description: 'A simple portfolio design with smooth animations and responsiveness.',
        technologies: ['React', 'TailwindCSS', 'Framer Motion'],
        link: 'https://melanie-portfolio-nu.vercel.app/'
    }
];
export const services = [
    {
        icon: 'globe',
        title: 'Website Development',
        description: `I specialize in developing custom websites that meet my clients' specific needs, with a focus on usability, accessibility, and performance.`
    },
    {
        icon: 'design',
        title: 'Website Design',
        description:
            ' I offer design services that help my clients create a unique and engaging online presence, with a modern and user-friendly interface.'
    },
    {
        icon: 'express',
        title: 'API Creation',
        description:
            'I can help my clients build scalable and secure APIs that enable them to integrate with other systems and services, with a focus on documentation and testing.'
    },
    {
        icon: 'chart',
        title: 'Performance Optimization',
        description:
            'I can help my clients optimize their websites and applications for speed and performance, using a variety of techniques such as caching, compression, and minification.'
    },
    {
        icon: 'bug',
        title: 'Bug Fixing',
        description:
            ' I offer debugging and troubleshooting services that help my clients identify and fix issues in their code, with a focus on efficiency and quality assurance.'
    }
];

export const technologies = [
    {
        name: 'HTML 5',
        icon: html
    },
    {
        name: 'CSS 3',
        icon: css
    },
    {
        name: 'JavaScript',
        icon: javascript
    },
    {
        name: 'TypeScript',
        icon: typescript
    },
    {
        name: 'React JS',
        icon: reactjs
    },
    {
        name: 'Redux Toolkit',
        icon: redux
    },
    {
        name: 'Tailwind CSS',
        icon: tailwind
    },
    {
        name: 'Node JS',
        icon: nodejs
    },
    {
        name: 'MongoDB',
        icon: mongodb
    },
    {
        name: 'Three JS',
        icon: threejs
    },
    {
        name: 'git',
        icon: git
    },
    {
        name: 'figma',
        icon: figma
    },
    {
        name: 'docker',
        icon: docker
    }
];

export const experiences = [
    {
        title: 'React.js Developer',
        company_name: 'Medfix Healthcare',
        icon: MedfixLogo,
        iconBg: '#fff',
        date: 'March 2020 - June 2021',
        points: [
            'Developing and maintaining a web application using React.js and other related technologies.',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Participating in code reviews and providing constructive feedback to other developers.'
        ]
    },
    {
        title: 'Full Stack Developer',
        company_name: 'IHealthScreen',
        icon: IHealthscreenLogo,
        iconBg: '#fff',
        date: 'March 2020 - September 2020',
        points: [
            'Developing and maintaining mobile applications using React Native, Express JS, Socket.IO and other related technologies.',
            'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
            'Participating in code reviews and providing constructive feedback to other developers.'
        ]
    },
    {
        title: 'Full Stack Developer',
        company_name: 'Inevex Solutions',
        icon: InevexSolutionsLogo,
        iconBg: '#ffffff',
        date: 'October 2020 - June 2022',
        points: [
            'Designing and Developing web applications using React.js, Next.js, Express and other related technologies.',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Participating in code reviews and providing constructive feedback to other developers.'
        ]
    },
    {
        title: 'Front end Developer',
        company_name: 'CityScan Technologies',
        icon: CityScanLogo,
        iconBg: '#E6DEDD',
        date: 'June 2022 - Present',
        points: [
            'Designing and Developing an in-house web application using React.js, Material UI and other related technologies.',
            'Collaborating with backend developers to integrate APIs and improve user experience.',
            'Participating in code reviews and providing constructive feedback to other developers.'
        ]
    }
];

export type HeaderItemType = {
    name: string;
    link: string;
};
export const headerItems: HeaderItemType[] = [
    // { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Services', link: '#services' },
    { name: 'Stack', link: '#stack' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' }
];
