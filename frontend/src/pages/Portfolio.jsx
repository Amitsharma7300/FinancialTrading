import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Portfolio() {
  const [transactions, setTransactions] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [wallet, setWallet] = useState(0);
  const [sellUnits, setSellUnits] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch transactions & wallet
  const fetchData = async () => {
    try {
      setLoading(true);
      const resTx = await API.get('/transactions/me');
      setTransactions(resTx.data.transactions);

      const holdings = {};
      resTx.data.transactions.forEach(tx => {
        const pid = tx.product._id;
        if (!holdings[pid]) holdings[pid] = { units: 0, product: tx.product, invested: 0 };
        if (tx.type === 'buy') {
          holdings[pid].units += tx.units;
          holdings[pid].invested += tx.total;
        } else {
          holdings[pid].units -= tx.units;
          holdings[pid].invested -= tx.total;
        }
      });
      setProductsMap(holdings);

      const u = JSON.parse(localStorage.getItem('user') || '{}');
      setWallet(u?.wallet ?? 0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sell handler
  const handleSell = async (productId) => {
    const units = Number(sellUnits[productId]);
    if (!units || units <= 0) return alert('Enter valid units');

    const holding = productsMap[productId];
    if (!holding || units > holding.units) return alert('Cannot sell more than held');

    try {
      const res = await API.post('/transactions/sell', { productId, units });
      setWallet(res.data.wallet);

      const tx = res.data.transaction;

      setProductsMap(prev => {
        const copy = { ...prev };
        // Calculate proportional invested before updating units
        const proportionalInvested = (holding.invested / holding.units) * units;

        copy[productId].units -= units;
        copy[productId].invested -= proportionalInvested;

        // Remove product if all units sold
        if (copy[productId].units <= 0) delete copy[productId];

        return copy;
      });

      setTransactions(prev => [res.data.transaction, ...prev]);
      setSellUnits(prev => ({ ...prev, [productId]: '' }));
    } catch (err) {
      alert(err.response?.data?.message || 'Sell failed');
    }
  };

  const rows = Object.values(productsMap);
  const totalInvested = rows.reduce((s,r) => s + r.invested, 0);
  const currentValue = rows.reduce((s,r) => s + r.units * r.product.price, 0);
  const returns = currentValue - totalInvested;

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Portfolio
        </h2>
        <p className="text-center text-slate-300 mb-10">
          Wallet Balance: <span className="font-semibold text-white">₹{wallet}</span>
        </p>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-cyan-500/20 transition">
            <p className="text-slate-400">Total Invested</p>
            <p className="text-2xl font-bold text-white">₹{totalInvested.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-cyan-500/20 transition">
            <p className="text-slate-400">Current Value</p>
            <p className="text-2xl font-bold text-white">₹{currentValue.toFixed(2)}</p>
          </div>
          <div
            className={`p-6 rounded-2xl shadow-lg backdrop-blur-xl border transition ${
              returns >= 0
                ? 'bg-emerald-500/10 border-emerald-500/30 hover:shadow-emerald-500/20'
                : 'bg-red-500/10 border-red-500/30 hover:shadow-red-500/20'
            }`}
          >
            <p className="text-slate-400">Returns</p>
            <p className={`text-2xl font-bold ${returns >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ₹{returns.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Holdings */}
        <h3 className="text-2xl font-semibold text-white mb-6">Holdings</h3>
        {rows.length === 0 && <div className="text-slate-400">No holdings yet.</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map(r => (
            <div key={r.product._id} className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-cyan-500/20 transition">
              <h4 className="text-lg font-bold text-white mb-2">{r.product.name}</h4>
              <p className="text-slate-300">Units: {r.units}</p>
              <p className="text-slate-300">Invested: ₹{r.invested.toFixed(2)}</p>
              <p className="text-slate-300">Price per unit: ₹{r.product.price}</p>
              <p className={`text-lg font-semibold mt-3 ${r.units * r.product.price - r.invested >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                Current Value: ₹{(r.units * r.product.price).toFixed(2)}
              </p>

              {/* Sell Input */}
              {r.units > 0 && (
                <div className="mt-4">
                  <input
                    type="number"
                    min="1"
                    placeholder="Units to sell"
                    value={sellUnits[r.product._id] || ''}
                    onChange={e => setSellUnits(prev => ({ ...prev, [r.product._id]: e.target.value }))}
                    className="w-full px-2 py-1 rounded border border-gray-300"
                  />
                  <button
                    onClick={() => handleSell(r.product._id)}
                    className="mt-1 w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                  >
                    Sell
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
