import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request }) => {
  const data = await request.json();
  console.log('Web Vitals:', data);
  // Here you can process the data, e.g., send it to an analytics service
}; 