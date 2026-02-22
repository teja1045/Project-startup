import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ConsultationBooking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    topic: '',
    message: ''
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
      await axios.post(`/api/consultations`, formData);
      toast.success('Consultation booked successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error('Failed to book consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-8" data-testid="consultation-booking-page">
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
            data-testid="consultation-title"
          >
            Book a <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-[#94a3b8] mb-10" data-testid="consultation-subtitle">
            Schedule a free 30-minute consultation with our experts
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

            <div>
              <label className="block text-sm font-medium mb-2" data-testid="phone-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                placeholder="+1 (555) 000-0000"
                data-testid="phone-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="date-label">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  data-testid="date-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" data-testid="time-label">
                  Preferred Time *
                </label>
                <select
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg text-white"
                  data-testid="time-select"
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" data-testid="topic-label">
                Discussion Topic *
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                data-testid="topic-select"
              >
                <option value="">Select a topic</option>
                <option value="development">Development Services</option>
                <option value="deployment">Deployment Solutions</option>
                <option value="qa">QA & Testing</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" data-testid="message-label">
                Additional Notes
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="input-field w-full px-4 py-3 rounded-lg text-white resize-none"
                placeholder="Any specific topics or questions you'd like to discuss..."
                data-testid="message-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-consultation-button"
            >
              {loading ? 'Booking...' : (
                <>
                  Book Consultation <Calendar className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationBooking;