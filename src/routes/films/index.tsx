import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import texture from '~/assets/images/22-texture.webp';
import type { Film } from './content';
import { META, CONTENT } from './content';

// Background styles
const BACKGROUND_STYLES = {
  backgroundImage: `url(${texture})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

// Film Card Component
const FilmCard = component$<{
  slug: string;
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  description: string;
}>(({ slug, title, location, date, thumbnail, description }) => {
  return (
    <Link 
      href={`/films/${slug}`}
      class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl text-left block w-full"
    >
      <div class="aspect-video overflow-hidden">
        <img 
          src={thumbnail}
          alt={`${title} wedding film thumbnail`}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          class="h-full w-full object-cover transform transition duration-500 group-hover:scale-105"
        />
      </div>
      
      <div class="p-6">
        <h3 class="font-playfair text-xl text-gray-800 mb-2">{title}</h3>
        <div class="font-opensans text-sm text-gray-600 space-y-1">
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <p class="font-opensans text-gray-700 mt-3">{description}</p>
      </div>
    </Link>
  );
});

export default component$(() => {
  return (
    <main class="w-full">
      {/* Hero Section */}
      <section class="bg-[#faf9f6] py-24">
        <div class="container">
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
      <section class="bg-[#d5c6ad] py-16">
        <div 
          class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={BACKGROUND_STYLES}
          aria-hidden="true"
        />
        
        <div class="container relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONTENT.films.map((film: Film) => (
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
  // Add preload for critical images
  links: [
    {
      rel: 'preload',
      as: 'image',
      href: texture,
      type: 'image/webp'
    }
  ]
};
