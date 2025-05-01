# 🤖 Frontdesk: Human-in-the-Loop AI Supervisor

This is a local prototype for a human-in-the-loop AI receptionist system, built for the Frontdesk Engineering Test. The goal is to simulate a real-world AI agent that can escalate unknown queries to a human supervisor, learn over time, and respond more intelligently in the future.

---

## 🧠 Features

- AI agent that responds to known questions using a JSON-based knowledge base.
- If unsure, it escalates the query to a human supervisor.
- Supervisor dashboard to resolve pending questions and teach the AI.
- Responses are saved and used in future AI conversations.
- LiveKit token generation for simulated call context (token only, no UI join screen).
- Console-based simulation of calls, messages, and escalation.

---

## 📁 Project Structure

```
controllers/
  agent.controller.js        # Handles incoming calls from users
  supervisor.controller.js   # Manages supervisor actions & UI

models/
  helpRequest.js             # Help request model logic
  knowledgeBase.js           # Knowledge base read/write logic

data/
  helpRequests.json          # Stores all active and resolved help requests
  knowledgeBase.json         # Stores learned questions and answers

routes/
  agent.routes.js            # Routes for AI agent
  supervisor.routes.js       # Routes for supervisor panel

services/
  ai.service.js              # Simulated AI logic
  liveKit.service.js         # LiveKit token generation logic

views/
  dashboard.ejs              # Supervisor dashboard UI
  learnedAnswers.ejs         # View learned Q&A

public/css/
  main.css                   # (Optional) UI styles

app.js                       # Main app file
.env                         # LiveKit API credentials
```

---

## 🚀 How to Run

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/frontdesk-assessment.git
cd frontdesk-assessment
npm install
```

### 2. Configure `.env`

```env
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
LIVEKIT_URL=wss://your-livekit-server-url
```

### 3. Start the App

```bash
npm run dev   # or nodemon app.js
```

Visit:
- Supervisor dashboard: http://localhost:3000/supervisor
- API endpoint: `POST /agent/call` with JSON payload:

```json
{
  "question": "Do you offer facial treatments?",
  "callerId": "caller-001"
}
```

---

## 🥪 How It Works

- **If the question is known**, the AI replies instantly using `knowledgeBase.json`.
- **If unknown**, it:
  - Logs: "Let me check with my supervisor..."
  - Creates a pending help request in `helpRequests.json`
  - Simulates notifying the supervisor
- **Supervisor reviews the question** in the UI, submits a response
- AI then:
  - Logs the follow-up reply to the original user
  - Saves the new answer into the knowledge base

---

## 📺 Demo Video

> _[Attach your screen recording video here or paste the shareable link]_

---

## 📌 Design Highlights

- **JSON for simplicity**: Fast iteration without setting up a database
- **Modular structure**: Easy to maintain and extend
- **Clear data flow** between AI → Supervisor → AI
- **LiveKit token** generation implemented (no join UI)
- **Readable code**, simple UI, and good logging

---

## 👨‍💻 What Could Be Improved

- Add join UI for supervisor (optional in this phase)
- Implement auto-expiry of unresolved help requests
- Add tests for `knowledgeBaseModel` and `helpRequestModel`
- Use a real database (like SQLite or DynamoDB) for persistence
- Enable audio call simulation (e.g., LiveKit audio rooms or Twilio)

---

## 👋 Author

**Chandan Gaharwar**  
[chandan.symentix+01@gmail.com](mailto:chandan.symentix+01@gmail.com)

---

## ✅ Submitted to: Frontdesk Team