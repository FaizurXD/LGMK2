import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

function Login() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text mb-2">
            Welcome to Lunar Gen
          </h1>
          <p className="text-gray-400">
            Login with Discord to access premium account generation
          </p>
        </div>

        <Button
          onClick={login}
          className="w-full"
          size="lg"
          icon={<LogIn className="w-5 h-5" />}
        >
          Login with Discord
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;