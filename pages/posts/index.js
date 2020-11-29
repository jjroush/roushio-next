// import { frontMatter as recipes } from "./*.mdx";
import Link from "next/link";

function PostPage() {
  const formatPath = (p) => p.replace(/\.mdx$/, "");

  return (
    <ul>
      {/* {recipes.map((recipe) => (
        <li key={recipe.__resourcePath}>
          <Link href={formatPath(recipe.__resourcePath)}>
            <a>{recipe.title}</a>
          </Link>
        </li>
      ))} */}
    </ul>
  );
}

export default PostPage;
