import styles from "./panel.module.css";

// A static replica of the AppKit panel (crates/paste-buff-appkit), drawn at
// its real 760 × 460 geometry and scaled to the container.
const ROWS = [
	{ icon: "📄", title: "Moved standup to 9:45, same room", time: "8s" },
	{ icon: "🔗", title: "https://github.com/jjroush/paste-buff", time: "2m" },
	{ icon: "🖼", title: "Image 2880×1800", time: "6m" },
	{
		icon: "📄",
		title: "cargo build --release -p paste-buff-appkit",
		time: "14m",
	},
	{ icon: "📁", title: "Q3 roadmap.key, budget.numbers", time: "41m" },
	{ icon: "📄", title: "Thanks! Looks great — ship it.", time: "1h" },
	{
		icon: "🔗",
		title: "https://developer.apple.com/documentation/appkit",
		time: "3h",
	},
	{
		icon: "📄",
		title: "SELECT id, title FROM posts WHERE draft = false;",
		time: "5h",
	},
	{ icon: "📄", title: "Table for 4 at 7:30, under Roush", time: "9h" },
];

const INFO = [
	["Source", "Messages"],
	["Content type", "Text"],
	["Characters", "32"],
	["Words", "6"],
	["Lines", "1"],
	["Times copied", "1"],
];

export default function Panel() {
	return (
		<div className={styles.frame} aria-hidden="true">
			<div className={styles.panel}>
				<div className={styles.header}>
					<span className={styles.query}>{"Type to filter entries…"}</span>
				</div>
				<div className={styles.body}>
					<ul className={styles.list}>
						{ROWS.map((row, i) => (
							<li
								className={i === 0 ? styles.rowSelected : styles.row}
								key={row.title}
							>
								<span className={styles.icon}>{row.icon}</span>
								<span className={styles.title}>{row.title}</span>
								<span className={styles.time}>{row.time}</span>
							</li>
						))}
					</ul>
					<div className={styles.detail}>
						<div className={styles.preview}>{ROWS[0].title}</div>
						<div className={styles.info}>
							<div className={styles.infoTitle}>{"Information"}</div>
							<dl className={styles.kv}>
								{INFO.map(([k, v]) => (
									<div key={k}>
										<dt>{k}</dt>
										<dd>{v}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
				<div className={styles.footer}>
					<span className={styles.brand}>{"paste-buff"}</span>
					<span className={styles.actions}>
						{"Paste to Notes  ⏎      Delete  ⌘⌫"}
					</span>
				</div>
			</div>
		</div>
	);
}
