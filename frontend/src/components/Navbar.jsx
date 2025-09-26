import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with your actual product data
  const products = [
    { id: 1, name: 'Acme Telecom Ltd', category: 'Stock', price: 480.25 },
    { id: 2, name: 'GreenEnergy Mutual Fund', category: 'Mutual Fund', price: 1200.00 },
    { id: 3, name: 'SilverAuto Ltd', category: 'Stock', price: 780.50 },
    { id: 4, name: 'InfraBuilder Fund', category: 'Mutual Fund', price: 620.75 }
  ];

  // Search function
  useEffect(() => {
    const handleSearch = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        if (searchQuery.trim()) {
          const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered);
        } else {
          setSearchResults([]);
        }
        setIsLoading(false);
      }, 300);
    };

    handleSearch();
  }, [searchQuery]);

  // Replace the existing search suggestions dropdown with this:
  const renderSearchResults = () => {
    if (!searchQuery) return null;

    return (
      <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-50">
        {isLoading ? (
          <div className="px-4 py-3 text-sm text-gray-400 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Searching...
          </div>
        ) : searchResults.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-400">
            No results found
          </div>
        ) : (
          <>
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
              Found {searchResults.length} results
            </div>
            {searchResults.map((result) => (
              <Link
                key={result.id}
                to={`/products/${result.id}`}
                className="block px-4 py-3 hover:bg-indigo-600 transition-colors duration-150"
                onClick={() => setSearchQuery('')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-white">{result.name}</div>
                    <div className="text-xs text-gray-400">{result.category}</div>
                  </div>
                  <div className="text-sm font-semibold text-emerald-400">
                    ₹{result.price}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    );
  };

  // Replace the existing search bar input section with:
  const renderSearchInput = () => (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search stocks, mutual funds..."
        className="w-full bg-gray-800 text-white rounded-xl pl-12 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 transition-all duration-300 placeholder-gray-400 border border-gray-700"
        onFocus={(e) => e.target.select()}
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <FaSearch className="text-gray-400" />
        )}
      </div>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
        >
          ×
        </button>
      )}
      {renderSearchResults()}
    </div>
  );

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-500">
            <Link to="/"><span className='text-green-700 font-bold'>financial </span> trading</Link>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md">
              {renderSearchInput()}
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Products always visible */}
            <Link
              to="/products"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              Products
            </Link>

            {/* Portfolio & Watchlist only after login */}
            {user && (
              <>
                <Link
                  to="/portfolio"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Portfolio
                </Link>
                <Link
                  to="/watchlist"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Watchlist
                </Link>
              </>
            )}

            {/* Admin link */}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition"
              >
                Admin
              </Link>
            )}

            {/* Login/Register or Logout */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3">
          {renderSearchInput()}
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          {/* Products always visible */}
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition"
          >
            Products
          </Link>

          {/* Portfolio & Watchlist only if logged in */}
          {user && (
            <>
              <Link
                to="/portfolio"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition"
              >
                Portfolio
              </Link>
              <Link
                to="/watchlist"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition"
              >
                Watchlist
              </Link>
            </>
          )}

          {/* Admin */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition"
            >
              Admin
            </Link>
          )}

          {/* Login/Register or Logout */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="block px-3 py-2 space-y-1">
              <span className="block text-sm text-white">{user.email}</span>
              <button
                onClick={onLogout}
                className="w-full px-3 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
