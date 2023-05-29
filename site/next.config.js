const { remarkCodeHike } = require('@code-hike/mdx');
const theme = require('shiki/themes/solarized-dark.json');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, { theme, showCopyButton: true }]],
  },
});

module.exports = withNextra({
  images: {
    unoptimized: true,
  },
});
