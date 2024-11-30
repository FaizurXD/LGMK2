        className="relative w-full max-w-lg bg-gray-800 rounded-xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Generated Account</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Service</label>
            <div className="bg-gray-700 rounded-lg px-4 py-2 text-gray-200">
              {account.service}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email/Username</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={account.email}
                readOnly
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-gray-200"
              />
              <button
                onClick={() => copyToClipboard(account.email, 'email')}
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
                value={account.password}
                readOnly
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-gray-200"
              />
              <button
                onClick={() => copyToClipboard(account.password, 'password')}
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

          <div className="mt-6 text-sm text-yellow-400">
            ⚠️ Make sure to save these credentials before closing this window.
          </div>
        </div>
      </motion.div>
    </motion.div>
