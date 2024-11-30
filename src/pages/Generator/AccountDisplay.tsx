import React from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AccountDisplayProps {
  email: string;
  password: string;
}

function AccountDisplay({ email, password }: AccountDisplayProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPassword, setCopiedPassword] = React.useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
      toast.success(`${type === 'email' ? 'Email' : 'Password'} copied to clipboard`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Email/Username</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={email}
            readOnly
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-gray-200"
          />
          <button
            onClick={() => copyToClipboard(email, 'email')}
            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {copiedEmail ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-purple-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-gray-200"
          />
          <button
            onClick={() => copyToClipboard(password, 'password')}
            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {copiedPassword ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-purple-400" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AccountDisplay;