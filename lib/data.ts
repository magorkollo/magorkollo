export type Content<T = string> = {
  en: T
  hu: T
  ro: T
}

export type SocialLink = {
  label: string
  link: string
}

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
  en: 'Software Engineer and Team Lead specializing in performance-critical, low-latency market connectivity systems for global exchanges. Proven track record of bridging high-frequency trading architectures with autonomous GenAI workflows to automate complex development lifecycles. Passionate about community building and STEM education, actively leading a youth-focused NGO to empower the next generation of leaders, creators, and community builders.',
  hu: 'Szoftvermérnök és csapatvezetőként dolgozom a FinTech szektorban, ahol befektetési bankok számára fejlesztek alacsony késleltetésű, teljesítménykritikus tőzsdei rendszereket. Emellett élénken foglalkoztatnak az autonóm technológiák, a drónok és a mesterséges intelligencia gyakorlati alkalmazásai. Szabadidőmben egy ifjúsági civil szervezetet vezetek: célom, hogy a fiataloknak átadjam a robotika, a dróntechnológia és a modern MI eszköztárát — így a szoftverfejlesztés mellett jövőbe mutató közösségeket is építek.',
  ro: 'Lucrez ca inginer software și team lead în sectorul FinTech, dezvoltând sisteme critice de înaltă performanță și latență redusă pentru bănci de investiții. În paralel, sunt pasionat de sistemele autonome, tehnologia dronelor și aplicațiile practice ale inteligenței artificiale. În timpul liber, conduc o organizație non-guvernamentală dedicată tinerilor: îmi doresc să inspir următoarea generație prin cursuri practice de robotică, drone și AI, construind nu doar cod de calitate, ci și comunități puternice.',
}

export const ABOUT: Content = {
  en: "I'm a Software Engineer and Team Lead working at the intersection of high-frequency trading, autonomous systems, and applied AI. By day, I build sub-microsecond market connectivity solutions for global exchanges and lead a team of engineers doing it well. Alongside that, I architect autonomous GenAI workflows — RAG pipelines, agentic tooling, and self-improving knowledge bases — that automate parts of the software development lifecycle itself.\n\nMy curiosity extends past trading floors into drones, robotics, and autonomous vehicles, fields I first explored during my Master's in Artificial Intelligence and an MBA focused on entrepreneurship. I like systems that have to work in the real world under real constraints, whether that's a market feed handler or a robot navigating a field.\n\nOutside of engineering, I lead a youth-focused NGO, the Transylvanian Youth Center, where I teach robotics, drones, and practical AI to the next generation and have helped deliver more than a dozen EU-funded youth projects. I studied and worked across Romania and Germany, and I speak Hungarian, Romanian, and English.",
  hu: 'Szoftvermérnök és csapatvezető vagyok, a nagyfrekvenciás kereskedés, az autonóm rendszerek és az alkalmazott mesterséges intelligencia metszéspontjában dolgozom. Napközben mikroszekundum alatti késleltetésű piaci kapcsolati rendszereket építek globális tőzsdéknek, és egy mérnökcsapatot vezetek ebben a munkában. Emellett autonóm GenAI munkafolyamatokat tervezek — RAG csővezetékeket, ügynök-alapú eszközöket és önfejlesztő tudásbázisokat —, amelyek a szoftverfejlesztési életciklus egyes részeit is automatizálják.\n\nÉrdeklődésem a kereskedési termeken túl a drónok, a robotika és az önvezető járművek felé is kiterjed, amelyekkel először a mesterséges intelligencia mesterképzésem és a vállalkozásfejlesztésre fókuszáló MBA-m során foglalkoztam mélyebben. Szeretem az olyan rendszereket, amelyeknek valós korlátok között, a valós világban kell működniük — legyen szó egy piaci adatfeldolgozóról vagy egy szántóföldön navigáló robotról.\n\nA mérnöki munkán túl egy ifjúsági civil szervezetet, az Erdélyi Ifjúsági Központot vezetem, ahol robotikát, drónokat és gyakorlati MI-t tanítok a következő generációnak, és eddig több mint tucatnyi EU-s finanszírozású ifjúsági projekt megvalósításában vettem részt. Romániában és Németországban tanultam és dolgoztam, és magyarul, románul és angolul beszélek.',
  ro: 'Sunt inginer software și team lead, lucrând la intersecția dintre tranzacționarea de înaltă frecvență, sistemele autonome și inteligența artificială aplicată. În timpul zilei construiesc soluții de conectivitate la piață cu latență sub-microsecundă pentru burse globale și conduc o echipă de ingineri în această muncă. Pe lângă asta, arhitectez fluxuri de lucru GenAI autonome — pipeline-uri RAG, unelte agentice și baze de cunoștințe auto-îmbunătățite — care automatizează părți din ciclul de viață al dezvoltării software.\n\nCuriozitatea mea se extinde dincolo de sălile de tranzacționare, spre drone, robotică și vehicule autonome, domenii pe care le-am explorat prima dată în timpul masterului meu în Inteligență Artificială și al unui MBA axat pe antreprenoriat. Îmi plac sistemele care trebuie să funcționeze în lumea reală, sub constrângeri reale, fie că vorbim despre un feed handler de piață sau un robot care navighează pe un câmp.\n\nÎn afara ingineriei, conduc o organizație non-guvernamentală dedicată tinerilor, Centrul de Tineret Transilvănean, unde predau robotică, drone și AI practic următoarei generații și am contribuit la peste zece proiecte de tineret finanțate de UE. Am studiat și am lucrat în România și Germania și vorbesc maghiară, română și engleză.',
}

export type LogItem = {
  marker: string
  text: Content
}

// Placeholder scaffolding for the "Some History" chapter (mirrors the
// chapter mldangelo.com/about uses) — replace each entry's `text` with an
// actual personal milestone once you have the real dates/details.
export const HISTORY: LogItem[] = [
  {
    marker: '19XX',
    text: {
      en: '[Add a personal milestone here — e.g. where you grew up, your first computer, or a formative early experience.]',
      hu: '[Adj hozzá egy személyes mérföldkövet — pl. hol nőttél fel, az első számítógéped, vagy egy meghatározó korai élmény.]',
      ro: '[Adaugă un moment personal important — de ex. unde ai crescut, primul tău calculator sau o experiență timpurie formatoare.]',
    },
  },
  {
    marker: '20XX',
    text: {
      en: '[Add another milestone — a defining project, a turning point, or something that shaped the direction you took.]',
      hu: '[Adj hozzá egy másik mérföldkövet — egy meghatározó projektet, fordulópontot, vagy valamit, ami alakította az utad.]',
      ro: '[Adaugă un alt moment important — un proiect definitoriu, un punct de cotitură sau ceva care ți-a modelat direcția.]',
    },
  },
]

// Placeholder scaffolding for "Travel / Geography".
export const TRAVEL: LogItem[] = [
  {
    marker: '[Place]',
    text: {
      en: '[Add where you lived, studied, or traveled, and a line about the experience.]',
      hu: '[Add meg, hol éltél, tanultál vagy jártál, és egy mondatot az élményről.]',
      ro: '[Adaugă unde ai locuit, ai studiat sau ai călătorit, și o propoziție despre experiență.]',
    },
  },
]

// Placeholder scaffolding for "I Like".
export const LIKES: Content[] = [
  {
    en: '[Add a hobby, activity, or interest you enjoy outside of work.]',
    hu: '[Adj hozzá egy hobbit, tevékenységet vagy érdeklődési kört, amit a munkán kívül szeretsz.]',
    ro: '[Adaugă un hobby, o activitate sau un interes de care te bucuri în afara muncii.]',
  },
  {
    en: '[Add another thing you like — a book, tool, game, or genre of music.]',
    hu: '[Adj hozzá még valamit, amit szeretsz — egy könyvet, eszközt, játékot vagy zenei stílust.]',
    ro: '[Adaugă un alt lucru care îți place — o carte, un instrument, un joc sau un gen muzical.]',
  },
]

// Placeholder scaffolding for "Fun Facts".
export const FUN_FACTS: Content[] = [
  {
    en: '[Add a fun, personal fact about yourself.]',
    hu: '[Adj hozzá egy vicces, személyes tényt magadról.]',
    ro: '[Adaugă un fapt amuzant și personal despre tine.]',
  },
  {
    en: '[Add another fun fact — something unexpected people would enjoy knowing.]',
    hu: '[Adj hozzá még egy vicces tényt — valamit, amit meglepő lenne mások számára megtudni.]',
    ro: '[Adaugă un alt fapt amuzant — ceva neașteptat pe care oamenii ar fi bucuroși să îl afle.]',
  },
]

// Placeholder scaffolding for "Websites from People I Admire". Left as plain
// text (not links) until real names/URLs are supplied — publishing a
// fabricated link would misattribute it to someone real.
export const ADMIRED_SITES: Content[] = [
  {
    en: '[Add a link to a person whose site or work you admire, and why.]',
    hu: '[Adj hozzá egy linket egy embertől, akinek az oldalát vagy munkáját csodálod, és hogy miért.]',
    ro: '[Adaugă un link către o persoană a cărei pagină sau muncă o admiri, și de ce.]',
  },
]

export const DREAMS: Content[] = [
  {
    en: 'Building AI systems that are both powerful and genuinely trustworthy.',
    hu: 'Olyan MI-rendszerek építése, amelyek egyszerre erősek és valóban megbízhatóak.',
    ro: 'Construirea unor sisteme AI care sunt deopotrivă puternice și cu adevărat demne de încredere.',
  },
  {
    en: 'A generation of young engineers who feel capable of building anything.',
    hu: 'Egy olyan fiatal mérnök-generáció, amely bármit képesnek érzi magát megépíteni.',
    ro: 'O generație de tineri ingineri care simt că pot construi orice.',
  },
  {
    en: 'Bridging low-latency engineering discipline with the messiness of real-world AI.',
    hu: 'Az alacsony késleltetésű mérnöki fegyelem összekapcsolása a valós MI rendezetlenségével.',
    ro: 'Îmbinarea disciplinei ingineriei de latență redusă cu dezordinea AI-ului din lumea reală.',
  },
  {
    en: 'Staying curious enough to keep switching fields every few years.',
    hu: 'Elég kíváncsinak maradni ahhoz, hogy néhány évente új területre váltsak.',
    ro: 'Să rămân suficient de curios încât să schimb domeniul la câțiva ani.',
  },
  {
    en: 'A Transylvanian tech and robotics scene that rivals any in Europe.',
    hu: 'Egy erdélyi tech- és robotikai közösség, amely bármelyik európaival felveheti a versenyt.',
    ro: 'O scenă tehnologică și de robotică transilvăneană care rivalizează cu oricare din Europa.',
  },
]

export const UI_STRINGS = {
  common: {
    explore: {
      en: 'Explore',
      hu: 'Felfedezés',
      ro: 'Explorează',
    },
    connect: {
      en: 'Connect',
      hu: 'Kapcsolat',
      ro: 'Conectare',
    },
    summary: {
      en: 'Summary',
      hu: 'Összegzés',
      ro: 'Rezumat',
    },
    workExperience: {
      en: 'Work Experience',
      hu: 'Munkatapasztalat',
      ro: 'Experiență profesională',
    },
    volunteering: {
      en: 'Volunteering',
      hu: 'Önkéntesség',
      ro: 'Voluntariat',
    },
    education: {
      en: 'Education',
      hu: 'Tanulmányok',
      ro: 'Educație',
    },
    additionalInfo: {
      en: 'Additional Information',
      hu: 'További információk',
      ro: 'Informații adiționale',
    },
    projects: {
      en: 'Projects',
      hu: 'Projektek',
      ro: 'Proiecte',
    },
    downloadCV: {
      en: 'Download CV',
      hu: 'CV letöltése',
      ro: 'Descarcă CV-ul',
    },
  },
  home: {
    latestWriting: {
      en: 'Latest Writing',
      hu: 'Legutóbbi írások',
      ro: 'Ultimele articole',
    },
    viewAll: {
      en: 'View all',
      hu: 'Összes megtekintése',
      ro: 'Vezi toate',
    },
  },
  writing: {
    onThisSite: {
      en: 'Writings on this site',
      hu: 'Írások ezen az oldalon',
      ro: 'Articole pe acest site',
    },
    elsewhere: {
      en: 'Selected information elsewhere',
      hu: 'Válogatás máshonnan',
      ro: 'Selecție din alte surse',
    },
  },
} as const
