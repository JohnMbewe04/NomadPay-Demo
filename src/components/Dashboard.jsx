import React, { useState } from "react";
import {
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaChartPie,
  FaEthereum,
  FaDollarSign,
  FaCoins,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Menu, X } from "lucide-react"; // for mobile toggle button
import TransferTab from "./TransferTab";
import RatesTab from "./RatesTab";
import WalletTab from "./WalletTab";

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

const currencyIcons = {
  SUI: <FaCoins color="#00bcd4" size={16} />,
  USDT: <FaDollarSign color="#4caf50" size={16} />,
  ETH: <FaEthereum color="#ff9800" size={16} />,
};

const demoAnalyticsData = [
  { time: "Jan", SUI: 0.65, USDT: 1.0, ETH: 1750 },
  { time: "Feb", SUI: 0.66, USDT: 1.0, ETH: 1800 },
  { time: "Mar", SUI: 0.67, USDT: 1.0, ETH: 1820 },
  { time: "Apr", SUI: 0.69, USDT: 1.0, ETH: 1850 },
  { time: "May", SUI: 0.68, USDT: 1.0, ETH: 1845 },
];

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

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("wallet");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b1a3d] text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#12254a] flex flex-col p-6 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0`}
      >
        <h1 className="text-3xl font-bold mb-10">NomadPay</h1>
        <nav className="flex flex-col gap-4">
          {tabs.map(({ key, label, icon, subtext }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setSidebarOpen(false); // close sidebar on mobile when selecting
              }}
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
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between bg-[#12254a] p-4 lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold">NomadPay</h1>
        </header>

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
            </section>
          )}
          {activeTab === "rates" && <RatesTab />}
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
                    <Line type="monotone" dataKey="SUI" stroke="#00bcd4" />
                    <Line type="monotone" dataKey="USDT" stroke="#4caf50" />
                    <Line type="monotone" dataKey="ETH" stroke="#ff9800" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {renderCustomLegend()}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
