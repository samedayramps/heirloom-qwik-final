import { component$ } from "@builder.io/qwik";

export const FeaturesSection = component$(() => {
  return (
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center">Our Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Fast Performance</h3>
            <p class="text-gray-600">
              Experience lightning-fast loading times with our optimized platform.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Easy to Use</h3>
            <p class="text-gray-600">
              Intuitive interface designed for the best user experience.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Secure</h3>
            <p class="text-gray-600">
              Built with security in mind to protect your data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
