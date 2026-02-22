# Admin Access Guide

## 🔐 Secure Admin Setup

Admin access is hidden from public UI for security. Only the owner can access the admin dashboard.

## 📋 Initial Setup

### Option 1: Automated Setup (Recommended)

Run the setup script to configure your admin password:

```bash
python3 /app/scripts/setup_admin.py
```

This will:
- Let you set your own password OR generate a secure random one
- Configure JWT secret automatically
- Save configuration to backend .env
- Display your credentials securely

### Option 2: Manual Setup

Edit `/app/backend/.env`:

```env
ADMIN_PASSWORD="your-secure-password-here"
JWT_SECRET="your-random-secret-key-here"
```

Then restart backend:
```bash
sudo supervisorctl restart backend
```

## 🌐 Accessing Admin Dashboard

### Web Application

**Admin URL:** 
```
https://nss-qa-build.preview.emergentagent.com/admin/login
```

**Direct Access Methods:**

1. **Type URL directly** in browser address bar
2. **Bookmark** the admin login page
3. **Use browser history** after first access

⚠️ Admin link is NOT visible in public navigation for security.

### Mobile Application

**Access via deep link or direct navigation:**

The admin section is hidden from home screen navigation. Access programmatically:

```typescript
// For development/testing only
navigation.navigate('AdminLogin');
```

For production mobile apps, implement:
- Secret gesture (e.g., triple tap on logo)
- Hidden button with specific touch pattern
- QR code scanning for admin access

## 🔑 Admin Features

Once logged in, you can:

1. **View Dashboard**
   - Real-time statistics
   - Total quotes and consultations
   - Pending requests count

2. **Manage Quotes**
   - View all quote requests
   - Approve or reject quotes
   - See client details and requirements

3. **Manage Consultations**
   - View booking requests
   - Approve or reject bookings
   - Access consultation details

4. **Change Password**
   - Click "Change Password" in dashboard
   - Enter current and new password
   - Re-login required after change

5. **Secure Logout**
   - Clears authentication token
   - Redirects to login page

## 🔒 Security Features

✅ **Password Protected** - JWT token authentication
✅ **Hidden Access** - No public admin links
✅ **Token Expiration** - 24-hour session timeout
✅ **Secure Storage** - Passwords in environment variables
✅ **Change Password** - Update password anytime from dashboard

## 📱 Mobile Admin Access

For mobile apps, implement one of these secure access methods:

### Method 1: Secret Gesture
```typescript
// Example: Triple tap on logo
let tapCount = 0;
const handleLogoPress = () => {
  tapCount++;
  if (tapCount === 3) {
    navigation.navigate('AdminLogin');
    tapCount = 0;
  }
  setTimeout(() => tapCount = 0, 2000);
};
```

### Method 2: QR Code Scanner
- Create admin QR code with unique token
- Scan QR to unlock admin access
- Temporary session-based access

### Method 3: Device Biometric
- Use device fingerprint/face ID
- Verify owner identity
- Grant admin access after verification

## 🔐 Password Management

### Change Password from Dashboard

1. Login to admin dashboard
2. Click "Change Password" button (key icon)
3. Enter current password
4. Enter new password (min 8 characters)
5. Confirm new password
6. Submit and re-login

### Reset Password (If Forgotten)

If you forget your password:

1. SSH into your server
2. Run setup script again:
   ```bash
   python3 /app/scripts/setup_admin.py
   ```
3. Choose option 1 or 2 to set new password
4. Restart backend:
   ```bash
   sudo supervisorctl restart backend
   ```

### Password Best Practices

✅ Use at least 12 characters
✅ Mix uppercase, lowercase, numbers, symbols
✅ Don't reuse passwords from other services
✅ Change password every 3-6 months
✅ Use a password manager
✅ Enable 2FA (if implementing)

## 🚨 Security Recommendations

1. **Never share admin credentials**
2. **Always logout after admin session**
3. **Use strong, unique passwords**
4. **Change default password immediately**
5. **Monitor admin access logs**
6. **Keep backend environment variables secure**
7. **Use HTTPS only (already configured)**
8. **Enable rate limiting on login endpoint**

## 📊 Admin API Endpoints

All admin endpoints require authentication:

```
POST   /api/admin/login              - Login with password
POST   /api/admin/change-password    - Change admin password
GET    /api/stats                    - Dashboard statistics
GET    /api/quotes                   - List quote requests
PATCH  /api/quotes/{id}/status       - Update quote status
GET    /api/consultations            - List consultations
PATCH  /api/consultations/{id}/status - Update consultation status
```

## 🔧 Troubleshooting

### Can't Access Admin Dashboard

**Problem:** 401 Unauthorized error

**Solutions:**
1. Check password in `/app/backend/.env`
2. Verify backend is running: `sudo supervisorctl status backend`
3. Clear browser cache and cookies
4. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`

### Password Change Not Working

**Problem:** Current password rejected

**Solutions:**
1. Verify you're using correct current password
2. Check if password was recently changed
3. Reset password using setup script
4. Check backend logs for errors

### Session Expired

**Problem:** Token expired after 24 hours

**Solution:** 
- Simply login again
- Tokens automatically expire for security
- Change JWT expiration in backend if needed

## 📝 Notes

- Admin access is designed to be secure and owner-only
- No public links prevent unauthorized access attempts
- Direct URL access provides convenience for owners
- Password change feature ensures security control
- Mobile apps can implement custom access methods

---

**For Support:** Check backend logs or contact system administrator
