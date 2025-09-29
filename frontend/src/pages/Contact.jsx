import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import Footer from "../components/footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 overflow-hidden">
        {/* Floating Background */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-cyan-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>
        <div className="absolute top-16 right-1/3 w-56 h-56 bg-teal-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 animate-gradient-x">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Got a question, feedback, or just want to say hello?  
            We’d love to hear from you. Reach out anytime!
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FaEnvelope,
              title: "Email Us",
              desc: "support@fintrade.com",
              color: "from-cyan-500 to-teal-500",
            },
            {
              icon: FaPhoneAlt,
              title: "Call Us",
              desc: "+91 98765 43210",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Visit Us",
              desc: "Mumbai, India",
              color: "from-indigo-500 to-purple-500",
            },
            {
              icon: FaHeadset,
              title: "Live Support",
              desc: "24/7 assistance",
              color: "from-pink-500 to-red-500",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 border border-gray-700/50 group transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} text-white mb-3 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-xl border border-gray-700/40 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 rounded-xl shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
