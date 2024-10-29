import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import texture from '../../assets/images/16-texture-square.webp?jsx';
import type { RequestHandler } from "@builder.io/qwik-city";

// Define metadata for better SEO
const META = {
  title: "Blog - HEIRLOOM Wedding Films",
  description: "Tips, insights, and inspiration for your wedding film. Learn about our process, wedding planning advice, and stories from real couples.",
} as const;

// Static content
const CONTENT = {
  hero: {
    title: {
      main: "Stories and",
      accent: "inspiration",
    },
    subtitle: "Wedding planning tips, behind-the-scenes insights, and real love stories"
  },
  posts: [
    {
      title: "How to Choose Your Wedding Videographer",
      category: "Planning Tips",
      date: "January 15, 2024",
      excerpt: "Your wedding film is one of the few things you'll have forever after your big day. Here's what to look for when choosing your videographer.",
      image: "https://placehold.co/800x600",
      slug: "how-to-choose-wedding-videographer"
    },
    {
      title: "Sarah and Michael's Vineyard Wedding",
      category: "Real Weddings",
      date: "December 28, 2023",
      excerpt: "An intimate celebration in Napa Valley filled with romantic moments and golden light. See how we captured their special day.",
      image: "https://placehold.co/800x600",
      slug: "sarah-michael-vineyard-wedding"
    },
    {
      title: "What to Expect on Your Wedding Film Day",
      category: "Behind the Scenes",
      date: "December 15, 2023",
      excerpt: "A detailed look at how we work behind the cameras to capture your special day without being intrusive.",
      image: "https://placehold.co/800x600",
      slug: "what-to-expect-wedding-film-day"
    }
  ]
} as const;

// Blog Post Card Component
const BlogPostCard = component$<{
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}>(({ title, category, date, excerpt, image, slug }) => {
  return (
    <article class="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <Link href={`/blog/${slug}`} class="block aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          width={800}
          height={600}
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      {/* Content */}
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-opensans text-[#315141]">{category}</span>
          <span class="text-sm font-opensans text-gray-500">{date}</span>
        </div>
        
        <Link href={`/blog/${slug}`} class="block group-hover:opacity-75 transition-opacity">
          <h2 class="font-playfair text-xl text-gray-800 mb-3">{title}</h2>
        </Link>
        
        <p class="font-opensans text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        
        <Link 
          href={`/blog/${slug}`}
          class="inline-flex items-center gap-2 text-[#315141] font-opensans font-medium group-hover:text-[#52453A] transition-colors duration-300"
        >
          Read More
          <svg 
            class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
});

export default component$(() => {
  return (
    <main class="w-full relative">
      {/* Hero Section */}
      <section class="relative bg-[#faf9f6] w-full py-24 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
              {CONTENT.hero.title.main}{' '}
              <span class="font-ephesis">{CONTENT.hero.title.accent}</span>
            </h1>
            <p class="font-opensans text-lg md:text-xl text-gray-600">
              {CONTENT.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'repeat-y',
          }}
          aria-hidden="true"
        />
        
        <div class="container relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONTENT.posts.map((post) => (
                <BlogPostCard 
                  key={post.slug}
                  {...post}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: META.title,
  meta: [
    {
      name: "description",
      content: META.description,
    },
  ],
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    private: true,
    noCache: true,
    maxAge: 0
  });
};
