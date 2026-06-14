import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Dashboard() {
	const [dashboard, setDashboard] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch(`${API_BASE_URL}/dashboard`)
			.then((response) => response.json())
			.then(setDashboard)
			.catch(() => setError("Backend offline"));
	}, []);

	const routes = dashboard?.featuredRoutes || [];

	return (
		<section
			id="dashboard"
			style={{
				padding: "70px 50px",
				background: "#07111f",
			}}
		>
			<div style={{ maxWidth: "1150px", margin: "0 auto" }}>
				<p style={{ color: "#2dd4bf", fontWeight: 700, marginBottom: "10px" }}>
					Live dashboard
				</p>
				<h2 style={{ fontSize: "42px", marginBottom: "12px" }}>
					Hyderabad route status
				</h2>
				<p style={{ color: "#94a3b8", maxWidth: "680px", lineHeight: "28px" }}>
					Web and mobile are connected to the same bus route, ETA, login, and
					crowd prediction APIs.
				</p>

				{error ? (
					<div
						style={{
							background: "#7f1d1d",
							color: "#fecaca",
							padding: "14px",
							borderRadius: "8px",
							marginTop: "22px",
						}}
					>
						{error}
					</div>
				) : null}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
						gap: "16px",
						marginTop: "28px",
					}}
				>
					<Stat label="Total routes" value={dashboard?.totalRoutes || 0} />
					<Stat label="Active buses" value={dashboard?.activeBuses || 0} />
					<Stat
						label="Average ETA"
						value={`${dashboard?.averageEtaMinutes || 0} min`}
					/>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "16px",
						marginTop: "26px",
					}}
				>
					{routes.map((route) => (
						<div
							key={`${route.number}-${route.routeId}`}
							style={{
								background: "#101c2e",
								border: "1px solid rgba(255,255,255,0.08)",
								borderRadius: "8px",
								padding: "18px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "12px",
								}}
							>
								<h3 style={{ fontSize: "26px" }}>{route.number}</h3>
								<span style={{ color: "#5eead4", fontWeight: 700 }}>
									{route.crowd}
								</span>
							</div>
							<p
								style={{
									color: "#94a3b8",
									marginTop: "8px",
									lineHeight: "22px",
								}}
							>
								{route.originDestination}
							</p>
							<p style={{ color: "#f8fafc", marginTop: "14px" }}>
								ETA {route.etaMinutes} min • Occupancy {route.occupancyPercent}%
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function Stat({ label, value }) {
	return (
		<div
			style={{
				background: "#101c2e",
				border: "1px solid rgba(255,255,255,0.08)",
				borderRadius: "8px",
				padding: "20px",
			}}
		>
			<strong style={{ display: "block", fontSize: "30px" }}>{value}</strong>
			<span style={{ color: "#94a3b8" }}>{label}</span>
		</div>
	);
}

export default Dashboard;
