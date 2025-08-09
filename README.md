# NomadPay Demo Webapp

NomadPay – Your Passport to a Global Financial Network

---

## Core Features (Planned / In Development)

1. **zkLogin Authentication (Sui)**  
   - No wallet needed for sign-up: Users log in with familiar Web2 credentials (Google, Apple ID) while preserving on-chain privacy via zkLogin.  
   - Simplifies onboarding for non-crypto natives.

2. **On-chain Marketplace (Sui)**  
   - Integrated peer-to-peer marketplace for buying and selling goods and services.  
   - Built on Move smart contracts and Kiosk framework to enable transparent and decentralized commerce.

3. **Secure Vault with Walrus & Seal (Sui)**  
   - Embedded password and key manager to securely store PINs, seed phrases, and digital receipts using encryption technologies Seal and Walrus.  
   - Functions as a non-custodial vault with recovery features.

4. **Cross-Border Payment System**  
   - Allows users to send and receive funds across borders with minimal fees and real-time settlement.  
   - Supports local currency payouts and virtual E-cards for global ATM withdrawals and point-of-sale usage.

5. **Confidential Transactions via Sapphire (Oasis)**  
   - Enables private financial operations such as salary remittances, charitable donations, and microgrants with confidential smart contracts.

6. **Blockchain for Good Integration**  
   - Focuses on financial inclusion for unbanked populations, disaster-affected communities, migrant workers, and refugees.  
   - Facilitates transparent aid and remittance tracking via blockchain.  
   - Aligns with UN Sustainable Development Goals (SDGs): Decent Work & Economic Growth, Reduced Inequalities, and No Poverty.

7. **Subgraph (The Graph) Integration**  
   - Real-time indexing and querying of on-chain transaction data.  
   - Powers dashboard analytics, user financial insights, and SDG impact metric tracking.  
   - Optional integration with Token APIs for enriched metadata (e.g., transaction types, recipients).

---

## Sustainable Development Goals (SDGs) Impact

NomadPay contributes to global development by supporting several SDGs through decentralized finance and blockchain technology:

- **SDG 1: No Poverty**  
  Empowering unbanked and underbanked populations to access digital financial services and global markets.

- **SDG 8: Decent Work and Economic Growth**  
  Facilitating inclusive economic opportunities and secure transactions for individuals and SMEs worldwide.

- **SDG 10: Reduced Inequalities**  
  Promoting equitable access to financial services regardless of geographic, social, or economic status.

- **SDG 16: Peace, Justice, and Strong Institutions**  
  Enhancing transparency, reducing corruption, and improving trust with immutable blockchain records.

- **SDG 17: Partnerships for the Goals**  
  Leveraging decentralized networks, open data (subgraphs), and community collaboration to scale impact.

---

## Features (Demo App)

- Splash screen & welcome animation  
- Login with simulated Google sign-in  
- Sidebar navigation with icons & subtexts  
- Wallet overview (balances, tokens, transactions, staking, NFTs)  
- Transfer tab with manual and QR payment options, including downloadable receipts  
- Rates tab with subgraph-powered token prices  
- Analytics tab with interactive multi-line charts and AI-driven insights  

---

## Hosting

This demo webapp is deployed and hosted on [Vercel](https://vercel.com/), providing fast, secure, and globally distributed hosting optimized for React applications.  
The continuous deployment pipeline automatically updates the live site on every push to the main branch.

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)  
- npm or yarn  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nomadpay-demo.git
   cd nomadpay-demo
````

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) (or the URL displayed in your terminal).

---

## Project Structure

```
nomadpay-demo/
├── public/                 # Static assets (images, index.html)
├── src/
│   ├── components/         # React components (Dashboard, WalletTab, TransferTab, etc.)
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
├── package.json
├── vite.config.js          # Vite config
├── README.md
└── .gitignore
```

---

## Notes

* This is a demo application with simulated login and data. No real payments or blockchain interactions occur.
* Future work aims to integrate real blockchain data and zkLogin authentication for enhanced security and privacy.
* Feel free to customize components, add real data sources, or integrate with blockchain APIs for production use.

---

## License

MIT License © C. Mbewe, N. Mumba
