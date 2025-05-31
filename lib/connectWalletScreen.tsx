import React, { useState } from "react";
import { View, Text, Button, Linking, Alert } from "react-native";
import { connectWallet, approveSession } from "./walletLinker";

export default function ConnectWalletScreen() {
	const [wcUri, setWcUri] = useState<string | null>(null);
	const [session, setSession] = useState<any>(null);

	async function onConnect() {
		try {
			const res = await connectWallet();
			if (res?.uri) {
				setWcUri(res.uri);

				// Open wallet via deep link with the URI
				const wcLink = `wc:${res.uri}`;
				Linking.openURL(wcLink).catch(() => {
					Alert.alert("Error", "Could not open wallet app");
				});

				// Wait for user approval
				const session = await approveSession(res.approval);
				setSession(session);
				Alert.alert("Connected", `Wallet connected: ${session.namespaces.eip155.accounts[0]}`);
			} else {
				Alert.alert("Failed", "No WalletConnect URI returned");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "An unknown error occurred";
			Alert.alert("Error", message);
		}
	}

	return (
		<View style={{ padding: 20 }}>
			<Button title="Connect Wallet" onPress={onConnect} />
			{wcUri && <Text selectable>{wcUri}</Text>}
			{session && <Text>Connected Account: {session.namespaces.eip155.accounts[0]}</Text>}
		</View>
	);
}
