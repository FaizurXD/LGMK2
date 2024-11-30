import React from 'react';
import { motion } from 'framer-motion';
import { Key, Coins, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-400">
            This is your dashboard for Lunar Gen. Here you can generate premium accounts, 
            earn coins, and manage your profile. Get started by exploring the features below.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <Key className="w-10 h-10 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Account Generator</h2>
            <p className="text-gray-400">
              Generate premium accounts instantly using your coins.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <Coins className="w-10 h-10 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Earn Coins</h2>
            <p className="text-gray-400">
              Complete tasks to earn coins for generating accounts.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Refer Friends</h2>
            <p className="text-gray-400">
              Invite friends and earn bonus coins when they join.
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Available Coins</div>
              <div className="text-2xl font-bold text-purple-400">
                {user?.coins || 0}
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Referral Bonus</div>
              <div className="text-2xl font-bold text-purple-400">
                {process.env.VITE_REFERRAL_BONUS || 500} coins
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Generation Cost</div>
              <div className="text-2xl font-bold text-purple-400">
                {process.env.VITE_GEN_COST || 100} coins
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardHome;