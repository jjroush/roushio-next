import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import matter from 'gray-matter';
import Image from 'next/image';

function Post({ frontMatter, mdxContent }) {
  return (
    <>
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      {frontMatter.image && (
        <Image
          src={frontMatter.image}
          width={1200}
          height={616}
          priority
          quality={60}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: mdxContent }} />
    </>
  );
}

export default Post;

export async function getStaticPaths() {
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
  const { renderedOutput } = await renderToString(content, {});
  return { props: { mdxContent: renderedOutput, frontMatter: data } };
}
