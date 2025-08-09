import React from "react";

const WalletTab = () => {
  const walletData = {
    address: "0x123...abc",
    totalBalance: 15.6789,
    tokens: [
      { symbol: "SUI", amount: 10.5, valueUSD: 52.3 },
      { symbol: "USDT", amount: 3, valueUSD: 3 },
      { symbol: "ETH", amount: 0.12, valueUSD: 220 },
    ],
    recentTransactions: [
      { id: 1, type: "Send", token: "SUI", amount: 2.5, date: "2025-08-05" },
      { id: 2, type: "Receive", token: "USDT", amount: 1.2, date: "2025-08-04" },
      { id: 3, type: "Swap", token: "ETH → SUI", amount: "0.05 → 1.1", date: "2025-08-02" },
    ],
    staking: {
      stakedSUI: 5.0,
      rewardsUSD: 12.5,
      apy: 6.2,
    },
    nftCount: 3,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <section className="bg-[#12254a] rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Wallet Overview</h2>
        <p className="mb-1"><strong>Address:</strong> <code className="bg-[#0b1a3d] px-2 py-1 rounded">{walletData.address}</code></p>
        <p className="text-lg font-semibold">Total Balance: <span className="text-cyan-400">{walletData.totalBalance.toFixed(4)} SUI</span></p>
      </section>

      <section className="bg-[#12254a] rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Tokens</h3>
        <div className="grid grid-cols-3 gap-4">
          {walletData.tokens.map(({ symbol, amount, valueUSD }) => (
            <div
              key={symbol}
              className="bg-[#0b1a3d] rounded p-4 flex flex-col items-center justify-center shadow-inner"
            >
              <span className="text-lg font-bold">{symbol}</span>
              <span className="text-cyan-300">{amount}</span>
              <span className="text-gray-400 text-sm">${valueUSD.toFixed(2)} USD</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#12254a] rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <ul className="divide-y divide-gray-700">
          {walletData.recentTransactions.map(({ id, date, type, amount, token }) => (
            <li key={id} className="py-2 flex justify-between">
              <span className="text-gray-400">{date}</span>
              <span>
                <strong>{type}</strong> {amount} {token}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#12254a] rounded-lg p-6 shadow-md max-w-sm mx-auto">
        <h3 className="text-xl font-semibold mb-4">Staking</h3>
        <p><strong>Staked SUI:</strong> {walletData.staking.stakedSUI}</p>
        <p><strong>Rewards:</strong> ${walletData.staking.rewardsUSD.toFixed(2)} USD</p>
        <p><strong>APY:</strong> {walletData.staking.apy}%</p>
      </section>

      <section className="bg-[#12254a] rounded-lg p-6 shadow-md max-w-sm mx-auto text-center">
        <h3 className="text-xl font-semibold mb-2">NFTs</h3>
        <p>You own <span className="font-bold">{walletData.nftCount}</span> NFT(s)</p>
      </section>
    </div>
  );
};

export default WalletTab;
