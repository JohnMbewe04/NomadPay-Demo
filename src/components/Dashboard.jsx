import React, { useState } from "react";
import { FaWallet, FaExchangeAlt, FaChartLine, FaChartPie } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaEthereum, FaDollarSign, FaCoins } from "react-icons/fa"; // import icons
import TransferTab from "./TransferTab"; // Assuming you have a TransferTab component
import RatesTab from "./RatesTab"; // Assuming you have a RatesTab component
import WalletTab from "./WalletTab"; // Assuming you have a WalletTab component

const tabs = [
  {
    key: "wallet",
    label: "Wallet",
    icon: <FaWallet size={20} />,
    subtext: "Your wallet balance and token info",
  },
  {
    key: "transfer",
    label: "Transfer",
    icon: <FaExchangeAlt size={20} />,
    subtext: "Send payments securely",
  },
  {
    key: "rates",
    label: "Rates",
    icon: <FaChartPie size={20} />,
    subtext: "ERC20 / UniswapV2 / KyberSwap data (from subgraphs)",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <FaChartLine size={20} />,
    subtext: "Interactive line graph of coin rates with AI insights",
  },
];

// Demo data for wallet
const demoWallet = {
  address: "0x123...abc",
  balance: 15.6789,
  tokens: [
    { symbol: "SUI", balance: 10.5 },
    { symbol: "USDT", balance: 3.0 },
    { symbol: "ETH", balance: 0.12 },
  ],
};

// Demo data for rates
const demoRates = [
  { name: "SUI", rate: 0.67 },
  { name: "USDT", rate: 1.0 },
  { name: "ETH", rate: 1840.55 },
  { name: "BTC", rate: 34000.75 },
];

// Demo data for analytics graph (rates over time)
const demoAnalyticsData = [
  { time: "Jan", SUI: 0.65, USDT: 1.0, ETH: 1750 },
  { time: "Feb", SUI: 0.66, USDT: 1.0, ETH: 1800 },
  { time: "Mar", SUI: 0.67, USDT: 1.0, ETH: 1820 },
  { time: "Apr", SUI: 0.69, USDT: 1.0, ETH: 1850 },
  { time: "May", SUI: 0.68, USDT: 1.0, ETH: 1845 },
];

const currencyIcons = {
  SUI: <FaCoins color="#00bcd4" size={16} />,     // custom icon & color for SUI
  USDT: <FaDollarSign color="#4caf50" size={16} />, // USDT stablecoin icon
  ETH: <FaEthereum color="#ff9800" size={16} />,  // ETH icon
};

// Custom legend renderer for analytics graph
const renderCustomLegend = () => (
  <div className="flex gap-6 mt-2 text-white text-sm">
    {Object.entries(currencyIcons).map(([key, icon]) => (
      <div key={key} className="flex items-center gap-2">
        {icon}
        <span>{key}</span>
      </div>
    ))}
  </div>
);

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="flex min-h-screen bg-[#0b1a3d] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#12254a] flex flex-col p-6">
        <h1 className="text-3xl font-bold mb-10">NomadPay</h1>

        <nav className="flex flex-col gap-4">
          {tabs.map(({ key, label, icon, subtext }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-start gap-1 p-3 rounded-lg transition
                ${
                  activeTab === key
                    ? "bg-cyan-600 shadow-lg"
                    : "hover:bg-[#1b346f]"
                }`}
            >
              <div className="flex items-center gap-2 text-lg">
                {icon}
                <span className="font-semibold">{label}</span>
              </div>
              <small className="text-gray-400">{subtext}</small>
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="mt-auto px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === "wallet" && (
          <section>
            <WalletTab />
          </section>
        )}
        
        {activeTab === "transfer" && (
          <section className="bg-[#12254a] p-6 rounded shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Send Payment</h2>
            <TransferTab />
            <p className="mt-4 text-gray-400">
              Try sending 5 SUI to address <code className="bg-[#0b1a3d] px-1 rounded">0xabc...xyz</code>.
            </p>
          </section>
        )}

        {activeTab === "rates" && (
          <section>
            <RatesTab />
          </section>
        )}

        {activeTab === "analytics" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">3D Analytics Graphs</h2>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demoAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  {/* Remove default legend */}
                  {/* <Legend /> */}
                  <Line type="monotone" dataKey="SUI" stroke="#00bcd4" />
                  <Line type="monotone" dataKey="USDT" stroke="#4caf50" />
                  <Line type="monotone" dataKey="ETH" stroke="#ff9800" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Custom legend with icons */}
            {renderCustomLegend()}

            <p className="mt-6 bg-[#12254a] p-4 rounded">
              <strong>AI Interpretation:</strong> The graph shows that USDT remains stable at $1.00,
              while SUI and ETH have exhibited slight upward trends over the past five months,
              indicating moderate growth in their market values.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
