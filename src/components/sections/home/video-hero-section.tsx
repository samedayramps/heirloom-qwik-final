import { component$ } from '@builder.io/qwik';
import { Link } from "@builder.io/qwik-city";
import { HERO_CONTENT } from "~/constants/hero";

export const VideoHeroSection = component$(() => {
  return (
    <section class="relative w-full h-[50vh] md:h-[75vh] overflow-hidden">
      {/* Video Background */}
      <div class="absolute inset-0 w-full h-full">
        <video 
          autoplay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
          class="object-cover w-full h-full"
          poster="/images/video-poster.jpg"
        >
          <source 
            src="https://heirloom-wedding-films.b-cdn.net/caleb_%2B_kirsten___minneapolis_renaissance%2C_the_depot%20(2160p).mp4"
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div class="relative z-10 flex flex-col items-center justify-center w-full h-full pt-16">
        <div class="max-w-2xl mx-auto text-center px-4">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-[1.2] drop-shadow-lg">
            {HERO_CONTENT.heading}
            <span class="font-ephesis leading-[0.5] inline-block"> {HERO_CONTENT.accentText}</span>
          </h1>
          
          <div class="w-24 h-px bg-white mb-8 mx-auto" aria-hidden="true" />
          
          <p class="font-opensans text-base md:text-lg text-white mb-8 drop-shadow-lg">
            {HERO_CONTENT.description}
          </p>
          
          <Link 
            href={HERO_CONTENT.ctaLink} 
            class="inline-block font-opensans text-white border border-white
                   rounded-full px-8 py-3 hover:bg-white hover:text-[#2d2d2d]
                   transition-colors duration-300"
            prefetch
          >
            {HERO_CONTENT.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}); 