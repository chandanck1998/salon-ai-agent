const db = require("../firebase");
const kbRef = db.collection("knowledgeBase");
const uuidv4 = require('uuid').v4;

const knowledgeEntries = [
  {
    question: "Hello",
    answer: "Hi there! Welcome to Glam Salon. How can I assist you today?",
  },
  {
    question: "Hi",
    answer:
      "Hello! Hope you're having a great day. What would you like to know about our services?",
  },
  {
    question: "Good morning",
    answer: "Good morning! How can I help you with your salon needs today?",
  },
  {
    question: "Good afternoon",
    answer:
      "Good afternoon! I'd be happy to assist you. What would you like to ask?",
  },
  {
    question: "Good evening",
    answer: "Good evening! Looking for a haircut or skincare advice today?",
  },
  {
    question: "Thank you",
    answer:
      "You're most welcome! Let us know if there's anything else you need.",
  },
  { question: "Bye", answer: "Goodbye! Hope to see you at the salon soon." },
  { question: "Thanks", answer: "No problem at all — happy to help!" },
  {
    question: "What services do you offer?",
    answer:
      "We offer haircuts, coloring, styling, facials, waxing, and makeup services.",
  },
  {
    question: "Do you have a loyalty program?",
    answer:
      "Yes, we have a loyalty program that rewards you with points for every service.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit cards, and mobile payments.",
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, we only use cruelty-free products in our salon.",
  },
  {
    question: "What are your working hours?",
    answer: "We’re open from 9 AM to 8 PM, seven days a week.",
  },
  {
    question: "Do you offer haircut services?",
    answer: "Yes, we offer haircuts for men, women, and kids.",
  },
  {
    question: "Can I book an appointment online?",
    answer:
      "Yes, you can book appointments online through our website or call us directly.",
  },
  {
    question: "Do you offer facial treatments?",
    answer:
      "Yes, we offer various facial treatments tailored to your skin type.",
  },
  {
    question: "Where are you located?",
    answer: "We're located at 123 Glam Street, Downtown City.",
  },
  {
    question: "Do you have bridal packages?",
    answer:
      "Yes, we offer customizable bridal packages. Please contact us for details.",
  },
  {
    question: "Is walk-in available?",
    answer:
      "Yes, walk-ins are welcome, but we recommend booking ahead for weekends.",
  },
  {
    question: "Do you provide threading services?",
    answer: "Yes, we offer eyebrow and facial threading services.",
  },
  {
    question: "Do you use organic products?",
    answer: "We use a mix of organic and professional-grade salon products.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes, just give us a call at least 4 hours in advance to reschedule or cancel.",
  },
];

const seed = async () => {
  const batch = db.batch();
  const now = new Date().toISOString();

  knowledgeEntries.forEach((entry) => {
    const docId = uuidv4();
    const docRef = kbRef.doc(docId);

    const enrichedEntry = {
      ...entry,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      source: "seed",
    };

    batch.set(docRef, enrichedEntry);
  });

  try {
    await batch.commit();
    console.log("Knowledge base seeded");
  } catch (err) {
    console.error("Failed to seed:", err);
  }
};

seed();
