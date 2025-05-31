import { SignClient } from "@walletconnect/sign-client";

let signClient: InstanceType<typeof SignClient> | null = null;

//TODO:
export async function initWalletConnect() {
	if (signClient) return signClient;

	signClient = await SignClient.init({
		projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // get from https://cloud.walletconnect.com/apps
		metadata: {
			name: "YourAppName",
			description: "Your app description",
			url: "https://your.app",
			icons: ["https://your.app/icon.png"],
		},
	});

	return signClient;
}

export async function connectWallet() {
	const client = await initWalletConnect();

	const { uri, approval } = await client.connect({
		requiredNamespaces: {
			eip155: {
				methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
				chains: ["eip155:1"], // Ethereum mainnet; change as needed
				events: ["chainChanged", "accountsChanged"],
			},
		},
	});

	if (uri) {
		// This URI must be passed to a WalletConnect QR modal or deep link in mobile
		return { uri, approval };
	}

	return null;
}

export async function approveSession(approval: any) {
	const session = await approval();
	return session;
}
