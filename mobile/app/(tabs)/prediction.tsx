import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import translations from "../../constants/language";

export default function PredictionScreen() {
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

			{/* TITLE */}

			<Text style={styles.title}>📊 {t.prediction}</Text>

			{/* AI CARD */}

			<View style={styles.card}>
				<Text style={styles.cardText}>🤖 {t.aiCrowd}</Text>

				<Text style={styles.cardText}>📈 {t.passenger}</Text>

				<Text style={styles.cardText}>🚍 {t.smartEta}</Text>

				<Text style={styles.cardText}>🔴 {t.crowdStatus}: High</Text>

				<Text style={styles.cardText}>🟡 {t.traffic}: Medium</Text>

				<Text style={styles.cardText}>🟢 {t.seats}: 12</Text>

				<Text style={styles.cardText}>👥 {t.capacity}: 75%</Text>

				<Text style={styles.cardText}>⏰ {t.peak}: 8AM - 11AM</Text>

				<Text style={styles.cardText}>🛣 {t.demand}: High</Text>

				<Text style={styles.cardText}>
					💡 {t.suggestion}: {t.travelAdvice}
				</Text>
			</View>

			{/* ROUTE CARDS */}

			<View style={styles.routeCard}>
				<Text style={styles.routeTitle}>🚌 Route 1C</Text>

				<Text style={styles.routeInfo}>{t.crowdStatus}: High</Text>

				<Text style={styles.routeInfo}>ETA: 10 mins</Text>
			</View>

			<View style={styles.routeCard}>
				<Text style={styles.routeTitle}>🚌 Route 5/229</Text>

				<Text style={styles.routeInfo}>{t.crowdStatus}: Medium</Text>

				<Text style={styles.routeInfo}>ETA: 15 mins</Text>
			</View>

			<View style={styles.routeCard}>
				<Text style={styles.routeTitle}>🚌 Route 1D</Text>

				<Text style={styles.routeInfo}>{t.crowdStatus}: Low</Text>

				<Text style={styles.routeInfo}>ETA: 7 mins</Text>
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

	title: {
		color: "white",
		fontSize: 34,
		fontWeight: "bold",
		marginBottom: 20,
	},

	card: {
		backgroundColor: "#0f172a",
		padding: 20,
		borderRadius: 20,
		marginBottom: 20,
	},

	cardText: {
		color: "white",
		fontSize: 18,
		marginBottom: 15,
	},

	routeCard: {
		backgroundColor: "#111827",
		padding: 18,
		borderRadius: 18,
		marginBottom: 16,
	},

	routeTitle: {
		color: "#22c55e",
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},

	routeInfo: {
		color: "white",
		fontSize: 16,
		marginBottom: 6,
	},
});
