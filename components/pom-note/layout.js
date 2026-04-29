import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";

const PomNoteLayout = ({ children }) => (
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
				<Link className={styles.brand} href="/pom-note">
					<span className={styles.brandIcon}>{"P"}</span>
					<span className={styles.brandName}>{"Pom Note"}</span>
				</Link>
				<nav className={styles.nav}>
					<Link href="/pom-note">{"Support"}</Link>
					<Link href="/pom-note/privacy">{"Privacy"}</Link>
				</nav>
			</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<div>{"© 2026 Jacob Roush"}</div>
				<div className={styles.footerLinks}>
					<a href="mailto:hello@roush.io?subject=Pom%20Note">
						{"hello@roush.io"}
					</a>
					<Link href="/">{"roush.io"}</Link>
				</div>
			</footer>
		</div>
	</>
);

export const getPomNoteLayout = (page) => <PomNoteLayout>{page}</PomNoteLayout>;

export default PomNoteLayout;
