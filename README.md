Here's your **updated and improved README.md**, fully aligned with your current implementation, file structure, and explanation of switching from local JSON to Firestore for security and scalability:

---

# 💼 Frontdesk AI Receptionist (Human-in-the-Loop)

This project simulates an AI receptionist for a fake salon business. If the AI doesn't know an answer, it escalates the question to a human supervisor, updates its knowledge base (stored in Firestore), and follows up with the original caller.

> ✅ Built for the Frontdesk Engineering Test: Human-in-the-Loop AI Supervisor

---

## 🧠 Features

* Simulated AI agent with LiveKit token generation
* Human-in-the-loop escalation for unknown questions
* Supervisor dashboard (EJS) to respond to help requests
* Lifecycle management for help requests: `Pending → Resolved / Unresolved`
* Auto-updating knowledge base in **Firebase Firestore**
* Smart duplicate handling to prevent knowledge duplication
* Admin interface to view FAQ history and search responses
* Graceful timeout handling for unresolved requests

---

## 🏗️ Updated Project Structure

```
├── app.js                      # Express entry point
├── .env                        # Environment configuration (keys, ports)
├── firebase.js                 # Firebase admin SDK initialization
├── firebaseServiceAccountKey.json # Firestore credentials (gitignored)
│
├── controllers/
│   ├── agent.controller.js     # Handles AI logic and escalation
│   └── supervisor.controller.js# Handles dashboard actions
│
├── models/
│   ├── helpRequest.js          # Firestore model for help requests
│   └── knowledgeBase.js        # Firestore model for known questions
│
├── routes/
│   ├── agent.routes.js         # POST /agent/call
│   └── supervisor.routes.js    # GET dashboard & submit responses
│
├── services/
│   ├── ai.service.js           # (Optional AI utility logic placeholder)
│   └── liveKit.service.js      # LiveKit token generation
│
├── seeders/
│   └── seedKnowledgeBase.js    # Populates Firestore with initial FAQs
│
├── views/
│   ├── knowledgeBase.ejs       # View learned answers
│   └── requests.ejs            # View and respond to help requests
│
├── public/
│   └── css/
│       └── main.css            # Optional styling
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/chandanck1998/salon-ai-agent.git
cd salon-ai-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env` File

Create a `.env` file with the following:

```env
PORT=3000
LIVEKIT_API_KEY=your_key_here
LIVEKIT_API_SECRET=your_secret_here
LIVEKIT_URL=wss://your-instance.livekit.cloud
```

### 4. Add Firestore Credentials

* Download your Firebase service account key as `firebaseServiceAccountKey.json`
* Place it in the project root and ensure it's gitignored

### 5. Run the App

```bash
npm run dev   # With nodemon
# or
npm run start # With node
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Seeding Firestore

Run the following to pre-populate your `knowledgeBase` collection with FAQs:

```bash
npm run seed
#or
node seeders/seedKnowledgeBase.js
```

Prevents duplicates using normalized IDs.

---

## 🧪 Test This Manually

### 1. Simulate a Customer Query (API)

```bash
curl -X POST http://localhost:3000/agent/call \
  -H "Content-Type: application/json" \
  -d '{"question": "Do you offer haircut services?", "callerId": "caller-001"}'
```

#### Known Question

```json
{
  "response": "Yes, we offer haircuts for men, women, and kids.",
  "livekitToken": "<your-token>"
}
```

#### Unknown Question

```json
{
  "response": "Let me check with my supervisor and get back to you.",
  "livekitToken": "<your-token>"
}
```

---

## 👩‍💻 Supervisor Dashboard

* **[Requests View](http://localhost:3000/supervisor/requests)**

  * View all help requests with status indicators
  * Submit answers directly
  * Timeout auto-marking handled after 5 mins

* **[Knowledge Base View](http://localhost:3000/supervisor/knowledge-base)**

  * Searchable list of known questions and responses
  * Automatically updated when supervisor answers

---

## ✅ Functionality Breakdown

### AI Agent

* Matches against Firestore-based knowledge base
* Escalates to supervisor if unknown
* Logs response with LiveKit token

### Help Request Lifecycle

* Stored in Firestore with `status`, `createdAt`, etc.
* Auto-marks `Unresolved` after 5 minutes
* `Resolved` updates trigger knowledge addition + follow-up message

### Knowledge Base (Firestore)

* Deduplicates entries by normalized question
* Adds `createdAt`, `updatedAt`, and `source` fields
* Supports programmatic seeding and real-time updates

---

## 🔐 Why Firestore?

Initially, local JSON files were used for rapid development.
However, for scalability, security, and concurrent access, this project now uses **Firestore**:

* ✅ Prevents file corruption in production
* ✅ No need to manually manage file locks or collisions
* ✅ Real-time document handling and robust querying

---

## 🔄 Future Improvements

* Add actual LiveKit room connection with media stream
* Integrate with Twilio for true voice/text messaging
* Add supervisor availability and live escalation
* Improve search relevance with fuzzy or semantic search

---

## 🧠 Sample Questions

### ✅ Known

* "What are your working hours?"
* "Do you have bridal packages?"
* "Thanks"

### ❓ Unknown

* "Do you offer nail art?"
* "Is there parking at the salon?"
* "What is your cancellation policy for group bookings?"

---

## 📂 License

This repository was created as part of the Frontdesk Engineering Test — for evaluation purposes only.