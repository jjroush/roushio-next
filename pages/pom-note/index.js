import Link from "next/link";
import { NextSeo } from "next-seo";

import { getPomNoteLayout } from "../../components/pom-note/layout";
import styles from "../../styles/pom-note.module.css";

export default function PomNote() {
	return (
		<>
			<NextSeo
				description="Pom Note — a pomodoro voice transcription app for hyper-focused notetaking. Set a timer, speak your thoughts, and let Pom Note transcribe them into organized notes."
				title="Pom Note — Focus Timer + Voice Notes"
			/>
			<div className={styles.page}>
				<h1 className={styles.pageTitle}>{"Support"}</h1>
				<p className={styles.subtitle}>
					{"Focus Timer + Voice Notes for iPhone"}
				</p>

				<p className={styles.lede}>
					{
						"Stay in flow. Set a pomodoro timer, speak your thoughts, and let Pom Note transcribe them into organized notes — all on-device, all private."
					}
				</p>

				<div className={styles.featureGrid}>
					<div className={styles.featureCard}>
						<h3>{"Pomodoro Timer"}</h3>
						<p>
							{
								"Tap to start a focused session. Live Activities and Dynamic Island keep your countdown visible without breaking focus."
							}
						</p>
					</div>
					<div className={styles.featureCard}>
						<h3>{"Voice Transcription"}</h3>
						<p>
							{
								"Tap the mic and speak naturally. Notes auto-save after a brief pause, so you never have to stop and type."
							}
						</p>
					</div>
					<div className={styles.featureCard}>
						<h3>{"On-Device Privacy"}</h3>
						<p>
							{
								"Speech recognition runs on your iPhone. Your notes stay on your device — no servers, no accounts."
							}
						</p>
					</div>
					<div className={styles.featureCard}>
						<h3>{"Organized by Category"}</h3>
						<p>
							{
								"Group sessions by topic — reading, study, work, projects — and revisit notes from past sessions any time."
							}
						</p>
					</div>
				</div>

				<div className={styles.section}>
					<h2>{"Getting Started"}</h2>
					<ol>
						<li>
							{
								"Open Pom Note and pick a category, or create one for the topic you're focusing on."
							}
						</li>
						<li>
							{
								"Set your timer length and tap the timer to start your pomodoro."
							}
						</li>
						<li>
							{
								"Tap the microphone button to begin recording. Speak naturally — your words are transcribed live."
							}
						</li>
						<li>
							{
								"Pause briefly between thoughts and Pom Note will save each as its own timestamped note."
							}
						</li>
					</ol>
					<p className={styles.note}>
						<span className={styles.recordDot} />
						{
							"The orange-red indicator means your microphone is active. Tap the button again to stop recording at any time."
						}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"Permissions"}</h2>
					<p>
						{
							"Pom Note asks for two permissions on first launch: microphone access (to capture audio) and speech recognition (to convert audio to text). Both are required for the app's core feature. You can review or change these at any time in "
						}
						<strong>{"Settings → Pom Note"}</strong>
						{"."}
					</p>
				</div>

				<div className={styles.section}>
					<h2>{"FAQ"}</h2>

					<div className={styles.faqItem}>
						<h3>{"Where are my notes stored?"}</h3>
						<p>
							{
								"On your iPhone, locally. Pom Note has no backend, no account system, and no analytics. Your notes never leave your device."
							}
						</p>
					</div>

					<div className={styles.faqItem}>
						<h3>{"Does the app work offline?"}</h3>
						<p>
							{
								"Yes. Speech recognition runs on-device using Apple's Speech framework, so the timer and transcription work without an internet connection."
							}
						</p>
					</div>

					<div className={styles.faqItem}>
						<h3>{"What happens if I deny microphone access?"}</h3>
						<p>
							{
								"The timer still works, but voice transcription requires microphone and speech recognition permissions. To re-enable, go to Settings → Pom Note and toggle them back on."
							}
						</p>
					</div>

					<div className={styles.faqItem}>
						<h3>{"What happens when the timer ends?"}</h3>
						<p>
							{
								"You'll get a notification — even if the app is in the background — and the timer turns red on the lock screen Live Activity."
							}
						</p>
					</div>
				</div>

				<div className={styles.section}>
					<h2>{"Contact"}</h2>
					<div className={styles.contactCard}>
						<p>
							{"Bug reports, feature requests, or feedback — email "}
							<a href="mailto:hello@roush.io?subject=Pom%20Note">
								{"hello@roush.io"}
							</a>
							{"."}
						</p>
						<p>
							{"See the "}
							<Link href="/pom-note/privacy">{"Privacy Policy"}</Link>
							{" for details on data handling."}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

PomNote.getLayout = getPomNoteLayout;
