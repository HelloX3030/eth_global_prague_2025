// walletLinker.ts

import { supabase } from '../lib/supabase'
import { connectWallet } from './wallet' // Your wallet connect function

export async function connectAndLinkWallet() {
	try {
		// Step 1: Connect wallet
		const { address } = await connectWallet()
		if (!address) return

		// Step 2: Get current Supabase user
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()

		if (userError || !user) {
			throw userError || new Error("No user found")
		}

		// Step 3: Update user record with wallet address
		const { error } = await supabase
			.from('users')
			.update({ wallet_address: address })
			.eq('id', user.id)

		if (error) throw error

		alert("Wallet linked successfully")
	} catch (err) {
		console.error("Failed to link wallet:", err)
		alert("Failed to link wallet")
	}
}
