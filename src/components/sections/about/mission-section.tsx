import { component$ } from '@builder.io/qwik';
import textureImage from '~/assets/images/16-texture-square.webp';

const CONTENT = {
  outro: "In 2024, I created HEIRLOOM with one focus: wedding films that become more precious over time. The kind of film that shows you something new each time you watch it—whether that's next month, next year, or decades from now.",
  details: "This approach goes beyond just capturing beautiful shots. We focus on the moments you'll want to relive: the tears in your dad's eyes, the way your partner looked at you during the first dance, your grandmother's smile as she shares her marriage advice. These are the details that make your film worth rewatching for generations.",
  approach: "In order to create these films, we limit our weddings each year and take time to get to know each couple. We love meeting for drinks or jumping on a video call before your wedding to hear your story. This helps us capture the moments that matter on your wedding day—not just between you two, but with the family and friends who mean the most."
} as const;

const BACKGROUND_STYLES = {
  backgroundImage: `url(${textureImage})`,
  backgroundSize: '100% auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'repeat-y',
} as const;

export const MissionSection = component$(() => {
  return (
    <section class="relative bg-[#d5c6ad] w-full py-16 overflow-hidden">
      <div 
        class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        style={BACKGROUND_STYLES}
        aria-hidden="true"
      />
      <div class="container relative z-10">
        <div class="max-w-3xl mx-auto">
          <p class="font-opensans text-gray-700 leading-relaxed mb-8">
            {CONTENT.outro}
          </p>
          <p class="font-opensans text-gray-700 leading-relaxed mb-8">
            {CONTENT.details}
          </p>
          <p class="font-opensans text-gray-700 leading-relaxed mb-8">
            {CONTENT.approach}
          </p>
          <p class="font-opensans text-gray-700 leading-relaxed text-right">
            – Ty Walls | Founder
          </p>
        </div>
      </div>
    </section>
  );
}); 