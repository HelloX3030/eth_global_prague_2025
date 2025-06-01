import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet icon issues in React environment
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

function App() {
	const [user, setUser] = useState<any>(null)
	const [position, setPosition] = useState<[number, number] | null>(null)
	const [loadingPosition, setLoadingPosition] = useState(true)

	useEffect(() => {
		fcl.currentUser().subscribe(setUser)
	}, [])

	useEffect(() => {
		if (!navigator.geolocation) {
			setLoadingPosition(false)
			return
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition([pos.coords.latitude, pos.coords.longitude])
				setLoadingPosition(false)
			},
			(err) => {
				console.error("Geolocation error:", err)
				setLoadingPosition(false)
			}
		)
	}, [])

	const logIn = () => fcl.authenticate()
	const logOut = () => fcl.unauthenticate()

	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Header with login UI */}
			<div
				style={{
					padding: "1rem",
					backgroundColor: "#333",
					color: "white",
					zIndex: 1000,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1 style={{ margin: 0 }}>Scorify</h1>

				{user?.addr ? (
					<div>
						<p style={{ margin: 0, display: "inline", marginRight: "1rem" }}>
							✅ Connected as: <code style={{ color: "#0f0" }}>{user.addr}</code>
						</p>
						<button
							onClick={logOut}
							style={{
								cursor: "pointer",
								padding: "0.3rem 0.8rem",
								borderRadius: "4px",
								border: "none",
								backgroundColor: "#0a8",
								color: "white",
							}}
						>
							Disconnect
						</button>
					</div>
				) : (
					<button
						onClick={logIn}
						style={{
							cursor: "pointer",
							padding: "0.3rem 0.8rem",
							borderRadius: "4px",
							border: "none",
							backgroundColor: "#08f",
							color: "white",
						}}
					>
						Connect Wallet
					</button>
				)}
			</div>

			{/* Map or loading message */}
			<div style={{ flexGrow: 1 }}>
				{loadingPosition ? (
					<div
						style={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "#666",
							backgroundColor: "#f0f0f0",
							fontSize: "1.2rem",
						}}
					>
						Loading your position...
					</div>
				) : (
					<MapContainer
						center={position ?? [0, 0]}
						zoom={position ? 13 : 2}
						style={{ height: "100%", width: "100%" }}
						scrollWheelZoom={true}
					>
						{/* Soft light theme tile */}
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
						/>
						{position && (
							<Marker position={position}>
								<Popup>Your current position</Popup>
							</Marker>
						)}
					</MapContainer>
				)}
			</div>
		</div>
	)
}

export default App
