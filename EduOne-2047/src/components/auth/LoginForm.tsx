import React, { useState } from 'react';
import { Role } from '../../types';
import { ShieldCheck, User, Lock, LogIn, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: Role, staffId: string) => void;
}

const AVAILABLE_ROLES: Role[] = ['Admin', 'Principal', 'Vice Principal', 'Teacher', 'ID Administrator'];

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [role, setRole] = useState<Role>('Teacher');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!staffId.trim()) {
      setError('Staff ID is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    // Mock validation - accept any password for demo purposes, 
    // but simulate network delay for premium feel
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(role, staffId);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 relative">
            <ShieldCheck className="w-8 h-8 text-white" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">EduOne2047</h1>
          <p className="text-sm text-slate-400">Secure Staff Authentication</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Designated Role</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
              >
                {AVAILABLE_ROLES.map(r => (
                  <option key={r} value={r} className="bg-slate-900">{r}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
              </div>
            </div>
          </div>

          {/* Staff ID */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Staff ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="e.g. TCH-101"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className={`w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white shadow-xl transition-all ${
              isAuthenticating 
                ? 'bg-slate-800 border-slate-700 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/25 active:scale-[0.98]'
            }`}
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Authenticating Protocol...</span>
              </div>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Initialize Session</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs font-medium text-slate-500">
          <p>Protected by AI Surveillance Matrix</p>
          <p className="mt-1">Unauthorized access will be logged</p>
        </div>
      </div>
    </div>
  );
};
