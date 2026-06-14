import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import translations from "../../constants/language";

export default function HomeScreen() {
	const [currentLanguage, setCurrentLanguage] = useState("english");

	const t =
		currentLanguage === "telugu"
			? translations.telugu
			: currentLanguage === "hindi"
				? translations.hindi
				: currentLanguage === "urdu"
					? translations.urdu
					: translations.english;

	return (
		<ScrollView style={styles.container}>
			{/* LANGUAGE BUTTONS */}

			<View style={styles.langContainer}>
				<Pressable
					style={styles.langButton}
					onPress={() => setCurrentLanguage("english")}
				>
					<Text style={styles.langText}>English</Text>
				</Pressable>

				<Pressable
					style={styles.langButton}
					onPress={() => setCurrentLanguage("telugu")}
				>
					<Text style={styles.langText}>తెలుగు</Text>
				</Pressable>

				<Pressable
					style={styles.langButton}
					onPress={() => setCurrentLanguage("hindi")}
				>
					<Text style={styles.langText}>हिन्दी</Text>
				</Pressable>

				<Pressable
					style={styles.langButton}
					onPress={() => setCurrentLanguage("urdu")}
				>
					<Text style={styles.langText}>اردو</Text>
				</Pressable>
			</View>

			{/* HERO */}

			<View style={styles.heroCard}>
				<Text style={styles.heroTitle}>🚌 BusTrack Smart</Text>

				<Text style={styles.heroSubtitle}>{t.heroSubtitle}</Text>
			</View>

			{/* DASHBOARD */}

			<Text style={styles.sectionTitle}>🚀 {t.smartDashboard}</Text>

			<View style={styles.featureGrid}>
				<View style={styles.featureCard}>
					<Text style={styles.featureIcon}>📍</Text>

					<Text style={styles.featureTitle}>{t.liveTracking}</Text>
				</View>

				<View style={styles.featureCard}>
					<Text style={styles.featureIcon}>🤖</Text>

					<Text style={styles.featureTitle}>{t.chatbot}</Text>
				</View>

				<View style={styles.featureCard}>
					<Text style={styles.featureIcon}>📊</Text>

					<Text style={styles.featureTitle}>{t.crowdPrediction}</Text>
				</View>

				<View style={styles.featureCard}>
					<Text style={styles.featureIcon}>🗺</Text>

					<Text style={styles.featureTitle}>{t.smartNavigation}</Text>
				</View>
			</View>

			{/* LIVE CITY STATUS */}

			<Text style={styles.sectionTitle}>🌆 {t.liveCity}</Text>

			<View style={styles.statusCard}>
				<Text style={styles.statusText}>
					🟢 {t.cityTraffic}: {t.moderate}
				</Text>

				<Text style={styles.statusText}>🚍 {t.busesRunning}: 128</Text>

				<Text style={styles.statusText}>📈 {t.peakCrowd}: 8AM - 11AM</Text>

				<Text style={styles.statusText}>⚡ {t.aiAccuracy}: 96%</Text>
			</View>

			{/* AI INSIGHTS */}

			<Text style={styles.sectionTitle}>💡 {t.aiInsights}</Text>

			<View style={styles.insightCard}>
				<Text style={styles.insightText}>{t.travelAdvice}</Text>
			</View>

			{/* MULTILINGUAL */}

			<Text style={styles.sectionTitle}>🌐 {t.multilingual}</Text>

			<View style={styles.languageCard}>
				<Text style={styles.languageText}>✔ {t.englishSupport}</Text>

				<Text style={styles.languageText}>✔ {t.teluguSupport}</Text>

				<Text style={styles.languageText}>✔ {t.hindiSupport}</Text>

				<Text style={styles.languageText}>✔ {t.urduSupport}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#020617",
		padding: 20,
	},

	langContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginTop: 50,
		marginBottom: 20,
	},

	langButton: {
		backgroundColor: "#1e293b",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 12,
	},

	langText: {
		color: "white",
		fontWeight: "bold",
	},

	heroCard: {
		backgroundColor: "#22c55e",
		padding: 30,
		borderRadius: 24,
		marginBottom: 30,
	},

	heroTitle: {
		color: "white",
		fontSize: 34,
		fontWeight: "bold",
		marginBottom: 10,
	},

	heroSubtitle: {
		color: "white",
		fontSize: 18,
	},

	sectionTitle: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 18,
	},

	featureGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 30,
	},

	featureCard: {
		backgroundColor: "#0f172a",
		width: "48%",
		padding: 24,
		borderRadius: 22,
		marginBottom: 16,
		alignItems: "center",
	},

	featureIcon: {
		fontSize: 38,
		marginBottom: 12,
	},

	featureTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},

	statusCard: {
		backgroundColor: "#0f172a",
		padding: 24,
		borderRadius: 22,
		marginBottom: 30,
	},

	statusText: {
		color: "white",
		fontSize: 18,
		marginBottom: 14,
	},

	insightCard: {
		backgroundColor: "#22c55e",
		padding: 24,
		borderRadius: 22,
		marginBottom: 30,
	},

	insightText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},

	languageCard: {
		backgroundColor: "#0f172a",
		padding: 24,
		borderRadius: 22,
		marginBottom: 40,
	},

	languageText: {
		color: "white",
		fontSize: 18,
		marginBottom: 12,
	},
});
