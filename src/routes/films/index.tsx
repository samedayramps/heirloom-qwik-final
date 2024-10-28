import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import texture from '~/assets/images/22-texture.webp';

// Define metadata for better SEO
const META = {
  title: "Wedding Films - HEIRLOOM Wedding Films",
  description: "Watch our collection of cinematic wedding films. Each film is crafted to capture the unique story and emotions of your special day.",
} as const;

// Static content
const CONTENT = {
  hero: {
    title: {
      main: "Our",
      accent: "latest",
      end: "films"
    },
    subtitle: "A collection of love stories, beautifully captured"
  },
  films: [
    {
      title: "Sarah & Michael",
      location: "Napa Valley, CA",
      date: "Summer 2023",
      thumbnail: "https://placehold.co/600x400", // Replace with actual image
      description: "An intimate vineyard wedding filled with romantic moments and golden sunlight."
    },
    {
      title: "Emma & James",
      location: "Seattle, WA",
      date: "Fall 2023",
      thumbnail: "https://placehold.co/600x400", // Replace with actual image
      description: "A modern celebration in the heart of the city with stunning skyline views."
    },
    {
      title: "Olivia & William",
      location: "Charleston, SC",
      date: "Spring 2023",
      thumbnail: "https://placehold.co/600x400", // Replace with actual image
      description: "A classic southern wedding with historic charm and elegant details."
    },
    // Add more films as needed
  ]
} as const;

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

// Film Card Component
const FilmCard = component$<{
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  description: string;
}>(({ title, location, date, thumbnail, description }) => {
  return (
    <div class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Thumbnail with fixed dimensions */}
      <div class="aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={`${title} wedding film thumbnail`}
          width={600}
          height={338} // 16:9 aspect ratio (600 * 9/16)
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" // Add lazy loading for better performance
        />
      </div>
      
      {/* Content */}
      <div class="p-6">
        <h3 class="font-playfair text-xl text-gray-800 mb-2">{title}</h3>
        <div class="font-opensans text-sm text-gray-600 mb-3">
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <p class="font-opensans text-gray-700">{description}</p>
        
        {/* Play Button */}
        <button class="mt-4 inline-flex items-center gap-2 text-[#315141] font-opensans font-medium group-hover:text-[#52453A] transition-colors duration-300">
          Watch Film
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
        </button>
      </div>
    </div>
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
              <span class="font-ephesis">{CONTENT.hero.title.accent}</span>{' '}
              {CONTENT.hero.title.end}
            </h1>
            <p class="font-opensans text-lg md:text-xl text-gray-600">
              {CONTENT.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Films Grid Section */}
      <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        
        <div class="container relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONTENT.films.map((film) => (
                <FilmCard 
                  key={film.title}
                  {...film}
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
