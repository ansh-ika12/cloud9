
# ☁️ Cloud 9 — AI Coding Mentor

An AI-powered coding mentor that helps students **learn programming instead of just receiving answers**.

Cloud 9 combines **Google Gemini**, **Retrieval-Augmented Generation (RAG)**, and a curated programming knowledge base to provide intelligent debugging, concept explanations, and personalized coding practice.

---

## 🚀 Overview

Cloud 9 is designed as a virtual coding mentor that guides students through programming problems by providing explanations, hints, and practice questions instead of complete solutions.

The application follows a mentor-style teaching approach, encouraging users to develop problem-solving skills while learning programming concepts more effectively.

---

## ✨ Features

### 🔍 Smart Code Debugger
- Analyze buggy code
- Identify errors
- Explain root causes
- Provide hints instead of direct fixes

### 📖 AI Concept Explainer
- Explain programming concepts
- Beginner-friendly analogies
- Skill-level based responses
- Context-aware explanations using RAG

### 🎯 Practice Problem Generator
- Generate coding exercises
- Easy, Medium & Hard difficulty
- Validate submitted answers
- Progressive hints before revealing solutions

### 💬 Conversation History
- Save previous chats
- Resume conversations anytime
- Organized by learning mode

### 👍 Feedback System
- Rate AI responses
- Improve future responses

### 🔐 Authentication
- Google Sign-In
- Email & Password Authentication
- Secure user sessions

### 📚 Knowledge Base
- Admin document uploads
- RAG-powered retrieval
- Curated programming resources

---

# 🧠 How It Works

1. User signs in.
2. Selects Debug, Explain, or Practice mode.
3. Sends code or a programming question.
4. The system searches the knowledge base using RAG.
5. Gemini generates a mentor-style response.
6. Conversation is stored.
7. User provides feedback to improve the system.

---

# 🛠 Tech Stack

## Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes

## AI
- Google Gemini 2.5 Flash
- Gemini Embeddings

## RAG
- LangChain.js
- Pinecone Vector Database

## Database
- Supabase PostgreSQL

## Authentication
- Supabase Auth
- Google OAuth

## Storage
- Supabase Storage

## Deployment
- Vercel

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── (auth)
│   ├── (dashboard)
│   ├── api/
│   └── layout.tsx
│
├── components/
│   ├── chat/
│   ├── layout/
│   └── ui/
│
├── hooks/
│
├── lib/
│
├── prompts/
│
└── types/

supabase/
scripts/
knowledge-base/
```

---

# 🎯 Core Learning Modes

## Debug Mode

Paste your code and receive:
- Bug identification
- Error explanation
- Guided hints
- Best practices

---

## Explain Mode

Ask questions like:

> What is recursion?

> Explain async/await.

> What is a binary search tree?

Cloud 9 responds with beginner-friendly explanations supported by its knowledge base.

---

## Practice Mode

Generate programming questions with:
- Easy
- Medium
- Hard

Receive validation and hints before seeing solutions.

---

# 🔄 AI Workflow

```
Student Input
      ↓
Authentication
      ↓
Input Validation
      ↓
Generate Embedding
      ↓
Search Pinecone
      ↓
Retrieve Context
      ↓
Gemini AI
      ↓
Mentor Response
      ↓
Save Conversation
      ↓
Collect Feedback
```

---

# 🌟 Future Improvements

- Voice-based coding mentor
- Multi-language support
- Code execution sandbox
- Personalized learning roadmap
- AI-generated quizzes
- Leaderboards & achievements
- Interview preparation mode
- GitHub integration
- Collaborative coding sessions

---

# 🎯 Target Users

- Beginner programmers
- College students
- Coding bootcamp learners
- Self-taught developers
- Competitive programming beginners

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

Developed by **Anshika Singh**

Built with ❤️ using Next.js, Gemini AI, LangChain, Pinecone, and Supabase.
