import { component$, useSignal, $, type QRL, useOnWindow, useOnDocument } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import LogoSvg from '../../assets/images/logo.svg?jsx';
import LogoMobileSvg from '../../assets/images/logo-mobile.svg?jsx';

// Constants for static classes
const WRAPPER_CLASSES = 'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out transform-gpu';
const NAV_CLASSES = 'w-full bg-[#2d2d2d] will-change-transform transition-all duration-700 ease-in-out transform-gpu';
const MOBILE_MENU_CLASSES = 'lg:hidden overflow-hidden transition-all duration-300 ease-out fixed left-0 right-0 px-5 top-16'; // Updated with faster transition

interface NavbarProps {
  onTalkClick$: QRL<() => void>;
}

const NAV_LINKS = [
  { href: '/about', text: 'About' },
  { href: '/films', text: 'Films' },
  { href: '/blog', text: 'Blog' },
] as const;

// Update the NavLink component
const NavLink = component$<{
  href: string;
  text: string;
  isMobile?: boolean;
  onClick$?: QRL<() => void>;
}>(({ href, text, isMobile, onClick$ }) => (
  <Link 
    href={href}
    class={[
      'text-[#faf9f6] hover:text-[#d5c6ad] rounded-md font-opensans transition-colors duration-300',
      isMobile 
        ? 'block px-3 py-2 text-base' // Removed hover:scale-110 for mobile
        : 'px-3 py-2 text-sm hover:scale-110' // Keep scale animation for desktop
    ]}
    onClick$={onClick$}
  >
    {text}
  </Link>
));

// Extracted MobileMenu component
const MobileMenu = component$<{
  isOpen: boolean;
  onLinkClick$: QRL<() => void>;
}>(({ isOpen, onLinkClick$ }) => (
  <div 
    class={{
      [MOBILE_MENU_CLASSES]: true,
      'opacity-100 translate-y-1': isOpen, // Reduced translation for snappier feel
      'opacity-0 -translate-y-2 pointer-events-none': !isOpen // Reduced negative translation
    }}
  >
    <div class="bg-[#2d2d2d] rounded-2xl shadow-lg overflow-hidden transform-gpu">
      <div class="p-4 space-y-1">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            isMobile={true}
            onClick$={onLinkClick$}
          />
        ))}
      </div>
    </div>
  </div>
));

export default component$<NavbarProps>(({ onTalkClick$ }) => {
  const isScrolled = useSignal(false);
  const isDropdownOpen = useSignal(false);
  const scrollDebounceTimeout = useSignal<number | null>(null);
  const isInitialRender = useSignal(true);
  const mobileMenuRef = useSignal<Element>();
  const menuButtonRef = useSignal<Element>();

  // Add click outside handler
  useOnDocument(
    'click',
    $((event) => {
      const target = event.target as Element;
      
      // Check if click is outside both the menu and the toggle button
      if (isDropdownOpen.value && 
          mobileMenuRef.value && 
          menuButtonRef.value && 
          !mobileMenuRef.value.contains(target) && 
          !menuButtonRef.value.contains(target)) {
        isDropdownOpen.value = false;
      }
    })
  );

  // Debounced scroll handler with initial render check
  useOnWindow(
    'scroll',
    $(() => {
      if (scrollDebounceTimeout.value) {
        clearTimeout(scrollDebounceTimeout.value);
      }
      scrollDebounceTimeout.value = setTimeout(() => {
        isScrolled.value = window.scrollY > 0;
        if (isDropdownOpen.value) {
          isDropdownOpen.value = false;
        }
        if (isInitialRender.value) {
          isInitialRender.value = false;
        }
      }, 10) as any;
    })
  );

  return (
    <div 
      class={[
        WRAPPER_CLASSES,
        isScrolled.value ? 'px-5' : 'px-0',
        // Only apply transition after initial render
        isInitialRender.value ? 'transition-none' : ''
      ]}
    >
      <nav 
        class={[
          NAV_CLASSES,
          isScrolled.value 
            ? 'translate-y-5 rounded-full shadow-lg'
            : 'translate-y-0 rounded-none',
          // Only apply transition after initial render
          isInitialRender.value ? 'transition-none' : ''
        ]}
      >
        <div class={[
          'transition-all duration-700 ease-in-out',
          isScrolled.value 
            ? 'px-2' // Reduced fixed padding when scrolled
            : 'px-4 sm:px-6 lg:px-8'  // Original responsive padding when not scrolled
        ]}>
          <div class="flex items-center justify-between h-16">
            {/* Navbar Start */}
            <div class="flex items-center flex-1 lg:flex-none">
              <div class="lg:hidden">
                <button
                  ref={menuButtonRef}
                  onClick$={() => isDropdownOpen.value = !isDropdownOpen.value}
                  class="inline-flex items-center justify-center p-2 rounded-md text-[#faf9f6] hover:text-[#d5c6ad] hover:scale-110 focus:outline-none transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  <svg 
                    class="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="1.5" 
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </button>
              </div>

              <Link href="/" class="flex-shrink-0 ml-4 lg:ml-0">
                <LogoSvg 
                  class="hidden md:block h-8 w-auto" 
                  aria-label="Logo"
                />
                <LogoMobileSvg 
                  class="block md:hidden h-6 w-auto" 
                  aria-label="Mobile Logo"
                />
              </Link>
            </div>

            {/* Navbar Center */}
            <div class="hidden lg:flex items-center justify-center flex-1">
              <div class="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </div>
            </div>

            {/* Navbar End */}
            <div class={[
              'transition-all duration-700 ease-in-out flex-1 lg:flex-none flex justify-end',
              isScrolled.value ? 'mr-1' : '' // Reduced fixed margin when scrolled
            ]}>
              <button
                onClick$={onTalkClick$}
                class={[
                  'bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-opensans font-bold py-3 px-6 text-sm transition-all duration-700 ease-in-out',
                  isScrolled.value
                    ? 'rounded-[24px]'
                    : 'rounded-full'
                ]}
              >
                LET'S TALK
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with ref */}
        <div ref={mobileMenuRef}>
          <MobileMenu 
            isOpen={isDropdownOpen.value} 
            onLinkClick$={() => isDropdownOpen.value = false}
          />
        </div>
      </nav>
    </div>
  );
});
