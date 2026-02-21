import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import Landing from '@/pages/Landing';
import QuoteRequest from '@/pages/QuoteRequest';
import ConsultationBooking from '@/pages/ConsultationBooking';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App min-h-screen bg-[#050505] noise-texture">
      <Toaster position="top-right" theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quote" element={<QuoteRequest />} />
          <Route path="/consultation" element={<ConsultationBooking />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;