import fs from "fs";
import path from "path";

import matter from "gray-matter";
import Link from "next/link";
import { NextSeo } from "next-seo";

const StyledA = {
	textDecoration: "none",
	color: "black",
	cursor: "pointer",
};

const StyledExcerpt = {
	color: "#282828",
};

function PostPage({ posts }) {
	return (
		<>
			<NextSeo
				description="A place to about all the cool stuff going on in software development."
				title="Posts - Jacob Roush"
			/>
			{posts.map((post) => (
				<Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
					<div style={StyledA}>
						<h2>{post.title}</h2>
						<p>{post.date}</p>
						<div style={StyledExcerpt}>{post.excerpt}</div>
					</div>
				</Link>
			))}
		</>
	);
}

export default PostPage;

export async function getStaticProps() {
	const files = fs.readdirSync(path.join(process.cwd(), "data/posts"));

	const filteredFiles = files.filter((file) => !file.startsWith("_"));

	const posts = filteredFiles.reduce((allPosts, postSlug) => {
		const source = fs.readFileSync(
			path.join(process.cwd(), "data/posts", postSlug),
			"utf8",
		);
		const { data, excerpt } = matter(source, {
			excerpt: true,
		});

		return [
			{
				...data,
				excerpt,
				slug: postSlug.replace(".mdx", ""),
			},
			...allPosts,
		];
	}, []);

	posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

	return { props: { posts } };
}
