import fs from 'fs';
import path from 'path';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

function Post({ frontMatter, mdxContent }) {
  return (
    <>
      <NextSeo
        description={frontMatter.excerpt}
        title={`${frontMatter.title} - Jacob Roush`}
      />
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      {frontMatter.image && (
        <Image
          placeholder="blur"
          height={616}
          priority
          quality={60}
          src={frontMatter.image}
          width={1200}
        />
      )}
      <MDXRemote {...mdxContent} />
    </>
  );
}

export default Post;

export function getStaticPaths() {
  const postSlugs = fs.readdirSync(path.join(process.cwd(), 'data/posts'));

  return {
    paths: postSlugs.map((slug) => ({
      params: {
        post: slug.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mdx = fs.readFileSync(
    path.join(process.cwd(), 'data/posts', `${params.post}.mdx`)
  );
  const { content, data } = matter(mdx);
  const renderedOutput = await serialize(content);

  return {
    props: {
      mdxContent: renderedOutput,
      frontMatter: data,
    },
  };
}
