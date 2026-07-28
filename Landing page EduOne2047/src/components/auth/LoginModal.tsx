import React, { useState } from 'react';
import { ShieldCheck, KeyRound, User, Lock, Building, ArrowRight, X, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Role, UserAccount } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  users: UserAccount[];
  onBackToLanding?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  users,
  onBackToLanding
}) => {
  const [role, setRole] = useState<Role>('User ID Administrator');
  const [name, setName] = useState<string>('Sarah Connor');
  const [userId, setUserId] = useState<string>('IDADM-2047');
  const [password, setPassword] = useState<string>('pass123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectQuickAccount = (accountUserId: string) => {
    const found = users.find(u => u.userId.toLowerCase() === accountUserId.toLowerCase());
    if (found) {
      setRole(found.role);
      setName(found.name);
      setUserId(found.userId);
      setPassword(found.passwordHash || 'pass123');
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!role || !name.trim() || !userId.trim() || !password.trim()) {
      setError('Please fill in all required authentication credentials.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Find matching user or generate validated session
      let existingUser = users.find(
        u => u.userId.toLowerCase() === userId.trim().toLowerCase()
      );

      if (existingUser) {
        if (existingUser.status === 'LOCKED') {
          setError('This User ID account has been locked by Sarah Connor (ID Admin). Please contact ID Administration.');
          setIsSubmitting(false);
          return;
        }

        const updatedUser: UserAccount = {
          ...existingUser,
          name: name.trim() || existingUser.name,
          role: role || existingUser.role,
          lastLogin: 'Just now'
        };
        onLoginSuccess(updatedUser);
      } else {
        // Create new session user
        const newUser: UserAccount = {
          id: `USR-${Date.now()}`,
          userId: userId.trim().toUpperCase(),
          name: name.trim(),
          role: role,
          passwordHash: password,
          department: role === 'Teacher' ? 'Mathematics & Science' : role === 'User ID Administrator' ? 'Staff Credentials' : 'Administration',
          email: `${userId.trim().toLowerCase()}@eduone2047.org`,
          phone: '+1 (555) 012-2047',
          status: 'ACTIVE',
          dateIssued: new Date().toISOString().split('T')[0],
          lastLogin: 'Just now',
          issuedBy: 'Self Registered / Verified'
        };
        onLoginSuccess(newUser);
      }
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-100 flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">EduOne2047 Staff Sign-In</h2>
              <p className="text-xs text-slate-400">Authenticated School Operational Access</p>
            </div>
          </div>
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Return to Landing Page"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[85vh]">
          {/* Quick Account Switcher Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Test Accounts (1-Click Fill):
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelectQuickAccount('IDADM-2047')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  userId === 'IDADM-2047'
                    ? 'bg-blue-600/20 border-blue-500/80 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Sarah Connor</span>
                  <span className="text-[10px] text-amber-400 font-mono">ID Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">ID: IDADM-2047</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuickAccount('PRIN-2047')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  userId === 'PRIN-2047'
                    ? 'bg-blue-600/20 border-blue-500/80 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Dr. Evelyn Vance</span>
                  <span className="text-[10px] text-indigo-400 font-mono">Principal</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">ID: PRIN-2047</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuickAccount('VP-2047')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  userId === 'VP-2047'
                    ? 'bg-blue-600/20 border-blue-500/80 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Marcus Sterling</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Vice Principal</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">ID: VP-2047</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuickAccount('TCH-101')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  userId === 'TCH-101'
                    ? 'bg-blue-600/20 border-blue-500/80 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Elena Rostova</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Teacher</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">ID: TCH-101</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Your School Role *
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  required
                >
                  <option value="User ID Administrator">User ID Administrator (Sarah Connor)</option>
                  <option value="Principal">Principal (Dr. Evelyn Vance)</option>
                  <option value="Vice Principal">Vice Principal (Marcus Sterling)</option>
                  <option value="Admin">System Administrator (Arthur Pendelton)</option>
                  <option value="Teacher">Teacher / Faculty (Elena Rostova / Staff)</option>
                  <option value="General Staff">General Staff (Facilities / Ops)</option>
                  <option value="Accountant">Accountant / Finance Manager</option>
                  <option value="Registrar">Registrar / Records Officer</option>
                </select>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* School User ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                School-issued User ID *
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. IDADM-2047"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (demo: pass123)"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>ID issuance and credential administration managed by Sarah Connor (ID Admin).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
