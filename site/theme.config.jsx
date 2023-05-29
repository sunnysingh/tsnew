import { useConfig } from 'nextra-theme-docs';

import { Logo } from './components/Logo';

export default {
  logo: <Logo size={130} />,
  docsRepositoryBase: 'https://github.com/sunnysingh/tsnew/blob/main/site',
  project: {
    link: 'https://github.com/sunnysingh/tsnew',
  },
  banner: {
    key: 'experimental-v0',
    text: (
      <strong>
        🚧 TSNew is experimental. Avoid usage unless you're providing feedback.
        🚧
      </strong>
    ),
    dismissible: false,
  },
  feedback: {
    content: null,
  },
  useNextSeoProps() {
    return {};
  },
  head: () => {
    const { frontMatter } = useConfig();

    return (
      <>
        <title>
          {frontMatter.title ? `${frontMatter.title} | TSNew` : 'TSNew'}
        </title>
        <meta name="description" content="TypeScript Code Generator" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tsnew.dev/" />
        <meta property="og:title" content="TSNew" />
        <meta property="og:description" content="TypeScript Code Generator" />
        <meta property="og:image" content="https://tsnew.dev/cover.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tsnew.dev/" />
        <meta property="twitter:title" content="TSNew" />
        <meta
          property="twitter:description"
          content="TypeScript Code Generator"
        />
        <meta
          property="twitter:image:src"
          content="https://tsnew.dev/cover.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </>
    );
  },
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()}{' '}
        <a href="https://sunnysingh.io/" target="_blank">
          Sunny Singh
        </a>
      </span>
    ),
  },
};
