// src/App.tsx
import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"

function App() {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		fcl.currentUser().subscribe(setUser)
	}, [])

	const logIn = () => fcl.authenticate()
	const logOut = () => fcl.unauthenticate()

	return (
		<div>
			<div>
				<h1>Scorify</h1>

				{user?.addr ? (
					<div>
						<p>✅ Connected as:</p>
						<code>{user.addr}</code>
						<button
							onClick={logOut}
						>
							Disconnect
						</button>
					</div>
				) : (
					<button
						onClick={logIn}>
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	)
}

export default App
