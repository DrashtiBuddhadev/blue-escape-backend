# Frontend Integration Guide

**Connecting Client & Admin Panel to Hostinger VPS Backend**

This guide explains exactly what changes you need to make in your frontend applications (client website and admin panel) to connect them to your newly deployed backend on Hostinger VPS.

---

## Table of Contents

1. [Overview](#overview)
2. [Backend API URLs](#backend-api-urls)
3. [Client Frontend Changes](#client-frontend-changes)
4. [Admin Panel Changes](#admin-panel-changes)
5. [Testing the Integration](#testing-the-integration)
6. [CORS Configuration](#cors-configuration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

After deploying your backend to Hostinger VPS, you need to update the API base URL in your frontend applications from `localhost` to your VPS IP address or domain.

**Before deployment:**
- API URL: `http://localhost:3000`

**After deployment (with IP):**
- API URL: `http://72.60.206.231:3000`

**After deployment (with domain & SSL):**
- API URL: `https://api.blueescape.in`

---

## Backend API URLs

### Option 1: Using VPS IP Address (Immediate)

```
http://72.60.206.231:3000
```

**Pros:**
- Works immediately after deployment
- No domain setup required
- Good for testing

**Cons:**
- Not HTTPS (no SSL encryption)
- IP address is not user-friendly
- Not recommended for production

### Option 2: Using Domain with SSL (Recommended)

```
https://api.blueescape.in
```

**Pros:**
- HTTPS/SSL encrypted
- Professional and user-friendly
- SEO friendly
- Recommended for production

**Cons:**
- Requires domain setup
- Requires SSL certificate configuration (covered in HOSTINGER-DEPLOYMENT.md)

---

## Client Frontend Changes

Your client frontend (React/Vue/Next.js/etc.) needs to be updated to point to the new API URL.

### Step 1: Locate Configuration File

Common locations for API configuration:

#### React (Create React App)
```
.env
.env.production
src/config.js
src/constants/api.js
src/services/api.js
```

#### Next.js
```
.env
.env.local
.env.production
next.config.js
lib/api.js
```

#### Vue.js
```
.env
.env.production
src/config.js
src/api/index.js
```

### Step 2: Update API Base URL

**Find lines that look like this:**

```javascript
// Example 1: Environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

// Example 2: Direct constant
const API_BASE_URL = 'http://localhost:3000'

// Example 3: In axios configuration
axios.defaults.baseURL = 'http://localhost:3000'

// Example 4: In fetch calls
fetch('http://localhost:3000/api/v1/blogs')
```

**Update to:**

```javascript
// Option 1: Using IP (for testing)
const API_URL = 'http://72.60.206.231:3000'

// Option 2: Using domain (recommended for production)
const API_URL = 'https://api.blueescape.in'

// Best practice: Use environment variable
const API_URL = process.env.REACT_APP_API_URL || 'https://api.blueescape.in'
```

### Step 3: Update Environment Files

#### .env (Development)
```env
REACT_APP_API_URL=http://localhost:3000
```

#### .env.production (Production)
```env
# Using IP
REACT_APP_API_URL=http://72.60.206.231:3000

# OR using domain (recommended)
REACT_APP_API_URL=https://api.blueescape.in
```

**Note:** For Next.js, use `NEXT_PUBLIC_` prefix:
```env
NEXT_PUBLIC_API_URL=https://api.blueescape.in
```

**Note:** For Vite, use `VITE_` prefix:
```env
VITE_API_URL=https://api.blueescape.in
```

### Step 4: Update API Service Files

If you have a centralized API service file:

#### Example: `src/services/api.js`

**Before:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

**After:**
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.blueescape.in';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### Step 5: Search & Replace (If Needed)

If API URLs are hardcoded throughout your codebase:

**Search for:**
```
http://localhost:3000
```

**Replace with:**
```
https://api.blueescape.in
```

**Using VS Code:**
1. Press `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac)
2. Search for: `http://localhost:3000`
3. Replace with: `https://api.blueescape.in`
4. Click "Replace All"

### Step 6: Rebuild & Deploy

After making changes:

```bash
# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Deploy to your hosting (Vercel, Netlify, etc.)
```

---

## Admin Panel Changes

Your admin panel follows the same steps as the client frontend.

### Step 1: Locate Configuration

Common files:
```
.env
.env.production
src/config/api.js
src/services/api.js
src/utils/axios.js
```

### Step 2: Update API URL

**Find:**
```javascript
const API_URL = 'http://localhost:3000'
```

**Update to:**
```javascript
const API_URL = 'https://api.blueescape.in'
```

### Step 3: Update Swagger Integration (If Applicable)

If your admin panel uses Swagger for API testing:

**Find:**
```javascript
const SWAGGER_URL = 'http://localhost:3000/api/docs-json'
```

**Update to:**
```javascript
// Swagger is disabled in production by default
// If you need it, enable it in backend main.ts first
const SWAGGER_URL = 'https://api.blueescape.in/api/docs-json'
```

**Note:** Swagger UI is automatically disabled in production for security. If you need it, you can enable it by modifying `src/main.ts` in the backend.

### Step 4: Update Authentication

Ensure JWT tokens are handled correctly with CORS:

```javascript
// Make sure credentials are included in requests
axios.defaults.withCredentials = true;

// Or for fetch API
fetch(url, {
  credentials: 'include',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
```

---

## Testing the Integration

### 1. Test Backend Health

**From browser or terminal:**

```bash
# Using IP
curl http://72.60.206.231:3000/api/v1/health

# Using domain
curl https://api.blueescape.in/api/v1/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-14T10:30:00.000Z"
}
```

### 2. Test from Frontend

Open your browser's Developer Tools (F12) and go to the Console tab.

**Test API connection:**

```javascript
// Replace with your API URL
fetch('https://api.blueescape.in/api/v1/health')
  .then(res => res.json())
  .then(data => console.log('API Status:', data))
  .catch(err => console.error('API Error:', err))
```

### 3. Test Specific Endpoints

**Get all blogs:**

```javascript
fetch('https://api.blueescape.in/api/v1/blogs')
  .then(res => res.json())
  .then(data => console.log('Blogs:', data))
```

**Get all collections:**

```javascript
fetch('https://api.blueescape.in/api/v1/collections')
  .then(res => res.json())
  .then(data => console.log('Collections:', data))
```

### 4. Test Authentication (Admin Panel)

```javascript
// Login test
fetch('https://api.blueescape.in/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password',
  }),
})
  .then(res => res.json())
  .then(data => console.log('Login:', data))
```

---

## CORS Configuration

### What is CORS?

CORS (Cross-Origin Resource Sharing) allows your frontend (running on a different domain) to access your backend API.

### Update Backend CORS Settings

If you encounter CORS errors, update the `.env` file on your VPS:

**On VPS: `/var/www/blue-escape-backend/.env`**

```env
# Add your frontend domains (comma-separated)
ALLOWED_ORIGINS=https://blueescape.in,https://www.blueescape.in,https://admin.blueescape.in
```

**If testing locally:**

```env
# Include localhost for development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://blueescape.in
```

**After updating .env, restart backend:**

```bash
cd /var/www/blue-escape-backend
docker-compose -f docker-compose.prod.yml restart
```

### Frontend Domain Examples

Common frontend hosting scenarios:

**Vercel:**
```env
ALLOWED_ORIGINS=https://blueescape.vercel.app,https://blueescape.in
```

**Netlify:**
```env
ALLOWED_ORIGINS=https://blueescape.netlify.app,https://blueescape.in
```

**Custom domain:**
```env
ALLOWED_ORIGINS=https://blueescape.in,https://www.blueescape.in
```

---

## Troubleshooting

### CORS Error: "No 'Access-Control-Allow-Origin' header"

**Error in browser console:**
```
Access to fetch at 'https://api.blueescape.in/api/v1/blogs' from origin 'https://blueescape.in'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**Solution:**

1. Add your frontend domain to `ALLOWED_ORIGINS` in backend `.env`
2. Restart backend: `docker-compose -f docker-compose.prod.yml restart`
3. Clear browser cache and retry

### Network Error / ERR_CONNECTION_REFUSED

**Possible causes:**

1. **Backend is not running**
   ```bash
   # On VPS, check containers
   docker ps

   # Should see blue-escape-app-prod running
   ```

2. **Firewall blocking port**
   ```bash
   # On VPS, check firewall
   ufw status

   # Allow port 3000 if needed
   ufw allow 3000/tcp
   ```

3. **Wrong URL**
   - Verify API URL in frontend code
   - Test URL directly in browser

### 404 Not Found

**Error:** API endpoint returns 404

**Check:**

1. Verify endpoint path (should include `/api/v1/`)
   -  Correct: `https://api.blueescape.in/api/v1/blogs`
   - L Wrong: `https://api.blueescape.in/blogs`

2. Check API versioning in your code

### Unauthorized / 401 Error

**For admin panel authentication:**

1. Ensure JWT token is included in request headers
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

2. Check token expiration (default: 15 minutes)

3. Verify login credentials

### Mixed Content Error (HTTP vs HTTPS)

**Error:** "Mixed Content: The page was loaded over HTTPS, but requested an insecure resource"

**Solution:**

If your frontend uses HTTPS, your backend must also use HTTPS.

1. Setup domain and SSL certificate (see HOSTINGER-DEPLOYMENT.md)
2. Update API URL to use `https://` instead of `http://`

---

## Quick Reference

### Environment Variables by Framework

| Framework | Prefix | Example |
|-----------|--------|---------|
| Create React App | `REACT_APP_` | `REACT_APP_API_URL` |
| Next.js | `NEXT_PUBLIC_` | `NEXT_PUBLIC_API_URL` |
| Vite | `VITE_` | `VITE_API_URL` |
| Vue CLI | `VUE_APP_` | `VUE_APP_API_URL` |

### Common API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/blogs` | GET | Get all blogs |
| `/api/v1/blogs/:id` | GET | Get single blog |
| `/api/v1/collections` | GET | Get all collections |
| `/api/v1/experiences` | GET | Get all experiences |
| `/api/v1/auth/login` | POST | Admin login |
| `/api/v1/contact` | POST | Submit contact form |

### Testing Commands

```bash
# Test health
curl https://api.blueescape.in/api/v1/health

# Test blogs
curl https://api.blueescape.in/api/v1/blogs

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.blueescape.in/api/v1/blogs
```

---

## Deployment Checklist

Before deploying your frontend:

- [ ] Updated API URL in all configuration files
- [ ] Updated environment variables (`.env.production`)
- [ ] Tested API connection locally
- [ ] Added frontend domain to backend CORS `ALLOWED_ORIGINS`
- [ ] Rebuilt frontend (`npm run build`)
- [ ] Tested in production environment
- [ ] Verified all API endpoints work
- [ ] Tested authentication (admin panel)
- [ ] Checked browser console for errors
- [ ] Verified HTTPS if using SSL

---

## Need Help?

1. Check backend logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs -f app
   ```

2. Check browser console for errors (F12 ’ Console)

3. Test API directly with curl or Postman

4. Review [HOSTINGER-DEPLOYMENT.md](./HOSTINGER-DEPLOYMENT.md) for backend issues

---

**Last Updated:** October 2025
