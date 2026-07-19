import { Destination, Hotel } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: "ella",
    title: "Ella, Sri Lanka",
    tagline: "A peaceful escape among the hills and waterfalls",
    description: "Ella is a peaceful hill town surrounded by green mountains, waterfalls, and tea plantations. It is one of the most relaxing and scenic travel destinations in Sri Lanka.",
    coverImage: "./src/assets/images/ella.gif",
    thumbnail: "./src/assets/images/ella.gif",
    highlights: [
      "Tea plantations",
      "Nine Arches Bridge",
      "Cool climate",
      "Misty mountain views"
    ],
    travelInfo: {
      distance: "approx. 200km",
      bestTime: "February – September",
      idealFor: "Nature lovers, Hikers, Photographers"
    }
  },
  {
    id: "galle",
    title: "Galle, Sri Lanka",
    tagline: "A charming coastal city filled with history and ocean views",
    description: "Galle is a historic coastal city in Sri Lanka, best known for the famous Galle Fort and its colonial architecture. It also offers beautiful nearby beaches and a relaxed seaside atmosphere for visitors.",
    coverImage: "https://images.unsplash.com/photo-1588598130619-469a5858b72e?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1588598130619-469a5858b72e?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Galle Fort",
      "Lighthouse & Ramparts",
      "Colonial Streets & Cafés",
      "Nearby Beaches"
    ],
    travelInfo: {
      distance: "approx. 119km",
      bestTime: "November – April",
      idealFor: "History lovers, Photographers"
    }
  },
  {
    id: "nuwara-eliya",
    title: "Nuwara Eliya, Sri Lanka",
    tagline: "Cool mountain air & tea estates — \"Little England\" of Sri Lanka",
    description: "Nuwara Eliya is a cool-climate town known as \"Little England\" due to its colonial-style buildings and beautiful landscapes. It is famous for its tea estates, waterfalls, and botanical gardens.",
    coverImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Tea Plantations & Factories",
      "Gregory Lake",
      "Cool Climate",
      "Colonial Architecture"
    ],
    travelInfo: {
      distance: "approx. 170km",
      bestTime: "February – April",
      idealFor: "Couples, Hikers, Photographers"
    }
  },
  {
    id: "sigiriya",
    title: "Sigiriya, Sri Lanka",
    tagline: "Ancient rock fortress rising above lush jungle and history",
    description: "Sigiriya is home to the iconic Lion Rock, an ancient rock fortress and one of Sri Lanka's most important historical sites. Visitors can enjoy stunning views, frescoes, and the surrounding jungle scenery.",
    coverImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Lion Rock Fortress",
      "Sigiriya Frescoes",
      "Mirror Wall",
      "Gardens & Water Systems"
    ],
    travelInfo: {
      distance: "approx. 170km",
      bestTime: "January – April",
      idealFor: "History lovers, Hikers, Photographers"
    }
  },
  {
    id: "mirissa",
    title: "Mirissa, Sri Lanka",
    tagline: "Golden sands, palm trees and sea breeze — beach bliss awaits",
    description: "Mirissa is a quiet beach town known for its golden sandy beaches and crystal-clear waters. It is also a popular spot for whale watching and relaxing seaside activities.",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Mirissa Beach",
      "Whale & Dolphin Watching",
      "Coconut Tree Hill",
      "Secret Beach"
    ],
    travelInfo: {
      distance: "approx. 150km",
      bestTime: "November – April",
      idealFor: "Beach Lovers, Swimmers, Photographers"
    }
  },
  {
    id: "yala",
    title: "Yala, Sri Lanka",
    tagline: "Wild safari adventures among leopards, elephants & untamed nature",
    description: "Yala is a famous national park known for its rich wildlife, including leopards, elephants, and exotic birds. It is one of the best destinations in Sri Lanka for safari adventures and nature exploration.",
    coverImage: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Yala Safari",
      "Leopard Spotting Capital",
      "Scenic Beaches at the Edge of the Park",
      "Kebiliththa / Sithulpawwa Temple"
    ],
    travelInfo: {
      distance: "approx. 290km",
      bestTime: "June – September",
      idealFor: "Wildlife lovers, Photographers"
    }
  },
  {
    id: "yapahuwa",
    title: "Yapahuwa, Sri Lanka",
    tagline: "Historic rock citadel, stone steps and echoes of ancient kings",
    description: "Yapahuwa is an ancient rock fortress that once served as the capital of Sri Lanka in the 13th century. It is known for its impressive stone stairway and historical significance.",
    coverImage: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Yapahuwa Rock Fortress",
      "Legendary Lion Staircase",
      "Panoramic Summit Views",
      "Ancient Ruins & Artifacts"
    ],
    travelInfo: {
      distance: "approx. 150km",
      bestTime: "December – April",
      idealFor: "History lovers, Travelers, Photographers"
    }
  },
  {
    id: "diyaluma-falls",
    title: "Diyaluma Falls, Sri Lanka",
    tagline: "Waterfall heights and natural pools — nature's splash of beauty",
    description: "Diyaluma Falls is the second-highest waterfall in Sri Lanka, surrounded by breathtaking natural scenery. It is a popular location for hiking, swimming, and photography.",
    coverImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
    highlights: [
      "Second-highest waterfall",
      "Natural infinity-pools",
      "Beautiful hike through nature",
      "Accessible from popular hill towns"
    ],
    travelInfo: {
      distance: "approx. 195km",
      bestTime: "January – April",
      idealFor: "Nature lovers, Travelers, Photographers"
    }
  }
];

export const HOTELS: Hotel[] = [
  {
    id: "h-ella-1",
    name: "Dream Cliff Hotel",
    image: "./src/assets/images/ella.gif",
    destinationId: "ella"
  },
  {
    id: "h-ella-2",
    name: "EKHO Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    destinationId: "ella"
  },
  {
    id: "h-galle-1",
    name: "Radisson Blu Resort",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
    destinationId: "galle"
  },
  {
    id: "h-galle-2",
    name: "Amangalla Hotel",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    destinationId: "galle"
  },
  {
    id: "h-ne-1",
    name: "Jetwing St. Andrew's Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    destinationId: "nuwara-eliya"
  },
  {
    id: "h-ne-2",
    name: "Araliya Green Hills Hotel",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80",
    destinationId: "nuwara-eliya"
  },
  {
    id: "h-sigiriya-1",
    name: "Aliya Resort & Spa",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    destinationId: "sigiriya"
  },
  {
    id: "h-sigiriya-2",
    name: "Jetwing Vil Uyana",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    destinationId: "sigiriya"
  },
  {
    id: "h-mirissa-1",
    name: "Mandara Resort",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80",
    destinationId: "mirissa"
  },
  {
    id: "h-mirissa-2",
    name: "Randiya Sea View Hotel",
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=600&q=80",
    destinationId: "mirissa"
  },
  {
    id: "h-yala-1",
    name: "Uga Chena Huts",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80",
    destinationId: "yala"
  },
  {
    id: "h-yala-2",
    name: "Wild Coast Tented Lodge",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    destinationId: "yala"
  },
  {
    id: "h-yapahuwa-1",
    name: "Paradise Hotel",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=600&q=80",
    destinationId: "yapahuwa"
  },
  {
    id: "h-yapahuwa-2",
    name: "Ranweli Holiday Village",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80",
    destinationId: "yapahuwa"
  },
  {
    id: "h-df-1",
    name: "Diyaluma INN",
    image: "https://images.unsplash.com/photo-1432303491130-c3a529368953?auto=format&fit=crop&w=600&q=80",
    destinationId: "diyaluma-falls"
  },
  {
    id: "h-df-2",
    name: "Living Heritage",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    destinationId: "diyaluma-falls"
  }
];
