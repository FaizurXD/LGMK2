import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Hash, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl p-6 flex items-center space-x-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                alt={user.username}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-400">Discord User</p>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Username</div>
                <div>{user.username}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div>{user.email}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Discord ID</div>
                <div>{user.discordId}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Joined</div>
                <div>{new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Total Coins</div>
              <div className="text-2xl font-bold text-purple-400">{user.coins}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Referrals</div>
              <div className="text-2xl font-bold text-purple-400">{user.referralCount}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;