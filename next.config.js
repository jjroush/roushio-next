const withMDX = require('@next/mdx')({
  extension: /.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: ['roush-image.s3.amazonaws.com'],
  },
});
