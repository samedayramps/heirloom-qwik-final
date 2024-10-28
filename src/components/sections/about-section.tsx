import { component$ } from "@builder.io/qwik";

export const AboutSection = component$(() => {
  return (
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold mb-8 text-center">About Us</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4">Our Mission</h3>
              <p class="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h3 class="text-2xl font-semibold mb-4">Our Vision</h3>
              <p class="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
