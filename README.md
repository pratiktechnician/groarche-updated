# GroArche Learning Solutions — 3D Interactive Website Redesign

This repository contains the completely redesigned, award-winning (Awwwards-quality) 3D interactive web application for **GroArche Learning Solutions**.

---

## 🌟 Key Features

- **Signature 3D Growth Ecosystem Hero**: Procedural WebGL 3D scene built with Three.js depicting a central glowing seed expanding into connected knowledge nodes (*Leadership, Communication, Collaboration, Innovation, Personal & Professional Growth*).
- **Scroll-Driven 5-Stage Evolution Storyteller**: Interactive journey tracking potential (*Stage 01: Potential → Stage 02: Learning → Stage 03: Capability → Stage 04: Collaboration → Stage 05: Achievement*).
- **Interactive 3D Tilt Service Cards**: Soft illumination and hover interaction for Leadership Development, Soft Skills, Spoken English, and Corporate Workshops.
- **The GroArche Learning Experience (Human Capability Network Simulator)**: Interactive node matrix demonstrating how upgrading individual human capabilities creates exponential synergy across team networks.
- **Facili-Training Philosophy Matrix**: Comparison table highlighting traditional training vs. GroArche experiential facili-training.
- **Founder & Leadership Spotlight**: Anutosh Ghosh (Founder & Director, CFTP, DTM, 16+ yrs Wipro/Deloitte track record) bio and facilitation philosophy.
- **GroArche AI Learning Assistant**: Floating interactive chatbot pre-loaded with knowledge base and configurable webhook hooks.
- **WhatsApp Direct Connect**: Floating button configured for `+91 9581 444 250` with pre-filled message.
- **Conversational Lead Generation Form**: Multi-step interactive enquiry modal with confetti celebration upon submission.
- **Full SEO & Accessibility (WCAG 2.2)**: Dynamic JSON-LD `Organization` & `ProfessionalService` structured schema.

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js 18+ and npm installed on your machine.

### Installation
```bash
# Clone or navigate to the project directory
cd WEBSITE

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Generate static production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Options

This project features a static-first architecture ready for instant zero-config deployment on:
- **Cloudflare Pages**: Point repository to build command `npm run build` and output directory `dist`.
- **Vercel**: Framework preset: Vite. Build command `npm run build`.
- **Netlify**: Build command `npm run build`, Publish directory `dist`.
- **GitHub Pages**: Deploy `dist` directory via GitHub Actions workflow.

---

## ⚙️ Environment Variables (Optional Integrations)

Create a `.env` file in the root directory if connecting external AI or CRM webhooks:

```env
VITE_AI_WEBHOOK_URL=https://your-n8n-or-webhook-endpoint.com/webhook
VITE_OPENAI_API_KEY=your_openai_api_key_if_direct
```

---

## 📞 Business Contact Details Preserved

- **Company Name**: GroArche Learning Solutions
- **Email**: contact@groarche.pro
- **Phone / WhatsApp**: (+91) 9581 444 250
- **Address**: R/AA-28, Purbapally, Raghunathpur, Kolkata, West Bengal – 700 059
- **Operating Hours**: 9 AM – 6 PM IST
