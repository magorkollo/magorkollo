import type { Content, SocialLink } from '@/lib/data'
export { SOCIAL_LINKS, EMAIL, SUMMARY } from '@/lib/data'
export type { Content, SocialLink }

export type WorkExperience = {
  company: string
  title: Content
  description: Content
  start: string
  end: string
  link: string
  id: string
  tags?: string[]
}

export type Education = {
  institution: string
  degree: Content
  start: string
  end: string
  description?: Content
  id: string
}

export type AdditionalInfo = {
  title: Content
  items: Content[]
  id: string
}

export type Project = {
  name: string
  description: Content
  link: string
  image: string
  id: string
}

// Dates/description/tags are optional — some entries here are placeholders
// pending real details, and the resume/about renderers skip whatever isn't
// provided rather than showing a fake date range or description.
export type Volunteering = {
  company: string
  title: Content
  description?: Content
  start?: string
  end?: string
  id: string
  tags?: string[]
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Broadridge Trading and Connectivity Solutions | Tbricks',
    title: {
      en: 'C++ Software Engineer, Team Lead',
      hu: 'C++ szoftvermérnök, csapatvezető',
      ro: 'Inginer Software C++, Team Lead',
    },
    description: {
      en: 'Leading a team of 7 talented software developers in delivering high-quality, low-latency market connectivity solutions for EMEA and AMER exchanges in Tbricks. Providing technical guidance and mentorship, fostering a culture of continuous improvement while collaborating with cross-functional teams to design and implement new features. Engineered low latency (sub-microsecond) market connectivity solutions for diverse global exchanges (ICE, B3, CME, Euronext, Nasdaq, DRFQ), with expertise in FIX, ITCH, and SBE protocols. Architected an autonomous GenAI workflow (Python, LangGraph, Docker) utilizing RAG and Model Context Protocol (MCP) to bridge project management and development lifecycles. Engineered self-improving knowledge bases and autonomous spec evaluators that analyze new requirements, verify the need for codebase modifications, and automatically generate and commit code for scoped tasks, saving dozens of working hours / week.',
      hu: 'Szoftverfejlesztő csapat vezetése kiváló minőségű, alacsony késleltetésű piaci kapcsolati megoldások szállításában EMEA és AMER tőzsdék számára a Tbricks-ben. Technikai útmutatás és mentorálás biztosítása, a folyamatos fejlődés kultúrájának előmozdítása.',
      ro: 'Conducerea unei echipe de dezvoltatori software în livrarea de soluții de conectivitate la piață de înaltă calitate și latență scăzută pentru bursele EMEA și AMER în Tbricks. Oferirea de îndrumare tehnică și mentorat, promovând o cultură a îmbunătățirii continue.',
    },
    start: 'Dec 2022',
    end: 'Present',
    link: 'https://www.broadridge.com',
    id: 'work1',
    tags: [
      'C++',
      'Low-Latency',
      'FIX/ITCH/SBE',
      'GenAI',
      'LangGraph',
      'Team Leadership',
    ],
  },
  {
    company: 'Accenture Industry X.',
    title: {
      en: 'Software Engineer Analyst',
      hu: 'Szoftvermérnök elemző',
      ro: 'Analist Inginer Software',
    },
    description: {
      en: 'Development of autonomously driven vehicles (Apollo, C++, Python, Cyber RT, CAD 3D). Development of a driver monitoring system for safety (C++ Computer Vision), a Rubik Cube solver robotic arm and a digital twin. Embedded automotive development for ESRLabs München.',
      hu: 'Autonóm járművek (Apollo, C++, Python, Cyber RT, CAD 3D) és biztonsági járművezető-megfigyelő rendszerek fejlesztése. Beágyazott autóipari fejlesztés az ESRLabs München számára.',
      ro: 'Dezvoltarea de vehicule autonome (Apollo, C++, Python, Cyber RT, CAD 3D) și sisteme de monitorizare a șoferului pentru siguranță. Dezvoltare automotive embedded pentru ESRLabs München.',
    },
    start: 'July 2021',
    end: 'Dec 2022',
    link: 'https://www.accenture.com',
    id: 'work2',
    tags: [
      'C++',
      'Python',
      'Autonomous Vehicles',
      'Computer Vision',
      'Robotics',
    ],
  },
  {
    company: 'Bosch Romania',
    title: {
      en: 'Working Student',
      hu: 'Gyakornok szoftverfejlesztő',
      ro: 'Student practicant',
    },
    description: {
      en: 'Modelling and simulation of a Segway. Stabilization and control of the system using LQR and PID control strategies. Using Matlab, Simulink and Python to model and create 2D simulations.',
      hu: 'Egy Segway modellezése és szimulációja. A rendszer stabilizálása és vezérlése LQR és PID szabályozási stratégiákkal Matlab, Simulink és Python segítségével.',
      ro: 'Modelarea și simularea unui Segway. Stabilizarea și controlul sistemului folosind strategii de control LQR și PID utilizând Matlab, Simulink și Python.',
    },
    start: 'Oct 2020',
    end: 'June 2021',
    link: 'https://www.bosch.ro',
    id: 'work3',
    tags: ['Matlab', 'Simulink', 'Python', 'Control Systems', 'LQR'],
  },
]

export const EDUCATION: Education[] = [
  {
    institution: 'Technical University of Cluj-Napoca',
    degree: {
      en: "Master's in Artificial Intelligence",
      hu: 'Mesterséges Intelligencia Mesterképzés',
      ro: 'Master în Inteligență Artificială',
    },
    start: 'Oct 2022',
    end: 'Present',
    id: 'edu1',
  },
  {
    institution:
      'Babes-Bolyai University | Faculty of Economics and Business Administration',
    degree: {
      en: "Master's in Business Administration and Entrepreneurship",
      hu: 'Vállalatvezetés és Vállalkozástan Mesterképzés',
      ro: 'Master în Administrarea Afacerilor și Antreprenoriat',
    },
    start: 'Oct 2022',
    end: 'July 2024',
    description: {
      en: 'GPA: 9.63. Final exam: 10.00. Thesis on "From Perception to Practice: Drone Technology in Romanian Agriculture"',
      hu: 'Átlag: 9.63. Államvizsga: 10.00. Szakdolgozat: "Az észleléstől a gyakorlatig: Dróntechnológia a romániai mezőgazdaságban"',
      ro: 'Media: 9.63. Examen final: 10.00. Teză despre "De la percepție la practică: Tehnologia dronelor în agricultura românească"',
    },
    id: 'edu2',
  },
  {
    institution:
      'Ludwig-Maximilians-Universität München | Faculty of Economics and Business Administration',
    degree: {
      en: 'Erasmus+ Exchange Student',
      hu: 'Erasmus+ cserediák',
      ro: 'Student de schimb Erasmus+',
    },
    start: 'Sept 2023',
    end: 'March 2024',
    id: 'edu_erasmus',
  },
  {
    institution:
      'Technical University of Cluj-Napoca | Faculty of Automation and Computer Science',
    degree: {
      en: "Bachelor's in System & Software Engineering",
      hu: 'Rendszer- és Szoftvermérnöki Alapképzés',
      ro: 'Licență în Ingineria Sistemelor și Software',
    },
    start: 'Oct 2018',
    end: 'July 2022',
    description: {
      en: 'GPA: 9.41. Final exam: 10.00. Thesis on "Autonomous Harvesting Robot with an Embedded GPU based Approach"',
      hu: 'Átlag: 9.41. Államvizsga: 10.00. Szakdolgozat: "Autonóm betakarító robot beágyazott GPU alapú megközelítéssel"',
      ro: 'Media: 9.41. Examen final: 10.00. Teză despre "Robot de recoltare autonom cu o abordare bazată pe GPU embedded"',
    },
    id: 'edu3',
  },
]

export const ADDITIONAL_INFO: AdditionalInfo[] = [
  {
    title: {
      en: 'Technical Skills',
      hu: 'Technikai készségek',
      ro: 'Abilități tehnice',
    },
    items: [
      {
        en: 'Software Development: C++, Python, Java, Git, Docker, Flask, FastAPI, Node.js, Svelte',
        hu: 'Szoftverfejlesztés: C++, Python, Java, Git, Docker, Flask, FastAPI, Node.js, Svelte',
        ro: 'Software Development: C++, Python, Java, Git, Docker, Flask, FastAPI, Node.js, Svelte',
      },
      {
        en: 'AI & Autonomous Systems: GenAI / LLMs, LangGraph, Model Context Protocol (MCP), RAG, Computer Vision, Machine Learning',
        hu: 'MI és autonóm rendszerek: GenAI / LLM-ek, LangGraph, Model Context Protocol (MCP), RAG, számítógépes látás, gépi tanulás',
        ro: 'AI și sisteme autonome: GenAI / LLM-uri, LangGraph, Model Context Protocol (MCP), RAG, Computer Vision, Machine Learning',
      },
      {
        en: 'Embedded & Prototyping: Raspberry Pi, Nvidia Jetson, Automotive Ethernet, CAD Design & 3D Printing, Drones',
        hu: 'Beágyazott rendszerek és prototípuskészítés: Raspberry Pi, Nvidia Jetson, Automotive Ethernet, CAD tervezés és 3D nyomtatás, Drónok',
        ro: 'Embedded și prototipare: Raspberry Pi, Nvidia Jetson, Automotive Ethernet, CAD Design și imprimare 3D, Drone',
      },
    ],
    id: 'info1',
  },
  {
    title: {
      en: 'Soft Skills',
      hu: 'Személyes készségek',
      ro: 'Soft Skills',
    },
    items: [
      {
        en: 'Management & Leadership: Engineering Team Lead, Executive NGO Leadership (Transylvanian Youth Center NGO, delivered 10+ EU-funded youth projects), Canadian Rákóczi Foundation',
        hu: 'Vezetési készségek: Mérnök csapatvezető, vezetői NGO tapasztalat (Erdélyi Ifjúsági Központ, 10+ EU-s ifjúsági projekt), Kanadai Rákóczi Alapítvány',
        ro: 'Management și leadership: Team Lead Inginerie, Conducere ONG (Centrul de Tineret Transilvănean, 10+ proiecte de tineret finanțate de UE), Fundația Rákóczi Canada',
      },
      {
        en: 'Communication & Mentorship: Technical Conference Speaker, Panel Moderator, STEM Educator (youth mentoring)',
        hu: 'Kommunikáció és mentorálás: Műszaki konferencia előadó, panel moderátor, STEM oktató (fiatalok mentorálása)',
        ro: 'Comunicare și mentorat: Vorbitor conferințe tehnice, moderator panel, educator STEM (mentorat tineret)',
      },
    ],
    id: 'info2',
  },
  {
    title: {
      en: 'Languages',
      hu: 'Nyelvek',
      ro: 'Limbi străine',
    },
    items: [
      { en: 'English', hu: 'Angol', ro: 'Engleză' },
      { en: 'Hungarian', hu: 'Magyar', ro: 'Maghiară' },
      { en: 'Romanian', hu: 'Román', ro: 'Română' },
    ],
    id: 'info3',
  },
  {
    title: {
      en: 'Conferences',
      hu: 'Konferenciák',
      ro: 'Conferințe',
    },
    items: [
      {
        en: 'Computer Science Student Conference, 2022, Cluj-Napoca — 1st prize: "From Perception to Practice: Drone Technology in Romanian Agriculture"',
        hu: 'Computer Science Student Conference, 2022, Kolozsvár — 1. díj: "Az észleléstől a gyakorlatig: Dróntechnológia a romániai mezőgazdaságban"',
        ro: 'Computer Science Student Conference, 2022, Cluj-Napoca — locul 1: "De la percepție la practică: Tehnologia dronelor în agricultura românească"',
      },
      {
        en: 'Speaker at events: MCC, DeepDive, Vibe, KMK Talks',
        hu: 'Előadó rendezvényeken: MCC, DeepDive, Vibe, KMK Talks',
        ro: 'Vorbitor la evenimente: MCC, DeepDive, Vibe, KMK Talks',
      },
    ],
    id: 'info4',
  },
]

// Placeholder entries — company/role are real, dates/description/tags to
// follow. Renderers on both the resume and about pages skip whatever's
// missing rather than showing a fake date range.
export const VOLUNTEERING: Volunteering[] = [
  {
    company: 'Transylvanian Youth Center',
    title: {
      en: 'Vice President',
      hu: 'Alelnök',
      ro: 'Vicepreședinte',
    },
    id: 'vol1',
  },
  {
    company: 'Mathias Corvinus Collegium',
    title: {
      en: 'STEM Educator',
      hu: 'STEM oktató',
      ro: 'Educator STEM',
    },
    id: 'vol2',
  },
  {
    company: 'Canadian Rákóczi Foundation',
    title: {
      en: 'Regional Coordinator / Team Lead',
      hu: 'Regionális koordinátor / csapatvezető',
      ro: 'Coordonator regional / Team Lead',
    },
    id: 'vol3',
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'Autonomous Robot',
    description: {
      en: 'An autonomous mobile robot platform developed for navigation and mapping in complex environments.',
      hu: 'Autonóm mobil robot platform, amelyet összetett környezetben való navigációra és térképezésre fejlesztettek ki.',
      ro: 'O platformă robotizată mobilă autonomă dezvoltată pentru navigare și cartografiere în medii complexe.',
    },
    link: 'https://github.com/magorkollo/autonomous_robot',
    image: '/waffle_parts.png',
    id: 'project1',
  },
  {
    name: 'SkillBoosters',
    description: {
      en: 'A comprehensive educational program designed to boost technical skills and foster innovation among young people.',
      hu: 'Átfogó oktatási program, amelynek célja a technikai készségek fejlesztése és az innováció ösztönzése a fiatalok körében.',
      ro: 'Un program educațional cuprinzător conceput pentru a spori abilitățile tehnice și a promova inovația în rândul tinerilor.',
    },
    link: 'https://www.youthcenter.ro/en/skillboosters/details/',
    image: '/skillboosters-main.jpg',
    id: 'project2',
  },
]
