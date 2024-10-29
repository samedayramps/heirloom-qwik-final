import { component$, useSignal, $, type QRL, useOnWindow, useOnDocument } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import LogoSvg from '../../assets/images/logo.svg?jsx';
import LogoMobileSvg from '../../assets/images/logo-mobile.svg?jsx';
import { LetsTalkButton } from "~/components/ui/lets-talk-button";

// Types
interface NavbarProps {
  onTalkClick$: QRL<() => void>;
}

interface NavStyles {
  wrapper: string;
  nav: string;
  mobileMenu: string;
  menuButton: string;
  logo: {
    wrapper: string;
    desktop: string;
    mobile: string;
  };
}

// Styles
const styles: NavStyles = {
  wrapper: 'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out transform-gpu',
  nav: 'w-full bg-[#2d2d2d] will-change-transform transition-all duration-700 ease-in-out transform-gpu',
  mobileMenu: 'lg:hidden overflow-hidden transition-all duration-300 ease-out fixed left-0 right-0 px-5 top-16',
  menuButton: "inline-flex items-center justify-center p-1 rounded-md text-[#faf9f6] hover:text-[#d5c6ad] hover:scale-110 focus:outline-none transition-all duration-300",
  logo: {
    wrapper: "flex-shrink min-w-0 ml-2 lg:ml-0",
    desktop: "hidden md:block h-8 w-auto",
    mobile: "block md:hidden h-6 w-auto min-w-0"
  }
} as const;

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
        ? 'block px-3 py-2 text-base'
        : 'px-3 py-2 text-sm hover:scale-110'
    ]}
    onClick$={onClick$}
  >
    {text}
  </Link>
));

// Lazy loaded MobileMenu component
const MobileMenu = component$<{
  isOpen: boolean;
  onLinkClick$: QRL<() => void>;
  onTalkClick$: QRL<() => void>;
}>(({ isOpen, onLinkClick$, onTalkClick$ }) => {
  const menuStyles = {
    wrapper: [
      styles.mobileMenu,
      isOpen ? 'opacity-100 translate-y-1' : 'opacity-0 -translate-y-2 pointer-events-none'
    ].join(' '),
    inner: "bg-[#2d2d2d] rounded-2xl shadow-lg overflow-hidden transform-gpu",
    content: "p-4 space-y-1",
    buttonWrapper: "xs:hidden pt-2"
  };

  return (
    <div class={menuStyles.wrapper}>
      <div class={menuStyles.inner}>
        <div class={menuStyles.content}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              isMobile={true}
              onClick$={onLinkClick$}
            />
          ))}
          <div class={menuStyles.buttonWrapper}>
            <LetsTalkButton
              onTalkClick$={onTalkClick$}
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

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
      if (isDropdownOpen.value && 
          mobileMenuRef.value && 
          menuButtonRef.value && 
          !mobileMenuRef.value.contains(target) && 
          !menuButtonRef.value.contains(target)) {
        isDropdownOpen.value = false;
      }
    })
  );

  // Debounced scroll handler
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
        styles.wrapper,
        isScrolled.value ? 'px-5' : 'px-0',
        isInitialRender.value ? 'transition-none' : ''
      ]}
    >
      <nav 
        class={[
          styles.nav,
          isScrolled.value 
            ? 'translate-y-5 rounded-full shadow-lg'
            : 'translate-y-0 rounded-none',
          isInitialRender.value ? 'transition-none' : ''
        ]}
      >
        <div class={[
          'transition-all duration-700 ease-in-out',
          isScrolled.value 
            ? 'px-2'
            : 'px-4 sm:px-6 lg:px-8'
        ]}>
          <div class="flex items-center justify-between h-16">
            {/* Navbar Start */}
            <div class="flex items-center flex-1 lg:flex-none">
              <div class="lg:hidden">
                <button
                  ref={menuButtonRef}
                  onClick$={() => isDropdownOpen.value = !isDropdownOpen.value}
                  class={styles.menuButton}
                  aria-label="Toggle menu"
                  aria-expanded={isDropdownOpen.value}
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

              <Link href="/" class={styles.logo.wrapper}>
                <LogoSvg 
                  class={styles.logo.desktop}
                  aria-label="Logo"
                />
                <LogoMobileSvg 
                  class={styles.logo.mobile}
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
              'transition-all duration-700 ease-in-out lg:flex-none justify-end',
              'hidden xs:flex flex-1',
              isScrolled.value ? 'mr-1' : ''
            ]}>
              <LetsTalkButton
                onTalkClick$={onTalkClick$}
                class={isScrolled.value ? 'rounded-[24px]' : ''}
              />
            </div>
          </div>
        </div>

        {/* Lazy loaded Mobile Menu */}
        {isDropdownOpen.value && (
          <div ref={mobileMenuRef}>
            <MobileMenu 
              isOpen={isDropdownOpen.value} 
              onLinkClick$={() => isDropdownOpen.value = false}
              onTalkClick$={onTalkClick$}
            />
          </div>
        )}
      </nav>
    </div>
  );
});
