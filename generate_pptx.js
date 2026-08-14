const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();

// Presentation Setup
pptx.layout = 'LAYOUT_16x9';
pptx.title = 'GroArche Learning Solutions Pitch Deck';
pptx.author = 'GroArche Team';
pptx.company = 'GroArche Learning Solutions';
pptx.revision = '1.0';

// Color Palette
const BG_DARK = '060911';
const PANEL_BG = '0D1424';
const ACCENT_GREEN = '10B981';
const ACCENT_CYAN = '06B6D4';
const TEXT_WHITE = 'FFFFFF';
const TEXT_MUTED = '94A3B8';

// Image Paths
const heroImg = path.join(__dirname, '../../.gemini/antigravity/brain/650e43f2-223d-4706-8514-30aecfea919d/groarche_3d_hero_mockup_1786125900027.jpg');
const simImg = path.join(__dirname, '../../.gemini/antigravity/brain/650e43f2-223d-4706-8514-30aecfea919d/groarche_3d_simulator_mockup_1786125874701.jpg');
const botImg = path.join(__dirname, '../../.gemini/antigravity/brain/650e43f2-223d-4706-8514-30aecfea919d/groarche_ai_chatbot_mockup_1786125855886.jpg');

// ================= SLIDE 1 =================
const slide1 = pptx.addSlide();
slide1.background = { color: BG_DARK };

// Header Badge
slide1.addText('SLIDE 01 // TITLE & OVERVIEW', {
  x: 0.8, y: 0.6, w: 5.0, h: 0.4,
  fontFace: 'Calibri', fontSize: 10, color: ACCENT_GREEN, bold: true
});

// Title
slide1.addText('GroArche Learning Solutions', {
  x: 0.8, y: 1.1, w: 6.0, h: 0.8,
  fontFace: 'Calibri', fontSize: 32, color: TEXT_WHITE, bold: true
});

slide1.addText('Developing Human Potential. Delivering Meaningful Performance.', {
  x: 0.8, y: 1.9, w: 6.0, h: 0.6,
  fontFace: 'Calibri', fontSize: 16, color: ACCENT_GREEN, bold: true
});

slide1.addText([
  { text: '• Core Motto: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Growing Ambition. Achieving Greatness.\n', options: { color: TEXT_WHITE } },
  { text: '• Founder & Director: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Anutosh Ghosh (CFTP, DTM)\n', options: { color: TEXT_WHITE } },
  { text: '• Leadership Track Record: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: '16+ Years Corporate Experience at Wipro & Deloitte\n', options: { color: TEXT_WHITE } },
  { text: '• Live Web Platform: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'https://pratiktechnician.github.io/groarche/', options: { color: ACCENT_CYAN } }
], {
  x: 0.8, y: 2.8, w: 5.8, h: 3.5,
  fontFace: 'Calibri', fontSize: 13, lineSpacing: 22
});

// Screenshot Hero
slide1.addImage({
  path: heroImg,
  x: 6.8, y: 1.1, w: 5.8, h: 4.8,
  rounding: true
});

// ================= SLIDE 2 =================
const slide2 = pptx.addSlide();
slide2.background = { color: BG_DARK };

slide2.addText('SLIDE 02 // FACILI-TRAINING ARCHITECTURE', {
  x: 0.8, y: 0.5, w: 6.0, h: 0.4,
  fontFace: 'Calibri', fontSize: 10, color: ACCENT_GREEN, bold: true
});

slide2.addText('Traditional Training vs. GroArche Experiential Facili-Training', {
  x: 0.8, y: 0.9, w: 11.5, h: 0.6,
  fontFace: 'Calibri', fontSize: 24, color: TEXT_WHITE, bold: true
});

// Comparison Table
const rows = [
  [
    { text: 'Dimension', options: { fill: ACCENT_GREEN, color: BG_DARK, bold: true } },
    { text: 'Traditional Corporate Training', options: { fill: '1E293B', color: TEXT_MUTED, bold: true } },
    { text: 'GroArche Facili-Training', options: { fill: '064E3B', color: TEXT_WHITE, bold: true } }
  ],
  [
    { text: 'Primary Focus', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Passive Information Transfer', options: { color: TEXT_MUTED } },
    { text: 'Lasting Behavioral Transformation', options: { color: ACCENT_GREEN, bold: true } }
  ],
  [
    { text: 'Participant Role', options: { bold: true, color: TEXT_WHITE } },
    { text: '80% Listening to Slides', options: { color: TEXT_MUTED } },
    { text: 'Active Role-Plays & Simulations', options: { color: ACCENT_GREEN, bold: true } }
  ],
  [
    { text: 'Methodology', options: { bold: true, color: TEXT_WHITE } },
    { text: 'One-Way Lecture', options: { color: TEXT_MUTED } },
    { text: 'Group Wisdom Harvesting', options: { color: ACCENT_GREEN, bold: true } }
  ],
  [
    { text: 'Outcome', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Temporary Knowledge Gain', options: { color: TEXT_MUTED } },
    { text: 'Sustained Workplace Performance Shift', options: { color: ACCENT_GREEN, bold: true } }
  ]
];

slide2.addTable(rows, {
  x: 0.8, y: 1.7, w: 11.7, colW: [2.5, 4.6, 4.6],
  fontFace: 'Calibri', fontSize: 12,
  border: { pt: 1, color: '334155' }
});

// Impact Metric Badges
slide2.addText('PROVEN IMPACT METRICS:', {
  x: 0.8, y: 5.2, w: 4.0, h: 0.3,
  fontFace: 'Calibri', fontSize: 11, color: ACCENT_GREEN, bold: true
});

slide2.addText('4,000+ Individuals Impacted  |  16+ Enterprise Clients  |  450+ Facilitation Hours Delivered', {
  x: 0.8, y: 5.6, w: 11.7, h: 0.8,
  fontFace: 'Calibri', fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center',
  fill: PANEL_BG, line: { color: ACCENT_GREEN, width: 1 }
});

// ================= SLIDE 3 =================
const slide3 = pptx.addSlide();
slide3.background = { color: BG_DARK };

slide3.addText('SLIDE 03 // FEATURE 1: INTERACTIVE 3D BOARD', {
  x: 0.8, y: 0.5, w: 6.0, h: 0.4,
  fontFace: 'Calibri', fontSize: 10, color: ACCENT_GREEN, bold: true
});

slide3.addText('Interactive 3D Human Capability Simulator', {
  x: 0.8, y: 0.9, w: 6.0, h: 0.6,
  fontFace: 'Calibri', fontSize: 24, color: TEXT_WHITE, bold: true
});

slide3.addText([
  { text: '• Real-Time Synergy Calculation: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Interactive board allowing decision-makers to toggle capability nodes (Strategic Leadership, Communication, EQ, Executive Presence).\n\n', options: { color: TEXT_WHITE } },
  { text: '• Visual ROI Output: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Live score demonstration showing team synergy jumping from 40% to 100%.\n\n', options: { color: TEXT_WHITE } },
  { text: '• Assessment Bridge: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Bridges capability gap analysis directly to corporate workshop commitments.', options: { color: TEXT_WHITE } }
], {
  x: 0.8, y: 1.8, w: 5.5, h: 4.5,
  fontFace: 'Calibri', fontSize: 13, lineSpacing: 20
});

slide3.addImage({
  path: simImg,
  x: 6.5, y: 1.1, w: 6.0, h: 4.8,
  rounding: true
});

// ================= SLIDE 4 =================
const slide4 = pptx.addSlide();
slide4.background = { color: BG_DARK };

slide4.addText('SLIDE 04 // FEATURE 2: WHATSAPP & AI CHATBOT', {
  x: 0.8, y: 0.5, w: 6.0, h: 0.4,
  fontFace: 'Calibri', fontSize: 10, color: ACCENT_GREEN, bold: true
});

slide4.addText('24/7 GroArche AI Assistant & Instant WhatsApp Trigger', {
  x: 0.8, y: 0.9, w: 6.0, h: 0.8,
  fontFace: 'Calibri', fontSize: 22, color: TEXT_WHITE, bold: true
});

slide4.addText([
  { text: '• GroArche AI Assistant: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: '24/7 intelligent drawer providing automated answers on Leadership, Soft Skills, and Workshop Customizations.\n\n', options: { color: TEXT_WHITE } },
  { text: '• Direct WhatsApp Dispatch (+91 9581 444 250): ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Instant floating trigger routing lead enquiries straight to Founder Anutosh Ghosh.\n\n', options: { color: TEXT_WHITE } },
  { text: '• Conversational Lead Gen: ', options: { bold: true, color: ACCENT_GREEN } },
  { text: 'Interactive proposal request modal with automated confetti celebration and direct email trigger.', options: { color: TEXT_WHITE } }
], {
  x: 0.8, y: 1.9, w: 5.5, h: 4.5,
  fontFace: 'Calibri', fontSize: 13, lineSpacing: 20
});

slide4.addImage({
  path: botImg,
  x: 6.5, y: 1.1, w: 6.0, h: 4.8,
  rounding: true
});

// ================= SLIDE 5 =================
const slide5 = pptx.addSlide();
slide5.background = { color: BG_DARK };

slide5.addText('SLIDE 05 // PROGRAM OFFERINGS & CALL TO ACTION', {
  x: 0.8, y: 0.5, w: 6.0, h: 0.4,
  fontFace: 'Calibri', fontSize: 10, color: ACCENT_GREEN, bold: true
});

slide5.addText('Empower Your Team\'s Growth Today', {
  x: 0.8, y: 0.9, w: 11.5, h: 0.6,
  fontFace: 'Calibri', fontSize: 26, color: TEXT_WHITE, bold: true
});

// 4 Program Boxes
const boxWidth = 2.7;
const boxGap = 0.3;

const programs = [
  { title: 'Leadership Development', desc: 'Strategic vision, stakeholder alignment & executive presence.' },
  { title: 'Soft Skills Training', desc: 'Emotional Intelligence (EQ), assertive communication & teamwork.' },
  { title: 'Fluent English & Articulation', desc: 'Presentation mastery & high-stakes interview readiness.' },
  { title: 'Experiential Workshops', desc: 'Hands-on business simulations & Wisdom Harvesting.' }
];

programs.forEach((p, idx) => {
  const xPos = 0.8 + idx * (boxWidth + boxGap);
  slide5.addText([
    { text: `0${idx + 1}\n\n`, options: { bold: true, color: ACCENT_GREEN, fontSize: 12 } },
    { text: `${p.title}\n\n`, options: { bold: true, color: TEXT_WHITE, fontSize: 14 } },
    { text: p.desc, options: { color: TEXT_MUTED, fontSize: 11 } }
  ], {
    x: xPos, y: 1.7, w: boxWidth, h: 2.8,
    fill: PANEL_BG, line: { color: '1E293B', width: 1 },
    align: 'center', valign: 'middle'
  });
});

// Call to Action Banner
slide5.addText([
  { text: 'SCHEDULE A CUSTOMIZED EXPERIENTIAL WORKSHOP DEMO\n', options: { bold: true, fontSize: 15, color: BG_DARK } },
  { text: 'Direct WhatsApp/Phone: (+91) 9581 444 250  |  Email: contact@groarche.pro  |  Web: https://pratiktechnician.github.io/groarche/', options: { fontSize: 12, color: BG_DARK, bold: true } }
], {
  x: 0.8, y: 4.8, w: 11.7, h: 1.5,
  fill: ACCENT_GREEN, align: 'center', valign: 'middle'
});

// Save Presentation
const outputPath = path.join(__dirname, 'GroArche_Learning_Solutions_Pitch_Deck.pptx');
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`PPTX file successfully generated at: ${fileName}`);
}).catch(err => {
  console.error(`Error writing PPTX: ${err}`);
});
