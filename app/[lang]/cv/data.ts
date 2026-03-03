export type Content<T = string> = {
  en: T
  hu: T
  ro: T
}

type Project = {
  name: string
  description: Content
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: Content
  description: Content
  start: string
  end: string
  link: string
  id: string
}

type Education = {
  institution: string
  degree: Content
  start: string
  end: string
  description?: Content
  id: string
}

type AdditionalInfo = {
  title: Content
  items: Content[]
  id: string
}

type BlogPost = {
  title: Content
  description: Content
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = []

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Broadridge Trading and Connectivity Solutions | Tbricks',
    title: {
      en: 'C++ Software Engineer, Team Lead',
      hu: 'C++ szoftvermérnök, csapatvezető',
      ro: 'Inginer Software C++, Team Lead',
    },
    description: {
      en: 'Leading a team of software developers in delivering high-quality, low-latency market connectivity solutions for EMEA and AMER exchanges in Tbricks. Providing technical guidance and mentorship, fostering a culture of continuous improvement.',
      hu: 'Szoftverfejlesztő csapat vezetése kiváló minőségű, alacsony késleltetésű piaci kapcsolati megoldások szállításában EMEA és AMER tőzsdék számára a Tbricks-ben. Technikai útmutatás és mentorálás biztosítása, a folyamatos fejlődés kultúrájának előmozdítása.',
      ro: 'Conducerea unei echipe de dezvoltatori software în livrarea de soluții de conectivitate la piață de înaltă calitate și latență scăzută pentru bursele EMEA și AMER în Tbricks. Oferirea de îndrumare tehnică și mentorat, promovând o cultură a îmbunătățirii continue.',
    },
    start: 'Dec 2022',
    end: 'Present',
    link: 'https://www.broadridge.com',
    id: 'work1',
  },
  {
    company: 'Accenture Industry X.',
    title: {
      en: 'Software Engineer Analyst',
      hu: 'Szoftvermérnök elemző',
      ro: 'Analist Inginer Software',
    },
    description: {
      en: 'Development of autonomously driven vehicles (Apollo, C++, Python, Cyber RT, CAD 3D) and driver monitoring systems for safety. Embedded automotive development for ESRLabs München.',
      hu: 'Autonóm járművek (Apollo, C++, Python, Cyber RT, CAD 3D) és biztonsági járművezető-megfigyelő rendszerek fejlesztése. Beágyazott autóipari fejlesztés az ESRLabs München számára.',
      ro: 'Dezvoltarea de vehicule autonome (Apollo, C++, Python, Cyber RT, CAD 3D) și sisteme de monitorizare a șoferului pentru siguranță. Dezvoltare automotive embedded pentru ESRLabs München.',
    },
    start: 'July 2021',
    end: 'Dec 2022',
    link: 'https://www.accenture.com',
    id: 'work2',
  },
  {
    company: 'Bosch Romania',
    title: {
      en: 'Working Student',
      hu: 'Gyakornok szoftverfejlesztő',
      ro: 'Student practicant',
    },
    description: {
      en: 'Modelling and simulation of a Segway. Stabilization and control of the system using LQR and PID control strategies using Matlab, Simulink and Python.',
      hu: 'Egy Segway modellezése és szimulációja. A rendszer stabilizálása és vezérlése LQR és PID szabályozási stratégiákkal Matlab, Simulink és Python segítségével.',
      ro: 'Modelarea și simularea unui Segway. Stabilizarea și controlul sistemului folosind strategii de control LQR și PID utilizând Matlab, Simulink și Python.',
    },
    start: 'Oct 2020',
    end: 'June 2021',
    link: 'https://www.bosch.ro',
    id: 'work3',
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
    institution: 'Babes-Bolyai University',
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
    institution: 'Ludwig-Maximilians-Universität München',
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
    institution: 'Technical University of Cluj-Napoca',
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
      { en: 'C++', hu: 'C++', ro: 'C++' },
      { en: 'Python', hu: 'Python', ro: 'Python' },
      { en: 'Git', hu: 'Git', ro: 'Git' },
      { en: 'Java', hu: 'Java', ro: 'Java' },
      { en: 'Flask', hu: 'Flask', ro: 'Flask' },
      { en: 'FastAPI', hu: 'FastAPI', ro: 'FastAPI' },
      {
        en: 'Embedded Systems (Raspberry Pi, Jetson, Automotive Ethernet)',
        hu: 'Beágyazott rendszerek (Raspberry Pi, Jetson, Automotive Ethernet)',
        ro: 'Sisteme embedded (Raspberry Pi, Jetson, Automotive Ethernet)',
      },
      {
        en: 'CAD Knowledge (Design & 3D Printing)',
        hu: 'CAD ismeretek (Tervezés és 3D nyomtatás)',
        ro: 'Cunoștințe CAD (Design și imprimare 3D)',
      },
      {
        en: 'Computer Vision',
        hu: 'Számítógépes látás',
        ro: 'Computer Vision',
      },
      { en: 'Machine Learning', hu: 'Gépi tanulás', ro: 'Machine Learning' },
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
        en: 'Organizational and Management Skills (leading Transylvanian Youth Center NGO)',
        hu: 'Szervezési és vezetési készségek (Erdélyi Ifjúsági Központ civil szervezet vezetése)',
        ro: 'Abilități de organizare și management (conducerea ONG-ului Centrul de Tineret Transilvănean)',
      },
      {
        en: 'Leadership (Canadian Rákóczi Foundation)',
        hu: 'Vezetői készségek (Kanadai Rákóczi Alapítvány)',
        ro: 'Leadership (Fundația Rákóczi din Canada)',
      },
      { en: 'Public Speaking', hu: 'Nyilvános beszéd', ro: 'Public Speaking' },
      { en: 'Mentorship', hu: 'Mentorálás', ro: 'Mentorat' },
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
      en: 'Volunteering',
      hu: 'Önkéntesség',
      ro: 'Voluntariat',
    },
    items: [
      {
        en: 'Vice-president @ Transylvanian Youth Center',
        hu: 'Alelnök @ Erdélyi Ifjúsági Központ',
        ro: 'Vicepreședinte @ Centrul de Tineret Transilvănean',
      },
      {
        en: 'STEM teacher @ Mathias Corvinus Collegium',
        hu: 'STEM tanár @ Mathias Corvinus Collegium',
        ro: 'Profesor STEM @ Mathias Corvinus Collegium',
      },
    ],
    id: 'info4',
  },
]

export const BLOG_POSTS: BlogPost[] = []

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/magorkollo',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/magorkollo',
  },
]

export const EMAIL = 'magorors_kollo@yahoo.com'

export const SUMMARY: Content = {
  en: 'Software Engineer with leadership experience in fast-paced, high-impact environments across both technology and nonprofit sectors. Currently working in high-frequency trading, with a focus on performance-critical systems, while maintaining strong interests in autonomous systems, AI, and drone technology. Outside of work, I lead a youth-focused NGO and teach STEM to youngsters.',
  hu: 'Szoftvermérnök vezetői tapasztalattal pörgős, nagy hatású környezetekben, mind a technológiai, mind a non-profit szektorban. Jelenleg nagyfrekvenciás kereskedésben dolgozom, a teljesítmény-kritikus rendszerekre összpontosítva, miközben továbbra is élénken érdeklődöm az autonóm rendszerek, az MI és a dróntechnológia iránt. A munka mellett egy ifjúsági civil szervezetet vezetek, és STEM-et tanítok fiataloknak.',
  ro: 'Inginer software cu experiență de conducere în medii dinamice și cu impact ridicat, atât în sectorul tehnologic, cât și în cel nonprofit. În prezent lucrez în tranzacționarea de înaltă frecvență, concentrându-mă pe sisteme critice pentru performanță, menținând în același timp interese puternice pentru sistemele autonome, AI și tehnologia dronelor. În afara muncii, conduc un ONG axat pe tineret și predau STEM tinerilor.',
}
