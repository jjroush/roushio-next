import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

function PostPage({ posts }) {
  const formatPath = (p) => p.replace(/\.mdx$/, '');
  console.log(posts);
  return (
    <>
      {posts.map((post) => (
        <a href={`/posts/${post.slug}`}>
          <p>{post.title}</p>
        </a>
      ))}
    </>
  );
}

export default PostPage;

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'data/posts'));

  const posts = files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/posts', postSlug),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ];
  }, []);

  return { props: { posts } };
}
