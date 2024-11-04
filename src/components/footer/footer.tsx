import { component$ } from '@builder.io/qwik';
import Logo from '~/assets/images/logo.svg?jsx';
import Texture from '~/assets/images/9-texture.webp?jsx';

// Social media icons as separate components for better organization
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="fill-current"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="fill-current"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="fill-current"
  >
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const SOCIAL_LINKS = [
  { href: '#', icon: TwitterIcon, label: 'Twitter' },
  { href: '#', icon: YouTubeIcon, label: 'YouTube' },
  { href: '#', icon: FacebookIcon, label: 'Facebook' }
] as const;

const FOOTER_LINKS = [
  { href: '/sitemap.xml', label: 'Sitemap' },
  { href: '/robots.txt', label: 'Robots.txt' }
] as const;

export const Footer = component$(() => {
  return (
    <footer class="relative bg-[#2d2d2d] w-full py-10 overflow-hidden">
      {/* Background texture */}
      <Texture 
        class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700"
        aria-hidden="true"
      />
      
      <div class="container relative z-10">
        <div class="max-w-6xl mx-auto flex flex-col items-center gap-8">
          {/* Logo */}
          <div class="flex justify-center">
            <Logo 
              class="h-8 w-auto fill-current text-white" 
              aria-label="HEIRLOOM Wedding Films Logo" 
            />
          </div>

          {/* Social Links */}
          <nav class="flex justify-center">
            <div class="flex gap-6">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a 
                  key={label}
                  href={href}
                  class="text-white hover:text-[#d5c6ad] transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </nav>

          {/* SEO Links */}
          <div class="flex gap-4">
            {FOOTER_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                class="text-white/60 hover:text-[#d5c6ad] text-sm transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div class="text-white/80 text-sm font-light">
            © {new Date().getFullYear()} HEIRLOOM Wedding Films. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
});
