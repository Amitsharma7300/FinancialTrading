import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartLine, FaList, FaUserCheck, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import tradingIllustration from "../assets/trading1.jpg";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState({
    name: "Acme Telecom Ltd",
    price: 480.25,
    change: "+2.5%",
  });

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const generateData = () => {
      const labels = [
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
      ];
      const data = labels.map(
        () => selectedProduct.price + (Math.random() * 20 - 10)
      );
      setChartData({
        labels,
        datasets: [
          {
            label: selectedProduct.name,
            data,
            borderColor: "#00F6FF",
            backgroundColor: "rgba(0, 246, 255, 0.2)",
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#00F6FF",
          },
        ],
      });
    };
    generateData();
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-cyan-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>
        <div className="absolute top-16 right-1/3 w-56 h-56 bg-teal-400 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Left Text */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 animate-gradient-x">
              Financial Trading
            </h1>
            <p className="text-gray-300 text-base mb-4">
              Start your investment journey with us. Track live markets and make
              smarter trades with style.
            </p>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 rounded-2xl shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Start Trading
              </Link>
              <Link
                to="/login"
                className="border border-cyan-400 px-5 py-2.5 rounded-2xl hover:bg-cyan-500/20 transition-all duration-300 font-semibold"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 h-0.5 flex justify-center items-center">
            <img
              src={tradingIllustration}
              alt="Financial Trading Illustration"
              className="rounded-2xl shadow-2xl  mr-1 w-full max-w-sm animate-fade-in"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 -mt-14 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: FaUserCheck,
              title: "Easy KYC",
              desc: "Quick and simple verification process",
              color: "from-cyan-500 to-teal-500",
            },
            {
              icon: FaWallet,
              title: "Virtual Wallet",
              desc: "Start with virtual money",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: FaChartLine,
              title: "Live Trading",
              desc: "Real-time market simulation",
              color: "from-indigo-500 to-blue-500",
            },
            {
              icon: FaList,
              title: "Portfolio Tracking",
              desc: "Monitor your investments",
              color: "from-violet-500 to-indigo-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 border border-gray-700/40 group"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-2 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="text-xl" />
              </div>
              <h3 className="font-bold text-base mb-1 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Overview */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <span className="w-6 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></span>
          Available Products
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Acme Telecom Ltd", price: 480.25, change: "+2.5%" },
            { name: "GreenEnergy Mutual Fund", price: 1200.0, change: "+1.2%" },
            { name: "SilverAuto Ltd", price: 780.5, change: "-0.8%" },
            { name: "InfraBuilder Fund", price: 620.75, change: "+0.5%" },
          ].map((product) => (
            <div
              key={product.name}
              onClick={() => setSelectedProduct(product)}
              className="bg-gray-800/80 p-4 rounded-2xl shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:-translate-y-1 hover:scale-105"
            >
              <h3 className="font-bold text-base mb-1 text-white">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-cyan-400">
                  ₹{product.price}
                </span>
                <span
                  className={`${
                    product.change.startsWith("+")
                      ? "text-emerald-500"
                      : "text-red-500"
                  } font-medium`}
                >
                  {product.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
     {/* Chart Section */}
<div className="container mx-auto px-6 pb-8">
  <div className="bg-gray-800/80 p-4 rounded-2xl shadow-2xl border border-gray-700/50">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h3 className="text-lg font-bold text-white">{selectedProduct.name}</h3>
        <p className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
          ₹{selectedProduct.price}
        </p>
      </div>
      <span
        className={`${
          selectedProduct.change.startsWith("+")
            ? "text-emerald-500"
            : "text-red-500"
        } text-sm font-semibold`}
      >
        {selectedProduct.change}
      </span>
    </div>
    <div className="h-52">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#111827",
              titleColor: "#00F6FF",
              bodyColor: "#E5E7EB",
              borderColor: "#00F6FF",
              borderWidth: 1,
              padding: 10,
            },
          },
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 2,
              borderColor: "#00F6FF",
              fill: true,
            },
            point: {
              radius: 4,
              hoverRadius: 6,
              backgroundColor: "#00F6FF",
              borderColor: "#111827",
              borderWidth: 2,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { color: "rgba(255,255,255,0.05)" },
              ticks: { color: "#9CA3AF" },
            },
            x: {
              grid: { color: "rgba(255,255,255,0.05)" },
              ticks: { color: "#9CA3AF" },
            },
          },
        }}
      />
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
};

export default Home;
