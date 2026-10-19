import { NextSeo } from "next-seo";

import {
	getPasteBuffLayout,
	REPO_URL,
} from "../../components/paste-buff/layout";
import Panel from "../../components/paste-buff/panel";
import styles from "../../styles/paste-buff.module.css";

const DMG_URL = `${REPO_URL}/releases/latest/download/paste-buff.dmg`;

// Round two of the README benchmark (text-only seed). Footprint in MB.
const MEMORY = [
	{
		name: "paste-buff",
		note: "AppKit, 1 process",
		idle: 14.6,
		peak: 17.6,
		after: 17.3,
		ours: true,
	},
	{
		name: "Same app on GPUI",
		note: "1 process",
		idle: 30.1,
		peak: 51.0,
		after: 45.0,
	},
	{
		name: "Same app on Tauri",
		note: "4 processes",
		idle: 66.3,
		peak: 111.6,
		after: 73.5,
	},
	{
		name: "Raycast",
		note: "6 processes",
		idle: 116.4,
		peak: 131.1,
		after: 126.8,
	},
];
const MEMORY_MAX = 120;

const FEATURES = [
	{
		title: "Text, files and images.",
		body: "Copy a paragraph, a Finder selection or a screenshot. Files paste back as real files, and images keep their pixels.",
		wide: true,
	},
	{
		title: "Pastes where you were.",
		body: "paste-buff remembers the app you came from, hands focus back, and presses ⌘V for you.",
	},
	{
		title: "Forgets on schedule.",
		body: "Clips older than 24 hours are pruned every minute. Nothing piles up.",
	},
	{
		title: "Passwords stay out.",
		body: "Clips marked concealed or transient by password managers are never recorded.",
	},
	{
		title: "Nothing leaves your Mac.",
		body: "History is a JSON file in Application Support. No account, no sync, no network code at all.",
	},
];

const KEYS = [
	[["⌘", "⇧", "V"], "Open paste-buff from any app"],
	[["Type"], "Filter entries as you type"],
	[["↑", "↓"], "Move through history"],
	[["⏎"], "Paste into the previous app"],
	[["⌘", "⌫"], "Remove an entry"],
	[["esc"], "Hide the panel"],
];

function Keycaps({ keys }) {
	return (
		<span className={styles.keycaps}>
			{keys.map((k) => (
				<kbd className={styles.kbd} key={k}>
					{k}
				</kbd>
			))}
		</span>
	);
}

function MemoryChart() {
	return (
		<figure className={styles.chart}>
			<figcaption className={styles.chartTitle}>
				{"Idle memory footprint, MB"}
			</figcaption>
			<div className={styles.bars}>
				{MEMORY.map((m) => (
					<div className={styles.barRow} key={m.name}>
						<div className={styles.barLabel}>
							<span className={styles.barName}>{m.name}</span>
							<span className={styles.barNote}>{m.note}</span>
						</div>
						<div className={styles.barTrack}>
							<div
								className={m.ours ? styles.barOurs : styles.bar}
								style={{ width: `${(m.idle / MEMORY_MAX) * 100}%` }}
							/>
							<span className={styles.barValue}>{m.idle.toFixed(1)}</span>
						</div>
						<div className={styles.tooltip} role="tooltip">
							<strong>{m.name}</strong>
							<span>
								{"Idle"}
								<b>{`${m.idle.toFixed(1)} MB`}</b>
							</span>
							<span>
								{"Panel open"}
								<b>{`${m.peak.toFixed(1)} MB`}</b>
							</span>
							<span>
								{"After 20 opens"}
								<b>{`${m.after.toFixed(1)} MB`}</b>
							</span>
						</div>
					</div>
				))}
			</div>
			<div className={styles.srOnly}>
				<table>
					<caption>{"Memory footprint in MB"}</caption>
					<thead>
						<tr>
							<th scope="col">{"App"}</th>
							<th scope="col">{"Idle"}</th>
							<th scope="col">{"Panel open"}</th>
							<th scope="col">{"After 20 opens"}</th>
						</tr>
					</thead>
					<tbody>
						{MEMORY.map((m) => (
							<tr key={m.name}>
								<th scope="row">{m.name}</th>
								<td>{m.idle}</td>
								<td>{m.peak}</td>
								<td>{m.after}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</figure>
	);
}

export default function PasteBuff() {
	return (
		<>
			<NextSeo
				description="paste-buff is a clipboard history for macOS. Press ⌘⇧V, pick anything you copied in the last 24 hours, and it pastes into the app you were using. Native AppKit, about 15 MB of memory."
				title="paste-buff — Clipboard history for Mac"
			/>

			<section className={styles.hero}>
				<p className={styles.eyebrow}>{"paste-buff for Mac"}</p>
				<h1 className={styles.headline}>
					{"Everything you copied."}
					<br />
					<span className={styles.gradient}>{"One keystroke away."}</span>
				</h1>
				<p className={styles.subhead}>
					{"Press "}
					<Keycaps keys={["⌘", "⇧", "V"]} />
					{
						" and pick anything from the last 24 hours. It pastes straight into the app you were using."
					}
				</p>
				<div className={styles.ctas}>
					<a className={styles.button} href={DMG_URL}>
						{"Download for Mac"}
					</a>
					<a className={styles.textLink} href={REPO_URL}>
						{"View on GitHub ›"}
					</a>
				</div>
				<div className={styles.stage}>
					<Panel />
				</div>
			</section>

			<section className={styles.sectionAlt} id="features">
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>
						{"Small app."}
						<br />
						{"Long memory."}
					</h2>
					<div className={styles.bento}>
						{FEATURES.map((f) => (
							<div
								className={f.wide ? styles.tileWide : styles.tile}
								key={f.title}
							>
								<h3>{f.title}</h3>
								<p>{f.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={styles.section} id="performance">
				<div className={styles.container}>
					<p className={styles.eyebrow}>{"Performance"}</p>
					<h2 className={styles.sectionTitle}>{"Featherweight."}</h2>
					<p className={styles.lede}>
						{
							"paste-buff is plain AppKit: one process, no web view, no GPU renderer kept alive while hidden. When the panel closes it is ordered out and macOS takes its memory back."
						}
					</p>
					<div className={styles.stats}>
						<div className={styles.stat}>
							<span className={styles.statValue}>
								{"14.6"}
								<small>{"MB"}</small>
							</span>
							<span className={styles.statLabel}>{"idle footprint"}</span>
						</div>
						<div className={styles.stat}>
							<span className={styles.statValue}>{"8×"}</span>
							<span className={styles.statLabel}>
								{"less memory than Raycast"}
							</span>
						</div>
						<div className={styles.stat}>
							<span className={styles.statValue}>
								{"0.7"}
								<small>{"MB"}</small>
							</span>
							<span className={styles.statLabel}>{"binary"}</span>
						</div>
					</div>
					<MemoryChart />
				</div>
			</section>

			<section className={styles.sectionAlt}>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>{"Never leave the keyboard."}</h2>
					<ul className={styles.keyList}>
						{KEYS.map(([keys, what]) => (
							<li key={what}>
								<Keycaps keys={keys} />
								<span>{what}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className={styles.install} id="install">
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>{"Get paste-buff."}</h2>
					<div className={styles.download}>
						<img
							alt=""
							className={styles.appIcon}
							height={128}
							src="/paste-buff/icon.png"
							width={128}
						/>
						<div className={styles.downloadText}>
							<h3>{"paste-buff"}</h3>
							<p>{"Free · macOS 13 or later · Apple Silicon and Intel"}</p>
						</div>
						<a className={styles.button} href={DMG_URL}>
							{"Download"}
						</a>
					</div>
					<p className={styles.steps}>
						{
							"Open the DMG, drag paste-buff into Applications, open it once, then press "
						}
						<Keycaps keys={["⌘", "⇧", "V"]} />
						{"."}
					</p>
					<ul className={styles.notes}>
						<li>
							<strong>{"Signed and notarized."}</strong>
							{
								" The app and the DMG carry a Developer ID signature checked by Apple, so they open without warnings."
							}
						</li>
						<li>
							<strong>{"Starts at login."}</strong>
							{
								" paste-buff adds itself to Login Items on first launch. Switch it off in System Settings and it stays off."
							}
						</li>
						<li>
							<strong>{"One permission."}</strong>
							{
								" macOS asks for Accessibility access so paste-buff can press ⌘V for you."
							}
						</li>
					</ul>
					<div className={styles.ctas}>
						<a className={styles.textLink} href={`${REPO_URL}/releases`}>
							{"Release notes ›"}
						</a>
						<a className={styles.textLink} href={REPO_URL}>
							{"Source on GitHub ›"}
						</a>
					</div>
				</div>
			</section>
		</>
	);
}

PasteBuff.getLayout = getPasteBuffLayout;
