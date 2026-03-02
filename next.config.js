const withMDX = require("@next/mdx")({
	extension: /.mdx?$/,
});

module.exports = withMDX({
	pageExtensions: ["js", "jsx", "mdx"],
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "roush-image.s3.amazonaws.com" },
			{ protocol: "https", hostname: "mosaic.scdn.co" },
			{ protocol: "https", hostname: "i.scdn.co" },
		],
	},
});
