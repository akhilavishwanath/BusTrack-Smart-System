import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,

				tabBarStyle: {
					backgroundColor: "#0f172a",
					borderTopWidth: 0,
					height: 75,
					paddingBottom: 10,
					paddingTop: 8,
				},

				tabBarActiveTintColor: "#22c55e",

				tabBarInactiveTintColor: "#94a3b8",

				tabBarLabelStyle: {
					fontSize: 10,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="tracking"
				options={{
					title: "Track",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name="bus" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="prediction"
				options={{
					title: "Predict",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name="analytics" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="chatbot"
				options={{
					title: "Chat",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name="chatbubble-ellipses" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",

					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
