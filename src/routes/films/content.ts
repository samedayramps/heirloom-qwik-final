import harlieGarretFirstLook from '~/assets/images/harlie-and-garret-first-look.webp';

export const META = {
  title: "Wedding Films - HEIRLOOM Wedding Films",
  description: "Watch our collection of cinematic wedding films. Each film is crafted to capture the unique story and emotions of your special day.",
} as const;

export interface Film {
  slug: string;
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  blogContent: string;
}

export const CONTENT = {
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
      slug: "harlie-and-garret",
      title: "Harlie and Garret",
      location: "The Grand Ivory",
      date: "Summer 2024",
      thumbnail: harlieGarretFirstLook,
      videoUrl: "https://iframe.mediadelivery.net/embed/333221/aa1ba897-7353-456d-b2aa-0635f20dc4e8?autoplay=true&loop=false&muted=false&preload=true&responsive=true",
      description: "An scenic countryside wedding filled with romantic moments and golden sunlight.",
      blogContent: `
        <article class="prose prose-slate lg:prose-lg max-w-none prose-p:mb-8 prose-p:leading-relaxed">
          <p class="text-lg md:text-xl">
            Every wedding has its unforgettable moments, but Harlie and Garrett's was filled with them from start to finish. Filming their day at The Grand Ivory, I was struck by how each interaction told a story of love, support, and commitment.
          </p>

          <p class="text-lg md:text-xl">
            From the early hours, capturing Harlie's interactions with her bridesmaids was a joy. There was laughter, heartfelt exchanges, and a strong bond that made for beautiful, candid shots. Her best friend spoke movingly about Harlie's loyal spirit, which was echoed in every frame. Filming Garrett as he prepared was a reminder of the depth behind their love—an easy smile, a quiet confidence, and a love that was clear to everyone around him.
          </p>

          <p class="text-lg md:text-xl">
            The ceremony was a powerful moment, not just for the couple but for everyone present. Through my lens, I could see the emotion on every face. When they shared their vows, the weight of each word was visible, and as Garrett kissed Harlie, the joy was contagious.
          </p>

          <p class="text-lg md:text-xl">
            Harlie and Garrett, thank you for allowing me to capture the memories of your day. May these moments be a reminder of the love and happiness you felt, captured forever through the lens.
          </p>
        </article>
      `
    },
    // Add more films as needed
  ] satisfies Film[]
} as const; 