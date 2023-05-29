import { useConfig } from 'nextra-theme-docs';

import { Logo } from './components/Logo';

export default {
  primaryHue: 175,
  logo: <Logo size={130} />,
  docsRepositoryBase: 'https://github.com/sunnysingh/tsnew/blob/main/site',
  project: {
    link: 'https://github.com/sunnysingh/tsnew',
  },
  feedback: {
    content: null,
  },
  head: () => {
    const { frontMatter } = useConfig();

    return (
      <>
        <title>
          {frontMatter.title ? `${frontMatter.title} | TSNew` : 'TSNew'}
        </title>
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
        <a href="https://nextra.site" target="_blank">
          Sunny Singh
        </a>
      </span>
    ),
  },
};
