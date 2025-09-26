import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [pan, setPan] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const fd = new FormData();
      fd.append('email', email);
      fd.append('password', password);
      fd.append('fullName', fullName);
      fd.append('pan', pan);
      if (idFile) fd.append('idImage', idFile);

      const res = await API.post('/auth/register', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onRegister(res.data.user);
      nav('/products');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">
            Create Account
          </h2>
          <p className="text-center text-slate-300 mb-6">
            Complete your registration with KYC verification
          </p>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-5 py-3 bg-slate-800/50 text-white border border-slate-700 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-800/80 
              transition-all duration-300 placeholder-slate-400"
              required
            />

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

            <input
              type="text"
              placeholder="PAN Number"
              value={pan}
              onChange={e => setPan(e.target.value)}
              className="w-full px-5 py-3 bg-slate-800/50 text-white border border-slate-700 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-slate-800/80 
              transition-all duration-300 placeholder-slate-400"
              required
            />

            <div className="relative">
              <input
                type="file"
                onChange={e => setIdFile(e.target.files[0])}
                className="hidden"
                id="idFile"
                required
              />
              <label
                htmlFor="idFile"
                className="w-full px-5 py-3 bg-slate-800/50 text-slate-400 border border-slate-700 rounded-xl 
                focus:outline-none hover:bg-slate-800/80 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <FaCloudUploadAlt className="text-xl" />
                {idFile ? idFile.name : 'Upload ID Document'}
              </label>
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
              Register
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <span
              className="text-cyan-400 font-semibold cursor-pointer hover:text-cyan-300 transition-colors"
              onClick={() => nav('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
