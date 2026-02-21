import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QuoteRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/quotes`, formData);
      toast.success('Quote request submitted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-8" data-testid="quote-request-page">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#94a3b8] hover:text-white mb-8 transition-colors"
          data-testid="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="service-card rounded-2xl p-8 md:p-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="quote-title"
          >
            Request a <span className="gradient-text">Quote</span>
          </h1>
          <p className="text-[#94a3b8] mb-10" data-testid="quote-subtitle">
            Tell us about your project and we'll get back to you within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="name-label">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  placeholder="Your full name"
                  data-testid="name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="email-label">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  placeholder="your@email.com"
                  data-testid="email-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="company-label">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  placeholder="Your company name"
                  data-testid="company-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="service-label">
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  data-testid="service-select"
                >
                  <option value="">Select a service</option>
                  <option value="development">Development</option>
                  <option value="deployment">Deployment</option>
                  <option value="qa">QA</option>
                  <option value="all">All Services</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" data-testid="budget-label">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                data-testid="budget-select"
              >
                <option value="">Select your budget</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="over-50k">Over $50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" data-testid="description-label">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="input-field w-full px-4 py-3 rounded-lg text-white resize-none"
                placeholder="Tell us about your project, timeline, and requirements..."
                data-testid="description-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-quote-button"
            >
              {loading ? 'Submitting...' : (
                <>
                  Submit Request <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;