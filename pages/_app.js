import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
			includedDomains: ["roush.io"],
		});

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		router.events.on("routeChangeComplete", onRouteChangeComplete);

		return () => {
			router.events.off("routeChangeComplete", onRouteChangeComplete);
		};
	}, []);

	return (
		<>
			<Header />
			<div className={styles.gutter}>
				<div className={styles.container}>
					<Component {...pageProps} />
					<SpeedInsights />
				</div>
				<Footer />
			</div>
		</>
	);
}

export default MyApp;
