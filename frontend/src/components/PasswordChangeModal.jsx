import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const PasswordChangeModal = ({ isOpen, onClose, onPasswordChanged }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post(
        `/api/admin/change-password`,
        {
          current_password: formData.currentPassword,
          new_password: formData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Password changed successfully! Please login again.');
      localStorage.removeItem('admin_token');
      setTimeout(() => {
        onPasswordChanged();
      }, 1500);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Current password is incorrect');
      } else {
        toast.error('Failed to change password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="service-card rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors"
          data-testid="close-modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Change <span className="gradient-text">Password</span>
        </h2>
        <p className="text-[#94a3b8] mb-6 text-sm">
          Set a new secure password for admin access
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              required
              className="input-field w-full px-4 py-3 rounded-lg text-white"
              placeholder="Enter current password"
              data-testid="current-password-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
              minLength={8}
              className="input-field w-full px-4 py-3 rounded-lg text-white"
              placeholder="At least 8 characters"
              data-testid="new-password-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="input-field w-full px-4 py-3 rounded-lg text-white"
              placeholder="Re-enter new password"
              data-testid="confirm-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="change-password-button"
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
