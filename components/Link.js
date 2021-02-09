import Link from 'next/link';

function ActiveLink({ children, href }) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}

export default ActiveLink;
