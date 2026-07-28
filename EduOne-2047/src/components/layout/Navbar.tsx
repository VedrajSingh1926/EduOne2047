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
  MicOff,
  Type,
  Printer,
  Sparkles,
  Eye,
  Keyboard
} from 'lucide-react';
import { Role } from '../../types';

interface NavbarProps {
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
}

export const Navbar: React.FC<NavbarProps> = ({
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
  onOpenShortcuts
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

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

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        onOpenCommandCenter(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Remix EduOne School Operations. Active role is ${currentRole}. You can search student files, mark attendance, or ask the AI Command Center for assistance. Click Staff Guide for step-by-step help.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200/90 px-3 lg:px-6 py-2 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Easy Staff Mode Badge */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigateToModule('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center font-extrabold text-white text-base shadow-xs">
              E
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  EduOne
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  STAFF PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium">School Operations Platform</p>
            </div>
          </div>

          {/* Mobile Staff Help Trigger */}
          <button
            onClick={onOpenHelpGuide}
            className="md:hidden px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-2xs"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Staff Help</span>
          </button>
        </div>

        {/* Centered Voice & Text Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md w-full mx-0 md:mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, fee, or speak e.g. 'Show fee defaulters'..."
              className="w-full pl-9 pr-20 py-2 text-xs sm:text-sm bg-slate-100/90 text-slate-900 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all placeholder:text-slate-500 font-medium"
            />
            
            {/* Dictation Voice Mic Button */}
            <button
              type="button"
              onClick={handleStartDictation}
              className={`absolute right-2.5 p-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 hover:bg-blue-100 text-slate-700 hover:text-blue-700'
              }`}
              title="Click to speak your search or command out loud"
            >
              {isListening ? <Mic className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Speak'}</span>
            </button>
          </div>
        </form>

        {/* Accessibility & Quick Staff Controls */}
        <div className="flex items-center flex-wrap justify-end gap-1.5 sm:gap-2 w-full md:w-auto">
          
          {/* Text Size Accessibility Scaling */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300" title="Adjust Text Size Across App">
            <span className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden lg:inline">Text Size</span>
            <button
              onClick={() => onChangeTextSize('normal')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                textSize === 'normal' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onChangeTextSize('large')}
              className={`px-2 py-1 text-xs font-extrabold rounded-lg transition-all ${
                textSize === 'large' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A⁺
            </button>
            <button
              onClick={() => onChangeTextSize('xlarge')}
              className={`px-2 py-1 text-sm font-black rounded-lg transition-all ${
                textSize === 'xlarge' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A⁺⁺
            </button>
          </div>

          {/* Easy High Contrast Mode Toggle */}
          <button
            onClick={onToggleEasyMode}
            className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 shadow-2xs ${
              easyMode
                ? 'bg-amber-400 text-slate-950 border-amber-500'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
            title="Toggle Senior High-Contrast Easy Mode"
          >
            <Eye className="w-3.5 h-3.5 text-slate-900" />
            <span className="hidden sm:inline">{easyMode ? 'Easy Mode: ON' : 'Easy Mode'}</span>
          </button>

          {/* Read Aloud Page Audio Button */}
          <button
            onClick={handleReadAloud}
            className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-100 border border-slate-300 text-indigo-700 transition-colors"
            title="Read Page Summary Spoken Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Print Page Button */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 transition-colors hidden sm:block"
            title="Print or Export Paper PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Keyboard Shortcuts Helper Button */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              title="Keyboard Shortcuts (Ctrl + /)"
            >
              <Keyboard className="w-4 h-4 text-slate-700" />
              <kbd className="hidden lg:inline text-[10px] font-mono bg-white px-1 py-0.5 rounded border border-slate-300">Ctrl + /</kbd>
            </button>
          )}

          {/* Staff Help & How To Use Button */}
          <button
            onClick={onOpenHelpGuide}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 border border-amber-600 shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-slate-950" />
            <span>Staff Guide</span>
          </button>

          {/* AI Command Center Shortcut */}
          <button
            onClick={() => onOpenCommandCenter()}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all"
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>AI Assistant</span>
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

          {/* Current Role Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentRole}</span>
          </div>

        </div>

      </div>
    </header>
  );
};
