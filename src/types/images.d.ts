import type { QwikIntrinsicElements } from '@builder.io/qwik';

declare module '*?jsx' {
  const Component: QwikIntrinsicElements['img'];
  export default Component;
} 