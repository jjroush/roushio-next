import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
  <div className={styles.HeaderContainer}>
      <nav className={styles.Nav}>
        <ul>
          <li>
            <Link href="/">
              {'HOME'}
            </Link>
          </li>
          <li>
            <Link href="/posts">
              {'POSTS'}
            </Link>
          </li>
          <li>
            <Link href="/music">
              {'MUSIC'}
            </Link>
          </li>
        </ul>
      </nav>
  </div>
);

export default Header;
