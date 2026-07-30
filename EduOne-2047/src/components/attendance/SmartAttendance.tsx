import React, { useState } from 'react';
import {
  AlertTriangle,
  Send,
  BellRing,
  ShieldAlert,
  Search
} from 'lucide-react';
import { Student, AttendanceRecord } from '../../types';

interface SmartAttendanceProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onMarkAttendance: (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => void;
  onSendParentAlert: (studentName: string, parentPhone: string, reason: string) => void;
}

export const SmartAttendance: React.FC<SmartAttendanceProps> = ({
  students,
  attendanceRecords,
  onMarkAttendance,
  onSendParentAlert
}) => {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [searchTerm, setSearchTerm] = useState('');
  const [alertSentMap, setAlertSentMap] = useState<Record<string, boolean>>({});

  const filteredStudents = students.filter((s) => {
    const matchesClass = `${s.grade}-${s.section}` === selectedClass || selectedClass === 'ALL';
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleAlert = (student: Student, reason: string) => {
    onSendParentAlert(student.name, student.parentPhone, reason);
    setAlertSentMap((prev) => ({ ...prev, [student.id]: true }));
  };

  const lowAttendanceStudents = students.filter((s) => s.attendancePct < 80);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Attendance</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time biometric & teacher logs, absence pattern tracking and automated parent alerts.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
          Overall Attendance: 94.8%
        </div>
      </div>

      {/* AI Risk Detection Banner */}
      {lowAttendanceStudents.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>{lowAttendanceStudents.length} At-Risk Attendance Patterns Detected</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Students dropping below 80% attendance or absent for consecutive days without approved note.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              lowAttendanceStudents.forEach((s) => handleAlert(s, 'Continuous low attendance alert'));
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-2xs self-start sm:self-auto interaction-btn-primary"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>Notify At-Risk Parents</span>
          </button>
        </div>
      )}

      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 interaction-card">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-100/70 rounded-lg border border-slate-200 font-medium text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Classes</option>
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 10-B">Grade 10-B</option>
            <option value="Grade 11-A">Grade 11-A</option>
            <option value="Grade 11-B">Grade 11-B</option>
            <option value="Grade 12-C">Grade 12-C</option>
          </select>
        </div>

        <div className="relative flex-1 max-w-sm w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student..."
            className="w-full pl-8 pr-4 py-1.5 text-xs bg-slate-100/70 rounded-lg border border-slate-200 text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden interaction-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-3.5 pl-4">Student</th>
                <th className="p-3.5">Class</th>
                <th className="p-3.5">30-Day Rate</th>
                <th className="p-3.5">Pattern Insight</th>
                <th className="p-3.5">Mark Today</th>
                <th className="p-3.5 text-right pr-4">Parent Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((s) => {
                const isAlertSent = alertSentMap[s.id];
                const hasRisk = s.attendancePct < 80 || s.riskFlag;

                return (
                  <tr
                    key={s.id}
                    className="interaction-row"
                  >
                    <td className="p-3.5 pl-4">
                      <div className="font-semibold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400">Roll: {s.rollNo}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-medium text-slate-800">{s.grade}-{s.section}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{s.attendancePct}%</span>
                        {hasRisk && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                      </div>
                    </td>

                    <td className="p-3.5">
                      {hasRisk ? (
                        <div className="text-[11px] font-medium text-amber-600">
                          {s.riskFlag || 'Absence trend detected'}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500">
                          Consistent attendance
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onMarkAttendance(s.id, 'PRESENT')}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium interaction-btn-secondary border border-transparent"
                        >
                          Present
                        </button>
                        <button
                          onClick={() => onMarkAttendance(s.id, 'ABSENT')}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium interaction-btn-secondary border border-transparent"
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => onMarkAttendance(s.id, 'LATE')}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium interaction-btn-secondary border border-transparent"
                        >
                          Late
                        </button>
                      </div>
                    </td>

                    <td className="p-3.5 text-right pr-4">
                      <button
                        onClick={() => handleAlert(s, s.riskFlag || 'Absence alert')}
                        disabled={isAlertSent}
                        className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 ml-auto ${
                          isAlertSent
                            ? 'bg-slate-100 text-slate-400'
                            : 'bg-emerald-600 text-white shadow-2xs interaction-btn-primary'
                        }`}
                      >
                        <Send className="w-3 h-3" />
                        <span>{isAlertSent ? 'Notified ✓' : 'Notify Parent'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

