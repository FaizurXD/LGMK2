import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Key,
  Wallet,
  Share2,
  MessageCircle,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Key, label: 'Generator', path: '/dashboard/generator' },
  { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
  { icon: Share2, label: 'Refer', path: '/dashboard/refer' },
  { icon: MessageCircle, label: 'Contact', path: '/dashboard/contact' },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-6 px-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Lunar Gen</span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className={`fixed bottom-4 right-4 z-50 md:hidden p-3 bg-purple-600 text-white rounded-full shadow-lg ${
          isSidebarOpen ? 'hidden' : 'block'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main content */}
      <main className="md:ml-64 p-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;