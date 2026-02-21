# Custom Domain Setup Guide: www.devs.com

## ✅ COMPLETED BY ME

I've already configured all your application files for www.devs.com:

### Updated Files:
1. ✅ `/app/backend/.env` - CORS configured for www.devs.com
2. ✅ `/app/frontend/.env` - Backend URL set to https://www.devs.com
3. ✅ `/app/mobile/.env` - API URL set to https://www.devs.com/api
4. ✅ Backend restarted with new configuration

---

## 🔴 ACTION REQUIRED BY YOU

You need to complete these 2 steps manually:

### STEP 1: Add Custom Domain in Emergent Dashboard

1. **Login to Emergent Platform**
   - Go to: https://app.emergent.sh
   - Login with your account

2. **Navigate to Your App**
   - Find your "DevServices" app
   - Click on it to open settings

3. **Add Custom Domain**
   - Look for "Custom Domain" or "Domains" section
   - Click "Add Domain" or "Configure Domain"
   - Enter: `www.devs.com`
   - Click "Save" or "Add"
   - Note: This costs 50 credits/month

4. **Wait for SSL Certificate**
   - Emergent will automatically provision SSL
   - This takes 5-15 minutes
   - Status will show as "Active" when ready

---

### STEP 2: Configure DNS Records at Your Domain Registrar

**Where to do this:**
- Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
- Find DNS settings or DNS management

**⚠️ IMPORTANT: Delete existing A records first!**

**Add these DNS records:**

#### For www.devs.com:
```
Type: CNAME
Name: www
Value: build-serve-test.preview.emergentagent.com
TTL: 3600 (or Auto)
```

#### For devs.com (root domain):
```
Type: CNAME (or ALIAS if your registrar uses that)
Name: @ (or blank, or devs.com)
Value: build-serve-test.preview.emergentagent.com
TTL: 3600 (or Auto)
```

**Example for popular registrars:**

**GoDaddy:**
- DNS Management → Add → CNAME
- Host: www → Points to: build-serve-test.preview.emergentagent.com

**Namecheap:**
- Advanced DNS → Add New Record → CNAME
- Host: www → Target: build-serve-test.preview.emergentagent.com

**Cloudflare:**
- DNS → Add record → CNAME
- Name: www → Target: build-serve-test.preview.emergentagent.com
- Proxy status: ON (orange cloud)

---

## ⏱️ DNS Propagation Time

- **Typical**: 5-15 minutes
- **Maximum**: Up to 24-48 hours globally
- **Check status**: Use https://dnschecker.org

**Test DNS propagation:**
```bash
nslookup www.devs.com
# Should resolve to Emergent servers
```

---

## 🧪 Testing After Setup

Once DNS propagates, test these URLs:

1. **Main Website:**
   ```
   https://www.devs.com
   ```

2. **Admin Dashboard:**
   ```
   https://www.devs.com/admin/login
   ```

3. **API Test:**
   ```bash
   curl https://www.devs.com/api/
   ```

4. **Services Endpoint:**
   ```bash
   curl https://www.devs.com/api/services
   ```

---

## 📱 Mobile App Deployment

After domain is active:

1. **iOS App:**
   ```bash
   cd /app/mobile
   # Build with new API URL
   npx react-native run-ios --configuration Release
   ```

2. **Android App:**
   ```bash
   cd /app/mobile
   ./gradlew assembleRelease
   ```

3. **Update App Stores:**
   - Rebuild apps with new API URL
   - Submit updates to App Store / Google Play

---

## ✅ Final Checklist

- [ ] Custom domain added in Emergent dashboard
- [ ] DNS CNAME records configured
- [ ] Old A records removed
- [ ] Wait 15 minutes for DNS propagation
- [ ] SSL certificate provisioned (check Emergent dashboard)
- [ ] Test www.devs.com loads correctly
- [ ] Test admin login at www.devs.com/admin/login
- [ ] Test API endpoints
- [ ] Rebuild mobile apps with new domain
- [ ] Update app stores with new builds

---

## 🔧 Troubleshooting

### Website not loading?
```bash
# Check if DNS is propagated
nslookup www.devs.com

# Should show:
# Non-authoritative answer:
# www.devs.com canonical name = build-serve-test.preview.emergentagent.com
```

### SSL Certificate Error?
- Wait 15 minutes after adding domain
- Check Emergent dashboard for certificate status
- Ensure DNS is pointing correctly

### API not working?
- Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
- Verify CORS settings allow www.devs.com
- Test API directly: `curl https://www.devs.com/api/`

### Admin can't login?
- Clear browser cache and cookies
- Check if token is expired
- Try incognito/private browsing mode

---

## 📞 Support

If you encounter issues:
1. Check Emergent platform status
2. Review DNS configuration
3. Check application logs
4. Contact Emergent support

---

## 🎉 Success!

Once setup is complete, your platform will be live at:
- **Website**: https://www.devs.com
- **Admin**: https://www.devs.com/admin/login
- **API**: https://www.devs.com/api

Your modern service platform with glassmorphism UI and mobile apps will be accessible on your custom domain!

---

**Note**: I've done all the backend configuration. You just need to:
1. Add domain in Emergent dashboard (2 minutes)
2. Configure DNS records (5 minutes)
3. Wait for propagation (15 minutes)

Total time: ~25 minutes! 🚀
