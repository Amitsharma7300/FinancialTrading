import { FaUsers, FaShieldAlt, FaChartBar, FaRocket } from "react-icons/fa";
import Footer from "../components/footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 overflow-hidden">
        {/* Floating Background */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-cyan-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>
        <div className="absolute top-16 right-1/3 w-56 h-56 bg-purple-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 animate-gradient-x">
            About Us
          </h1>
          <p className="text-gray-300 max-w-2xl">
            We’re on a mission to make trading and investing accessible, fun, and
            educational for everyone. Our platform blends live simulations,
            real-time market insights, and modern tools to help you grow your
            financial journey.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-xl border border-gray-700/40">
          <h2 className="text-2xl font-bold mb-4 text-white">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            We are a passionate team of developers, finance enthusiasts, and
            educators who believe that financial literacy should be simple and
            accessible. With our platform, you can practice trading, understand
            market trends, and build confidence before stepping into the real
            markets.
          </p>
        </div>
      </div>

      {/* Features / Values Section */}
      <div className="container mx-auto px-6 pb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
          <span className="w-6 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></span>
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FaUsers,
              title: "Community Driven",
              desc: "Join a growing network of learners and traders",
              color: "from-cyan-500 to-teal-500",
            },
            {
              icon: FaShieldAlt,
              title: "Secure & Reliable",
              desc: "Your data and learning are always safe with us",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: FaChartBar,
              title: "Realistic Insights",
              desc: "Experience real market dynamics without the risk",
              color: "from-indigo-500 to-blue-500",
            },
            {
              icon: FaRocket,
              title: "Future Ready",
              desc: "We keep innovating to give you smarter tools",
              color: "from-violet-500 to-purple-500",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 border border-gray-700/50 group transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-3 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/70 p-8 rounded-2xl border border-gray-700/40">
            <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To empower individuals with the knowledge, tools, and confidence
              to navigate the world of investments — whether they are beginners
              or seasoned traders.
            </p>
          </div>
          <div className="bg-gray-800/70 p-8 rounded-2xl border border-gray-700/40">
            <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To democratize financial trading through education, simulations,
              and easy-to-use tools, bridging the gap between learning and
              real-world application.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
