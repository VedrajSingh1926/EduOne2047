import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  UserCheck,
  Bot,
  Lock,
  BarChart3,
  CheckCircle2,
  Building2,
  Sliders,
  ChevronRight,
  Globe,
  KeyRound,
  FileCheck,
  MessageCircle,
  Wifi,
  Database,
  ArrowRightLeft,
  Clock,
  Smartphone,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onQuickRoleLogin?: (role: string, userId: string, name: string) => void;
}

// Simple CountUp Component
const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, end, { duration });
    }
  }, [isInView, count, end, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin, onQuickRoleLogin }) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'finance' | 'timetable' | 'attendance'>('documents');
  const [inboxStep, setInboxStep] = useState(0);

  // Cycle inbox demo tasks
  useEffect(() => {
    const timer = setInterval(() => {
      setInboxStep(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const roleHighlights = [
    {
      role: 'Principal',
      user: 'Dr. Evelyn Vance (PRIN-2047)',
      badge: 'Executive Leadership',
      focus: 'High-level institutional efficiency metrics, strategic policy decisions, faculty workload health, financial status, and executive directive broadcasts.'
    },
    {
      role: 'Vice Principal',
      user: 'Marcus Sterling (VP-2047)',
      badge: 'Academic & Discipline',
      focus: 'Real-time morning operations, teacher absence alerts, substitute assignment approvals, daily attendance oversight, and conduct escalations.'
    },
    {
      role: 'IT Support',
      user: 'Sarah Connor (IDADM-2047)',
      badge: 'Designated Credentials Staff',
      focus: 'Responsible for total staff user ID creation, password resetting, account locking, issuing official access slips, and credential audit logs.'
    },
    {
      role: 'General Staff & Teachers',
      user: 'Elena Rostova (TCH-101) & Staff',
      badge: 'Faculty & Support Operations',
      focus: 'Personal class schedules, quick attendance taking, student roster lookups, collaborative tasks management, and leave requests.'
    }
  ];

  const inboxTasks = [
    { type: 'Attendance', title: 'Teacher Absent (Grade 10 Math)', action: 'Approve Substitute: Mr. Sharma', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100' },
    { type: 'Finance', title: 'Fee Mismatch: Term 2 Tuition', action: 'Verify Payment Receipt', icon: CreditCard, color: 'text-rose-500', bg: 'bg-rose-100' },
    { type: 'Documents', title: 'OCR Confidence Low: Transfer Cert', action: 'Review Highlighted Fields', icon: FileCheck, color: 'text-blue-500', bg: 'bg-blue-100' }
  ];

  const complianceBadges = [
    "CBSE-Ready", 
    "ICSE-Ready", 
    "State Board Compatible", 
    "DPDP Act–Conscious"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            E1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">EduOne2047</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Next-Gen Autonomous School Operations</p>
          </div>
        </div>

        <button
          onClick={onOpenLogin}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5 hover:-translate-y-0.5"
        >
          <span>Login</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="relative pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center z-10">
        {/* Live Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl mx-4 sm:mx-0 bg-gradient-to-b from-blue-50/50 to-slate-50/50">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-20 right-20 w-48 h-48 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-10 left-1/3 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[80px]"></div>
        </div>


        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="flex flex-col items-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto">
            Autonomous School Operations <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">
              Powered by Specialized AI & Role Control
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            EduOne2047 automates fee reconciliation, timetable substitutions, and document processing — while keeping principals and admin staff in full control of every decision involving money, discipline, or student safety.
          </p>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <motion.button
              variants={fadeUpVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Portal & Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.a
              variants={fadeUpVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#sandbox"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl border border-slate-200 shadow-sm transition-all text-center"
            >
              Try Live Demo
            </motion.a>
          </motion.div>

          {/* Looping Hero Animation */}
          <div className="mt-16 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative h-28 flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              {inboxStep % 2 === 0 ? (
                <motion.div
                  key="task"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100 w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-slate-900">Teacher Absent</div>
                    <div className="text-xs text-slate-500">Grade 10 Math — Mr. Davis</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="resolved"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100 w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-slate-900">Substitute Assigned ✓</div>
                    <div className="text-xs text-emerald-600 font-medium">Mrs. Sharma notified via App</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* INFINITE SCROLLING BADGE STRIP */}
      <div className="w-full bg-white border-y border-slate-200 overflow-hidden py-4 flex group">
        <motion.div 
          className="flex items-center whitespace-nowrap min-w-max shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Duplicate the array to create a seamless infinite scroll loop */}
          {[...complianceBadges, ...complianceBadges, ...complianceBadges, ...complianceBadges].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-8">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">{badge}</span>
              <span className="text-slate-300 mx-6">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 2 — COMPARISON */}
      <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900">The Operations Evolution</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200"
            >
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Traditional ERP</div>
              <div className="flex items-center gap-4 text-xl font-medium text-slate-400">
                <Database className="w-6 h-6" />
                Store Data
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-600/20 text-white"
            >
              <div className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-6">EduOne2047</div>
              <motion.div variants={staggerContainer} className="flex flex-wrap items-center gap-2 text-xl font-bold">
                {['Read', '→', 'Understand', '→', 'Decide', '→', 'Automate', '→', 'Notify'].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                    }}
                    className={word === '→' ? 'text-blue-300 mx-1' : ''}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-3xl font-bold text-center text-slate-900 mb-16"
          >
            How Autonomous Operations Work
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-6">
            {[
              { title: 'Upload a Document', icon: FileText, desc: 'Receipts, applications, or certificates.' },
              { title: 'AI Extracts Fields', icon: Sparkles, desc: 'Contextual understanding of unstructured text.' },
              { title: 'Confidence Checked', icon: ShieldCheck, desc: 'Flags anything ambiguous for human review.' },
              { title: 'Human Confirms, Data Syncs Everywhere', icon: UserCheck, desc: 'No blind automated actions on sensitive data.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={scaleUpVariant}
                className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — LIVE DEMO PREVIEW */}
      <section className="py-24 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The "Needs Attention" Inbox</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Instead of digging through dashboards to find problems, EduOne2047 brings the problems to you. The platform autonomously identifies fee mismatches, absent teachers, and low-confidence OCR scans, presenting them as actionable cards.
            </p>
            {/* // TODO: add once we have a real pilot - real product demo video loop replacing the right side */}
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-inner"
          >
            <div className="space-y-4">
              {inboxTasks.map((task, i) => (
                <div 
                  key={i} 
                  className={`bg-white p-5 rounded-2xl border ${i === inboxStep ? 'border-blue-300 shadow-lg scale-[1.02]' : 'border-slate-200 shadow-sm opacity-60'} transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 hover:shadow-md cursor-default`}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-full ${task.bg} ${task.color} flex items-center justify-center`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{task.type}</div>
                    <div className="font-bold text-slate-900 text-base">{task.title}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-100 transition-colors">
                        {task.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — FEE RECONCILIATION SPOTLIGHT */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-300 mb-8">Manual Fee Reconciliation Time</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-black text-rose-400 line-through decoration-rose-500/50 mb-2">
                <CountUp end={3} duration={1.5} />-<CountUp end={4} duration={2} /> days/month
              </div>
              <div className="text-slate-400 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" /> Spreadsheets & Chasing Slips
              </div>
            </motion.div>

            <ArrowRightLeft className="w-8 h-8 text-slate-600 hidden md:block" />

            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-black text-emerald-400 mb-2">Instant</div>
              <div className="text-slate-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Automated Ledger Matching
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FEATURE DEEP-DIVE */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Core Capabilities</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['documents', 'finance', 'timetable', 'attendance'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-8 border border-slate-200 min-h-[250px] relative shadow-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'documents' && (
                <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><FileText className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Intelligent Document Processing</h3>
                  <p className="text-slate-600 text-lg">Upload physical forms, certificates, or receipts. The system extracts exact data points automatically, routing low-confidence reads to human staff for final verification.</p>
                </motion.div>
              )}
              {activeTab === 'finance' && (
                <motion.div key="fin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><CreditCard className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Automated Fee Ledger</h3>
                  <p className="text-slate-600 text-lg">Every transaction is logged and mapped to the student's unique ledger. Mismatches in expected vs. received amounts are instantly flagged for accountant review.</p>
                </motion.div>
              )}
              {activeTab === 'timetable' && (
                <motion.div key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Calendar className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Dynamic Timetable & Substitutions</h3>
                  <p className="text-slate-600 text-lg">Create robust class schedules without conflicts. When a teacher marks absent, the AI substitute recommendation engine immediately finds the best available replacement staff.</p>
                </motion.div>
              )}
              {activeTab === 'attendance' && (
                <motion.div key="att" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6"><Users className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Attendance Matrix</h3>
                  <p className="text-slate-600 text-lg">One-tap morning roll call for teachers. The system automatically identifies chronic absenteeism patterns and prepares parent communication drafts.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* NEW SECTION 6.5 — ALTERNATING PERSONA PANELS */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-24">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What Changes for You</h2>
          </div>

          {[
            {
              role: 'For Principals',
              headline: 'Total operational oversight without the spreadsheet fatigue.',
              icon: Briefcase,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              reverse: false
            },
            {
              role: 'For Accounts Staff',
              headline: 'End-of-day ledger reconciliation drops from hours to instant.',
              icon: CreditCard,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
              reverse: true
            },
            {
              role: 'For Teachers',
              headline: 'Less time chasing attendance sheets, more time teaching.',
              icon: GraduationCap,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50',
              reverse: false
            },
            {
              role: 'For Parents',
              headline: 'Immediate WhatsApp updates on fees and daily attendance.',
              icon: Smartphone,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
              reverse: true
            }
          ].map((persona, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-12 ${persona.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`flex-1 w-full aspect-video rounded-3xl ${persona.bg} border border-slate-100 flex items-center justify-center shadow-inner`}>
                <persona.icon className={`w-24 h-24 ${persona.color} opacity-80`} />
              </div>
              <div className="flex-1 space-y-4">
                <div className={`text-sm font-bold uppercase tracking-widest ${persona.color}`}>
                  {persona.role}
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  {persona.headline}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — BUILT FOR INDIAN SCHOOLS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Built for Indian Schools</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Engineered specifically for the realities of Indian education ecosystems.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Building2 className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Multi-Board Support</h3>
              <p className="text-sm text-slate-600">Native structures mapping exactly to CBSE, ICSE, and State Board academic formatting requirements.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <CreditCard className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Indian Fee Structures</h3>
              <p className="text-sm text-slate-600">Complex handling built-in: tuition + transport + sibling discounts + late fines modeled in a real ledger format.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">WhatsApp-First Comm</h3>
              <p className="text-sm text-slate-600">Parent notifications default to WhatsApp, ensuring read-receipts and immediate visibility over standard email.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Users className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">RTE Quota Tracking</h3>
              <p className="text-sm text-slate-600">Automated flagging for RTE students and scholarship-eligibility to ensure compliance without manual spreadsheets.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Globe className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Vernacular Support</h3>
              <p className="text-sm text-slate-600">Core communication templates support Hindi and regional vernacular languages for parent inclusion.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <Wifi className="w-8 h-8 text-slate-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Tier 2/3 Connectivity</h3>
              <p className="text-sm text-slate-600">Lightweight payloads and optimistic UI updates ensure the app remains responsive on patchy 4G connections.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — ROLE-BASED PORTALS (SANDBOX) */}
      <section id="sandbox" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Try the Live Demo (Sandbox Data)</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleHighlights.map((role, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200 group"
              >
                <div className="mb-4">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                    {role.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{role.role}</h3>
                <div className="text-sm text-slate-500 font-mono mb-4">{role.user}</div>
                <p className="text-sm text-slate-600 mb-6 flex-1">{role.focus}</p>
                <button 
                  onClick={() => onQuickRoleLogin && onQuickRoleLogin(role.role, role.user.split('(')[1].replace(')',''), role.user.split(' (')[0])}
                  className="w-full py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                >
                  Login as {role.role}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — TRUST & SECURITY */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-12">Trust & Security by Design</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            <motion.div variants={scaleUpVariant}>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Human-in-the-Loop</h3>
              <p className="text-slate-400 text-sm">Every AI decision touching money, discipline, or student safety requires explicit human review. The AI proposes; your staff decides.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant}>
              <h3 className="text-xl font-bold text-slate-200 mb-3">DPDP Act Conscious</h3>
              <p className="text-slate-400 text-sm">Data handling architecture designed with modern privacy regulations in mind, ensuring student data remains fiercely protected.</p>
            </motion.div>

            <motion.div variants={scaleUpVariant}>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Strictly Siloed Data</h3>
              <p className="text-slate-400 text-sm">Zero cross-school data pooling without explicit consent. Your school's data trains only your school's operational engine.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 
        // DO NOT ADD TESTIMONIALS OR LOGO WALL YET
        // add once we have a real pilot - real testimonials, real metrics, real logo walls
      */}

      {/* SECTION 10 — FINAL CTA & FOOTER */}
      <footer className="py-24 bg-slate-50 border-t border-slate-200 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Ready to Automate Your School?</h2>
          <button
            onClick={onOpenLogin}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto mb-16"
          >
            <Bot className="w-4 h-4" />
            <span>Launch Staff Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-12 border-t border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Database className="w-4 h-4" /> Powered by Firebase Firestore
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Intelligence by Gemini AI
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
