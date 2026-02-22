# Custom Domain Setup Guide: devservices.com

## ✅ COMPLETED BY ME

All application files configured for **devservices.com**:

### Updated Files:
1. ✅ `/app/backend/.env` - CORS configured for www.devservices.com
2. ✅ `/app/frontend/.env` - Backend URL: https://www.devservices.com
3. ✅ `/app/mobile/.env` - API URL: https://www.devservices.com/api
4. ✅ Backend restarted with new configuration

---

## 🔴 ACTION REQUIRED BY YOU

Complete these 2 steps manually:

### STEP 1: Add Custom Domain in Emergent Dashboard

1. **Login to Emergent Platform**
   - Go to: https://app.emergent.sh
   - Login with your account

2. **Navigate to Your App**
   - Find your "DevServices" app
   - Click to open settings

3. **Add Custom Domain**
   - Look for "Custom Domain" or "Domains" section
   - Click "Add Domain"
   - Enter: `www.devservices.com`
   - Click "Save"
   - Cost: 50 credits/month
   - SSL automatically provisioned (5-15 minutes)

---

### STEP 2: Configure DNS Records at Your Domain Registrar

**Where:** Your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)

**⚠️ IMPORTANT: Delete existing A records first!**

**Add these DNS records:**

#### For www.devservices.com:
```
Type: CNAME
Name: www
Value: build-serve-test.preview.emergentagent.com
TTL: 3600
```

#### For devservices.com (root domain):
```
Type: CNAME (or ALIAS)
Name: @ (or blank)
Value: build-serve-test.preview.emergentagent.com
TTL: 3600
```

**Example configurations:**

**GoDaddy:**
```
DNS Management → Add → CNAME
Host: www
Points to: build-serve-test.preview.emergentagent.com
TTL: 1 Hour
```

**Namecheap:**
```
Advanced DNS → Add New Record
Type: CNAME Record
Host: www
Target: build-serve-test.preview.emergentagent.com
TTL: Automatic
```

**Cloudflare:**
```
DNS → Add record
Type: CNAME
Name: www
Target: build-serve-test.preview.emergentagent.com
Proxy status: ON (orange cloud)
TTL: Auto
```

---

## ⏱️ Timeline

- DNS Configuration: 5 minutes
- DNS Propagation: 15 minutes (max 24 hours)
- SSL Certificate: Auto-provisioned
- **Total**: ~25 minutes

---

## 🌐 Your URLs After Setup

**Live URLs:**
- **Website**: https://www.devservices.com
- **Admin**: https://www.devservices.com/admin/login
- **API**: https://www.devservices.com/api

**Admin Access:**
- Direct URL only (hidden from public)
- Password protected
- Change password from dashboard

---

## 🧪 Testing After Setup

**1. Check DNS Propagation:**
```bash
nslookup www.devservices.com
# Should resolve to Emergent servers
```

**Online checker:**
- Visit: https://dnschecker.org
- Enter: www.devservices.com
- Check global propagation

**2. Test Website:**
```bash
curl https://www.devservices.com
```

**3. Test API:**
```bash
curl https://www.devservices.com/api/
```

**4. Test Services Endpoint:**
```bash
curl https://www.devservices.com/api/services
```

**5. Test Admin Login:**
- Visit: https://www.devservices.com/admin/login
- Enter your admin password
- Should see dashboard with stats

---

## 📱 Mobile App Deployment

After domain is active:

**iOS:**
```bash
cd /app/mobile
npx react-native run-ios --configuration Release
```

**Android:**
```bash
cd /app/mobile
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

**For App Stores:**
- Rebuild with new API URL (already configured)
- Test thoroughly
- Submit updates to App Store / Google Play

---

## ✅ Setup Checklist

- [ ] Purchase domain devservices.com (if not owned)
- [ ] Add custom domain in Emergent dashboard
- [ ] Configure DNS CNAME records
- [ ] Remove old A records
- [ ] Wait 15 minutes for DNS propagation
- [ ] Check SSL certificate (auto-provisioned)
- [ ] Test www.devservices.com loads
- [ ] Test admin login
- [ ] Test API endpoints
- [ ] Rebuild mobile apps
- [ ] Deploy to app stores

---

## 🔧 Troubleshooting

### Website not loading?

**Check DNS:**
```bash
nslookup www.devservices.com
```

Should show:
```
Non-authoritative answer:
www.devservices.com canonical name = build-serve-test.preview.emergentagent.com
```

**If not resolving:**
- Wait longer (up to 24 hours)
- Check DNS records are correct
- Verify old A records are removed

### SSL Certificate Error?

**Wait 15 minutes** after adding domain for certificate provisioning

**Check certificate status:**
- Emergent dashboard → Custom Domain section
- Should show "Active" with green indicator

### API Not Working?

**Check CORS:**
```bash
curl -I https://www.devservices.com/api/
```

**Check backend logs:**
```bash
tail -f /var/log/supervisor/backend.err.log
```

**Verify environment:**
```bash
grep CORS_ORIGINS /app/backend/.env
# Should include devservices.com
```

### Admin Can't Login?

- Clear browser cache and cookies
- Try incognito/private browsing
- Check if token expired (24 hours)
- Verify password is correct
- Check backend is running: `sudo supervisorctl status backend`

---

## 💰 Pricing

**Custom Domain on Emergent:**
- Cost: 50 credits/month
- SSL Certificate: Included
- Unlimited bandwidth
- Auto-renewal

---

## 🎉 Success!

Once complete, your DevServices platform will be live at:

🌐 **Website**: https://www.devservices.com  
🔐 **Admin**: https://www.devservices.com/admin/login  
📡 **API**: https://www.devservices.com/api  
📱 **Mobile**: iOS & Android apps with API integration

---

## 📞 Need Help?

1. Check Emergent platform documentation
2. Review DNS configuration with registrar
3. Check application logs
4. Contact Emergent support

---

**Configuration Complete!** 🚀

Your backend is ready. Just need to:
1. Add domain in Emergent (2 min)
2. Configure DNS (5 min)
3. Wait for propagation (15 min)

Total: ~25 minutes to go live!
