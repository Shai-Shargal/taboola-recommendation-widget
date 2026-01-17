import { RecommendationItem } from '../types/recommendation';


export function createDemoRecommendation(): RecommendationItem {
  return {
    type: 'article',
    thumbnail: [{
      url: 'https://res.cloudinary.com/deok6xibc/image/upload/f_auto,q_auto,w_900,c_fill,g_face/v1768664210/MySelf_eenq2b.jpg'
    }],
    description: 'Unofficial demo ad 😄 Built with React + real Taboola API data.',
    name: 'Breaking: Shai got hired at Taboola 🎉',
    created: new Date().toISOString(),
    branding: 'Shai • Demo',
    duration: '0',
    views: '0',
    categories: [],
    id: 'demo-shai',
    origin: 'sponsored',
    url: 'https://www.taboola.com/'
  };
}
