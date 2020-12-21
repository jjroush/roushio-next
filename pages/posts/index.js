import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styled from 'styled-components';
import Link from 'next/link';

const StyledA = styled.a`
  text-decoration: none;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const StyledExcerpt = styled.p`
  color: #282828;
`;

function PostPage({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.slug}>
          <StyledA>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <StyledExcerpt>{post.excerpt}</StyledExcerpt>
          </StyledA>
        </Link>
      ))}
    </>
  );
}

export default PostPage;

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'data/posts'));

  const filteredFiles = files.filter((file) => !file.startsWith('_'));

  const posts = filteredFiles.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/posts', postSlug),
      'utf8'
    );
    const { data, excerpt } = matter(source, {
      excerpt: true,
    });

    return [
      {
        ...data,
        excerpt,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ];
  }, []);

  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return { props: { posts } };
}
