import React, { useState } from 'react';
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
  KeyRound
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onQuickRoleLogin?: (role: string, userId: string, name: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin, onQuickRoleLogin }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'roles' | 'security' | 'features'>('overview');

  const features = [
    {
      icon: UserCheck,
      title: 'Designated User ID Administration',
      desc: 'Centralized staff ID credentials manager operated by a designated staff member (Sarah Connor - Chief ID Administrator). Complete ID issuance, password resets, and account security audit trails.',
      tag: 'Security & Access'
    },
    {
      icon: Zap,
      title: 'Smart Attendance Matrix',
      desc: 'Automated attendance tracking with instant risk detection for consecutive absences and automated parent alerts via WhatsApp/SMS.',
      tag: 'Daily Operations'
    },
    {
      icon: Calendar,
      title: 'AI Timetable & Instant Substitution',
      desc: 'Dynamic schedule generation that automatically solves teacher absences by matching qualified substitute teachers in seconds.',
      tag: 'Academic Planning'
    },
    {
      icon: CreditCard,
      title: 'Reconciled Fee Management',
      desc: 'Automated receipt verification with OCR document reading, payment status ledger, and instant mismatch reconciliation.',
      tag: 'Finance & Ledger'
    },
    {
      icon: AlertTriangle,
      title: 'Needs Attention Escalation Engine',
      desc: 'Autonomous AI engine that catches policy exceptions, document errors, and critical teacher absences, routing them directly to Vice Principal and Principal queues.',
      tag: 'Governance'
    },
    {
      icon: Mail,
      title: 'Integrated Gmail Comms & Tasks',
      desc: 'Direct integration with Google Workspace for parent inquiry processing, automated email draft generation, and task synchronization.',
      tag: 'Workspace Sync'
    }
  ];

  const roleHighlights = [
    {
      role: 'Principal',
      user: 'Dr. Evelyn Vance (PRIN-2047)',
      badge: 'Executive Leadership',
      focus: 'High-level institutional efficiency metrics, strategic policy decisions, faculty workload health, financial status, and executive directive broadcasts.',
      capabilities: ['Executive KPI Command', 'Policy Escalations Approval', 'Budget & Fee Overview', 'Faculty Utilization Charts']
    },
    {
      role: 'Vice Principal',
      user: 'Marcus Sterling (VP-2047)',
      badge: 'Academic & Discipline',
      focus: 'Real-time morning operations, teacher absence alerts, substitute assignment approvals, daily attendance oversight, and conduct escalations.',
      capabilities: ['Live Morning Matrix', 'Instant Substitute Solver', 'Student Discipline Queue', 'Daily Inspection Checklist']
    },
    {
      role: 'User ID Administrator',
      user: 'Sarah Connor (IDADM-2047)',
      badge: 'Designated Credentials Staff',
      focus: 'Responsible for total staff user ID creation, password resetting, account locking, issuing official access slips, and credential audit logs.',
      capabilities: ['Create New Staff IDs', 'One-Click Password Resets', 'Account Lock/Unlock', 'Credential Audit Logs']
    },
    {
      role: 'General Staff & Teachers',
      user: 'Elena Rostova (TCH-101) & Staff',
      badge: 'Faculty & Support Operations',
      focus: 'Personal class schedules, quick attendance taking, student roster lookups, collaborative tasks management, and leave requests.',
      capabilities: ['My Class Schedule', 'Quick Roll Call', 'Collaborative Task Manager', 'Student Lookup & Leave Notes']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            E1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">EduOne2047</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md uppercase tracking-wider">
                Autonomous
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Next-Gen AI Autonomous School Operations Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <span>Access Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Fully Operational School Operating System Powered by Firebase & Gemini AI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Autonomous School Operations <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
            Powered by Specialized AI & Role Control
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          EduOne2047 automates attendance tracking, fee reconciliation, substitution scheduling, and policy escalations while keeping designated staff in full control of user access.
        </p>

        {/* Hero CTA & Quick Role Try Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Launch Portal & Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#role-portals"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-2xl border border-slate-800 transition text-center"
          >
            Explore Role Responsibilities
          </a>
        </div>

        {/* Quick Credentials Bar */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 max-w-4xl mx-auto text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <KeyRound className="w-3.5 h-3.5" />
              Quick One-Click Demo Staff Portals (Pre-Configured Accounts):
            </span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">Click any account to jump directly in</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
            <button
              onClick={() => onQuickRoleLogin && onQuickRoleLogin('User ID Administrator', 'IDADM-2047', 'Sarah Connor')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/30 border border-slate-700/80 hover:border-blue-500/50 text-left transition group"
            >
              <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-300">Sarah Connor</div>
              <div className="text-[10px] text-amber-400 font-medium">User ID Administrator</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: IDADM-2047</div>
            </button>

            <button
              onClick={() => onQuickRoleLogin && onQuickRoleLogin('Principal', 'PRIN-2047', 'Dr. Evelyn Vance')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/30 border border-slate-700/80 hover:border-blue-500/50 text-left transition group"
            >
              <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-300">Dr. Evelyn Vance</div>
              <div className="text-[10px] text-indigo-400 font-medium">Principal</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: PRIN-2047</div>
            </button>

            <button
              onClick={() => onQuickRoleLogin && onQuickRoleLogin('Vice Principal', 'VP-2047', 'Marcus Sterling')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/30 border border-slate-700/80 hover:border-blue-500/50 text-left transition group"
            >
              <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-300">Marcus Sterling</div>
              <div className="text-[10px] text-cyan-400 font-medium">Vice Principal</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: VP-2047</div>
            </button>

            <button
              onClick={() => onQuickRoleLogin && onQuickRoleLogin('Teacher', 'TCH-101', 'Elena Rostova')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-900/30 border border-slate-700/80 hover:border-blue-500/50 text-left transition group"
            >
              <div className="text-[11px] font-bold text-slate-200 group-hover:text-blue-300">Elena Rostova</div>
              <div className="text-[10px] text-emerald-400 font-medium">General Staff / Teacher</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: TCH-101</div>
            </button>
          </div>
        </div>
      </section>

      {/* Scope of Operations Section */}
      <section className="py-12 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Full Scope of School Operations</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every administrative layer is seamlessly wired together: from ID credential issuance to attendance alerts, timetables, and fee processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Fully operational module</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Tailored Views Section */}
      <section id="role-portals" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Tailored Portals</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Role-Tailored Workspaces & Responsibilities</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every staff member gets a customized view focused strictly on their domain duties.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs text-slate-400">Database Engine:</span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Firebase Firestore Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleHighlights.map((rh, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {rh.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{rh.user}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{rh.role} Workspace</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{rh.focus}</p>

                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Key Responsibilities & Views:</div>
                  {rh.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenLogin}
                className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>Login to {rh.role} View</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Staff ID Administrator Spotlight Banner */}
      <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Designated Staff Manager Spotlight
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Centralized User ID Administration</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              <strong>Sarah Connor</strong> serves as the designated Chief User ID Administrator. She oversees staff onboarding, generates new official school User IDs, resets forgotten credentials, and maintains system security logs across all departments.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onQuickRoleLogin && onQuickRoleLogin('User ID Administrator', 'IDADM-2047', 'Sarah Connor')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Login as Sarah Connor (ID Admin)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 px-4 sm:px-8 py-6 text-center text-xs text-slate-500">
        <p>© 2026 EduOne2047 AI Autonomous School Operations Platform. Fully Integrated with Firebase Firestore & Gemini AI.</p>
      </footer>
    </div>
  );
};
