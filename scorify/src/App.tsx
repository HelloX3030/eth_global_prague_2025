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
		<div className="min-h-screen bg-gray-900 text-white relative">
			<h1 className="text-3xl font-bold mb-6">Scorify</h1>
			{user?.addr ? (
				<div className="flex flex-col items-center gap-4">
					<p>✅ Connected as:</p>
					<code className="bg-gray-800 px-4 py-2 rounded">{user.addr}</code>
					<button
						onClick={logOut}
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
					>
						Disconnect
					</button>
				</div>
			) : (
				<button
					onClick={logIn}
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
				>
					Connect Wallet
				</button>
			)}
		</div>
	)
}

export default App
