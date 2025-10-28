export interface TourItineraryItem {
  day: string;
  title: string;
  details: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  duration: string;
  region: string;
  theme: string;
  price: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  description: string;
  itinerary: TourItineraryItem[];
}

export const tours: Tour[] = [
  {
    id: "tbilisi-flavors",
    slug: "tbilisi-flavors",
    title: "Tbilisi Flavors & Hidden Courtyards",
    duration: "4 days",
    region: "Tbilisi",
    theme: "Culture",
    price: "From $1,280",
    heroImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1528747008803-1c5c1c2c1b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Old Town architectural walk",
      "Exclusive Qvevri wine tasting",
      "Sulphur bath ritual & spa evening",
    ],
    description:
      "Discover the kaleidoscope of flavors and stories that make Tbilisi unforgettable. From hidden courtyard eateries to design-forward wine bars, this city break blends culinary indulgence with art, history, and wellness.",
    itinerary: [
      {
        day: "Day 1",
        title: "Legends of the Old Town",
        details:
          "Arrive in Tbilisi, sunset walk through Abanotubani, private dinner with local chef.",
      },
      {
        day: "Day 2",
        title: "Wine & Design in Sololaki",
        details:
          "Gallery visits, craft workshop, sommelier-led wine tasting in a 19th-century salon.",
      },
      {
        day: "Day 3",
        title: "Canyons & Cuisine",
        details:
          "Day excursion to Dashbashi Canyon followed by modern Georgian degustation menu.",
      },
      {
        day: "Day 4",
        title: "Wellness & Departure",
        details: "Sulphur bath ritual, rooftop brunch, transfer to airport.",
      },
    ],
  },
  {
    id: "svaneti-alpine",
    slug: "svaneti-alpine-expedition",
    title: "Svaneti Alpine Expedition",
    duration: "8 days",
    region: "Svaneti",
    theme: "Adventure",
    price: "From $3,450",
    heroImage:
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1472055239152-c36b39e14e8c?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Towers of Ushguli",
      "Glacier hike with mountain guide",
      "Homestay dinners with folklore",
    ],
    description:
      "Ascend into the wild heart of the Greater Caucasus where jagged peaks meet ancient stone towers. Our alpine expedition balances trekking challenges with intimate cultural immersion in remote Svan villages.",
    itinerary: [
      {
        day: "Day 1",
        title: "Tbilisi to Mestia",
        details: "Fly to Mestia, sunset aperitivo with panoramic views.",
      },
      {
        day: "Day 2",
        title: "Svan Towers & Legends",
        details: "Guided walk through Mestia, visit to Margiani museum.",
      },
      {
        day: "Day 3",
        title: "Shkhara Glacier Trek",
        details: "Scenic 16km trek with glacier picnic.",
      },
      {
        day: "Day 4",
        title: "Paragliding or Restorative Spa",
        details: "Choose between paragliding above Mestia or spa session.",
      },
      {
        day: "Day 5",
        title: "Ushguli UNESCO Village",
        details: "4x4 drive to Ushguli, folklore evening with local ensemble.",
      },
      {
        day: "Day 6",
        title: "Culinary Workshop",
        details: "Hands-on Kubdari baking workshop, village markets.",
      },
      {
        day: "Day 7",
        title: "High Alpine Lakes",
        details: "Hike to Koruldi Lakes, picnic lunch prepared by chef.",
      },
      {
        day: "Day 8",
        title: "Return to Tbilisi",
        details: "Helicopter transfer weather permitting, farewell dinner.",
      },
    ],
  },
  {
    id: "kakheti-vine-trails",
    slug: "kakheti-vine-trails",
    title: "Kakheti Vine Trails",
    duration: "5 days",
    region: "Kakheti",
    theme: "Wine",
    price: "From $2,180",
    heroImage:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Qvevri wine masterclass",
      "Chateau stays & spa",
      "Al fresco supra with folk trio",
    ],
    description:
      "Meander through amber vineyards and monasteries in Georgia's celebrated wine region. Learn the ancient qvevri craft, meet biodynamic winemakers, and unwind in countryside estates.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Telavi Stroll",
        details: "Scenic transfer, rooftop welcome dinner.",
      },
      {
        day: "Day 2",
        title: "Qvevri Workshop",
        details: "Visit artisans in Vardisubani, hands-on pottery.",
      },
      {
        day: "Day 3",
        title: "Wine Safari",
        details: "Private tastings at boutique wineries, picnic in vineyards.",
      },
      {
        day: "Day 4",
        title: "Wellness & Supra",
        details: "Spa morning, festive supra feast with toasts.",
      },
      {
        day: "Day 5",
        title: "Monastery Sunrise",
        details: "Sunrise at Nekresi, brunch before departure.",
      },
    ],
  },
];
