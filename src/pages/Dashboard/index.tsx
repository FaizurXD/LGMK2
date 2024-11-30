import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import Generator from './Generator';
import Earn from './Earn';
import Wallet from './Wallet';
import Refer from './Refer';
import Contact from './Contact';

function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-6"
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </DashboardLayout>
  );
}

export default Dashboard;