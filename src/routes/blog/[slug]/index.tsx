import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

// Define blog posts data
const BLOG_POSTS = {
  'how-to-choose-wedding-videographer': {
    title: "How to Choose Your Wedding Videographer",
    category: "Planning Tips",
    date: "January 15, 2024",
    image: "https://placehold.co/1200x800",
    content: `
      <p>Your wedding film is one of the few things you'll have forever after your big day. Here's what to look for when choosing your videographer.</p>
      
      <h2>1. Define Your Style</h2>
      <p>Before starting your search, understand what style of wedding film speaks to you. Do you prefer cinematic and dramatic? Light and airy? Documentary-style? This will help narrow down videographers who specialize in your preferred aesthetic.</p>
      
      <h2>2. Review Full Wedding Films</h2>
      <p>While highlight reels are great, ask to see full wedding films. This gives you a better idea of how the videographer captures an entire day, not just the best moments.</p>
      
      <h2>3. Consider Experience</h2>
      <p>Look for someone who has filmed multiple weddings and knows how to handle various lighting conditions, venues, and situations. Experience brings confidence and reliability.</p>
    `
  },
  'sarah-michael-vineyard-wedding': {
    title: "Sarah and Michael's Vineyard Wedding",
    category: "Real Weddings",
    date: "December 28, 2023",
    image: "https://placehold.co/1200x800",
    content: `
      <p>An intimate celebration in Napa Valley filled with romantic moments and golden light. See how we captured their special day.</p>
      
      <h2>The Vision</h2>
      <p>Sarah and Michael dreamed of a wedding that would combine their love of wine country with their desire for an intimate celebration. The result was a stunning day filled with personal touches.</p>
      
      <h2>The Venue</h2>
      <p>Set against rolling hills and endless vineyards, their chosen venue provided the perfect backdrop for their romantic celebration.</p>
      
      <h2>The Moments</h2>
      <p>From their emotional first look to their sunset portraits among the vines, every moment was captured with intention and artistry.</p>
    `
  },
  'what-to-expect-wedding-film-day': {
    title: "What to Expect on Your Wedding Film Day",
    category: "Behind the Scenes",
    date: "December 15, 2023",
    image: "https://placehold.co/1200x800",
    content: `
      <p>A detailed look at how we work behind the cameras to capture your special day without being intrusive.</p>
      
      <h2>Morning Preparations</h2>
      <p>We arrive early to capture the anticipation and excitement as you and your wedding party prepare for the day. Our approach is gentle and unobtrusive.</p>
      
      <h2>Ceremony Coverage</h2>
      <p>Multiple cameras ensure we capture every angle of your ceremony while remaining discrete. We coordinate with your photographer to ensure smooth coverage.</p>
      
      <h2>Reception Magic</h2>
      <p>From emotional speeches to dance floor moments, we're there to document all the joy and celebration of your reception.</p>
    `
  }
} as const;

// Route loader to get blog post data
export const useBlogPost = routeLoader$(({ params, status }) => {
  const slug = params.slug as keyof typeof BLOG_POSTS;
  const post = BLOG_POSTS[slug];
  
  if (!(slug in BLOG_POSTS)) {
    status(404);
    return null;
  }
  
  return post;
});

export default component$(() => {
  const postSignal = useBlogPost();
  const post = postSignal.value;

  if (!post) {
    return (
      <main class="w-full relative py-24">
        <div class="container">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-playfair text-3xl text-gray-800 mb-4">
              Post Not Found
            </h1>
            <p class="font-opensans text-gray-600">
              The blog post you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main class="w-full relative">
      {/* Hero Section */}
      <section class="relative bg-[#faf9f6] w-full py-24 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center gap-4 mb-4">
              <span class="text-sm font-opensans text-[#315141]">{post.category}</span>
              <span class="text-sm font-opensans text-gray-500">{post.date}</span>
            </div>
            <h1 class="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-8">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section class="relative w-full bg-[#d5c6ad] py-12 overflow-hidden">
        <div class="container relative z-10">
          <div class="max-w-5xl mx-auto">
            <div class="aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={post.image} 
                alt={post.title}
                width={1200}
                height={800}
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section class="relative bg-[#faf9f6] w-full py-16 overflow-hidden">
        <div 
          class="absolute inset-0 pointer-events-none"
          style={TEXTURE_BG}
          aria-hidden="true"
        >
          <texture 
            class="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>
        
        <div class="container relative z-10">
          <article class="max-w-3xl mx-auto">
            <div 
              class="prose prose-lg mx-auto prose-headings:font-playfair prose-p:font-opensans prose-a:transition-colors prose-a:duration-300"
              dangerouslySetInnerHTML={post.content}
            />
          </article>
        </div>
      </section>
    </main>
  );
});

// Dynamic head metadata based on post
export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(useBlogPost);
  return {
    title: `${post?.title || 'Post Not Found'} - HEIRLOOM Wedding Films`,
    meta: [
      {
        name: "description",
        content: post?.content.substring(0, 160) || "Post not found",
      },
    ],
  };
};

// Define texture background styles
const TEXTURE_BG = {
  backgroundColor: '#faf9f6',
  backgroundImage: 'url("/assets/16-texture-square.webp")',
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
  opacity: 0.3,
  mixBlendMode: 'overlay'
} as const;
