import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import AccountDisplay from './AccountDisplay';

function Success() {
  const { hash } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['generatedAccount', hash],
    queryFn: async () => {
      const response = await fetch(`/api/generator/account/${hash}`, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      });
      if (!response.ok) throw new Error('Failed to fetch account details');
      return response.json();
    }
  });

  useEffect(() => {
    // Cleanup function to mark the account as viewed
    return () => {
      if (hash) {
        fetch(`/api/generator/viewed/${hash}`, {
          method: 'POST',
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          }
        }).catch(console.error);
      }
    };
  }, [hash]);

  if (!hash) {
    return <Navigate to="/dashboard/generator" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (error || !data) {
    return <Navigate to="/dashboard/generator" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-center space-x-4">
          <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-green-400">Account Generated Successfully!</h2>
            <p className="text-gray-400 mt-1">
              Your account details are below. Make sure to save them before leaving this page.
            </p>
          </div>
        </div>

        <AccountDisplay
          email={data.account.email}
          password={data.account.password}
        />

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <p className="text-yellow-400 text-sm">
            ⚠️ This page will only be available once. Make sure to copy your account details before closing.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Success;