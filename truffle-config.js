
const HDWalletProvider = require("@truffle/hdwallet-provider")
const keys = require("./keys.json")

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
    sepolia: {
  provider: () =>
    new HDWalletProvider({
        privateKeys: ["b6aa19a4c9db4aadf29709f00415d0535537bd25e6b1cfb7088bbf143e915549"],
        providerOrUrl: `wss://sepolia.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
      addressIndex: 0
    }),
  network_id: "11155111",
  gasPrice: 2500000000,
  networkCheckoutTimeout: 10000,
  timeoutBlocks: 200
}
  },
  compilers: {
    solc: {
      version: "0.8.4",
    }
  }
}

// BASE FEE (determnd by ethereum) => 39.791392694

// Max Priority Fee Per Gas(tip) => 2

// GAS PRICE = BASE FEE + TIP => 41.791392694

// GAS USED 21000

// Transaction Fee = GAS USED * GAS PRICE =
//                   41.791392694 * 21000

// BURNT FEE => BASE FEE * GAS USED
//           39.791392694 * 21000

// REST TO MINER => TIP * GAS USED
//                   2  * 21000


// NEXT_PUBLIC_TARGET_CHAIN_ID=1337
// NEXT_PUBLIC_NETWORK_ID=5777


/// transaction hash:    0xe143a15394eee248008627615d3a2bb934843b1d262b7c48762c6a811f24958e
/// contract address:    0xb6c1CCf0160F1225c30ED8A3451eDCbaB6afeAF8
