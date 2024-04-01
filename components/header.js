import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
    <div className={styles.HeaderWrapper}>
      <div className={styles.HeaderContainer}>
      <h2 style={{ margin: 0 }}></h2>
      <nav className={styles.Nav}>
        <ul>
          <li>
            <Link href="/">
              {'Home'}
            </Link>
          </li>
          <li>
            <Link href="/posts">
              {'Posts'}
            </Link>
          </li>
          <li>
            <Link href="/music">
              {'Music'}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
