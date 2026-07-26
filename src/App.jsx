import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa6'
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'
import {
  MdOutlineArchitecture,
  MdOutlineAssignment,
  MdOutlineAutoGraph,
  MdOutlineFactCheck,
  MdOutlineHandshake,
  MdOutlinePsychology,
  MdOutlineSchool,
  MdOutlineVerified,
} from 'react-icons/md'

const BRAND = 'Project Pulse'
const LOGO_SRC = '/logo.png'
const EMAIL = 'project.pulse.uvb@gmail.com'
/** How the number appears on the site */
const PHONE_DISPLAY = '070 271 1249'
/**
 * WhatsApp / tel links need country code + number (no +, spaces, or leading 0).
 * 070 271 1249 → Sri Lanka +94 → 94702711249. If your line uses a different country, change only this string.
 */
const PHONE_E164_DIGITS = '94702711249'
const WHATSAPP_URL = `https://wa.me/${PHONE_E164_DIGITS}`
const PHONE_TEL_HREF = `tel:+${PHONE_E164_DIGITS}`

/** Design system — warm editorial + corporate navy (replaces previous teal/slate theme) */
const FONT_UI = "'Outfit', system-ui, sans-serif"
const FONT_SERIF = "'Fraunces', Georgia, 'Times New Roman', serif"

const theme = {
  pageBg: '#0d1827',
  cream: '#142337',
  sand: '#101f31',
  ink: '#edf4fc',
  inkSoft: '#d4e0ed',
  muted: '#a8bbcf',
  mutedLight: '#7f96af',
  line: 'rgba(190, 211, 234, 0.18)',
  lineSoft: 'rgba(190, 211, 234, 0.10)',
  rust: '#e38b63',
  rustSoft: 'rgba(227, 139, 99, 0.14)',
  navy: '#5f91c8',
  navyDeep: '#081423',
  gold: '#e2b857',
  goldSoft: 'rgba(226, 184, 87, 0.24)',
  heroBg:
    'radial-gradient(900px 480px at 12% -8%, rgba(227, 139, 99, 0.18), transparent), radial-gradient(700px 380px at 92% 8%, rgba(95, 145, 200, 0.20), transparent), linear-gradient(168deg, #0c1929 0%, #10233a 48%, #0d1b2c 100%)',
  navyCard: 'linear-gradient(152deg, #19395a 0%, #102944 48%, #091727 100%)',
  processBg: '#091321',
  processCard: 'rgba(190, 211, 234, 0.07)',
  processBorder: 'rgba(190, 211, 234, 0.16)',
  processLine: 'rgba(226, 184, 87, 0.48)',
  ctaMesh:
    'radial-gradient(700px 360px at 20% 40%, rgba(226, 184, 87, 0.20), transparent), radial-gradient(600px 320px at 85% 60%, rgba(95, 145, 200, 0.32), transparent), linear-gradient(118deg, #091321 0%, #153657 48%, #162113 100%)',
  footerBg: '#060d17',
  testimonialBg: 'linear-gradient(145deg, #19304a 0%, #10243a 100%)',
  shadowCard: '0 20px 50px rgba(0, 0, 0, 0.22)',
  shadowLift: '0 28px 70px rgba(0, 0, 0, 0.30)',
  radiusLg: 20,
  radiusMd: 14,
  radiusSm: 10,
  pill: 999,
}

const NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'why', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'contact', label: 'Contact' },
]

const SERVICES = [
  {
    title: 'Academic Assignment Support',
    tagline: 'Assignments shouldn’t feel like impossible missions.',
    icon: MdOutlineAssignment,
    items: [
      'IT Assignments',
      'Software Engineering Projects',
      'Database & SQL Projects',
      'Web Development Projects',
      'Mobile Application Projects',
      'Machine Learning Assignments',
      'Final Year Projects',
      'Research Projects',
      'AI/ML Projects',
      'Urgent Deadline Submissions',
    ],
  },
  {
    title: 'System Development Services',
    tagline: 'Ideas deserve implementation.',
    icon: MdOutlineArchitecture,
    items: [
      'Full Web Applications',
      'Mobile Apps',
      'Final Year Project Systems',
      'Admin Dashboards',
      'E-commerce Platforms',
      'Database Systems',
      'API Integrations',
      'Bug Fixing & Optimization',
    ],
    foot: 'From concept to deployment — fully supported.',
  },
  {
    title: 'Documentation Services',
    tagline: 'Good systems fail without good documentation.',
    icon: HiOutlineDocumentText,
    items: [
      'SRS Documentation',
      'SDS Documentation',
      'Test Plans',
      'Test Cases',
      'QA Reports',
      'User Manuals',
      'Project Proposals',
      'Final Reports',
      'Presentation Slides',
      'Viva Preparation Support',
    ],
  },
  {
    title: 'Research & Publication Support',
    tagline: 'Research should be smart, not stressful.',
    icon: MdOutlinePsychology,
    items: [
      'Topic Selection',
      'Proposal Writing',
      'Literature Review',
      'Research Papers',
      'IEEE Format Support',
      'Referencing (APA / Harvard / IEEE)',
      'Thesis Support',
      'Data Analysis Guidance',
      'Journal Submission Support',
    ],
  },
  {
    title: 'Career Growth Services',
    tagline: 'Your documents should open doors.',
    icon: MdOutlineAutoGraph,
    items: [
      'Professional CVs',
      'Internship Reports',
      'Internship Daily Diaries',
      'Cover Letters',
      'LinkedIn Optimization',
      'Portfolios',
      'Job Application Documents',
    ],
  },
]

function HiOutlineCpuChip(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        d="M8.25 3v1.5M15.75 3v1.5M8.25 19.5V21M15.75 19.5V21M3 8.25h1.5M3 15.75h1.5M19.5 8.25H21M19.5 15.75H21M6.75 6.75h10.5v10.5H6.75z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.75 9.75h4.5v4.5h-4.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const WHY = [
  {
    title: 'We Offer Continued Support',
    body: 'Even after final delivery, we stay available for updates, fixes, and guidance.',
    icon: MdOutlineHandshake,
  },
  {
    title: 'We Understand IT Deeply',
    body: 'This isn’t generic assignment writing. We specialize in technical, research-based, and system-driven work.',
    icon: HiOutlineCpuChip,
  },
  {
    title: 'We Respect Deadlines',
    body: 'Late submission can cost grades. We treat your deadlines like our own.',
    icon: HiOutlineClock,
  },
  {
    title: 'We Protect Your Privacy',
    body: 'Your work, your data, your trust — fully confidential.',
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'We Focus on Quality',
    body: 'Not rushed. Not copied. Not average. Professional work built to stand out.',
    icon: MdOutlineVerified,
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Send Your Requirement',
    body: [
      'Tell us what you need — project, report, research, system, or documentation.',
      'Share your deadline, expectations, and any specific guidelines so we can understand your needs clearly.',
    ],
  },
  {
    n: '02',
    title: 'Free Consultation',
    body: [
      'We carefully analyze your requirement and provide the best possible solution, along with timeline, scope, and quotation.',
      'Once everything is discussed and confirmed, we begin by proceeding with a 50% advance payment to reserve your project slot and officially start the work process. This ensures dedicated attention, proper planning, and priority handling for your project.',
    ],
  },
  {
    n: '03',
    title: 'Project Execution',
    body: [
      'Work begins with regular progress updates, transparent communication, and quality-focused development.',
      'You stay informed throughout the process, with opportunities for feedback and improvements along the way.',
    ],
  },
  {
    n: '04',
    title: 'Review & Final Delivery',
    body: [
      'You review the completed work, request revisions if needed, and once everything meets your expectations, the remaining balance is completed before final handover.',
      'After confirmation of full payment, we deliver the final polished version with all required files, documents, and support materials.',
      'Smooth, professional, and stress-free.',
    ],
  },
  {
    n: '05',
    title: 'Continued Support',
    body: [
      'Need edits later? Presentation help? Viva support? Submission guidance?',
      'We’re still here.',
      'Because real support doesn’t end after delivery — it continues until you feel fully confident.',
    ],
  },
]

const TESTIMONIALS = [
  {
    quote:
      'They helped me complete my final year project documentation perfectly and supported me until my presentation day.',
    name: 'Final Year — Computer Science',
  },
  {
    quote:
      'Fast, professional, and reliable. My internship report and CV were completed beyond expectations.',
    name: 'Internship & Career Client',
  },
  {
    quote: 'Best support I received for software testing reports and QA documentation.',
    name: 'Software Engineering Student',
  },
  {
    quote: 'Unlike others, they actually stayed after delivery and helped with corrections.',
    name: 'Research Student — IEEE Paper Submission',
  },
]

const embeddedCss = `
@keyframes pp-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pp-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
@keyframes pp-shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes pp-orbit {
  from { transform: rotate(0deg) translateX(92px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(92px) rotate(-360deg); }
}
@keyframes pp-pulse-ring {
  0%, 100% { transform: scale(0.94); opacity: 0.22; }
  50% { transform: scale(1.08); opacity: 0.5; }
}
@keyframes pp-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes pp-card-drift {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
.pp-hero-grid {
  background-image:
    linear-gradient(rgba(220, 235, 250, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(220, 235, 250, 0.07) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 85% 75% at 50% -5%, black 35%, transparent 75%);
}
.pp-glow {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.35;
  pointer-events: none;
}
.pp-orbit {
  position: absolute;
  right: clamp(1rem, 8vw, 8rem);
  top: clamp(7rem, 16vw, 10rem);
  width: 188px;
  height: 188px;
  border: 1px solid rgba(226, 184, 87, 0.22);
  border-radius: 50%;
  animation: pp-pulse-ring 5s ease-in-out infinite;
  pointer-events: none;
}
.pp-orbit::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e2b857;
  box-shadow: 0 0 0 7px rgba(226, 184, 87, 0.12), 0 0 28px rgba(226, 184, 87, 0.85);
  animation: pp-orbit 11s linear infinite;
}
.pp-hero-content { max-width: 580px; }
.pp-portal-scene {
  position: absolute;
  z-index: 1;
  width: min(39vw, 470px);
  height: 590px;
  right: clamp(1rem, 7vw, 7rem);
  top: 115px;
  pointer-events: none;
  animation: pp-fade-up 0.9s ease 0.18s both;
}
.pp-portal {
  position: absolute;
  right: 14%;
  top: 3%;
  width: 63%;
  height: 73%;
  border: 3px solid rgba(230, 213, 255, 0.85);
  border-radius: 48% 48% 42% 42% / 18% 18% 13% 13%;
  background:
    radial-gradient(circle at 45% 76%, rgba(255, 187, 140, 0.80) 0 2%, transparent 10%),
    radial-gradient(ellipse at 58% 74%, rgba(170, 111, 255, 0.55), transparent 36%),
    linear-gradient(165deg, rgba(71, 45, 133, 0.96), rgba(23, 62, 104, 0.96) 55%, rgba(15, 34, 64, 0.98));
  box-shadow: 0 0 0 9px rgba(187, 135, 255, 0.10), 0 0 70px rgba(175, 117, 255, 0.52), inset 0 0 45px rgba(255, 209, 177, 0.22);
  overflow: hidden;
}
.pp-portal-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 52% 48%;
  opacity: 0.82;
  filter: saturate(0.9) contrast(1.08) brightness(0.76);
}
.pp-portal::before {
  content: '';
  position: absolute;
  inset: 45% -10% -2%;
  background: linear-gradient(160deg, transparent 0 36%, rgba(234, 195, 255, 0.24) 37% 39%, transparent 40% 55%, rgba(255, 204, 165, 0.22) 56% 58%, transparent 59%);
  transform: skewY(-9deg);
  z-index: 2;
}
.pp-portal::after {
  content: '';
  position: absolute;
  width: 106%;
  height: 65px;
  left: -3%;
  bottom: -30px;
  border-radius: 50%;
  background: rgba(238, 211, 255, 0.35);
  filter: blur(8px);
  z-index: 2;
}
.pp-portal-step {
  position: absolute;
  right: 0;
  bottom: 3%;
  width: 80%;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(221, 202, 252, 0.72), rgba(95, 76, 146, 0.54));
  box-shadow: 0 22px 0 -4px rgba(158, 128, 214, 0.34), 0 44px 0 -10px rgba(132, 104, 183, 0.25), 0 32px 40px rgba(0, 0, 0, 0.35);
}
.pp-float-card {
  position: absolute;
  z-index: 2;
  min-width: 170px;
  padding: 16px 18px;
  color: #edf4fc;
  border: 1px solid rgba(226, 220, 255, 0.28);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(36, 51, 86, 0.76), rgba(21, 35, 59, 0.62));
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28), inset 0 1px rgba(255,255,255,0.11);
  backdrop-filter: blur(13px);
  animation: pp-card-drift 6s ease-in-out infinite;
}
.pp-float-card strong { display: block; font-size: 1.75rem; line-height: 1; margin-top: 8px; letter-spacing: -0.06em; }
.pp-float-card small { color: #b8c8db; font-weight: 600; }
.pp-float-card.one { top: 18%; left: -4%; }
.pp-float-card.two { right: -5%; top: 22%; animation-delay: -2s; }
.pp-float-card.three { bottom: 18%; left: -7%; animation-delay: -4s; }
.pp-showcase-image {
  position: relative;
  height: clamp(250px, 34vw, 390px);
  margin: 0 0 24px;
  overflow: hidden;
  border: 1px solid rgba(220, 227, 255, 0.24);
  border-radius: 24px;
  background: #101d32;
  box-shadow: 0 28px 65px rgba(0, 0, 0, 0.28);
}
.pp-showcase-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 48%;
  filter: saturate(0.72) contrast(1.04) brightness(0.62);
  transform: scale(1.025);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
}
.pp-showcase-image:hover img { transform: scale(1.07); filter: saturate(0.9) contrast(1.06) brightness(0.72); }
.pp-showcase-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(8, 18, 33, 0.74), rgba(8, 18, 33, 0.14) 68%), linear-gradient(0deg, rgba(8, 18, 33, 0.55), transparent 46%);
  pointer-events: none;
}
.pp-showcase-label {
  position: absolute;
  z-index: 1;
  left: clamp(1.25rem, 4vw, 2.5rem);
  bottom: clamp(1.25rem, 4vw, 2.25rem);
  max-width: 390px;
}
.pp-section-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.pp-section-reveal.is-visible { opacity: 1; transform: translateY(0); }
.pp-section-reveal.is-visible .pp-card-hover { animation: pp-fade-up 0.55s ease both; }
.pp-section-reveal.is-visible .pp-card-hover:nth-child(2) { animation-delay: 0.08s; }
.pp-section-reveal.is-visible .pp-card-hover:nth-child(3) { animation-delay: 0.16s; }
.pp-section-reveal.is-visible .pp-card-hover:nth-child(4) { animation-delay: 0.24s; }
.pp-card-hover {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.35s ease;
}
.pp-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 28px 72px rgba(0, 0, 0, 0.32);
  border-color: rgba(226, 184, 87, 0.52);
}
.pp-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease, filter 0.2s ease;
}
.pp-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}
.pp-btn:active {
  transform: translateY(0);
}
.pp-wa {
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.pp-wa:hover {
  transform: scale(1.07);
  box-shadow: 0 18px 48px rgba(21, 128, 61, 0.5);
}
.pp-eyebrow-accent {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.pp-eyebrow-accent::before {
  content: '';
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  box-shadow: 30px 0 0 -0.5px currentColor;
}
html, body {
  overflow-x: hidden;
  max-width: 100%;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  .pp-section-reveal { opacity: 1; transform: none; }
}
@media (max-width: 960px) {
  .pp-nav-links { display: none !important; }
  .pp-mobile-toggle { display: flex !important; }
  .pp-portal-scene { opacity: 0.42; right: -5rem; }
}
@media (max-width: 700px) {
  .pp-portal-scene { display: none; }
  .pp-hero-content { max-width: none; }
}
@media (min-width: 961px) {
  .pp-mobile-toggle { display: none !important; }
  .pp-mobile-menu { display: none !important; }
}
@media (min-width: 720px) {
  .pp-stat-divider { display: block !important; }
}
.pp-mobile-menu {
  animation: pp-slide-down 0.22s ease-out both;
}
@keyframes pp-slide-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 480px) {
  .pp-hero-ctas {
    flex-direction: column !important;
  }
  .pp-hero-ctas a, .pp-hero-ctas button {
    width: 100% !important;
    justify-content: center !important;
  }
  .pp-process-step-box {
    padding: 16px 18px !important;
  }
}
@media (max-width: 600px) {
  .pp-cta-buttons {
    flex-direction: column !important;
  }
  .pp-cta-buttons a, .pp-cta-buttons button {
    width: 100% !important;
    justify-content: center !important;
  }
  .pp-contact-links {
    flex-direction: column !important;
    width: 100% !important;
  }
  .pp-contact-links a {
    width: 100% !important;
    justify-content: flex-start !important;
  }
  .pp-footer-bottom {
    flex-direction: column !important;
    text-align: center !important;
    gap: 8px !important;
  }
}
`

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tIndex, setTIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('.pp-section-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const shell = useMemo(
    () => ({
      fontFamily: FONT_UI,
      color: theme.ink,
      background: theme.pageBg,
      lineHeight: 1.65,
      WebkitFontSmoothing: 'antialiased',
      overflowX: 'hidden',
    }),
    [],
  )

  const sectionWrap = {
    maxWidth: 1140,
    margin: '0 auto',
    padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 2rem)',
  }

  const eyebrow = {
    fontSize: 11,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    fontWeight: 700,
    color: theme.rust,
    marginBottom: 14,
    display: 'inline-block',
    paddingBottom: 8,
    borderBottom: `2px solid ${theme.goldSoft}`,
  }

  const h2 = {
    fontFamily: FONT_SERIF,
    fontWeight: 600,
    fontSize: 'clamp(2.05rem, 4.2vw, 2.95rem)',
    lineHeight: 1.14,
    letterSpacing: '-0.025em',
    margin: '0 0 14px',
    color: theme.ink,
  }

  const sub = {
    fontSize: 'clamp(1rem, 2.1vw, 1.12rem)',
    color: theme.muted,
    maxWidth: 640,
    margin: 0,
  }

  return (
    <>
      <style>{embeddedCss}</style>
      <div style={shell}>
        {/* Sticky Nav */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
            background: scrolled ? 'rgba(8, 20, 35, 0.94)' : 'rgba(8, 20, 35, 0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: scrolled ? `1px solid ${theme.lineSoft}` : '1px solid transparent',
            boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.28)' : 'none',
          }}
        >
          <div
            style={{
              maxWidth: 1160,
              margin: '0 auto',
              padding: '14px clamp(1rem, 3vw, 1.5rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
              }}
              aria-label={`${BRAND} home`}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: theme.radiusSm,
                  background: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: `0 0 0 1px ${theme.line}, 0 6px 20px rgba(20,18,16,0.06)`,
                  padding: 8,
                  flexShrink: 0,
                }}
              >
                <img src={LOGO_SRC} alt="" width={30} height={30} style={{ width: 30, height: 30, objectFit: 'contain', display: 'block' }} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: theme.ink, letterSpacing: '-0.03em' }}>
                  {BRAND}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: theme.muted,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Academic · IT · Systems
                </span>
              </span>
            </button>

            <nav className="pp-nav-links" aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="pp-btn"
                  onClick={() => scrollTo(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.inkSoft,
                    padding: '8px 12px',
                    borderRadius: theme.pill,
                  }}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                className="pp-btn"
                onClick={() => scrollTo('contact')}
                style={{
                  marginLeft: 8,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: theme.pill,
                  padding: '10px 20px',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#ffffff',
                  background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyDeep} 100%)`,
                  boxShadow: '0 0 15px rgba(95, 145, 200, 0.7), 0 0 30px rgba(95, 145, 200, 0.4)',
                }}
              >
                Book consult
              </button>
            </nav>

            <button
              type="button"
              className="pp-mobile-toggle"
              aria-expanded={menuOpen}
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: 'none',
                width: 44,
                height: 44,
                borderRadius: theme.radiusSm,
                border: `1px solid ${theme.line}`,
                background: theme.cream,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <span style={{ width: 20, height: 2, background: theme.ink, borderRadius: 2 }} />
              <span style={{ width: 20, height: 2, background: theme.ink, borderRadius: 2 }} />
            </button>
          </div>

          {menuOpen ? (
            <div
              className="pp-mobile-menu"
              style={{
                borderTop: `1px solid ${theme.lineSoft}`,
                background: 'rgba(8, 20, 35, 0.98)',
                backdropFilter: 'blur(12px)',
                padding: '12px 1.25rem 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollTo(item.id)
                    setMenuOpen(false)
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: theme.radiusMd,
                    border: `1px solid ${theme.lineSoft}`,
                    background: theme.cream,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14,
                    color: theme.ink,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <main>
          {/* Hero */}
          <section
            id="hero"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: 'clamp(6.75rem, 12vw, 8.75rem) clamp(1.25rem, 4vw, 2rem) clamp(4.25rem, 8vw, 5.75rem)',
              background: theme.heroBg,
              color: theme.ink,
            }}
          >
            <div className="pp-hero-grid" style={{ position: 'absolute', inset: 0, opacity: 0.85 }} aria-hidden />
            <div className="pp-glow pp-glow-left" style={{ top: '-140px', left: '-5%', background: theme.rust }} aria-hidden />
            <div className="pp-glow pp-glow-right" style={{ top: '20%', right: '-15%', background: theme.navy }} aria-hidden />
            <div className="pp-orbit" aria-hidden />
            <div className="pp-portal-scene" aria-hidden>
              <div className="pp-float-card one">
                <small>On-time delivery</small>
                <strong>98%</strong>
                <small>project focus</small>
              </div>
              <div className="pp-float-card two">
                <small>Support access</small>
                <strong>24/7</strong>
                <small>when deadlines matter</small>
              </div>
              <div className="pp-float-card three">
                <small>Project journey</small>
                <strong>500+</strong>
                <small>deliverables supported</small>
              </div>
              <div className="pp-portal">
                <img className="pp-portal-image" src="/images/coding-workspace.png" alt="" />
              </div>
              <div className="pp-portal-step" />
            </div>

            <div className="pp-hero-content" style={{ ...sectionWrap, position: 'relative', zIndex: 3, maxWidth: 680, margin: '0 auto 0 0' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 14px 8px 10px',
                  borderRadius: theme.pill,
                  background: theme.cream,
                  border: `1px solid ${theme.line}`,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.navy,
                  boxShadow: theme.shadowCard,
                  animation: 'pp-fade-up 0.8s ease both',
                }}
              >
                <MdOutlineFactCheck size={17} style={{ color: theme.rust }} />
                Academic + IT delivery studio
              </div>

              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 5.8vw, 3.85rem)',
                  lineHeight: 1.06,
                  margin: '22px 0 18px',
                  maxWidth: 610,
                  letterSpacing: '-0.035em',
                  color: theme.ink,
                  animation: 'pp-fade-up 0.85s ease 0.06s both',
                }}
              >
                Your Academic Success Starts Here
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.06rem, 2.2vw, 1.28rem)',
                  fontWeight: 600,
                  color: theme.inkSoft,
                  maxWidth: 720,
                  margin: '0 0 14px',
                  animation: 'pp-fade-up 0.85s ease 0.1s both',
                }}
              >
                IT Projects, Research Support, Documentation & Professional Solutions — Delivered with Precision
              </p>

              <p
                style={{
                  fontSize: 'clamp(0.96rem, 1.8vw, 1.06rem)',
                  color: theme.muted,
                  maxWidth: 680,
                  margin: '0 0 32px',
                  lineHeight: 1.78,
                  animation: 'pp-fade-up 0.85s ease 0.14s both',
                }}
              >
                From final year projects to full system implementations, from research papers to internship documentation — we help students and professionals turn deadlines into success stories.
              </p>

              <div
                className="pp-hero-ctas"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 36,
                  animation: 'pp-fade-up 0.85s ease 0.18s both',
                }}
              >
                <button
                  type="button"
                  className="pp-btn"
                  onClick={() => scrollTo('contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 24px',
                    borderRadius: theme.radiusMd,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    color: '#ffffff',
                    background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyDeep} 100%)`,
                    border: '1px solid #5f91c8',
                    boxShadow: '0 0 15px rgba(95, 145, 200, 0.7), 0 0 30px rgba(95, 145, 200, 0.4)',
                  }}
                >
                  <span aria-hidden></span> Submit Your Requirement
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 24px',
                    borderRadius: theme.radiusMd,
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
                    border: '1px solid rgba(220, 235, 250, 0.2)',
                    boxShadow: '0 12px 32px rgba(22, 101, 52, 0.28)',
                  }}
                >
                  <FaWhatsapp size={20} />
                  <span aria-hidden></span> Chat on WhatsApp
                </a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 10,
                  animation: 'pp-fade-up 0.9s ease 0.22s both',
                }}
              >
                {[
                  '24/7 Dedicated Support',
                  'Fast Turnaround Time',
                  'Confidential Service',
                  'Unlimited Revisions',
                  'Continued Support After Delivery',
                ].map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 14px',
                      borderRadius: theme.radiusMd,
                      background: theme.cream,
                      border: `1px solid ${theme.line}`,
                      fontSize: 13,
                      fontWeight: 600,
                      color: theme.inkSoft,
                      boxShadow: '0 2px 12px rgba(20,18,16,0.04)',
                    }}
                  >
                    <span style={{ color: theme.gold, fontSize: 15, fontWeight: 800 }} aria-hidden>
                      ✔
                    </span>
                    {t}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 40,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 22px',
                  borderRadius: theme.radiusLg,
                  background: theme.cream,
                  border: `1px solid ${theme.line}`,
                  boxShadow: theme.shadowCard,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <HiOutlineUserGroup size={26} color={theme.navy} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: theme.ink }}>500+</div>
                    <div style={{ fontSize: 12, color: theme.muted, fontWeight: 600 }}>Deliverables supported</div>
                  </div>
                </div>
                <div style={{ width: 1, height: 36, background: theme.line, display: 'none' }} className="pp-stat-divider" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MdOutlineSchool size={26} color={theme.rust} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: theme.ink }}>98%</div>
                    <div style={{ fontSize: 12, color: theme.muted, fontWeight: 600 }}>On-time delivery focus</div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }} />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['IEEE-ready', 'Agile updates', 'NDA on request'].map((b) => (
                    <span
                      key={b}
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '7px 12px',
                        borderRadius: theme.pill,
                        border: `1px solid ${theme.goldSoft}`,
                        color: theme.rust,
                        background: 'rgba(13, 24, 39, 0.82)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="pp-section-reveal" style={{ background: theme.sand }}>
            <div style={sectionWrap}>
              <div className="pp-eyebrow-accent" style={eyebrow}>About us</div>
              <h2 style={h2}>We Don’t Just Complete Work — We Build Confidence</h2>
              <p style={{ ...sub, maxWidth: 800, marginBottom: 28 }}>
                Behind every deadline, there’s pressure. Behind every project, there’s a dream.
                <br />
                <br />
                We understand both.
              </p>
              <div className="pp-showcase-image">
                <img src="/images/academic-workspace.png" alt="A focused academic and technology workspace" />
                <div className="pp-showcase-label">
                  <div style={{ color: theme.gold, fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>Built for ambitious work</div>
                  <div style={{ color: theme.ink, fontFamily: FONT_SERIF, fontSize: 'clamp(1.45rem, 3vw, 2.1rem)', lineHeight: 1.12, fontWeight: 600 }}>Your next deadline deserves a space for focused thinking.</div>
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 20,
                  alignItems: 'stretch',
                }}
              >
                <div
                  className="pp-card-hover"
                  style={{
                    padding: '30px 28px',
                    borderRadius: theme.radiusLg,
                    background: theme.cream,
                    border: `1px solid ${theme.lineSoft}`,
                    boxShadow: theme.shadowCard,
                  }}
                >
                  <p style={{ margin: 0, color: theme.inkSoft, fontSize: '1.03rem', lineHeight: 1.78 }}>
                    Our mission is simple: deliver quality work that helps students succeed with confidence.
                  </p>
                  <p style={{ margin: '18px 0 0', color: theme.muted, fontSize: '1rem', lineHeight: 1.78 }}>
                    Whether it’s an urgent assignment, a complex system implementation, a final year research project, or career documents that shape your future — we provide professional support that goes beyond simple delivery.
                  </p>
                </div>
                <div
                  className="pp-card-hover"
                  style={{
                    padding: '30px 28px',
                    borderRadius: theme.radiusLg,
                    background: theme.navyCard,
                    color: '#e8e2dc',
                    border: `1px solid rgba(212, 196, 176, 0.15)`,
                    boxShadow: '0 24px 60px rgba(15, 26, 44, 0.35)',
                  }}
                >
                  <HiOutlineSparkles size={28} style={{ marginBottom: 14, color: theme.gold }} />
                  <p style={{ margin: 0, fontSize: '1.06rem', lineHeight: 1.78, fontWeight: 500 }}>
                    We stay with you even after the final handover, because true support doesn’t end with submission.
                  </p>
                  <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Quality', 'Reliability', 'Confidentiality', 'Long-Term Support'].map((x) => (
                      <span
                        key={x}
                        style={{
                          padding: '8px 14px',
                          borderRadius: theme.pill,
                          background: 'rgba(255,252,248,0.08)',
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(212,196,176,0.2)',
                        }}
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                  <p style={{ margin: '22px 0 0', fontSize: '1rem', color: '#c4b8a8', fontStyle: 'italic', fontFamily: FONT_SERIF }}>
                    Because your success is our reputation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="pp-section-reveal" style={{ background: `linear-gradient(185deg, ${theme.pageBg} 0%, ${theme.cream} 55%)` }}>
            <div style={sectionWrap}>
              <div className="pp-eyebrow-accent" style={eyebrow}>Capabilities</div>
              <h2 style={h2}>What We Solve</h2>
              <p style={{ ...sub, maxWidth: 560, marginBottom: 36 }}>
                We don’t just offer services. We solve stress, deadlines, and uncertainty.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {SERVICES.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <article
                      key={s.title}
                      className="pp-card-hover"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr)',
                        gap: 18,
                        padding: '28px 26px',
                        borderRadius: theme.radiusLg,
                        background: i % 2 === 0 ? theme.cream : theme.sand,
                        border: `1px solid ${theme.lineSoft}`,
                        boxShadow: theme.shadowCard,
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16 }}>
                        <div
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: theme.radiusMd,
                            display: 'grid',
                            placeItems: 'center',
                          background: `linear-gradient(145deg, ${theme.rustSoft}, rgba(95, 145, 200, 0.14))`,
                            color: theme.navy,
                            flexShrink: 0,
                            border: `1px solid ${theme.lineSoft}`,
                          }}
                        >
                          <Icon size={28} />
                        </div>
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <h3 style={{ margin: '0 0 8px', fontSize: '1.22rem', fontWeight: 800, color: theme.ink, fontFamily: FONT_UI }}>{s.title}</h3>
                          <p style={{ margin: 0, color: theme.muted, fontWeight: 500 }}>{s.tagline}</p>
                        </div>
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: 'none',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                          gap: 10,
                        }}
                      >
                        {s.items.map((it) => (
                          <li
                            key={it}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              fontSize: 14,
                              fontWeight: 600,
                              color: theme.inkSoft,
                              padding: '11px 14px',
                              borderRadius: theme.radiusSm,
                              background: theme.pageBg,
                              border: `1px solid ${theme.lineSoft}`,
                            }}
                          >
                            <HiOutlineBolt size={18} style={{ color: theme.rust, flexShrink: 0, marginTop: 1 }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                      {s.foot ? (
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: theme.navy }}>{s.foot}</p>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Why */}
          <section id="why" className="pp-section-reveal" style={{ background: theme.cream }}>
            <div style={sectionWrap}>
              <div className="pp-eyebrow-accent" style={eyebrow}>Trust</div>
              <h2 style={h2}>Why Students Stay With Us</h2>
              <p style={{ ...sub, marginBottom: 36 }}>Anyone can promise delivery. We promise results.</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 16,
                }}
              >
                {WHY.map((w) => {
                  const Icon = w.icon
                  return (
                    <div
                      key={w.title}
                      className="pp-card-hover"
                      style={{
                        padding: '24px 22px',
                        borderRadius: theme.radiusLg,
                        background: theme.pageBg,
                        border: `1px solid ${theme.lineSoft}`,
                        boxShadow: '0 8px 28px rgba(20, 18, 16, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: theme.radiusMd,
                          display: 'grid',
                          placeItems: 'center',
                          background: theme.cream,
                          color: theme.navy,
                          marginBottom: 14,
                          border: `1px solid ${theme.line}`,
                          boxShadow: '0 4px 14px rgba(20,18,16,0.05)',
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <h3 style={{ margin: '0 0 8px', fontSize: '1.06rem', fontWeight: 800, color: theme.ink }}>{w.title}</h3>
                      <p style={{ margin: 0, fontSize: 14, color: theme.muted, lineHeight: 1.68 }}>{w.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Process */}
          <section id="process" className="pp-section-reveal" style={{ background: theme.processBg, color: '#e8e4df' }}>
            <div style={sectionWrap}>
              <div style={{ ...eyebrow, color: theme.gold, borderBottomColor: 'rgba(184, 134, 11, 0.35)' }}>How it works</div>
              <h2 style={{ ...h2, color: theme.ink }}>Simple Process. Serious Results.</h2>
              <p style={{ ...sub, color: theme.inkSoft, marginBottom: 32, maxWidth: 520 }}>
                A clear path from requirement to delivery — with transparency at every step.
              </p>
              <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 22,
                    top: 12,
                    bottom: 12,
                    width: 2,
                    background: theme.processLine,
                    borderRadius: 2,
                  }}
                />
                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 22 }}>
                  {STEPS.map((st) => (
                    <li
                      key={st.n}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '48px 1fr',
                        gap: 16,
                        alignItems: 'start',
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: theme.radiusMd,
                          background: `linear-gradient(145deg, ${theme.gold} 0%, #9a7209 100%)`,
                          color: theme.navyDeep,
                          fontWeight: 900,
                          fontSize: 12,
                          display: 'grid',
                          placeItems: 'center',
                          boxShadow: '0 10px 28px rgba(184, 134, 11, 0.35)',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {st.n}
                      </div>
                      <div
                        className="pp-process-step-box"
                        style={{
                          padding: '22px 24px',
                          borderRadius: theme.radiusLg,
                          background: 'rgba(31, 54, 82, 0.76)',
                          border: `1px solid ${theme.processBorder}`,
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '1.08rem', marginBottom: 10, color: theme.ink }}>Step {st.n}: {st.title}</div>
                        {st.body.map((para, pi) => (
                          <p key={`${st.n}-${pi}`} style={{ margin: '0 0 10px', fontSize: 14, color: '#d5e3f1', lineHeight: 1.72 }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="pp-section-reveal" style={{ background: theme.cream }}>
            <div style={sectionWrap}>
              <div className="pp-eyebrow-accent" style={eyebrow}>Proof</div>
              <h2 style={h2}>Real Results. Real Satisfaction.</h2>
              <p style={{ ...sub, marginBottom: 28 }}>Selected feedback from students and professionals we’ve partnered with.</p>
              <div
                style={{
                  position: 'relative',
                  borderRadius: theme.radiusLg,
                  padding: 'clamp(1.5rem, 4vw, 2.6rem)',
                  background: theme.testimonialBg,
                  border: `1px solid ${theme.line}`,
                  boxShadow: theme.shadowCard,
                  overflow: 'hidden',
                }}
              >
                <HiOutlineChatBubbleLeftRight
                  size={120}
                  style={{ position: 'absolute', right: -10, bottom: -20, opacity: 0.07, color: theme.navy }}
                  aria-hidden
                />
                <blockquote style={{ margin: 0, position: 'relative', zIndex: 1 }}>
                  <p
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: 'clamp(1.32rem, 3vw, 1.78rem)',
                      lineHeight: 1.48,
                      color: theme.ink,
                      margin: '0 0 18px',
                      fontWeight: 500,
                    }}
                  >
                    “{TESTIMONIALS[tIndex].quote}”
                  </p>
                  <footer style={{ fontSize: 14, fontWeight: 700, color: theme.rust, letterSpacing: '0.02em' }}>— {TESTIMONIALS[tIndex].name}</footer>
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={_.name}
                        type="button"
                        aria-label={`Show testimonial ${i + 1}`}
                        onClick={() => setTIndex(i)}
                        style={{
                          width: i === tIndex ? 28 : 10,
                          height: 10,
                          borderRadius: 999,
                          border: 'none',
                          cursor: 'pointer',
                          background: i === tIndex ? theme.navy : 'rgba(190, 211, 234, 0.22)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      type="button"
                      className="pp-btn"
                      aria-label="Previous testimonial"
                      onClick={() => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: theme.radiusMd,
                        border: `1px solid ${theme.line}`,
                        background: theme.cream,
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        color: theme.ink,
                      }}
                    >
                      <HiChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      className="pp-btn"
                      aria-label="Next testimonial"
                      onClick={() => setTIndex((i) => (i + 1) % TESTIMONIALS.length)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: theme.radiusMd,
                        border: `1px solid ${theme.line}`,
                        background: theme.cream,
                        color: theme.ink,
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <HiChevronRight size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA band */}
          <section
            aria-labelledby="cta-title"
            className="pp-section-reveal"
            style={{
              padding: 'clamp(3.25rem, 7vw, 4.75rem) clamp(1.25rem, 4vw, 2rem)',
              background: theme.ctaMesh,
              color: '#e8e4df',
            }}
          >
            <div style={{ ...sectionWrap, textAlign: 'center', maxWidth: 900 }}>
              <HiOutlineRocketLaunch size={36} style={{ color: theme.gold, marginBottom: 12, animation: 'pp-float 4s ease-in-out infinite' }} aria-hidden />
              <h2 id="cta-title" style={{ ...h2, color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 2.65rem)' }}>
                Deadlines Don’t Wait — Neither Should You
              </h2>
              <p style={{ margin: '0 auto 10px', maxWidth: 620, fontSize: '1.06rem', color: '#c4bbb0', lineHeight: 1.72 }}>
                Whether it’s tonight’s submission or your final year project, we’re ready to help.
              </p>
              <p style={{ margin: '0 auto 28px', maxWidth: 520, fontSize: '1.04rem', color: '#a8a29e', fontWeight: 600 }}>
                Let’s turn pressure into progress.
              </p>
              <div className="pp-cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 24px',
                    borderRadius: theme.radiusMd,
                    fontWeight: 800,
                    fontSize: 15,
                    textDecoration: 'none',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
                    boxShadow: '0 14px 40px rgba(22, 101, 52, 0.35)',
                  }}
                >
                  Start on WhatsApp
                </a>
                <button
                  type="button"
                  className="pp-btn"
                  onClick={() => scrollTo('contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 24px',
                    borderRadius: theme.radiusMd,
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: 'pointer',
                    color: '#ffffff',
                    background: 'rgba(255,252,248,0.08)',
                    border: '1px solid rgba(212,196,176,0.35)',
                  }}
                >
                  <span aria-hidden></span> Get Free Consultation
                </button>
                <button
                  type="button"
                  className="pp-btn"
                  onClick={() => scrollTo('contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 24px',
                    borderRadius: theme.radiusMd,
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: 'pointer',
                    color: theme.navyDeep,
                    background: `linear-gradient(135deg, ${theme.gold} 0%, #d4a20f 100%)`,
                    border: 'none',
                    boxShadow: '0 12px 36px rgba(184, 134, 11, 0.35)',
                  }}
                >
                  <span aria-hidden></span> Submit Your Project Today
                </button>
              </div>
            </div>
          </section>

          {/* Trust message */}
          <section className="pp-section-reveal" style={{ background: theme.sand }}>
            <div style={{ ...sectionWrap, textAlign: 'center', maxWidth: 760 }}>
              <div className="pp-eyebrow-accent" style={eyebrow}>Our promise</div>
              <h2 style={h2}>We Don’t Sell Services. We Deliver Peace of Mind.</h2>
              <p style={{ margin: '0 auto', fontSize: '1.1rem', color: theme.muted, lineHeight: 1.82 }}>
                Your grades matter. Your projects matter. Your future matters.
                <br />
                <br />
                That’s why we treat every task like it matters — because it does.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pp-section-reveal" style={{ background: theme.cream }}>
            <div style={{ ...sectionWrap, maxWidth: 680, textAlign: 'center' }}>
              <div className="pp-eyebrow-accent" style={{ ...eyebrow, margin: '0 auto 14px' }}>Contact</div>
              <h2 style={{ ...h2, margin: '0 auto 16px' }}>Tell us what you’re building</h2>
              <p style={{ ...sub, margin: '0 auto 28px', maxWidth: 520 }}>
                Share your brief, deadline, and deliverables. We’ll respond with a structured plan, timeline, and quote — no fluff.
              </p>
              <div className="pp-contact-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 22 }}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="pp-card-hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    textDecoration: 'none',
                    color: theme.ink,
                    fontWeight: 700,
                    fontSize: 16,
                    padding: '16px 24px',
                    borderRadius: theme.radiusLg,
                    background: theme.pageBg,
                    border: `1px solid ${theme.lineSoft}`,
                    boxShadow: theme.shadowCard,
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: theme.radiusMd,
                      display: 'grid',
                      placeItems: 'center',
                      background: theme.cream,
                      color: theme.rust,
                      border: `1px solid ${theme.lineSoft}`,
                    }}
                  >
                    <FaEnvelope size={20} />
                  </span>
                  {EMAIL}
                </a>
                <a
                  href={PHONE_TEL_HREF}
                  className="pp-card-hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    color: theme.ink,
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: 'none',
                    padding: '16px 24px',
                    borderRadius: theme.radiusLg,
                    background: theme.pageBg,
                    border: `1px solid ${theme.lineSoft}`,
                    boxShadow: theme.shadowCard,
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: theme.radiusMd,
                      display: 'grid',
                      placeItems: 'center',
                      background: theme.cream,
                      color: theme.navy,
                      border: `1px solid ${theme.lineSoft}`,
                    }}
                  >
                    <FaWhatsapp size={24} style={{ color: '#25D366' }} />
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div>{PHONE_DISPLAY}</div>
                    <div style={{ fontSize: 12, color: theme.muted, fontWeight: 500 }}>WhatsApp / Call · Response within hours</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{ background: theme.footerBg, color: '#b9cadc', padding: '44px clamp(1.25rem, 4vw, 2.5rem) 32px' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    padding: 7,
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <img src={LOGO_SRC} alt="" width={30} height={30} style={{ width: 30, height: 30, objectFit: 'contain', display: 'block' }} />
                </span>
                <span style={{ fontWeight: 800, color: theme.ink, fontSize: 16 }}>{BRAND}</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, maxWidth: 300, color: '#b9cadc' }}>
                Premium academic and IT execution partner for students, researchers, and early-career professionals.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: theme.ink, marginBottom: 12, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Explore</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {NAV.filter((n) => n.id !== 'hero').map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(n.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d8e5f3',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: theme.ink, marginBottom: 12, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Business</div>
              <p style={{ margin: '0 0 8px', fontSize: 14 }}>Registered operations · Remote-first delivery</p>
              <p style={{ margin: 0, fontSize: 14 }}>
                <a href={`mailto:${EMAIL}`} style={{ color: '#d8e5f3', textDecoration: 'none' }}>
                  {EMAIL}
                </a>
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 14 }}>
                <a href={PHONE_TEL_HREF} style={{ color: '#d8e5f3', textDecoration: 'none' }}>
                  {PHONE_DISPLAY}
                </a>
                {' · '}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ color: theme.gold, textDecoration: 'none', fontWeight: 600 }}>
                  WhatsApp
                </a>
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: theme.ink, marginBottom: 12, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Social</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { Icon: FaWhatsapp, href: WHATSAPP_URL, label: 'WhatsApp' },
                  { Icon: FaFacebookF, href: 'https://www.facebook.com/share/1EqqWfruTK/', label: 'Facebook' },
                  { Icon: FaInstagram, href: 'https://www.instagram.com/project_pulse_01?igsh=MTNjaGRrbDZsbXZ6aA==', label: 'Instagram' },
                  { Icon: FaEnvelope, href: `mailto:${EMAIL}`, label: 'Email' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    aria-label={label}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(112, 147, 194, 0.18)',
                      border: '1px solid rgba(197, 219, 245, 0.35)',
                      color: theme.ink,
                      textDecoration: 'none',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(226, 184, 87, 0.30)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(112, 147, 194, 0.18)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className="pp-footer-bottom"
            style={{
              maxWidth: 1160,
              margin: '32px auto 0',
              paddingTop: 22,
              borderTop: '1px solid rgba(120,113,108,0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 13,
            }}
          >
            <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
            <span style={{ color: '#78716c' }}>Confidentiality · Quality assurance · Post-delivery support</span>
          </div>
        </footer>

        {/* Floating WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="pp-wa"
          aria-label="Chat on WhatsApp"
          style={{
            position: 'fixed',
            right: 22,
            bottom: 22,
            zIndex: 60,
            width: 58,
            height: 58,
            borderRadius: theme.radiusMd,
            background: 'linear-gradient(145deg, #166534 0%, #15803d 55%, #14532d 100%)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 14px 40px rgba(22, 101, 52, 0.45)',
            border: '2px solid rgba(255,252,248,0.25)',
            textDecoration: 'none',
          }}
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
    </>
  )
}
