import React, { useState } from 'react';
import {
  Bell,
  Search,
  ShieldCheck,
  Bot,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Volume2,
  Mic,
  Printer,
  Eye,
  Keyboard,
  LogOut,
  KeyRound,
  Globe
} from 'lucide-react';
import { Role, UserAccount } from '../../types';

interface NavbarProps {
  currentUser: UserAccount;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  unresolvedEscalationsCount: number;
  onNavigateToModule: (moduleId: string) => void;
  onOpenCommandCenter: (initialPrompt?: string) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onChangeTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  easyMode: boolean;
  onToggleEasyMode: () => void;
  onOpenHelpGuide: () => void;
  onOpenShortcuts?: () => void;
  onOpenLoginModal: () => void;
  onReturnToLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  onRoleChange,
  unresolvedEscalationsCount,
  onNavigateToModule,
  onOpenCommandCenter,
  textSize,
  onChangeTextSize,
  easyMode,
  onToggleEasyMode,
  onOpenHelpGuide,
  onOpenShortcuts,
  onOpenLoginModal,
  onReturnToLanding
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const roles: { role: Role; label: string; desc: string }[] = [
    { role: 'User ID Administrator', label: 'Sarah Connor (ID Admin)', desc: 'Designated user ID credentials & security administrator' },
    { role: 'Principal', label: 'Dr. Evelyn Vance (Principal)', desc: 'Full institutional governance & policy escalations' },
    { role: 'Vice Principal', label: 'Marcus Sterling (Vice Principal)', desc: 'Academic schedule, teacher substitutes & discipline' },
    { role: 'Admin', label: 'Arthur Pendelton (Admin)', desc: 'Full school system management & logistics' },
    { role: 'Teacher', label: 'Elena Rostova (Teacher)', desc: 'Class timetable, attendance & student reports' },
    { role: 'General Staff', label: 'General Staff', desc: 'Facilities, inventory & daily tasks' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenCommandCenter(searchQuery);
      setSearchQuery('');
    }
  };

  const handleStartDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported on this browser. You can type commands directly!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        onOpenCommandCenter(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `EduOne2047 School Operations. Active user ${currentUser.name}, School User ID ${currentUser.userId}, Role ${currentUser.role}. All modules operational.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200/90 px-3 lg:px-6 py-2 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Landing Button */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigateToModule('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center font-extrabold text-white text-base shadow-xs">
              E1
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  EduOne2047
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                  Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium">Autonomous Operations Platform</p>
            </div>
          </div>

          <button
            onClick={onReturnToLanding}
            className="md:hidden px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md w-full mx-0 md:mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, fee, or ask AI e.g. 'Show fee defaulters'..."
              className="w-full pl-9 pr-20 py-2 text-xs sm:text-sm bg-slate-100/90 text-slate-900 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all placeholder:text-slate-500 font-medium"
            />
            
            <button
              type="button"
              onClick={handleStartDictation}
              className={`absolute right-2.5 p-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 hover:bg-blue-100 text-slate-700 hover:text-blue-700'
              }`}
              title="Click to speak your search out loud"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Speak'}</span>
            </button>
          </div>
        </form>

        {/* User Account & Quick Controls */}
        <div className="flex items-center flex-wrap justify-end gap-1.5 sm:gap-2 w-full md:w-auto">
          
          {/* Landing Page Button (Desktop) */}
          <button
            onClick={onReturnToLanding}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
            title="Return to Public Landing Page"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Landing Page</span>
          </button>

          {/* User ID Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-bold text-slate-900 leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-blue-700 font-mono">ID: {currentUser.userId} • {currentUser.role}</div>
            </div>
          </div>

          {/* Switch Role / Login Modal Trigger */}
          <button
            onClick={onOpenLoginModal}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            title="Switch User Account or Login"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Switch Account</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => onNavigateToModule('needs-attention')}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Needs Attention Escalations"
          >
            <Bell className="w-4 h-4" />
            {unresolvedEscalationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {unresolvedEscalationsCount}
              </span>
            )}
          </button>

          {/* Accessibility Text Size */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300">
            <button
              onClick={() => onChangeTextSize('normal')}
              className={`px-2 py-1 text-xs font-bold rounded-lg ${
                textSize === 'normal' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onChangeTextSize('large')}
              className={`px-2 py-1 text-xs font-extrabold rounded-lg ${
                textSize === 'large' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              A⁺
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

