import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center text-center px-6">
      
      {/* Hero Text */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold leading-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Plan Events <span className="text-blue-500">Smarter</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Manage tasks, guests, and budgets — all in one powerful dashboard.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={() => navigate("/dashboard")}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started 🚀
      </motion.button>
      <motion.div
      className="absolute bottom-10 text-gray-400 text-sm"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
       >
      ↓ Scroll
      </motion.div>

    </div>
  );
}