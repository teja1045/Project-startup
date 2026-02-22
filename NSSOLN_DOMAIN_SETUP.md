# NSSolutions - Custom Domain Setup Guide
## www.nssoln.com Configuration

Complete step-by-step guide to set up your custom domain for NSSolutions platform.

---

## ✅ COMPLETED CONFIGURATION

All application files have been configured for **www.nssoln.com**:

### Updated Files:
1. ✅ `/app/backend/.env` - CORS: www.nssoln.com, nssoln.com
2. ✅ `/app/frontend/.env` - Backend URL: https://www.nssoln.com
3. ✅ `/app/mobile/.env` - API URL: https://www.nssoln.com/api
4. ✅ Frontend branding - Changed to "NSSolutions"
5. ✅ Mobile app branding - Changed to "NSSolutions"
6. ✅ Backend restarted with new configuration

---

## 🔴 YOUR ACTION REQUIRED

### STEP 1: Add Custom Domain in Emergent (2 minutes)

1. **Login to Emergent**
   - Go to: https://app.emergent.sh
   - Login with your credentials

2. **Find Your App**
   - Open your NSSolutions app (previously DevServices)
   - Navigate to Settings or Custom Domain section

3. **Add Domain**
   - Click "Add Custom Domain" or "Configure Domain"
   - Enter: `www.nssoln.com`
   - Click "Save" or "Add"
   - **Cost:** 50 credits/month
   - SSL certificate will be auto-provisioned

---

### STEP 2: Configure DNS Records (5 minutes)

**At your domain registrar (GoDaddy, Namecheap, etc.):**

#### Important: Delete all A records first!

#### Add CNAME Records:

**For www.nssoln.com:**
```
Type: CNAME
Name: www
Value: build-serve-test.preview.emergentagent.com
TTL: 3600
```

**For nssoln.com (root domain):**
```
Type: CNAME (or ALIAS)
Name: @ (or blank)
Value: build-serve-test.preview.emergentagent.com
TTL: 3600
```

---

## 🌐 Your New URLs

After setup completes:
- **Website:** https://www.nssoln.com
- **Admin:** https://www.nssoln.com/admin/login
- **API:** https://www.nssoln.com/api

---

## ⏱️ Timeline

- DNS Configuration: 5 minutes
- DNS Propagation: 15-30 minutes (max 24 hours)
- SSL Certificate: Auto-provisioned by Emergent
- **Total:** ~25 minutes

---

## 🧪 Testing

### 1. Check DNS Propagation

**Online:**
- Visit: https://dnschecker.org
- Enter: www.nssoln.com
- Look for green checkmarks globally

**Command Line:**
```bash
nslookup www.nssoln.com
```

Should show:
```
www.nssoln.com canonical name = build-serve-test.preview.emergentagent.com
```

### 2. Test Website
```bash
curl https://www.nssoln.com
```

### 3. Test API
```bash
curl https://www.nssoln.com/api/
```

Should return:
```json
{"message":"Development Services API"}
```

### 4. Test Admin Login
- Visit: https://www.nssoln.com/admin/login
- Enter your admin password
- Should access dashboard

---

## 📱 Mobile App Updates

### iOS:
```bash
cd /app/mobile
yarn install
cd ios && pod install && cd ..
npx react-native run-ios --configuration Release
```

### Android:
```bash
cd /app/mobile
yarn install
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🎯 App Store Submission

### iOS App Store:
- **App Name:** NSSolutions
- **Bundle ID:** Update in Xcode
- **Display Name:** NSSolutions
- **API URL:** https://www.nssoln.com/api (already configured)

### Google Play Store:
- **App Name:** NSSolutions
- **Package Name:** Update in build.gradle
- **Application Label:** NSSolutions
- **API URL:** https://www.nssoln.com/api (already configured)

---

## 📋 Registrar-Specific Instructions

### GoDaddy:
1. Login → My Products → Domains
2. Find nssoln.com → Click "DNS"
3. Delete all A records
4. Add → CNAME → Host: www → Points to: build-serve-test.preview.emergentagent.com
5. Add → CNAME → Host: @ → Points to: build-serve-test.preview.emergentagent.com
6. Save

### Namecheap:
1. Login → Domain List → nssoln.com → Manage
2. Advanced DNS tab
3. Delete all A records
4. Add New Record → CNAME → Host: www → Target: build-serve-test.preview.emergentagent.com
5. Add New Record → CNAME → Host: @ → Target: build-serve-test.preview.emergentagent.com
6. Save All Changes

### Cloudflare:
1. Login → Select nssoln.com domain
2. DNS tab
3. Delete all A records
4. Add record → CNAME → Name: www → Target: build-serve-test.preview.emergentagent.com → Proxied: ON
5. Add record → CNAME → Name: @ → Target: build-serve-test.preview.emergentagent.com → Proxied: ON

---

## 🔧 Troubleshooting

### Website Not Loading?

**Check DNS:**
```bash
nslookup www.nssoln.com
```

**Clear DNS cache:**
- Mac: `sudo dscacheutil -flushcache`
- Windows: `ipconfig /flushdns`
- Linux: `sudo systemd-resolve --flush-caches`

### SSL Certificate Error?

- Wait 15 minutes for certificate provisioning
- Check Emergent dashboard for certificate status
- Verify domain is correctly added in Emergent

### API Not Working?

**Check CORS:**
```bash
cat /app/backend/.env | grep CORS
```

Should include: www.nssoln.com, nssoln.com

**Restart backend:**
```bash
sudo supervisorctl restart backend
```

**Check logs:**
```bash
tail -f /var/log/supervisor/backend.err.log
```

### Admin Won't Login?

- Clear browser cache and cookies
- Try incognito/private window
- Verify password: `cat /app/backend/.env | grep ADMIN_PASSWORD`
- Reset if needed: `python3 /app/scripts/setup_admin.py`

---

## ✅ Completion Checklist

- [ ] Purchased domain: nssoln.com
- [ ] Added custom domain in Emergent dashboard
- [ ] Configured DNS CNAME records (www and @)
- [ ] Deleted old A records
- [ ] Waited for DNS propagation (15+ minutes)
- [ ] Verified DNS with dnschecker.org
- [ ] SSL certificate Active in Emergent
- [ ] Website loads at https://www.nssoln.com
- [ ] Admin login works at /admin/login
- [ ] API responds at /api/
- [ ] Tested services endpoint
- [ ] Rebuilt mobile apps with new branding
- [ ] Tested mobile app connectivity
- [ ] Submitted apps to stores (optional)

---

## 📞 Support

**Emergent Platform:** Check dashboard for support  
**Domain Registrar:** Contact support for DNS issues  
**Application Logs:** `/var/log/supervisor/backend.err.log`  
**Detailed Guide:** `/app/DOMAIN_SETUP_DETAILED_GUIDE.md`

---

## 🎉 Launch Checklist

Once all steps are complete:

✅ **Website:** Live at https://www.nssoln.com  
✅ **Branding:** NSSolutions across all platforms  
✅ **Admin Access:** Secure at /admin/login  
✅ **Mobile Apps:** iOS & Android with new branding  
✅ **API:** Fully functional at /api/  

**Your NSSolutions platform is ready for launch!** 🚀

---

## 📝 Important Notes

- **Branding:** All references changed from "DevServices" to "NSSolutions"
- **Domain:** All endpoints configured for www.nssoln.com
- **Mobile Apps:** App name changed to "NSSolutions"
- **SSL:** Automatically provisioned by Emergent
- **Cost:** 50 credits/month for custom domain

---

**Last Updated:** Configuration complete with NSSolutions branding and www.nssoln.com domain!
