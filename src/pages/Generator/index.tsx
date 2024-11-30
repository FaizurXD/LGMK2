import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Key, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ServiceSelect from './ServiceSelect';
import AccountDisplay from './AccountDisplay';
import { useAuth } from '../../contexts/AuthContext';

function Generator() {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: cooldown } = useQuery({
    queryKey: ['genCooldown'],
    queryFn: async () => {
      const response = await fetch('/api/generator/cooldown');
      return response.json();
    },
    refetchInterval: 1000
  });

  const handleGenerate = async () => {
    if (!selectedService) {
      toast.error('Please select a service');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`/api/gen?service=${selectedService}`, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate account');
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }

      setSelectedService('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Key className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold">Account Generator</h1>
        </div>

        <div className="mb-8">
          <p className="text-gray-400">
            Select a service and generate premium accounts instantly. Each generation costs coins from your balance.
          </p>
        </div>

        <div className="space-y-6">
          <ServiceSelect
            selectedService={selectedService}
            onServiceChange={setSelectedService}
            disabled={cooldown?.remaining > 0 || isGenerating}
          />

          {cooldown?.remaining > 0 ? (
            <div className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <p className="text-gray-300">
                Please wait {Math.ceil(cooldown.remaining / 1000)} seconds before generating again
              </p>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!selectedService || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Account</span>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Generator;