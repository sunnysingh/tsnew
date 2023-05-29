import type { AppProps } from 'next/app';
import '@code-hike/mdx/styles';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
