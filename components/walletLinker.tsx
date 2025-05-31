// import { supabase } from './supabaseClient'
// import { getWalletAddress } from './wallet'

// export async function linkWalletToSupabase(address: string) {
// 	const {
// 		data: { user },
// 		error: userError,
// 	} = await supabase.auth.getUser()

// 	if (userError || !user) throw userError || new Error("No user found")

// 	const { error } = await supabase
// 		.from('users')
// 		.update({ wallet_address: address })
// 		.eq('id', user.id)

// 	if (error) throw error
// }
