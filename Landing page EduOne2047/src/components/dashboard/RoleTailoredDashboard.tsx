import React from 'react';
import {
  ShieldCheck,
  User,
  Crown,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  Clock,
  KeyRound,
  FileText,
  UserCheck,
  Check
} from 'lucide-react';
import { UserAccount, EscalationItem, AIActionLog, TimetableSlot, Student, Teacher } from '../../types';
import { OperationsDashboard } from './OperationsDashboard';

interface RoleTailoredDashboardProps {
  currentUser: UserAccount;
  onNavigate: (moduleId: string) => void;
  onOpenCommandCenter: (prompt?: string) => void;
  escalations: EscalationItem[];
  aiLogs: AIActionLog[];
  students: Student[];
  teachers: Teacher[];
  timetable: TimetableSlot[];
  onOpenAddStudent: () => void;
  onOpenDocUpload: () => void;
  onAssignSubstitute: (slotId: string, subName: string) => void;
}

export const RoleTailoredDashboard: React.FC<RoleTailoredDashboardProps> = ({
  currentUser,
  onNavigate,
  onOpenCommandCenter,
  escalations,
  aiLogs,
  students,
  teachers,
  timetable,
  onOpenAddStudent,
  onOpenDocUpload,
  onAssignSubstitute
}) => {

  // Role: Principal View
  if (currentUser.role === 'Principal') {
    const criticalEscalations = escalations.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH');

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold text-xl shrink-0">
              <Crown className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Principal Executive Portal
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-mono">
                <span>School User ID: <strong className="text-white">{currentUser.userId}</strong></span>
                <span>•</span>
                <span>Executive Leadership</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('escalations')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Review Policy Escalations ({criticalEscalations.length})</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Institutional Efficiency Index</div>
            <div className="text-2xl font-black text-slate-900 mt-2">96.8%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 2.4% vs last month</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Annual Fee Collection</div>
            <div className="text-2xl font-black text-slate-900 mt-2">₹28.5L</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">94% target reached</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Faculty Attendance Rate</div>
            <div className="text-2xl font-black text-slate-900 mt-2">98.2%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">100% substitutes active</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Pending Policy Approvals</div>
            <div className="text-2xl font-black text-amber-600 mt-2">{criticalEscalations.length}</div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">Requires Principal sign-off</div>
          </div>
        </div>

        {/* Operations Dashboard Base Component */}
        <OperationsDashboard
          onNavigate={onNavigate}
          onOpenCommandCenter={onOpenCommandCenter}
          escalations={escalations}
          aiLogs={aiLogs}
          onOpenAddStudent={onOpenAddStudent}
          onOpenDocUpload={onOpenDocUpload}
        />
      </div>
    );
  }

  // Role: Vice Principal View
  if (currentUser.role === 'Vice Principal') {
    const absentTeachers = teachers.filter(t => t.status === 'ABSENT' || t.status === 'ON_LEAVE');

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/40 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-xl shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Vice Principal Academic Operations
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-mono">
                <span>School User ID: <strong className="text-white">{currentUser.userId}</strong></span>
                <span>•</span>
                <span>Academic & Discipline Operations</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('timetable')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Timetable & Substitutions</span>
            </button>
          </div>
        </div>

        {/* VP Morning Solver Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              Morning Attendance & Substitution Solver
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {absentTeachers.length} Faculty On Leave Today
            </span>
          </div>

          {absentTeachers.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All faculty members are present today. Zero substitution gaps!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {absentTeachers.map(t => (
                <div key={t.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900">{t.name}</span>
                    <span className="text-slate-500 ml-2 font-mono">({t.subject})</span>
                    <div className="text-[11px] text-amber-700 font-medium">Status: {t.status}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAssignSubstitute(t.id, 'David Miller')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] transition shadow-2xs"
                    >
                      Assign Sub: David Miller
                    </button>
                    <button
                      onClick={() => onAssignSubstitute(t.id, 'Sunita Rao')}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold text-[11px] transition shadow-2xs"
                    >
                      Assign Sub: Sunita Rao
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Base Dashboard */}
        <OperationsDashboard
          onNavigate={onNavigate}
          onOpenCommandCenter={onOpenCommandCenter}
          escalations={escalations}
          aiLogs={aiLogs}
          onOpenAddStudent={onOpenAddStudent}
          onOpenDocUpload={onOpenDocUpload}
        />
      </div>
    );
  }

  // Role: User ID Administrator View
  if (currentUser.role === 'User ID Administrator') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xl shrink-0">
              <KeyRound className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Designated ID Administrator
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-mono">
                <span>School User ID: <strong className="text-white">{currentUser.userId}</strong></span>
                <span>•</span>
                <span>User Credentials & Access Manager</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('user-ids')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Open User ID Console</span>
          </button>
        </div>

        {/* Base Dashboard */}
        <OperationsDashboard
          onNavigate={onNavigate}
          onOpenCommandCenter={onOpenCommandCenter}
          escalations={escalations}
          aiLogs={aiLogs}
          onOpenAddStudent={onOpenAddStudent}
          onOpenDocUpload={onOpenDocUpload}
        />
      </div>
    );
  }

  // Role: Teacher / General Staff View
  if (currentUser.role === 'Teacher' || currentUser.role === 'General Staff') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/40 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xl shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Faculty Workspace
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-mono">
                <span>School User ID: <strong className="text-white">{currentUser.userId}</strong></span>
                <span>•</span>
                <span>Mathematics & STEM Dept</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Class Attendance</span>
            </button>
            <button
              onClick={() => onNavigate('tasks')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
            >
              My Tasks
            </button>
          </div>
        </div>

        {/* Teacher Today Schedule Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              My Teaching Schedule Today
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              3 Classes Scheduled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Period 1 (08:30 - 09:15)</span>
                <span className="text-emerald-600">Active Now</span>
              </div>
              <div className="text-slate-600">Grade 10-A • Mathematics</div>
              <div className="text-[11px] text-slate-400">Room 302 • 34 Students</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Period 3 (10:15 - 11:00)</span>
                <span className="text-slate-400">Upcoming</span>
              </div>
              <div className="text-slate-600">Grade 12-C • Advanced Algebra</div>
              <div className="text-[11px] text-slate-400">Room 405 • 28 Students</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Period 6 (01:15 - 02:00)</span>
                <span className="text-slate-400">Upcoming</span>
              </div>
              <div className="text-slate-600">Grade 11-A • Geometry</div>
              <div className="text-[11px] text-slate-400">Room 302 • 31 Students</div>
            </div>
          </div>
        </div>

        {/* Base Operations Dashboard */}
        <OperationsDashboard
          onNavigate={onNavigate}
          onOpenCommandCenter={onOpenCommandCenter}
          escalations={escalations}
          aiLogs={aiLogs}
          onOpenAddStudent={onOpenAddStudent}
          onOpenDocUpload={onOpenDocUpload}
        />
      </div>
    );
  }

  // Default Admin View
  return (
    <OperationsDashboard
      onNavigate={onNavigate}
      onOpenCommandCenter={onOpenCommandCenter}
      escalations={escalations}
      aiLogs={aiLogs}
      onOpenAddStudent={onOpenAddStudent}
      onOpenDocUpload={onOpenDocUpload}
    />
  );
};
