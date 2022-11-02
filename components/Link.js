import Link from 'next/link';

function ActiveLink({ children, href }) {
  return (
    <Link href={href}>
      {children}
    </Link>
  );
}

export default ActiveLink;
