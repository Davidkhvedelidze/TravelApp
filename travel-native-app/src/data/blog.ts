export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string;
  readTime: string;
  author: string;
  authorTitle: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "chef-guided-supra-rituals",
    title: "Chef-Guided Supra Rituals in Kakheti",
    excerpt:
      "Raise a toast with a modern Tamada as we reinterpret the supra for curious gourmands.",
    category: "Cuisine",
    date: "Jan 12, 2024",
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
    content:
      "Our culinary team shares how to embrace Kakhetian feasting traditions while preserving mindful dining practices. Learn insider etiquette and exclusive estates where our guests gather around the table.",
    readTime: "5 min read",
    author: "Maria Kapanadze",
    authorTitle: "Head Culinary Curator",
  },
  {
    slug: "winter-wellness-in-borjomi",
    title: "Winter Wellness in Borjomi",
    excerpt:
      "Geothermal spa rituals, forest bathing, and chef-led detox menus for the colder months.",
    category: "Wellness",
    date: "Feb 3, 2024",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    content:
      "Detox in style with our Borjomi winter residency. From forest meditation to private spa suites, we design serene escapes that recharge weary travelers.",
    readTime: "4 min read",
    author: "David Tsereteli",
    authorTitle: "Wellness Experience Designer",
  },
  {
    slug: "svaneti-stargazing",
    title: "Stargazing Above the Svan Towers",
    excerpt:
      "Astro-guides lead nightly expeditions into velvet skies over the Caucasus.",
    category: "Adventure",
    date: "Mar 18, 2024",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    content:
      "We partner with astrophysicists and local storytellers to uncover constellations and Svan legends amid the high alpine air.",
    readTime: "6 min read",
    author: "Nino Chkheidze",
    authorTitle: "Adventure Curator",
  },
];
