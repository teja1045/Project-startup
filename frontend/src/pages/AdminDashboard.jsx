import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, CheckCircle, XCircle, LogOut, Key } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordChangeModal from '../components/PasswordChangeModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_quotes: 0,
    pending_quotes: 0,
    total_consultations: 0,
    pending_consultations: 0
  });
  const [quotes, setQuotes] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [activeTab, setActiveTab] = useState('quotes');
  const [loading, setLoading] = useState(true);
  const [quotesPage, setQuotesPage] = useState(0);
  const [consultationsPage, setConsultationsPage] = useState(0);
  const [quotesTotal, setQuotesTotal] = useState(0);
  const [consultationsTotal, setConsultationsTotal] = useState(0);
  const itemsPerPage = 50;
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [quotesPage, consultationsPage]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handlePasswordChanged = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      const [statsRes, quotesRes, consultationsRes, quotesCountRes, consultationsCountRes] = await Promise.all([
        axios.get(`${API}/stats`, authHeaders),
        axios.get(`${API}/quotes?limit=${itemsPerPage}&skip=${quotesPage * itemsPerPage}`, authHeaders),
        axios.get(`${API}/consultations?limit=${itemsPerPage}&skip=${consultationsPage * itemsPerPage}`, authHeaders),
        axios.get(`${API}/quotes/count`, authHeaders),
        axios.get(`${API}/consultations/count`, authHeaders)
      ]);
      
      setStats(statsRes.data);
      setQuotes(quotesRes.data);
      setConsultations(consultationsRes.data);
      setQuotesTotal(quotesCountRes.data.total);
      setConsultationsTotal(consultationsCountRes.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId, status) => {
    try {
      await axios.patch(`${API}/quotes/${quoteId}/status?status=${status}`, {}, getAuthHeaders());
      toast.success('Quote status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating quote status:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
      } else {
        toast.error('Failed to update quote status');
      }
    }
  };

  const updateConsultationStatus = async (consultationId, status) => {
    try {
      await axios.patch(`${API}/consultations/${consultationId}/status?status=${status}`, {}, getAuthHeaders());
      toast.success('Consultation status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating consultation status:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
      } else {
        toast.error('Failed to update consultation status');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      approved: 'bg-green-500/10 text-green-500 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
      completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen py-20 px-8" data-testid="admin-dashboard-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#94a3b8] hover:text-red-400 transition-colors"
            data-testid="logout-button"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-10"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          data-testid="dashboard-title"
        >
          Admin <span className="gradient-text">Dashboard</span>
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10" data-testid="stats-section">
          <div className="stat-card rounded-xl p-6" data-testid="stat-total-quotes">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#6366f1]" />
            </div>
            <div className="text-3xl font-bold mb-1" data-testid="total-quotes-value">{stats.total_quotes}</div>
            <div className="text-sm text-[#94a3b8]">Total Quotes</div>
          </div>
          <div className="stat-card rounded-xl p-6" data-testid="stat-pending-quotes">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-1" data-testid="pending-quotes-value">{stats.pending_quotes}</div>
            <div className="text-sm text-[#94a3b8]">Pending Quotes</div>
          </div>
          <div className="stat-card rounded-xl p-6" data-testid="stat-total-consultations">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-[#8b5cf6]" />
            </div>
            <div className="text-3xl font-bold mb-1" data-testid="total-consultations-value">{stats.total_consultations}</div>
            <div className="text-sm text-[#94a3b8]">Total Consultations</div>
          </div>
          <div className="stat-card rounded-xl p-6" data-testid="stat-pending-consultations">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-1" data-testid="pending-consultations-value">{stats.pending_consultations}</div>
            <div className="text-sm text-[#94a3b8]">Pending Consultations</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4" data-testid="tabs-section">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'quotes'
                ? 'bg-[#6366f1] text-white'
                : 'bg-[#0A0A0A] text-[#94a3b8] hover:bg-[#1e1e2e]'
            }`}
            data-testid="quotes-tab"
          >
            Quote Requests ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'consultations'
                ? 'bg-[#6366f1] text-white'
                : 'bg-[#0A0A0A] text-[#94a3b8] hover:bg-[#1e1e2e]'
            }`}
            data-testid="consultations-tab"
          >
            Consultations ({consultations.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20" data-testid="loading-state">
            <div className="text-[#94a3b8]">Loading...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'quotes' && (
              <div data-testid="quotes-list">
                {quotes.length === 0 ? (
                  <div className="service-card rounded-xl p-8 text-center text-[#94a3b8]" data-testid="no-quotes">
                    No quote requests yet
                  </div>
                ) : (
                  quotes.map((quote) => (
                    <div key={quote.id} className="service-card rounded-xl p-6" data-testid={`quote-card-${quote.id}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold" data-testid={`quote-name-${quote.id}`}>{quote.name}</h3>
                            {getStatusBadge(quote.status)}
                          </div>
                          <div className="text-sm text-[#94a3b8]" data-testid={`quote-email-${quote.id}`}>{quote.email}</div>
                          {quote.company && <div className="text-sm text-[#94a3b8]" data-testid={`quote-company-${quote.id}`}>{quote.company}</div>}
                        </div>
                        <div className="text-sm text-[#94a3b8]" data-testid={`quote-date-${quote.id}`}>{formatDate(quote.created_at)}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm mb-1">
                          <span className="text-[#94a3b8]">Service:</span> <span className="text-white capitalize" data-testid={`quote-service-${quote.id}`}>{quote.service}</span>
                        </div>
                        {quote.budget && (
                          <div className="text-sm mb-1">
                            <span className="text-[#94a3b8]">Budget:</span> <span className="text-white" data-testid={`quote-budget-${quote.id}`}>{quote.budget}</span>
                          </div>
                        )}
                        <div className="text-sm mt-3">
                          <span className="text-[#94a3b8]">Description:</span>
                          <p className="text-white mt-1" data-testid={`quote-description-${quote.id}`}>{quote.description}</p>
                        </div>
                      </div>
                      {quote.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateQuoteStatus(quote.id, 'approved')}
                            className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            data-testid={`approve-quote-${quote.id}`}
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                            className="btn-outline px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            data-testid={`reject-quote-${quote.id}`}
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {quotesTotal > itemsPerPage && (
                  <div className="flex items-center justify-center gap-4 mt-8" data-testid="quotes-pagination">
                    <button
                      onClick={() => setQuotesPage(p => Math.max(0, p - 1))}
                      disabled={quotesPage === 0}
                      className="btn-outline px-4 py-2 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      data-testid="quotes-prev-page"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-[#94a3b8]">
                      Page {quotesPage + 1} of {Math.ceil(quotesTotal / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => setQuotesPage(p => p + 1)}
                      disabled={(quotesPage + 1) * itemsPerPage >= quotesTotal}
                      className="btn-outline px-4 py-2 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      data-testid="quotes-next-page"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'consultations' && (
              <div data-testid="consultations-list">
                {consultations.length === 0 ? (
                  <div className="service-card rounded-xl p-8 text-center text-[#94a3b8]" data-testid="no-consultations">
                    No consultation bookings yet
                  </div>
                ) : (
                  consultations.map((consultation) => (
                    <div key={consultation.id} className="service-card rounded-xl p-6" data-testid={`consultation-card-${consultation.id}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold" data-testid={`consultation-name-${consultation.id}`}>{consultation.name}</h3>
                            {getStatusBadge(consultation.status)}
                          </div>
                          <div className="text-sm text-[#94a3b8]" data-testid={`consultation-email-${consultation.id}`}>{consultation.email}</div>
                          {consultation.phone && <div className="text-sm text-[#94a3b8]" data-testid={`consultation-phone-${consultation.id}`}>{consultation.phone}</div>}
                        </div>
                        <div className="text-sm text-[#94a3b8]" data-testid={`consultation-created-${consultation.id}`}>{formatDate(consultation.created_at)}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm mb-1">
                          <span className="text-[#94a3b8]">Preferred Date:</span> <span className="text-white" data-testid={`consultation-date-${consultation.id}`}>{consultation.preferred_date}</span>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="text-[#94a3b8]">Preferred Time:</span> <span className="text-white" data-testid={`consultation-time-${consultation.id}`}>{consultation.preferred_time}</span>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="text-[#94a3b8]">Topic:</span> <span className="text-white capitalize" data-testid={`consultation-topic-${consultation.id}`}>{consultation.topic}</span>
                        </div>
                        {consultation.message && (
                          <div className="text-sm mt-3">
                            <span className="text-[#94a3b8]">Message:</span>
                            <p className="text-white mt-1" data-testid={`consultation-message-${consultation.id}`}>{consultation.message}</p>
                          </div>
                        )}
                      </div>
                      {consultation.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateConsultationStatus(consultation.id, 'approved')}
                            className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            data-testid={`approve-consultation-${consultation.id}`}
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => updateConsultationStatus(consultation.id, 'rejected')}
                            className="btn-outline px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            data-testid={`reject-consultation-${consultation.id}`}
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {consultationsTotal > itemsPerPage && (
                  <div className="flex items-center justify-center gap-4 mt-8" data-testid="consultations-pagination">
                    <button
                      onClick={() => setConsultationsPage(p => Math.max(0, p - 1))}
                      disabled={consultationsPage === 0}
                      className="btn-outline px-4 py-2 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      data-testid="consultations-prev-page"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-[#94a3b8]">
                      Page {consultationsPage + 1} of {Math.ceil(consultationsTotal / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => setConsultationsPage(p => p + 1)}
                      disabled={(consultationsPage + 1) * itemsPerPage >= consultationsTotal}
                      className="btn-outline px-4 py-2 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      data-testid="consultations-next-page"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;