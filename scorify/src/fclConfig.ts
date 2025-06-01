import * as fcl from "@onflow/fcl"

fcl.config()
	.put("app.detail.title", "Scorify")
	.put("app.detail.icon", "https://flow.com/images/logo.png") // optional icon
	.put("accessNode.api", "https://rest-testnet.onflow.org") // Testnet endpoint
	.put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // Wallets
