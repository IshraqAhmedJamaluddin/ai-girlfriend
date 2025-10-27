# Deployment Guide for AI Girlfriend App

## 🚀 Quick Deployment Guide

This guide will help you deploy your AI Girlfriend app to GitHub Pages while keeping your Gemini API key secure.

## ⚠️ Critical: API Key Security

Since GitHub Pages hosts **static websites**, environment variables don't work the same way as with server-side applications. Here are your options:

---

## Option 1: Vercel (Recommended - Easiest & Most Secure) ⭐

**Pros:** Free, easy, supports environment variables
**Cons:** None

### Steps:

1. Sign up at [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Click "Environment Variables"
   - Add: `VITE_GEMINI_API_KEY` with your key
5. Deploy!

Your app will be live at: `https://your-app-name.vercel.app`

---

## Option 2: Netlify (Recommended - Also Easy) ⭐

**Pros:** Free, easy, supports environment variables
**Cons:** None

### Steps:

1. Sign up at [Netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Add environment variable:
   - Site settings → Environment variables
   - Add: `VITE_GEMINI_API_KEY` with your key
5. Deploy settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

Your app will be live at: `https://your-app-name.netlify.app`

---

## Option 3: GitHub Pages with Backend Proxy (Most Secure for GitHub Pages)

**Pros:** Stays on GitHub, very secure
**Cons:** Requires a separate backend service

### Architecture:

```
Frontend (GitHub Pages)
    ↓
Backend API (Render/Railway/etc - Stores API Key)
    ↓
Gemini API
```

### Steps:

#### Frontend Changes:

1. Create `src/services/apiService.ts`:

```typescript
const API_BASE_URL = "https://your-backend-url.render.com"; // or railway.app, etc.

export const sendMessageToAI = async (message: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from AI");
  }

  const data = await response.json();
  return data.response;
};
```

2. Update your App.tsx to use this service instead

#### Backend Creation:

Create a simple Express.js backend on [Render](https://render.com):

1. Create a new file: `backend/server.js`:

```javascript
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

let chatSession = null;

function initializeChat() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a sweet, romantic AI girlfriend..." }],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! 💕 I'm your AI girlfriend..." }],
      },
    ],
  });

  return chatSession;
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!chatSession) {
      chatSession = initializeChat();
    }

    const { message } = req.body;
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

2. Create `backend/package.json`:

```json
{
  "name": "ai-girlfriend-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@google/generative-ai": "^0.21.0"
  }
}
```

3. Deploy to Render:

   - New Web Service
   - Connect GitHub repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variable: `GEMINI_API_KEY`

4. Update frontend with your backend URL
5. Deploy frontend to GitHub Pages (see next section)

---

## Option 4: Direct GitHub Pages (Simple but Less Secure)

### ⚠️ WARNING: This exposes your API key in the built code!

Only use this if:

- It's a personal project
- You've set API key restrictions in Google Cloud Console
- You understand the risks

### Steps:

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update your `.env` file with your actual key** (this will be included in the build):

```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

4. Build and deploy:

```bash
npm run build
npm run deploy
```

5. Enable GitHub Pages:

   - Settings → Pages
   - Source: `gh-pages` branch

6. Set API key restrictions:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services → Credentials
   - Click your API key
   - Application restrictions → HTTP referrers
   - Add: `https://*.github.io/*`, `http://localhost:*`

---

## 🔐 Securing Your Gemini API Key

### 1. Add Domain Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your Gemini API key
4. Under **Application restrictions**:
   - Select **HTTP referrers**
   - Add your domain: `https://yourusername.github.io/*`
   - Add localhost: `http://localhost:*`

### 2. Set Quota Limits

1. In API credentials
2. Scroll to **API restrictions**
3. Set daily/monthly quotas to prevent overage

### 3. Monitor Usage

1. Go to **APIs & Services** → **Dashboard**
2. Monitor API usage regularly
3. Set up alerts for unusual activity

---

## 📋 Deployment Checklist

- [ ] API key secured with domain restrictions
- [ ] Quota limits set
- [ ] `.env` file not committed to git
- [ ] Environment variables configured in hosting platform
- [ ] App deployed successfully
- [ ] Tested on live URL
- [ ] Mobile responsive tested

---

## 🌟 Recommended: Hybrid Approach (Best of All Worlds)

Use **Vercel** or **Netlify** for the easiest and most secure deployment:

1. ✅ Free hosting
2. ✅ Built-in environment variable support
3. ✅ Automatic deployments from GitHub
4. ✅ Custom domains
5. ✅ SSL certificates included
6. ✅ Fast CDN

**Get started in 5 minutes:**

1. Push code to GitHub
2. Import to Vercel/Netlify
3. Add environment variable
4. Deploy!

---

## 💡 Tips

- Always use environment variables, never hardcode API keys
- Set up API key restrictions in Google Cloud Console
- Monitor usage regularly
- Consider rate limiting for public apps
- Use a backend proxy for production apps
- Test locally before deploying

---

## 🆘 Troubleshooting

### Environment variable not working?

- Make sure variable starts with `VITE_`
- Rebuild after adding environment variables
- Check if hosting platform supports environment variables for static sites

### API key exposed?

- Revoke it immediately in Google Cloud Console
- Create a new API key
- Add proper restrictions
- Never commit `.env` file

### Build errors?

- Clear `node_modules` and reinstall
- Check Node.js version (16+)
- Review build logs for specific errors

---

## 📞 Need Help?

- Check the main [README.md](./README.md)
- Review hosting platform documentation
- Check [GitHub Issues](https://github.com/yourusername/ai-girlfriend/issues)

Happy deploying! 💕
