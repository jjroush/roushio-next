import Link from "next/link";
import { NextSeo } from "next-seo";

import { getPomoNoteLayout } from "../../components/pomo-note/layout";
import styles from "../../styles/pomo-note.module.css";

export default function PomoNotePrivacy() {
	return (
		<>
			<NextSeo
				description="Privacy Policy for Pomo Note — a pomodoro voice transcription app for iPhone."
				title="Pomo Note — Privacy Policy"
			/>
			<div className={styles.page}>
				<h1 className={styles.pageTitle}>{"Privacy Policy"}</h1>
				<p className={styles.updated}>{"Last updated: April 30, 2026"}</p>

				<p className={styles.lede}>
					{
						"Pomo Note is built around a simple privacy promise: your notes belong to you, and they never leave your device. This page explains exactly what that means."
					}
				</p>

				<div className={styles.section}>
					<h2>{"What we collect"}</h2>
					<p>
						<strong>{"Nothing. "}</strong>
						{
							"Pomo Note has no backend, no account system, no analytics, no tracking, no advertising SDKs, and no third-party services. We do not collect, transmit, or store any personal information."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Microphone & speech recognition"}</h2>
					<p>
						{
							"To transcribe your voice into notes, Pomo Note requires two permissions:"
						}
					</p>
					<ul>
						<li>
							<strong>{"Microphone access"}</strong>
							{
								" — to capture audio while you're recording a session. Audio is processed in real time and is never saved as a file."
							}
						</li>
						<li>
							<strong>{"Speech recognition"}</strong>
							{
								" — to convert that audio into text using Apple's on-device Speech framework. Recognition happens locally on your iPhone and does not require an internet connection."
							}
						</li>
					</ul>
					<p>
						{
							"You can revoke either permission at any time in Settings → Pomo Note. The timer will continue to work without them, but voice transcription will be disabled."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Where your notes live"}</h2>
					<p>
						{
							"Transcribed notes are stored locally on your iPhone. They are not uploaded to any server, synced to any cloud account, or shared with any third party. If you delete the app, your notes are deleted with it."
						}
					</p>
					<p>
						{
							"Pomo Note does not back up your notes to iCloud, AirDrop them, or transmit them to any other device automatically. If you want a copy, you'll need to export it yourself."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Notifications & Live Activities"}</h2>
					<p>
						{
							"Pomo Note may show a Live Activity on the lock screen and Dynamic Island while a pomodoro is running, and may post a local notification when the timer ends. These run entirely on your device — Apple's notification system delivers them, and no third-party push service is involved."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Children's privacy"}</h2>
					<p>
						{
							"Pomo Note does not knowingly collect any information from anyone, including children under 13. Because the app does not collect data at all, there is nothing to share or sell."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Changes to this policy"}</h2>
					<p>
						{
							'If the privacy policy changes — for example, if a future version of Pomo Note adds an optional sync feature — the new policy will be posted here and the "Last updated" date above will be revised. Material changes will be communicated in the App Store "What\'s New" notes.'
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Contact"}</h2>
					<div className={styles.contactCard}>
						<p>
							{"Questions about privacy? Email "}
							<a href="mailto:hello@roush.io?subject=Pomo%20Note%20Privacy">
								{"hello@roush.io"}
							</a>
							{"."}
						</p>
						<p>
							{"Back to the "}
							<Link href="/pomo-note">{"Pomo Note support page"}</Link>
							{"."}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

PomoNotePrivacy.getLayout = getPomoNoteLayout;
