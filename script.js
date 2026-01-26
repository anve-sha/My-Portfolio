// Typing
const text = "Web Developer • AI Enthusiast • Problem Solver";
let i = 0;
const el = document.querySelector(".typing");
function type() {
  if (i < text.length) {
    el.textContent += text[i++];
    setTimeout(type, 70);
  }
}
el.textContent = ""; type();

// Certificate modal
function openCert(src) {
  modal.style.display = "flex";
  modalImg.src = src;
}
function closeCert() {
  modal.style.display = "none";
}

// Chat UI & Logic
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");

function toggleChat() {
  chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
  if (chatbot.style.display === "block") {
    chatInput.focus();
    if (chatBody.children.length === 0) {
      addBotMessage("Hi! I'm Anvesha's AI assistant. How can I help you today?");
      setTimeout(showSuggestions, 600);
    }
  }
}

const sendBtn = document.getElementById("sendMsgBtn");

function handleUserAction() {
  const userText = chatInput.value.trim();
  if (userText !== "") {
    addUserMessage(userText);
    chatInput.value = "";
    setTimeout(() => respondTo(userText), 500);
  }
}

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleUserAction();
  }
});

sendBtn.addEventListener("click", handleUserAction);

function showSuggestions() {
  // Remove existing suggestions if any
  const existing = document.querySelector(".chat-suggestions");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.className = "chat-suggestions";

  const topics = ["Skills & Tech", "View Projects", "Contact Info", "Experience"];

  topics.forEach(topic => {
    const btn = document.createElement("button");
    btn.className = "suggestion-chip";
    btn.textContent = topic;
    btn.onclick = () => {
      addUserMessage(topic);
      setTimeout(() => respondTo(topic), 500);
      div.remove(); // Remove suggestions after click
    };
    div.appendChild(btn);
  });

  // Insert before input
  const inputContainer = document.querySelector("#chatInput");
  chatbot.insertBefore(div, inputContainer);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "user-msg";
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function respondTo(input) {
  const lowerInput = input.toLowerCase();

  // Greeting
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    addBotMessage("Hello! I'm Anvesha's AI assistant (a reflection of herself!). I can tell you about my projects, skills, certifications, or experience. What would you like to know?");
  }

  // Skills
  else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack")) {
    addBotMessage("I am proficient in **frontend development** (HTML, CSS, JavaScript, React) and **backend basics** (Python, Node.js). I'm also deeply interested in **Generative AI** and building AI-integrated applications. My toolkit includes tools for responsive design and workflow automation!");
  }

  // Projects
  else if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("built")) {
    addBotMessage("I've built some exciting projects recently! \n\n1. **Healthlink:** An AI-powered health companion that predicts risks and gives wellness advice.\n2. **ArthBot:** A smart financial assistant for expense tracking (inspired by the Sanskrit word 'Arth').\n3. **Code Sutra:** An AI-driven coding platform that helps debug and teach programming personalized to you.\n\nWhich one links interesting?");
  }

  // Specific Projects
  else if (lowerInput.includes("healthlink")) {
    addBotMessage("Healthlink is my AI-driven wellness project. It monitors health trends, predicts deficiencies, and uses a conversational bot to guide users toward better lifestyle choices. It's all about proactive healthcare!");
  }
  else if (lowerInput.includes("arth") || lowerInput.includes("finance")) {
    addBotMessage("ArthBot acts as a financial 'conscience'. It analyzes your spending, helps set budgets, and answers finance queries via chat. I named it after 'Arth' (wealth/purpose) to emphasize mindful spending.");
  }
  else if (lowerInput.includes("code") || lowerInput.includes("sutra")) {
    addBotMessage("Code Sutra is an EdTech platform I designed. It uses AI to analyze your code in real-time, pointing out bugs and suggesting learning paths. It's like having a coding tutor in your browser!");
  }

  // Certifications
  else if (lowerInput.includes("cert") || lowerInput.includes("award") || lowerInput.includes("achievement")) {
    addBotMessage("I've completed a **Web Development Internship** (Certificate of Completion) and won accolades in **Debate Competitions**. I was also a key participant in the **TechPulse NewsRead** event! You can view the certificates in the 'Certifications' section.");
  }

  // Experience
  else if (lowerInput.includes("experience") || lowerInput.includes("job") || lowerInput.includes("intern")) {
    addBotMessage("I am a **Founding Member & Core Team Lead** at Sitekraft.dev Studios. There, I handle frontend development, strategic decision-making, and help steer the platform's direction. It's been an amazing journey of leadership and coding combined.");
  }

  // Contact
  else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach")) {
    addBotMessage("You can reach me directly at **anveshas417@gmail.com**. I'm also active on LinkedIn and GitHub (check the icons below)! Feel free to drop a message through the contact form too.");
  }

  // Default
  else {
    addBotMessage("I'm not sure about that one yet! Try asking about 'my skills', 'my projects', 'my experience', or 'how to contact me'.");
  }

  // Show suggestions again after response
  setTimeout(showSuggestions, 2000);
}

// Contact Form Logic
const contactForm = document.getElementById("contactForm");

// PASTE YOUR GOOGLE ACTIONS SCRIPT URL HERE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyS6mGTwhJ6xGev1dloj8b_AYq-66r0pB3ReYzogcgnp7ORppnuhrG96CbS-Vhoczw92Q/exec";

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    const submitBtn = contactForm.querySelector("button");

    // Check if the URL is still the placeholder (user hasn't updated it)
    // OR if it's empty
    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE" || GOOGLE_SCRIPT_URL === "") {
      alert("⚠️ Configuration Error: Please replace 'YOUR_GOOGLE_SCRIPT_URL_HERE' in script.js with your actual Google Web App URL.");
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data)
      });

      // Success: Replace form with success message
      const container = contactForm.parentElement;
      contactForm.style.display = "none";

      const successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.innerHTML = `
        <i class="ri-checkbox-circle-fill"></i>
        <span>Message Sent Successfully!</span>
        <p style="font-size: 0.9rem; color: var(--muted);">I'll get back to you soon.</p>
        <button onclick="location.reload()" style="margin-top:10px; padding: 10px 20px; background: rgba(255,255,255,0.1); border:none; color:white; border-radius:10px; cursor:pointer;">Send Another</button>
      `;
      container.insertBefore(successDiv, container.querySelector(".grid"));

    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }
  });
}

// Scroll Animation continue...
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-animate");
    }
  });
}, { threshold: 0.1 });

// Select elements to animate
const animatables = document.querySelectorAll(".section h2, .profile-card, .project, .card, .contact, .hero h1, .hero p, .cert-grid img");
animatables.forEach((el) => {
  el.classList.add("hidden-animate");
  observer.observe(el);
});
