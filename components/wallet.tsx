import { ethers } from 'ethers'

declare global {
	interface Window {
		ethereum?: any;
	}
}

export async function connectWallet() {
	try {
		if (!window.ethereum) {
			alert("No wallet found")
			return { provider: null, signer: null, address: null }
		}

		const provider = new ethers.BrowserProvider(window.ethereum)
		await provider.send("eth_requestAccounts", [])
		const signer = await provider.getSigner()
		const address = await signer.getAddress()
		return { provider, signer, address }
	} catch (error) {
		console.error("Error connecting wallet:", error)
		alert("Failed to connect wallet")
		return { provider: null, signer: null, address: null }
	}
}
