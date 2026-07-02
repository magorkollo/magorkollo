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
  hu: 'Szoftvermérnök, vezetői tapasztalattal a technológiai iparban és non-profit vezetésében. Jelenleg teljesítmény-kritikus rendszereken dolgozom befektetési bankoknak a FinTech iparágnak, de élénken érdeklődöm a mesterséges intelligencia, az autonóm rendszerek és a dróntechnológia iránt is. Szabadidőmben egy ifjúsági projektekkel foglalkozó civil szervezetet vezetek, és tanítom a következő generációkat robotikára, drónok használatára és a mesterséges intelligencia hatékony alkalmazására. Folyamatosan azon gondolkodom, hogyan tehetném jobbá a világot - és igyekszem a legjobbamat nyújtani, hogy ezen ötletek egy részét megvalósítsam. Így a szoftverfejlesztés mellett közösségeket és álmokat is próbálok építeni.',
  ro: 'Inginer software cu experiență de conducere în medii dinamice și cu impact ridicat, inclusiv în sectorul tehnologic și nonprofit. În prezent lucrez în high-frequency trading, concentrându-mă pe sisteme critice pentru performanță, dar am un interes puternic și pentru sistemele autonome, AI și tehnologia dronelor. În timpul liber, conduc un ONG implicat în proiecte pentru tineret și predau următoarei generații în domeniile STEM ca robotică sau drone. Reflectez constant la modul în care pot ajuta la transformarea lumii într-un loc mai bun - și fac tot posibilul să transform unele dintre aceste idei în realitate. Prin urmare, pe lângă dezvoltarea de software, încerc să construiesc comunități și visuri.',
}
