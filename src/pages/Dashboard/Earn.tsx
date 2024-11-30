import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useQuery } from '@tanstack/react-query';
import { Gift, AlertCircle, Loader2 } from 'lucide-react';

function Earn() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const { data: cooldown } = useQuery({
    queryKey: ['earnCooldown'],
    queryFn: async () => {
      const response = await fetch('/api/earn/cooldown');
      return response.json();
    },
    refetchInterval: 1000
  });

  const handleVerify = async (token: string) => {
    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/earn/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Earn Coins</h1>

        <div className="mb-8">
          <p className="text-gray-400">
            Complete the verification below to earn coins. These coins can be used to generate premium accounts.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {cooldown?.remaining > 0 ? (
          <div className="bg-gray-700/50 p-6 rounded-lg text-center">
            <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">
              Please wait {Math.ceil(cooldown.remaining / 1000)} seconds before earning again
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <HCaptcha
              sitekey={process.env.VITE_HCAPTCHA_SITE_KEY}
              onVerify={handleVerify}
              theme="dark"
            />
          </div>
        )}

        {isVerifying && (
          <div className="mt-6 flex items-center justify-center space-x-3 text-purple-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying...</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Earn;