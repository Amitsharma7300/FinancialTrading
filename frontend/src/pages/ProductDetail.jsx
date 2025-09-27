import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [units, setUnits] = useState(1);
  const [message, setMessage] = useState('');
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    // Fetch product & history
    API.get(`/products/${id}`).then(res => {
      setProduct(res.data.product);
      setHistory(res.data.history || []);
    });

    // Check if product is in watchlist
    const fetchWatch = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await API.get('/watchlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inWatchlist = res.data.some(w => w.product._id === id);
        setIsWatch(inWatchlist);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWatch();
  }, [id]);

  const buy = async () => {
    setMessage('');
    try {
      const res = await API.post('/transactions/buy', { productId: id, units });
      setMessage(`✅ Bought ${units} units. Wallet: ₹${res.data.wallet}`);
    } catch (err) {
      setMessage(err?.response?.data?.message || '❌ Buy failed');
    }
  };

  const toggleWatch = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to use watchlist');
        return;
      }
      if (isWatch) {
        // Remove from watchlist
        await API.delete(`/watchlist/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsWatch(false);
      } else {
        // Add to watchlist
        await API.post(
          '/watchlist/add',
          { productId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsWatch(true);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update watchlist');
    }
  };

  if (!product)
    return <div className="text-center mt-20 text-slate-400">Loading...</div>;

  const chartData = {
    labels: history.map(h => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: history.map(h => h.price),
        tension: 0.4,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(6,182,212,0.2)',
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#06b6d4',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-3xl border border-white/20">
          {/* Title */}
          <h2 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            {product.name}
          </h2>
          <p className="text-slate-300 mb-6">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-1 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 text-sm font-semibold rounded-full border border-cyan-500/30">
              {product.category}
            </span>
            <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30">
              Price: ₹{product.price}
            </span>
            <span
              className={`px-4 py-1 text-sm font-semibold rounded-full border ${
                product.peRatio > 20
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}
            >
              P/E: {product.peRatio}
            </span>
          </div>

          {/* Chart */}
          <div className="w-full h-72 mb-8">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                  x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                  y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                },
              }}
            />
          </div>

          {/* Buy & Watchlist */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="number"
              min="1"
              value={units}
              onChange={e => setUnits(e.target.value)}
              className="w-full sm:w-32 px-4 py-2 bg-slate-800/50 text-white border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={buy}
              className="w-full sm:w-auto py-2 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 
              text-white font-semibold rounded-xl shadow hover:from-emerald-600 hover:to-cyan-600 transition"
            >
              Buy
            </button>
            <button
              onClick={toggleWatch}
              className={`w-full sm:w-auto py-2 px-6 rounded-xl font-semibold transition ${
                isWatch
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-4 text-center text-cyan-400 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
