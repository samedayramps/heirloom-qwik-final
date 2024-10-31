import harlieGarretThumbnail from '~/assets/images/harlie-garret-thumbnail.jpg';

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
      thumbnail: harlieGarretThumbnail,
      videoUrl: "https://iframe.mediadelivery.net/embed/333221/aa1ba897-7353-456d-b2aa-0635f20dc4e8?autoplay=true&loop=false&muted=false&preload=true&responsive=true",
      description: "An scenic countryside wedding filled with romantic moments and golden sunlight.",
      blogContent: `
        <h2>Their Story</h2>
        <p>Harlie and Garret's love story began in the heart of Texas...</p>
        
        <h2>The Wedding Day</h2>
        <p>Under the warm summer sun at The Grand Ivory, their dream wedding came to life...</p>
        
        <h2>Behind the Scenes</h2>
        <p>Capturing their special day was a beautiful journey filled with genuine moments...</p>
      `
    },
    // Add more films as needed
  ] satisfies Film[]
} as const; 