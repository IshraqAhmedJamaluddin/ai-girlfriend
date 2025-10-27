# AI Girlfriend App 💕

A beautiful, romantic AI girlfriend chat application built with React, Vite, Material UI, and Google's Gemini AI.

![AI Girlfriend](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.8-purple) ![Material UI](https://img.shields.io/badge/Material--UI-5.15.10-blue) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## ✨ Features

- 💕 Beautiful romantic UI with gradient backgrounds
- ❤️ Floating hearts animations throughout the app
- 🤖 Powered by Google's Gemini AI
- 💬 Smooth chat interface with message animations
- 🌸 Responsive design that works on all devices
- 🎨 Modern Material UI components
- 💫 Heartbeat animations and sparkle effects

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-girlfriend.git
cd ai-girlfriend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## 📦 Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deploying to GitHub Pages

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit: AI Girlfriend app"
git branch -M main
git remote add origin https://github.com/yourusername/ai-girlfriend.git
git push -u origin main
```

### Step 2: Configure GitHub Pages with Environment Variables

**⚠️ IMPORTANT: API Key Security**

Since GitHub Pages hosts static sites, environment variables won't work the same way. Here are your options:

#### Option A: Use GitHub Secrets (Recommended for development)

This won't work for static GitHub Pages, but you can use it for other CI/CD:

1. Go to your repository on GitHub
2. Click Settings → Secrets and variables → Actions
3. Add a new repository secret named `VITE_GEMINI_API_KEY`
4. Create a GitHub Actions workflow (`.github/workflows/deploy.yml`) to build with the secret

#### Option B: Use Vercel or Netlify (Recommended)

These platforms support environment variables natively:

**Vercel:**

1. Import your GitHub repository
2. Add `VITE_GEMINI_API_KEY` as an environment variable
3. Deploy!

**Netlify:**

1. Import your GitHub repository
2. Add `VITE_GEMINI_API_KEY` as an environment variable
3. Deploy!

#### Option C: Create a Free Backend Proxy (Most Secure)

Create a simple Node.js backend on [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io) to proxy requests to Gemini, keeping your API key on the server.

### Step 3: Manual GitHub Pages Deployment

If you still want to use GitHub Pages:

1. Install GitHub Pages deployment tool:

```bash
npm install --save-dev gh-pages
```

2. Update your `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts` to match your repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/", // Change this to match your repo
});
```

4. Build and deploy:

```bash
npm run build
npm run deploy
```

⚠️ **Note:** With this approach, you'll need to either:

- Use a backend proxy service (most secure)
- Build the API key directly into the code (NOT RECOMMENDED for public repos)
- Use client-side API keys with domain restrictions

### Step 4: Enable GitHub Pages

1. Go to your repository Settings
2. Click Pages in the left sidebar
3. Under "Source", select `gh-pages` branch
4. Click Save

Your site will be available at: `https://yourusername.github.io/ai-girlfriend/`

## 🔐 Protecting Your Gemini API Key

### Best Practices:

1. **Never commit your `.env` file** - It's already in `.gitignore`
2. **Add domain restrictions** in Google Cloud Console:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to APIs & Services → Credentials
   - Select your API key
   - Add domain restrictions (e.g., `yourusername.github.io`)

3. **Use quota limits** to prevent abuse:

   - Set daily/monthly quotas for your API key
   - Monitor usage regularly

4. **Consider rate limiting** if building a public app

### Recommended Architecture for Public Apps:

```
┌─────────────────┐
│  React Frontend │  (GitHub Pages)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend Proxy  │  (Vercel/Netlify/Render)
│  (Your API Key) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Gemini API    │
└─────────────────┘
```

## 🎨 Customization

### Changing the Theme

Edit `src/App.tsx` to modify colors:

```typescript
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#your-color-here",
    },
  },
});
```

### Updating the AI Personality

Edit `src/services/geminiService.ts` to change the system prompt and personality.

## 📝 Project Structure

```
ai-girlfriend/
├── src/
│   ├── components/
│   │   ├── AppHeader.tsx
│   │   └── MessageList.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Share your own AI girlfriend prompts!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## ⚠️ Disclaimer

This is a demo project for educational purposes. The AI girlfriend is a conversational interface powered by AI and should be used responsibly.

## 🔗 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Material UI Documentation](https://mui.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [GitHub Pages Deployment](https://pages.github.com/)

## 💝 Made with Love

Built with ❤️ using React, Vite, Material UI, and Gemini AI.

---

**Remember:** Always keep your API keys secure and never expose them in public repositories!
