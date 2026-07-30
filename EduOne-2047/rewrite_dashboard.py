import fs
import re

file_path = 'c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/components/dashboard/OperationsDashboard.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the imports to include more icons
import_block_target = r"import \{\n  Users,\n  GraduationCap,\n  CheckCircle2,\n  TrendingUp,\n  Receipt,\n  Plus,\n  Upload,\n  Calendar,\n  Sparkles,\n  ArrowUpRight\n\} from 'lucide-react';"
import_block_replacement = """import {
  Users,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Receipt,
  Plus,
  Upload,
  Calendar,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  PhoneCall,
  Clock,
  UserPlus
} from 'lucide-react';"""
content = content.replace(import_block_target, import_block_replacement)

# Replace the Metric Cards Section
metric_cards_target = re.search(r"\{\/\* Metric Cards - Minimal White Cards \*\/\}.*?\{\/\* Personalized Workspace Snapshot \*\/\}", content, re.DOTALL).group(0)

metric_cards_replacement = """{/* Metric Cards - Dynamic by Role */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(!currentUser || ['Super Admin', 'Principal', 'Vice Principal', 'User ID Administrator'].includes(currentUser.role)) && (
          <>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Total Students</span><Users className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">1,240</span><span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">+2.4% <TrendingUp className="w-3 h-3" /></span></div>
              <p className="text-[11px] text-slate-400 mt-1">Grades 8 to 12 enrolled</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Total Teachers</span><GraduationCap className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">84</span><span className="text-xs font-medium text-emerald-600">1 Absent</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Substitute suggested</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Today's Attendance</span><CheckCircle2 className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">94.8%</span><span className="text-xs font-semibold text-emerald-600">+1.2%</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Target 92.0% baseline</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Fee Collection</span><Receipt className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">₹28.5L</span><span className="text-xs font-medium text-slate-500">98% collected</span></div>
              <p className="text-[11px] text-slate-400 mt-1">₹88k pending reconciliation</p>
            </div>
          </>
        )}

        {(currentUser && currentUser.role === 'Class Teacher') && (
          <>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">My Class</span><Users className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">42</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Enrolled students</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Class Attendance</span><CheckCircle2 className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">98.1%</span><span className="text-xs font-medium text-emerald-600">All Present</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Today's record</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Pending Assignments</span><BookOpen className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">3</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Requires review</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Parent Meetings</span><Calendar className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">2</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Scheduled for today</p>
            </div>
          </>
        )}

        {(currentUser && currentUser.role === 'Accountant') && (
          <>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Today's Collection</span><Receipt className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">₹1.2L</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Across 14 transactions</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Pending Dues</span><Clock className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">₹4.5L</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Overdue by 30+ days</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Invoices Issued</span><Receipt className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">120</span></div>
              <p className="text-[11px] text-slate-400 mt-1">This term</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Reconciled Amount</span><CheckCircle2 className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">₹27.1L</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Bank matched</p>
            </div>
          </>
        )}

        {(currentUser && currentUser.role === 'Receptionist') && (
          <>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Today's Visitors</span><Users className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">18</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Checked in</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Enquiries Pending</span><UserPlus className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">5</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Needs follow-up</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Appointments</span><Calendar className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">8</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Scheduled for Principal</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Calls Logged</span><PhoneCall className="w-4 h-4 text-slate-400" /></div>
              <div className="mt-3 flex items-baseline justify-between"><span className="text-2xl font-bold text-slate-900 tracking-tight">45</span></div>
              <p className="text-[11px] text-slate-400 mt-1">Handled today</p>
            </div>
          </>
        )}

        {/* Fallback for other roles (e.g. Students, Parents) */}
        {(currentUser && !['Super Admin', 'Principal', 'Vice Principal', 'User ID Administrator', 'Class Teacher', 'Accountant', 'Receptionist'].includes(currentUser.role)) && (
          <div className="col-span-2 lg:col-span-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-2xs flex items-center justify-center text-emerald-800 text-sm font-medium">
            Welcome to EduOne2047. More specific metrics for {currentUser.role} will be available soon.
          </div>
        )}
      </div>

      {/* Personalized Workspace Snapshot */}"""

content = content.replace(metric_cards_target, metric_cards_replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard rewritten.")
