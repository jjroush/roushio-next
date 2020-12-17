import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';

function Post({ renderedOutput }) {
  return <div dangerouslySetInnerHTML={{ __html: renderedOutput }} />;
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
  console.log(params);
  const source = 'Some **mdx** text, with a component <Test />';
  const postData = fs.readFileSync(
    path.join(process.cwd(), 'data/posts', `${params.post}.mdx`)
  );
  const { renderedOutput } = await renderToString(postData, {});
  return { props: { renderedOutput } };
}
