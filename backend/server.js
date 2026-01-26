import dotenv from "dotenv";
dotenv.config();

console.log("API KEY:", process.env.OPENAI_API_KEY ? "FOUND" : "NOT FOUND");

import express from "express";
import cors from "cors";
import OpenAI from "openai";
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* 🔒 RESUME CONTEXT (TRAINING DATA) */
const resumeContext = `
Name: Anvesha Srivastava
Education:
- BCA (2024–2027), Dr. Virendra Swarup Institute of Computer Studies
- CGPA: 8.09
- Class 12: 76%
- Class 10: 89%

Skills:
HTML, CSS, Python, SQL, C (Basic), C++ (Basic), Canva,
Communication, Teamwork

Experience:
Web Developer & Trainee at Sitekraft
Worked on responsive UI, frontend development, real client projects.

Projects:
1. Healthlink – AI chatbot for mental health & productivity
2. Smart Expense – expense tracking web app
3. Code Sutra – coding learning platform

Achievements:
First Runner-up – Tech Pulse NewsRead Challenge 2025
First Runner-up – Debate Competition 2025
`;

/*
   SQLite Database Setup (Commented out for Google Sheets Switch)
   If you want to use local DB again, uncomment this section.
*/
// import sqlite3 from "sqlite3";

// // Database Setup
// const db = new sqlite3.Database("./portfolio.db", (err) => {
//   if (err) console.error("Database error:", err.message);
//   else console.log("Connected to SQLite database.");
// });

// // Create Table
// db.run(`CREATE TABLE IF NOT EXISTS messages (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT,
//   email TEXT,
//   reason TEXT,
//   date TEXT
// )`);

// app.post("/contact", (req, res) => {
//   const { name, email, reason } = req.body;
//   const date = new Date().toLocaleString();

//   db.run(`INSERT INTO messages (name, email, reason, date) VALUES (?, ?, ?, ?)`,
//     [name, email, reason, date],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ message: "Message sent successfully!", id: this.lastID });
//       console.log(`New message from ${name}: ${reason}`);
//     }
//   );
// });

/* AI Chat Endpoint */

app.post("/chat", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional portfolio assistant. 
Answer ONLY using the resume below. 
If something is not in the resume, say "Not mentioned in the resume".\n\n${resumeContext}`
        },
        {
          role: "user",
          content: userQuestion
        }
      ]
    });

    res.json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => {
  console.log("AI backend running on port 3000");
});
