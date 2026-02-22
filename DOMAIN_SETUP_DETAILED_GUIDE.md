# Complete Step-by-Step Guide: Custom Domain Setup
## devservices.com Configuration

This guide will walk you through EVERY step to set up your custom domain.

---

## 📋 PREREQUISITES

Before starting, you need:
1. ✅ A domain name purchased (devservices.com)
2. ✅ Access to your domain registrar account (GoDaddy, Namecheap, etc.)
3. ✅ Emergent account with your DevServices app
4. ✅ 50 credits in your Emergent account (for custom domain)

---

# PART 1: ADD CUSTOM DOMAIN IN EMERGENT

## Step 1: Login to Emergent

1. Open your browser
2. Go to: **https://app.emergent.sh**
3. Click **"Login"** or **"Sign In"**
4. Enter your email and password
5. Click **"Login"**

**You should see:** Your Emergent dashboard with your apps listed

---

## Step 2: Find Your DevServices App

1. On the dashboard, look for your app list
2. Find the app named **"DevServices"** or **"build-serve-test"**
3. Click on the app name to open it

**You should see:** App details page with various tabs/sections

---

## Step 3: Navigate to Custom Domain Section

Look for one of these options (depends on Emergent UI):
- **"Settings"** tab → then **"Custom Domain"**
- **"Domains"** section in the sidebar
- **"Configure"** → **"Custom Domain"**
- **"Deployment"** → **"Domain Settings"**

**Click on it to open custom domain settings**

---

## Step 4: Add Your Custom Domain

1. You'll see a page titled **"Custom Domain"** or **"Add Domain"**
2. Look for an input field or button that says:
   - **"Add Custom Domain"**
   - **"Configure Domain"**
   - **"Add New Domain"**
   
3. **Click the button or field**

4. A form will appear. Enter:
   ```
   www.devservices.com
   ```
   
5. **Click "Add"** or **"Save"** or **"Continue"**

---

## Step 5: Confirm Domain Addition

1. You'll see a confirmation screen
2. It may show:
   - Domain: **www.devservices.com**
   - Status: **Pending** or **Configuring**
   - SSL Certificate: **Provisioning**
   
3. **Important:** The page will show DNS instructions
4. **Keep this page open** - you'll need the information for DNS setup

**Note:** You'll see a charge of 50 credits/month

---

## Step 6: Note DNS Configuration Requirements

Emergent will show you what DNS records to add. It will look something like:

```
Type: CNAME
Name: www
Value: build-serve-test.preview.emergentagent.com
```

**Write this down or keep the page open!**

---

# PART 2: CONFIGURE DNS RECORDS

Now we'll configure DNS at your domain registrar. Choose your registrar below:

---

## OPTION A: GoDaddy DNS Configuration

### Step 1: Login to GoDaddy

1. Go to: **https://www.godaddy.com**
2. Click **"Sign In"** (top right)
3. Enter your username and password
4. Click **"Sign In"**

### Step 2: Access Domain Management

1. Click on your profile name (top right)
2. Select **"My Products"**
3. Find **"Domains"** section
4. Locate **devservices.com** in the list
5. Click **"DNS"** button next to it

**You should see:** DNS Management page with existing records

### Step 3: Remove Old A Records (Important!)

1. Look for any **Type: A** records pointing to devservices.com
2. Find the **trash/delete icon** next to each A record
3. Click the trash icon
4. Confirm deletion
5. **Delete ALL A records** for @ and www

### Step 4: Add CNAME Record for www

1. Click **"Add"** button (usually near top or bottom)
2. Select **"CNAME"** from the Type dropdown
3. Fill in the fields:
   - **Type:** CNAME
   - **Host:** www
   - **Points to:** build-serve-test.preview.emergentagent.com
   - **TTL:** 1 Hour (or leave default)
4. Click **"Save"**

### Step 5: Add CNAME Record for Root Domain

1. Click **"Add"** button again
2. Select **"CNAME"** from the Type dropdown
3. Fill in the fields:
   - **Type:** CNAME
   - **Host:** @ (this means root domain)
   - **Points to:** build-serve-test.preview.emergentagent.com
   - **TTL:** 1 Hour
4. Click **"Save"**

### Step 6: Verify Records

Your DNS records should now show:

```
Type: CNAME | Name: www | Value: build-serve-test.preview.emergentagent.com
Type: CNAME | Name: @   | Value: build-serve-test.preview.emergentagent.com
```

**Click "Save All Changes"** if there's a button

---

## OPTION B: Namecheap DNS Configuration

### Step 1: Login to Namecheap

1. Go to: **https://www.namecheap.com**
2. Click **"Sign In"** (top right)
3. Enter your username and password
4. Click **"Sign In"**

### Step 2: Access Domain List

1. Click **"Domain List"** in the left sidebar
2. Find **devservices.com** in the list
3. Click **"Manage"** button next to it

### Step 3: Open Advanced DNS

1. Click on the **"Advanced DNS"** tab at the top
2. You'll see a list of DNS records

### Step 4: Remove Old A Records

1. Look for any **Type: A Record**
2. Click the **trash icon** next to each one
3. Confirm deletion
4. Remove ALL A records

### Step 5: Add CNAME Record for www

1. Click **"Add New Record"** button
2. Select **"CNAME Record"** from dropdown
3. Fill in:
   - **Type:** CNAME Record
   - **Host:** www
   - **Target:** build-serve-test.preview.emergentagent.com
   - **TTL:** Automatic
4. Click the **green checkmark** to save

### Step 6: Add CNAME for Root Domain

1. Click **"Add New Record"** button
2. Select **"CNAME Record"** from dropdown
3. Fill in:
   - **Type:** CNAME Record
   - **Host:** @ (or leave blank)
   - **Target:** build-serve-test.preview.emergentagent.com
   - **TTL:** Automatic
4. Click the **green checkmark** to save

### Step 7: Save Changes

1. Look for **"Save All Changes"** button
2. Click it
3. You should see a success message

---

## OPTION C: Cloudflare DNS Configuration

### Step 1: Login to Cloudflare

1. Go to: **https://dash.cloudflare.com**
2. Enter your email and password
3. Click **"Log In"**

### Step 2: Select Your Domain

1. You'll see a list of domains
2. Click on **devservices.com**

### Step 3: Go to DNS Settings

1. Click **"DNS"** in the top menu
2. You'll see **"DNS Records"** section

### Step 4: Remove Old A Records

1. Find any **Type: A** records
2. Click **"Edit"** or the **three dots menu**
3. Click **"Delete"**
4. Confirm deletion
5. Remove ALL A records

### Step 5: Add CNAME for www

1. Click **"Add record"** button
2. Fill in the fields:
   - **Type:** CNAME
   - **Name:** www
   - **Target:** build-serve-test.preview.emergentagent.com
   - **Proxy status:** 🟧 Proxied (orange cloud - ON)
   - **TTL:** Auto
3. Click **"Save"**

### Step 6: Add CNAME for Root Domain

1. Click **"Add record"** button again
2. Fill in:
   - **Type:** CNAME
   - **Name:** @ (or devservices.com)
   - **Target:** build-serve-test.preview.emergentagent.com
   - **Proxy status:** 🟧 Proxied (ON)
   - **TTL:** Auto
3. Click **"Save"**

**Note:** Cloudflare automatically saves changes

---

## OPTION D: Other Domain Registrars

If your registrar isn't listed above, follow these general steps:

### General Steps for Any Registrar:

1. **Login** to your domain registrar account
2. **Find** "DNS Management" or "DNS Settings" or "Name Servers"
3. **Select** your domain: devservices.com
4. **Delete** all existing A records
5. **Add** new CNAME record:
   - Type: CNAME
   - Host/Name: www
   - Value/Target: build-serve-test.preview.emergentagent.com
6. **Add** another CNAME record:
   - Type: CNAME
   - Host/Name: @ (or blank, or root)
   - Value/Target: build-serve-test.preview.emergentagent.com
7. **Save** all changes

---

# PART 3: WAIT FOR DNS PROPAGATION

## What is DNS Propagation?

DNS propagation is the time it takes for your DNS changes to spread across the internet.

### Timeline:

- **Minimum:** 5 minutes
- **Typical:** 15-30 minutes
- **Maximum:** 24-48 hours

### What to do while waiting:

1. ✅ Have a coffee ☕
2. ✅ Take a break 🧘
3. ✅ Do other work 💼

**Don't panic if it doesn't work immediately!**

---

## How to Check DNS Propagation

### Method 1: Online Checker (Easiest)

1. Go to: **https://dnschecker.org**
2. Enter: **www.devservices.com**
3. Click **"Search"**
4. Look for green checkmarks around the world
5. It should show: build-serve-test.preview.emergentagent.com

**When most locations show green checkmarks, you're good to go!**

### Method 2: Command Line (For Tech Users)

**On Mac/Linux:**
```bash
nslookup www.devservices.com
```

**On Windows:**
```cmd
nslookup www.devservices.com
```

**What you should see:**
```
Non-authoritative answer:
www.devservices.com canonical name = build-serve-test.preview.emergentagent.com
```

---

# PART 4: VERIFY SSL CERTIFICATE

## Check SSL Status in Emergent

1. Go back to **Emergent dashboard**
2. Open your **DevServices app**
3. Go to **Custom Domain** section
4. Check the status:
   - ✅ **Status: Active** (green)
   - ✅ **SSL: Active** or **Certificate: Valid**

**If status is "Pending":**
- Wait 10-15 minutes
- Refresh the page
- SSL certificates take time to provision

---

# PART 5: TEST YOUR WEBSITE

## Test 1: Website Loads

1. Open a **new incognito/private browser window**
2. Go to: **https://www.devservices.com**
3. You should see your DevServices landing page
4. Check for the **lock icon** 🔒 in the address bar (SSL working)

**If you see an error:**
- Wait longer for DNS propagation
- Clear browser cache: Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Safari)
- Try a different browser

---

## Test 2: Admin Access

1. Go to: **https://www.devservices.com/admin/login**
2. You should see the admin login page
3. Enter your admin password
4. Click **"Login"**
5. You should access the admin dashboard

---

## Test 3: API Endpoints

### Using Browser:

1. Go to: **https://www.devservices.com/api/**
2. You should see JSON response:
   ```json
   {"message": "Development Services API"}
   ```

### Using Command Line:

```bash
curl https://www.devservices.com/api/
```

**Should return:**
```json
{"message":"Development Services API"}
```

---

## Test 4: Services Endpoint

```bash
curl https://www.devservices.com/api/services
```

**Should return:** Array of services (Development, Deployment, QA)

---

# PART 6: MOBILE APP UPDATES

## iOS App Build

1. Open terminal
2. Navigate to mobile folder:
   ```bash
   cd /app/mobile
   ```
3. Install dependencies:
   ```bash
   yarn install
   cd ios && pod install && cd ..
   ```
4. Build release version:
   ```bash
   npx react-native run-ios --configuration Release
   ```

## Android App Build

1. Navigate to mobile folder:
   ```bash
   cd /app/mobile
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Build release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
4. Find APK at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

---

# TROUBLESHOOTING GUIDE

## Problem 1: Website Not Loading

**Symptoms:** Browser shows "Site can't be reached" or "DNS_PROBE_FINISHED_NXDOMAIN"

**Solutions:**

1. **Check DNS propagation:**
   - Use https://dnschecker.org
   - Wait if not fully propagated

2. **Clear DNS cache:**
   - **Mac:** `sudo dscacheutil -flushcache`
   - **Windows:** `ipconfig /flushdns`
   - **Linux:** `sudo systemd-resolve --flush-caches`

3. **Check DNS records:**
   - Login to registrar
   - Verify CNAME records are correct
   - Ensure A records are deleted

---

## Problem 2: SSL Certificate Error

**Symptoms:** "Your connection is not private" or "NET::ERR_CERT_COMMON_NAME_INVALID"

**Solutions:**

1. **Wait for certificate provisioning:**
   - Can take up to 15 minutes
   - Check Emergent dashboard for certificate status

2. **Verify domain in Emergent:**
   - Ensure www.devservices.com is added correctly
   - Check for typos

3. **Hard refresh browser:**
   - Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear all cache

---

## Problem 3: API Not Working

**Symptoms:** API calls return errors or CORS errors

**Solutions:**

1. **Check backend is running:**
   ```bash
   sudo supervisorctl status backend
   ```

2. **Verify CORS configuration:**
   ```bash
   grep CORS /app/backend/.env
   ```
   Should include: devservices.com

3. **Restart backend:**
   ```bash
   sudo supervisorctl restart backend
   ```

4. **Check backend logs:**
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   ```

---

## Problem 4: Admin Won't Login

**Symptoms:** "Invalid password" even with correct password

**Solutions:**

1. **Clear browser cache and cookies:**
   - Especially for www.devservices.com domain
   - Try incognito/private window

2. **Check backend environment:**
   ```bash
   cat /app/backend/.env | grep ADMIN_PASSWORD
   ```

3. **Reset admin password:**
   ```bash
   python3 /app/scripts/setup_admin.py
   sudo supervisorctl restart backend
   ```

---

## Problem 5: DNS Changes Not Reflecting

**Symptoms:** Still seeing old site or nothing at all

**Solutions:**

1. **Check TTL (Time To Live):**
   - If old TTL was high (e.g., 86400), wait that long
   - New changes respect old TTL first

2. **Verify at registrar:**
   - Login and confirm changes were saved
   - Some registrars have "pending" status

3. **Test from different networks:**
   - Try mobile data (not WiFi)
   - Use VPN to different location
   - Ask friend to check

---

# QUICK REFERENCE

## DNS Records Summary

```
Type: CNAME
Host: www
Value: build-serve-test.preview.emergentagent.com

Type: CNAME
Host: @
Value: build-serve-test.preview.emergentagent.com
```

## Your URLs

- Website: https://www.devservices.com
- Admin: https://www.devservices.com/admin/login
- API: https://www.devservices.com/api

## Important Files

- Backend config: `/app/backend/.env`
- Frontend config: `/app/frontend/.env`
- Mobile config: `/app/mobile/.env`

## Useful Commands

```bash
# Check DNS
nslookup www.devservices.com

# Test website
curl https://www.devservices.com

# Test API
curl https://www.devservices.com/api/

# Restart backend
sudo supervisorctl restart backend

# Check backend status
sudo supervisorctl status backend

# View logs
tail -f /var/log/supervisor/backend.err.log
```

---

# COMPLETION CHECKLIST

Use this to track your progress:

- [ ] Purchased domain: devservices.com
- [ ] Added custom domain in Emergent dashboard
- [ ] Configured DNS CNAME records
- [ ] Deleted old A records
- [ ] Waited for DNS propagation (15+ minutes)
- [ ] Verified DNS with dnschecker.org
- [ ] SSL certificate shows as Active in Emergent
- [ ] Website loads at https://www.devservices.com
- [ ] Admin login works at /admin/login
- [ ] API responds at /api/
- [ ] Tested quote request form
- [ ] Tested consultation booking
- [ ] Rebuilt mobile apps with new domain
- [ ] Tested mobile app connectivity
- [ ] Bookmarked admin URL

---

## 🎉 SUCCESS!

Once all checklist items are complete, your DevServices platform is live on your custom domain!

**Your live URLs:**
- 🌐 **Main Site:** https://www.devservices.com
- 🔐 **Admin:** https://www.devservices.com/admin/login
- 📡 **API:** https://www.devservices.com/api
- 📱 **Mobile:** iOS & Android apps connected

**Congratulations! Your professional service platform is now live!** 🚀

---

## Need More Help?

1. **Emergent Support:** Check dashboard for support options
2. **Domain Registrar Support:** Contact their help desk for DNS issues
3. **Application Logs:** Check `/var/log/supervisor/` for errors
4. **Documentation:** Review `/app/ADMIN_ACCESS_GUIDE.md`

---

**Last Updated:** Configuration complete and ready for deployment!
