// // wallet.ts
// import { useWalletConnect } from '@walletconnect/react-native-dapp'
// import { ethers } from 'ethers'

// export function useWallet() {
// 	const connector = useWalletConnect()

// 	const connectWallet = async () => {
// 		if (!connector.connected) {
// 			await connector.connect()
// 		}

// 		const address = connector.accounts[0]
// 		const provider = new ethers.providers.Web3Provider(connector as any)
// 		const signer = provider.getSigner()

// 		return { connector, address, provider, signer }
// 	}

// 	const disconnectWallet = async () => {
// 		if (connector.connected) {
// 			await connector.killSession()
// 		}
// 	}

// 	return { connectWallet, disconnectWallet, connector }
// }
