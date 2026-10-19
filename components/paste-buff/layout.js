import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";

export const REPO_URL = "https://github.com/jjroush/paste-buff";

const PasteBuffLayout = ({ children }) => (
	<>
		<Head>
			<style>{"html, body { background-color: #ffffff; }"}</style>
			<style>
				{
					"@media (prefers-color-scheme: dark) { html, body { background-color: #000000; } }"
				}
			</style>
		</Head>
		<div className={styles.shell}>
			<nav className={styles.nav}>
				<div className={styles.navInner}>
					<Link className={styles.brand} href="/paste-buff">
						{"paste-buff"}
					</Link>
					<div className={styles.navLinks}>
						<a href="#features">{"Features"}</a>
						<a href="#performance">{"Performance"}</a>
						<a href={REPO_URL}>{"GitHub"}</a>
						<a className={styles.navCta} href="#install">
							{"Download"}
						</a>
					</div>
				</div>
			</nav>
			<main>{children}</main>
			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<p>
						{
							"Memory figures are paste-buff's own benchmark: phys_footprint of the whole process tree, sampled across 20 open/close cycles on one Mac. Method and raw numbers are in the "
						}
						<a href={`${REPO_URL}#results`}>{"README"}</a>
						{"."}
					</p>
					<div className={styles.footerRow}>
						<span>{"© 2026 Jacob Roush"}</span>
						<span className={styles.footerLinks}>
							<a href={`${REPO_URL}/releases`}>{"Releases"}</a>
							<a href="mailto:hello@roush.io?subject=paste-buff">
								{"hello@roush.io"}
							</a>
							<Link href="/">{"roush.io"}</Link>
						</span>
					</div>
				</div>
			</footer>
		</div>
	</>
);

export const getPasteBuffLayout = (page) => (
	<PasteBuffLayout>{page}</PasteBuffLayout>
);

export default PasteBuffLayout;
