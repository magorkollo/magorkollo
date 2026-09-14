import type { Content } from '@/lib/data'

export interface ReliefData {
  title: Content
  lede: Content
  scrollHint: Content
  dragHint: Content
  legend: Content
  loading: Content
  note: Content
  credits: Content
}

export const RELIEF_STRINGS: ReliefData = {
  title: {
    en: 'The territory assigned to Romania, 1920',
    hu: 'A Romániához került terület, 1920',
    ro: 'Teritoriul atribuit României, 1920',
  },
  lede: {
    en: 'Transylvania, Partium, the Banat and southern Máramaros — the land assigned to Romania by the Treaty of Trianon, rendered as a physical relief.',
    hu: 'Erdély, a Partium, a Bánság és Dél-Máramaros – a trianoni békeszerződéssel Romániához került terület, fizikai domborműként megjelenítve.',
    ro: 'Transilvania, Crișana, Banatul și sudul Maramureșului — teritoriul atribuit României prin Tratatul de la Trianon, redat ca relief fizic.',
  },
  scrollHint: {
    en: 'Scroll to fly in',
    hu: 'Görgess a közelítéshez',
    ro: 'Derulează pentru apropiere',
  },
  dragHint: {
    en: 'Drag to turn it · arrow keys work too',
    hu: 'Húzd a forgatáshoz · a nyílbillentyűk is működnek',
    ro: 'Trage pentru a roti · merg și săgețile',
  },
  legend: {
    en: 'Elevation',
    hu: 'Magasság',
    ro: 'Altitudine',
  },
  loading: {
    en: 'Loading',
    hu: 'Betöltés',
    ro: 'Se încarcă',
  },
  note: {
    en: 'Boundary approximated by the 16 present-day Romanian counties, about 97% of the assigned area.',
    hu: 'A határ a mai 16 romániai megye alapján közelített, ez az átadott terület mintegy 97%-a.',
    ro: 'Limita este aproximată prin cele 16 județe actuale, circa 97% din suprafața atribuită.',
  },
  credits: {
    en: 'Elevation: AWS Terrain Tiles · Boundaries: Natural Earth · Path-traced in Python',
    hu: 'Domborzat: AWS Terrain Tiles · Határok: Natural Earth · Python útkövetéssel renderelve',
    ro: 'Relief: AWS Terrain Tiles · Limite: Natural Earth · Randat prin path tracing în Python',
  },
}
