import { useContext, useState } from "react";

import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import translations from "../../constants/language";
import { LanguageContext } from "../../context/LanguageContext";

export default function ProfileScreen() {
	const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
	const t =
		currentLanguage === "telugu"
			? translations.telugu
			: currentLanguage === "hindi"
				? translations.hindi
				: currentLanguage === "urdu"
					? translations.urdu
					: translations.english;

	const [name, setName] = useState("");

	const [email, setEmail] = useState("");

	const [phone, setPhone] = useState("");

	const [savedProfile, setSavedProfile] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const saveProfile = async () => {
		try {
			const response = await fetch("http://192.168.106.177:3000/auth/login", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					name,
					email,
					phone,
				}),
			});

			const data = await response.json();

			console.log(data);

			setSavedProfile({
				name,
				email,
				phone,
			});

			setName("");
			setEmail("");
			setPhone("");

			Alert.alert("Success", "Profile saved successfully!");
		} catch (error) {
			console.log(error);

			Alert.alert("Error", "Failed to save profile");
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>👤 {t.profile}</Text>

			<Text style={styles.subtitle}>BusTrack Smart</Text>

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

			{/* NAME */}

			<Text style={styles.label}>{t.fullName}</Text>

			<TextInput
				value={name}
				onChangeText={setName}
				placeholder={t.fullName}
				placeholderTextColor="#94a3b8"
				style={styles.input}
			/>

			{/* EMAIL */}

			<Text style={styles.label}>{t.email}</Text>

			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder={t.email}
				placeholderTextColor="#94a3b8"
				keyboardType="email-address"
				style={styles.input}
			/>

			{/* PHONE */}

			<Text style={styles.label}>{t.phone}</Text>

			<TextInput
				value={phone}
				onChangeText={setPhone}
				placeholder={t.phone}
				placeholderTextColor="#94a3b8"
				keyboardType="phone-pad"
				style={styles.input}
			/>

			{/* SAVE BUTTON */}

			<Pressable style={styles.button} onPress={saveProfile}>
				<Text style={styles.buttonText}>{t.saveProfile}</Text>
			</Pressable>

			{/* SAVED PROFILE */}

			<View style={styles.aboutBox}>
				<Text style={styles.aboutTitle}>👤 {t.savedProfile}</Text>

				<Text style={styles.aboutText}>
					{t.fullName}: {savedProfile.name || "Not Added"}
				</Text>

				<Text style={styles.aboutText}>
					{t.email}: {savedProfile.email || "Not Added"}
				</Text>

				<Text style={styles.aboutText}>
					{t.phone}: {savedProfile.phone || "Not Added"}
				</Text>
			</View>

			{/* ABOUT */}

			<View style={styles.aboutBox}>
				<Text style={styles.aboutTitle}>🚌 BusTrack Smart</Text>

				<Text style={styles.aboutText}>✔ {t.liveTracking}</Text>

				<Text style={styles.aboutText}>✔ {t.crowdPrediction}</Text>

				<Text style={styles.aboutText}>✔ {t.etaPrediction}</Text>

				<Text style={styles.aboutText}>✔ {t.offlineAI}</Text>

				<Text style={styles.aboutText}>✔ {t.englishSupport}</Text>

				<Text style={styles.aboutText}>✔ {t.hindiSupport}</Text>

				<Text style={styles.aboutText}>✔ {t.teluguSupport}</Text>

				<Text style={styles.aboutText}>✔ {t.urduSupport}</Text>
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

	title: {
		color: "white",
		fontSize: 34,
		fontWeight: "bold",
		marginTop: 50,
	},

	subtitle: {
		color: "#94a3b8",
		fontSize: 16,
		marginBottom: 25,
		marginTop: 5,
	},

	langContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: 25,
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

	label: {
		color: "white",
		fontSize: 16,
		marginBottom: 8,
		marginTop: 12,
	},

	input: {
		backgroundColor: "#0f172a",
		color: "white",
		padding: 15,
		borderRadius: 14,
		fontSize: 16,
	},

	button: {
		backgroundColor: "#22c55e",
		padding: 18,
		borderRadius: 18,
		marginTop: 30,
		alignItems: "center",
	},

	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},

	aboutBox: {
		backgroundColor: "#0f172a",
		padding: 20,
		borderRadius: 20,
		marginTop: 30,
	},

	aboutTitle: {
		color: "#22c55e",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 12,
	},

	aboutText: {
		color: "white",
		fontSize: 16,
		marginBottom: 10,
	},
});
