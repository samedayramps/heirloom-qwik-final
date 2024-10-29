import harlieGarretThumbnail from '~/assets/images/harlie-garret-thumbnail.jpg';

export const META = {
  title: "Wedding Films - HEIRLOOM Wedding Films",
  description: "Watch our collection of cinematic wedding films. Each film is crafted to capture the unique story and emotions of your special day.",
} as const;

export interface Film {
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
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
      title: "Harlie & Garret",
      location: "The Grand Ivory",
      date: "Summer 2024",
      thumbnail: harlieGarretThumbnail,
      videoUrl: "https://vimeo.com/999361246",
      description: "An scenic countryside wedding filled with romantic moments and golden sunlight."
    },
    // Add more films as needed
  ] satisfies Film[]
} as const; 