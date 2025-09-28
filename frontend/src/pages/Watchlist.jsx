import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/watchlist", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setWatchlist(res.data || []));
  }, [token]);

  const removeFromWatchlist = async (productId) => {
    try {
      const res = await API.delete(`/watchlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(res.data); // Update with new watchlist from backend
    } catch (err) {
      alert("Failed to remove from watchlist");
    }
  };

  if (!watchlist.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Your Watchlist
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
            Keep track of your favorite assets. Add or remove products anytime.
          </p>
        </div>

        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-lg">Your watchlist is empty.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Your Watchlist
        </h2>
        <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
          Keep track of your favorite assets. Add or remove products anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {watchlist.map((item) => {
          const p = item.product || item; // fallback if backend returns product directly
          const change = (Math.random() * 10 - 5).toFixed(2);
          const isPositive = change >= 0;

          return (
            <div
              key={p._id}
              className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20
                hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1 ${
                  isPositive
                    ? "bg-green-200/20 text-green-400 border border-green-400/40"
                    : "bg-red-200/20 text-red-400 border border-red-400/40"
                }`}
              >
                {isPositive ? <FaArrowUp /> : <FaArrowDown />}{" "}
                {Math.abs(change)}%
              </span>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 truncate">
                    {p?.name || "Unknown Product"}
                  </h3>
                  <p className="text-gray-300 font-medium mb-2">
                    Price: ₹{p?.price ?? 0}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Category: {p?.category || "-"}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link to={`/products/${p._id}`} className="flex-1">
                    <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500
                        text-white font-bold rounded-xl shadow-lg hover:from-emerald-600 hover:to-cyan-600
                        transition-all flex items-center justify-center gap-2">
                      View Details
                      {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    </button>
                  </Link>

                  <button
                    onClick={() => removeFromWatchlist(p._id)}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
                    title="Remove from Watchlist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
