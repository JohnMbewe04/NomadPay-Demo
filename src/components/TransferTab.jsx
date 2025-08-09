import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function TransferTab() {
  const [payWithQR, setPayWithQR] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!recipient || !amount || isNaN(amount) || amount <= 0) {
      setMessage({ type: "error", text: "Please enter a valid recipient and amount." });
      return;
    }

    // Simulate sending payment
    setMessage({ type: "success", text: `Sent ${amount} SUI to ${recipient}.` });
    setShowReceipt(true);
  };

  const downloadReceipt = () => {
    const receiptText = `
Payment Receipt
------------------------
Amount: ${amount} SUI
Recipient: ${recipient}
Status: Successful
Date: ${new Date().toLocaleString()}
    `;
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#12254a] p-6 rounded shadow-md max-w-md mx-auto relative">
      <h2 className="text-xl font-semibold mb-4">Send Payment</h2>

      <button
        onClick={() => {
          setPayWithQR(!payWithQR);
          setMessage(null);
          setShowReceipt(false);
        }}
        className="mb-4 px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500 text-white transition"
      >
        {payWithQR ? "Switch to Manual Transfer" : "Pay with QR Code"}
      </button>

      {payWithQR ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white mb-2">Scan this QR code to pay:</p>
          <QRCodeCanvas
            value={`payto:${recipient || "demo-address"}?amount=${amount || "0"}`}
            size={180}
            bgColor="#0b1a3d"
            fgColor="#00ffff"
            level="H"
          />
          <p className="text-xs text-gray-400 mt-2">* This is a demo QR code</p>
        </div>
      ) : (
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Recipient Address
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="mt-1 p-2 rounded bg-[#0b1a3d] border border-gray-600 text-white"
              required
            />
          </label>

          <label className="flex flex-col">
            Amount (SUI)
            <input
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="mt-1 p-2 rounded bg-[#0b1a3d] border border-gray-600 text-white"
              required
            />
          </label>

          {message && (
            <p className={message.type === "error" ? "text-red-400" : "text-green-400"}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 transition rounded px-4 py-2 text-white font-semibold"
          >
            Send Payment
          </button>
        </form>
      )}

      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#12254a] p-6 rounded shadow-lg max-w-sm w-full text-white">
            <h3 className="text-xl font-bold mb-4">Payment Receipt</h3>
            <p>Amount: {amount} SUI</p>
            <p>Recipient: {recipient}</p>
            <p>Status: Successful</p>
            <p>Date: {new Date().toLocaleString()}</p>

            <button
              onClick={downloadReceipt}
              className="mt-4 bg-green-600 hover:bg-green-500 rounded px-4 py-2"
            >
              Download Receipt
            </button>

            <button
              onClick={() => setShowReceipt(false)}
              className="mt-2 text-cyan-300 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferTab;
