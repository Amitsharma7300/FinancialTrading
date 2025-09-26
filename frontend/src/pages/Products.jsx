import { useEffect, useState } from 'react';
import { FaChartLine, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [fromCache, setFromCache] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    API.get('/products')
      .then(res => {
        setProducts(res.data.products);
        setFromCache(res.data.fromCache);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        if (searchQuery.trim()) {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const displayedProducts = searchQuery ? searchResults : products;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">
          Investment Products
        </h2>
        <p className="text-center text-slate-300 mb-8">
          Discover and invest in a variety of financial instruments
        </p>

        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-800/80 
              transition-all duration-300 placeholder-slate-400 pl-12"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-slate-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <FaSearch className="text-slate-400" />
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map(p => (
              <div
                key={p._id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 
                hover:transform hover:scale-105 hover:shadow-2xl transition duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {p.name}
                  </h3>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                    text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/20">
                    {p.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Price</span>
                    <span className="text-lg font-semibold text-white">₹{p.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">P/E Ratio</span>
                    <span className={`font-semibold ${p.peRatio > 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {p.peRatio}
                    </span>
                  </div>

                  <Link to={`/products/${p._id}`} className="block mt-6">
                    <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 
                      text-white font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-600 
                      transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2">
                      <FaChartLine />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <div className="text-slate-400 text-lg">
                {searchQuery ? 'No results found.' : 'No products available.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
