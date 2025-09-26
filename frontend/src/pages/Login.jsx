import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin(res.data.user);
      nav('/products');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
          <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-slate-300 mb-8">
            Login to access your Mini Trading portfolio
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-slate-800/50 text-white border border-slate-700 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-800/80 
                transition-all duration-300 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-slate-800/50 text-white border border-slate-700 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-800/80 
                transition-all duration-300 placeholder-slate-400"
                required
              />
            </div>

            {err && (
              <div className="text-red-400 text-sm text-center bg-red-900/50 py-2 rounded-lg">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold 
              rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 
              shadow-lg hover:shadow-cyan-500/25"
            >
              Login
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <span
              className="text-cyan-400 font-semibold cursor-pointer hover:text-cyan-300 transition-colors"
              onClick={() => nav('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
