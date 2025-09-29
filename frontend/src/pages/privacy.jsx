import Footer from "../components/footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 overflow-hidden">
        {/* Floating Background */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-cyan-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>
        <div className="absolute top-16 right-1/3 w-56 h-56 bg-purple-500 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 animate-gradient-x">
            Privacy Policy
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Your privacy is important to us. This page explains how we collect,
            use, and protect your information while you use our platform.
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        {[
          {
            title: "1. Information We Collect",
            content:
              "We may collect personal details such as your name, email address, and contact information during registration. We also gather usage data, such as login activity and trading behavior, to improve your experience.",
            gradient: "from-cyan-400 to-teal-400",
          },
          {
            title: "2. How We Use Your Information",
            content:
              "Your data helps us provide better services, including account management, security, customer support, and personalized features. We do not sell your data to third parties.",
            gradient: "from-blue-400 to-indigo-400",
          },
          {
            title: "3. Data Protection & Security",
            content:
              "We use advanced encryption, secure servers, and authentication measures to protect your personal and financial data from unauthorized access or misuse.",
            gradient: "from-purple-400 to-pink-400",
          },
          {
            title: "4. Your Rights",
            content:
              "You have the right to access, update, or delete your personal data. You can also opt out of promotional emails at any time by updating your preferences.",
            gradient: "from-green-400 to-emerald-400",
          },
          {
            title: "5. Policy Updates",
            content:
              "We may update this Privacy Policy from time to time. Any significant changes will be communicated through our platform or via email notifications.",
            gradient: "from-orange-400 to-red-400",
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700/50"
          >
            <h2
              className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${section.gradient}`}
            >
              {section.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
