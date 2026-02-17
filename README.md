# 🎫 TokenMaster — Web3 NFT Ticketing Platform

A decentralized event ticketing marketplace built on Ethereum. Purchase NFT-powered tickets for concerts, sports, and conferences with full seat selection.

![Solidity](https://img.shields.io/badge/Solidity-0.8.17-blueviolet)
![React](https://img.shields.io/badge/React-18-61dafb)
![Hardhat](https://img.shields.io/badge/Hardhat-2.14-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **NFT Tickets** — Each ticket is a unique ERC-721 token
- **Visual Seat Selection** — Interactive seat map with real-time availability
- **MetaMask Integration** — Seamless wallet connection
- **Modern UI** — Glassmorphism, gradients, and smooth animations
- **Multi-Network** — Supports localhost and Polygon Amoy testnet
- **Responsive** — Fully mobile-friendly design

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Solidity, OpenZeppelin ERC-721 |
| Blockchain | Hardhat, Ethers.js v5 |
| Frontend | React 18, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Notifications | React Hot Toast |

## 📦 Quick Start

### Prerequisites
- Node.js 16+
- MetaMask browser extension

### Installation

```bash
git clone https://github.com/ishreyasrivastava/tokenmaster.git
cd tokenmaster
npm install
```

### Run Local Blockchain

```bash
# Terminal 1 — Start Hardhat node
npx hardhat node

# Terminal 2 — Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 — Start frontend
npm run dev
```

### Deploy to Amoy Testnet

```bash
cp .env.example .env
# Add your PRIVATE_KEY and AMOY_RPC_URL
npx hardhat run scripts/deploy.js --network amoy
```

### Run Tests

```bash
npx hardhat test
```

## 📸 Screenshots

<!-- Add screenshots here -->
| Home | Seat Selection |
|------|---------------|
| ![Home](screenshots/home.png) | ![Seats](screenshots/seats.png) |

## 📁 Project Structure

```
├── contracts/
│   └── TokenMaster.sol      # ERC-721 ticket contract
├── scripts/
│   └── deploy.js             # Deployment with 5 sample events
├── test/
│   └── TokenMaster.js        # Contract test suite
├── src/
│   ├── components/           # React components
│   ├── abis/                 # Contract ABI
│   ├── config.json           # Network addresses
│   ├── App.jsx               # Main app
│   └── index.css             # Tailwind + custom styles
├── hardhat.config.js
└── vite.config.js
```

## 📝 License

MIT — Built by **Shreya Srivastava**
