import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-200 py-3 border-t border-slate-700">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-xs">

        {/* Brand */}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-base tracking-wide">
          Financial Trading
        </span>

        {/* Quick Links */}
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-emerald-400 transition">About</a>
          <a href="/contact" className="hover:text-emerald-400 transition">Contact</a>
          <a href="/privacy" className="hover:text-emerald-400 transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-cyan-400 transition-transform duration-300 transform hover:scale-110"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-teal-400 transition-transform duration-300 transform hover:scale-110"
          >
            <FaLinkedin size={16} />
          </a>
        </div>

      

        {/* Copyright */}
        <span className="text-gray-200 text-center sm:text-right font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-base shadow-2xl">
          &copy; {new Date().getFullYear()} Financial Trading. <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-base tracking-wide">❤️</span> by Amit
        </span>
      </div>
    </footer>
  );
}
