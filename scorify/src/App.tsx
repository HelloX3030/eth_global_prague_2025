import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { scoreEntries } from "./ScoreEntry" // Adjust path as needed

// Fix Leaflet icon issues in React environment
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

// Helper: Calculate distance between two lat/lng points in meters
function getDistanceFromLatLonInMeters(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const R = 6371000 // Earth radius in meters
	const dLat = ((lat2 - lat1) * Math.PI) / 180
	const dLon = ((lon2 - lon1) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
		Math.cos((lat2 * Math.PI) / 180) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

// Replace with your recipient Flow address (hex, no 0x prefix)
const RECIPIENT_ADDRESS = "f8d6e0586b0a20c7" // Example emulator address

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

	// Check if user is within 100 meters of challenge
	const isUserNear = (challengePos: [number, number]) => {
		if (!position) return false
		const distance = getDistanceFromLatLonInMeters(
			position[0],
			position[1],
			challengePos[0],
			challengePos[1]
		)
		return distance <= 100
	}

	// Flow token transfer transaction via FCL
	const transferFlowTokens = async (recipient: string, amount: string) => {
		try {
			const transactionId = await fcl
				.send([
					fcl.transaction`
            import FungibleToken from 0xf233dcee88fe0abe
            import FlowToken from 0xf233dcee88fe0abe

            transaction(recipient: Address, amount: UFix64) {
              let senderVault: &FlowToken.Vault

              prepare(signer: AuthAccount) {
                self.senderVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                  ?? panic("Could not borrow reference to the sender's Vault")
              }

              execute {
                let recipient = getAccount(recipient)
                let receiver = recipient.getCapability(/public/flowTokenReceiver)
                  .borrow<&{FungibleToken.Receiver}>()
                  ?? panic("Could not borrow receiver reference to the recipient's Vault")
                self.senderVault.withdraw(amount: amount)
                  |> receiver.deposit(from: <- self.senderVault.withdraw(amount: amount))
              }
            }
          `,
					fcl.args([fcl.arg(recipient, fcl.t.Address), fcl.arg(amount, fcl.t.UFix64)]),
					fcl.proposer(fcl.authz),
					fcl.payer(fcl.authz),
					fcl.authorizations([fcl.authz]),
					fcl.limit(100),
				])
				.then(fcl.decode)

			alert(`Payment successful! Transaction ID: ${transactionId}`)
		} catch (error: any) {
			console.error("Payment failed:", error)
			alert(`Payment failed: ${error.message || error}`)
		}
	}

	const handlePay = async (cost: number) => {
		if (!user?.addr) {
			alert("Please connect your wallet first.")
			return
		}
		// Format cost as UFix64 string with 8 decimals
		const amount = cost.toFixed(8)
		await transferFlowTokens(RECIPIENT_ADDRESS, amount)
	}

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

						{/* Challenge markers */}
						{scoreEntries.map((entry, index) => {
							const near = isUserNear(entry.worldPosition)
							return (
								<Marker key={index} position={entry.worldPosition}>
									<Popup>
										<div>
											<strong>{entry.name}</strong>
											<br />
											Score: {entry.score}
											<br />
											Time: {entry.time.toLocaleString()}
											<br />
											Price: ${entry.price}
											{entry.cost !== undefined && entry.cost > 0 && (
												<>
													<br />
													Cost: ${entry.cost}
													<br />
													{near ? (
														<button onClick={() => handlePay(entry.cost!)}>
															Pay Cost
														</button>
													) : (
														<small>Get closer to pay</small>
													)}
												</>
											)}
										</div>
									</Popup>
								</Marker>
							)
						})}
					</MapContainer>
				)}
			</div>
		</div>
	)
}

export default App
