import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Shield, Zap, Users } from 'lucide-react';
import Button from '../components/ui/Button';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-gray-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Moon className="w-16 h-16 text-purple-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              Lunar Gen
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your gateway to premium accounts. Generate and access premium services instantly with our advanced account generation system.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                as={Link}
                to="/login"
                size="lg"
                className="min-w-[200px]"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <Shield className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Generation</h3>
              <p className="text-gray-400">
                Advanced security measures ensure safe and reliable account generation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <Zap className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
              <p className="text-gray-400">
                Get immediate access to your generated accounts with no waiting time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Community</h3>
              <p className="text-gray-400">
                Join our Discord community for support and updates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-xl p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-400 mb-6">
              Connect with other users, get support, and stay updated with the latest features.
            </p>
            <Button
              as="a"
              href={import.meta.env.VITE_DISCORD_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Join Discord Server
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;