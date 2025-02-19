# Quizify 🧠

A modern quiz platform for creating, attempting, and analyzing interactive quizzes with AI-powered explanations.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-purple?style=for-the-badge&logo=vercel)](https://quizify-one.vercel.app/)

## ✨ Features

### Quiz Creation

- **Multiple Question Types**: Create MCQs or Integer-based questions
- **Flexible Configuration**: Set time limits per question (30-300 seconds)
- **Draft System**: Save in-progress quizzes (UI placeholder)
- **Publishing**: Share quizzes publicly (UI placeholder)

### Quiz Attempt

- ⏳ Interactive timer for each question
- 🧠 AI Explanation integration (Gemini API)
- ✅ Instant answer validation
- 📊 Performance tracking with IndexedDB

### Post-Quiz Analysis

- 📈 Interactive time-per-question chart
- 🏆 Accuracy statistics & score breakdown
- 📚 Attempt history tracking
- 🥇 Leaderboard with historical performance

### Security & Auth

- 🔐 Clerk authentication integration
- 👤 User session management
- 🛡️ Secure API key handling

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Auth**: [Clerk](https://clerk.dev/)
- **Database**: Browser [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Charting**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Local Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/PrathamChhabra04/quizify.git
   cd quizify
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**

- Create .env.local file with:
  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
  CLERK_SECRET_KEY=your_clerk_secret_key
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  GEMINI_API_KEY=your_gemini_key
  ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
5. **Access Application**

- Open http://localhost:3000

# 📌 Important Notes

1. **Clerk Setup Required**

- Create account at Clerk.dev

- Configure social providers/email auth

- Add callback URLs in Clerk dashboard

2. **Gemini API Key**

- Obtain from Google AI Studio

3. **Local Storage**

- All quiz data stored in browser's IndexedDB

- Data persists per browser/device

- Clear storage on browser reset
