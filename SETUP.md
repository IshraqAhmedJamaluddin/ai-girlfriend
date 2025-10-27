# Quick Setup Guide 🚀

## 1️⃣ Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (starts with `AIza...`)

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Set Up Environment Variables

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Open `.env` and add your API key:

```
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
```

**IMPORTANT:** Never commit your `.env` file to GitHub! (It's already in `.gitignore`)

## 4️⃣ Run the App

```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## 5️⃣ Start Chatting! 💕

Type a message and your AI girlfriend will respond with love and emojis!

---

## 📝 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🌐 Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Recommended:** Use Vercel or Netlify for easiest deployment with environment variables!

---

## ⚠️ Security Reminder

Before deploying:

1. Add domain restrictions to your Gemini API key in Google Cloud Console
2. Set quota limits to prevent overage
3. Never commit your `.env` file

---

Enjoy your romantic AI girlfriend! 💝
