import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";

const PomoNoteLayout = ({ children }) => (
	<>
		<Head>
			<style>{"html, body { background-color: #fef9d7; }"}</style>
			<style>
				{
					"@media (prefers-color-scheme: dark) { html, body { background-color: #231e05; } }"
				}
			</style>
		</Head>
		<div className={styles.shell}>
			<header className={styles.header}>
				<Link className={styles.brand} href="/pomo-note">
					<span className={styles.brandIcon}>{"P"}</span>
					<span className={styles.brandName}>{"Pomo Note"}</span>
				</Link>
				<nav className={styles.nav}>
					<Link href="/pomo-note">{"Support"}</Link>
					<Link href="/pomo-note/privacy">{"Privacy"}</Link>
				</nav>
			</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<div>{"© 2026 Jacob Roush"}</div>
				<div className={styles.footerLinks}>
					<a href="mailto:hello@roush.io?subject=Pomo%20Note">
						{"hello@roush.io"}
					</a>
					<Link href="/">{"roush.io"}</Link>
				</div>
			</footer>
		</div>
	</>
);

export const getPomoNoteLayout = (page) => (
	<PomoNoteLayout>{page}</PomoNoteLayout>
);

export default PomoNoteLayout;
