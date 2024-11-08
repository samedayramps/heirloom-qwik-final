interface Video {
  id: string;
  thumbnail: string;
}

export const VIDEOS: readonly Video[] = [
  {
    id: "c3aa2012-b651-4733-b1db-2a31b900fdb8",
    thumbnail: "https://vz-6de23159-acc.b-cdn.net/c3aa2012-b651-4733-b1db-2a31b900fdb8/thumbnail_3644ee43.jpg"
  },
  {
    id: "c8d9850a-8944-4260-a684-2cce331542b2",
    thumbnail: "https://vz-6de23159-acc.b-cdn.net/c8d9850a-8944-4260-a684-2cce331542b2/thumbnail_084f722f.jpg"
  },
  {
    id: "d7742ad2-6c27-494d-a936-875e70d5df54",
    thumbnail: "https://vz-6de23159-acc.b-cdn.net/d7742ad2-6c27-494d-a936-875e70d5df54/thumbnail_75384ed0.jpg"
  }
] as const;

export const POPUP_CONTENT = {
  title: "Introducing Heirloom Wedding Films",
  description: "After 8 years of filming weddings as Ty Walls Films, I’m rebranding to offer cinematic wedding films over 30 minutes long. Now, your wedding film will be a complete story that you’ll want to watch every anniversary.",
  tertiaryDescription: "Below are some of my previous highlight films as Ty Walls Films. While these are shorter, they showcase the quality and style brought to your full-length wedding film.",
  backToVideos: "← Back to videos",
  closeAriaLabel: "Close popup",
  watchVideoAriaLabel: (index: number) => `Watch video ${index + 1}`,
  ctaText: "For a limited time, get 15% off your wedding film.",
  ctaButtonText: "Let's Talk",
} as const;

export const NOTIFICATION_CONTENT = {
  message: "Get 15% off your wedding film. Learn more",
} as const;