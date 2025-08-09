import React, { useState, useEffect } from "react";
import {
  Line
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Demo icons URLs (replace or import your own icons)
const currencyIcons = {
  USD: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=014",
  EUR: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Euro_symbol_black.svg",
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=014",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014",
  SUI: "https://cryptologos.cc/logos/sui-sui-logo.svg?v=014",
};

const allCurrencies = ["USD", "EUR", "BTC", "ETH", "SUI"];

const mockRatesData = {
  // base: [other currencies + daily rates]
  USD: {
    EUR: [0.92, 0.91, 0.93, 0.94, 0.95, 0.94, 0.96],
    BTC: [0.000027, 0.000028, 0.000029, 0.000027, 0.000026, 0.000027, 0.000028],
    ETH: [0.00039, 0.00041, 0.00040, 0.00042, 0.00043, 0.00041, 0.00044],
    SUI: [10.5, 11, 10.8, 11.2, 11.5, 11.3, 11.4],
  },
  BTC: {
    USD: [37000, 37500, 37200, 37400, 37600, 37800, 37700],
    EUR: [34000, 34500, 34200, 34400, 34600, 34700, 34650],
    ETH: [14.3, 14.5, 14.4, 14.6, 14.7, 14.5, 14.8],
    SUI: [390000, 395000, 392000, 394000, 396000, 398000, 397000],
  },
  // Add similar for EUR, ETH, SUI if you want, or fallback
};

export default function RatesTab() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    allCurrencies.filter((c) => c !== baseCurrency)
  );

  useEffect(() => {
    // Reset selected currencies when base changes
    setSelectedCurrencies(allCurrencies.filter((c) => c !== baseCurrency));
  }, [baseCurrency]);

  // Prepare data for ChartJS
  const labels = ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "Yesterday", "Today"];

  const datasets = selectedCurrencies.map((currency, idx) => {
    const rates =
      mockRatesData[baseCurrency]?.[currency] ||
      Array(labels.length).fill(Math.random() * 10 + 1);

    // Use different colors for each currency
    const colors = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
    ];

    return {
      label: `${baseCurrency}/${currency}`,
      data: rates,
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length],
      fill: false,
      tension: 0.3,
    };
  });

  const data = {
    labels,
    datasets,
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          font: { size: 14 },
          generateLabels: (chart) =>
            chart.data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              strokeStyle: dataset.borderColor,
              hidden: !chart.isDatasetVisible(i),
              index: i,
              // Add icon to legend label here via canvas or as a hack:
              // We'll use HTML legend outside Chart.js for a better approach
            })),
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: `Exchange Rates for ${baseCurrency}`,
        font: { size: 20 },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Exchange Rate",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  // Simple AI interpretation of displayed data (demo)
  const generateInterpretation = () => {
    if (selectedCurrencies.length === 0) return "No currencies selected.";
    return `The graph shows how the exchange rates of ${baseCurrency} against ${selectedCurrencies.join(
      ", "
    )} have fluctuated over the past week. Notably, ${
      selectedCurrencies[0]
    } had the most volatility, while ${
      selectedCurrencies[selectedCurrencies.length - 1]
    } remained relatively stable.`;
  };

  // Toggle visibility of currency dataset on click legend
  const handleLegendClick = (currency) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currency));
    } else {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
  };

  return (
    <div className="p-6 bg-[#12254a] rounded-md text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Rates</h2>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="base-currency" className="text-lg font-semibold">
          Base Currency:
        </label>
        <select
          id="base-currency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="bg-[#0b1a3d] text-white px-3 py-1 rounded"
        >
          {allCurrencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <Line options={options} data={data} />

      {/* Custom legend with icons */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {allCurrencies
          .filter((c) => c !== baseCurrency)
          .map((currency) => (
            <div
              key={currency}
              className={`flex items-center cursor-pointer space-x-2 p-2 rounded ${
                selectedCurrencies.includes(currency) ? "bg-cyan-700" : "bg-gray-700"
              } hover:bg-cyan-600 transition`}
              onClick={() => handleLegendClick(currency)}
            >
              <img
                src={currencyIcons[currency]}
                alt={currency}
                className="w-6 h-6 rounded"
              />
              <span>{currency}</span>
            </div>
          ))}
      </div>

      <div className="mt-8 bg-[#0b1a3d] p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">AI Interpretation</h3>
        <p>{generateInterpretation()}</p>
      </div>
    </div>
  );
}
