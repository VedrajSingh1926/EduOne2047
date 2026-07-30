import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Clock,
  Phone,
  AlertCircle,
  X
} from 'lucide-react';
import { Teacher } from '../../types';

interface TeacherManagementProps {
  teachers: Teacher[];
  onAssignSubstitute: (absentTeacherId: string, substituteTeacherId: string, classSlot: string) => void;
  onUpdateTeacherStatus: (teacherId: string, newStatus: 'PRESENT' | 'ABSENT' | 'ON_LEAVE') => void;
}

export const TeacherManagement: React.FC<TeacherManagementProps> = ({
  teachers,
  onAssignSubstitute,
  onUpdateTeacherStatus
}) => {
  const [selectedTeacherForSub, setSelectedTeacherForSub] = useState<Teacher | null>(null);
  const [selectedSub, setSelectedSub] = useState<string>('');

  const absentTeachers = teachers.filter((t) => t.status === 'ABSENT' || t.status === 'ON_LEAVE');
  const availableSubstitutes = teachers.filter((t) => t.status === 'PRESENT');

  const handleConfirmSubstitute = () => {
    if (selectedTeacherForSub && selectedSub) {
      onAssignSubstitute(selectedTeacherForSub.id, selectedSub, 'Grade 10-A Period 2 Math');
      setSelectedTeacherForSub(null);
      setSelectedSub('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Teachers</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage faculty records, availability status, and substitute assignments.
          </p>
        </div>

        {absentTeachers.length > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 self-start sm:self-auto">
            <AlertCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{absentTeachers.length} Teacher Absent Today</span>
          </div>
        )}
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{teacher.name}</h3>
                    <div className="text-xs text-slate-500">{teacher.subject}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                    teacher.status === 'PRESENT'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {teacher.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 my-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Classes: {teacher.gradeClasses.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Lectures: {teacher.lecturesPerWeek} / 25</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <select
                value={teacher.status}
                onChange={(e) => onUpdateTeacherStatus(teacher.id, e.target.value as any)}
                className="px-2 py-1 rounded-lg bg-slate-100 text-xs text-slate-700 border border-slate-200 focus:outline-none"
              >
                <option value="PRESENT">PRESENT</option>
                <option value="ABSENT">ABSENT</option>
                <option value="ON_LEAVE">ON LEAVE</option>
              </select>

              {teacher.status !== 'PRESENT' && (
                <button
                  onClick={() => setSelectedTeacherForSub(teacher)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-all flex items-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Substitute</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Substitute Recommendation Modal */}
      {selectedTeacherForSub && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl relative space-y-4">
            <button
              onClick={() => setSelectedTeacherForSub(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Substitute Recommender</h3>
                <p className="text-xs text-slate-400">
                  Finding coverage for {selectedTeacherForSub.name} ({selectedTeacherForSub.subject})
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-semibold text-slate-900">Scheduled Lectures Today:</div>
              <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                <li>Period 2: Grade 10-A ({selectedTeacherForSub.subject})</li>
                <li>Period 4: Grade 11-B ({selectedTeacherForSub.subject})</li>
              </ul>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Available Faculty Matches:
              </label>

              {availableSubstitutes.map((sub) => {
                const isTopMatch = sub.secondarySubjects.includes(selectedTeacherForSub.subject) || sub.subject === selectedTeacherForSub.subject;
                return (
                  <label
                    key={sub.id}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedSub === sub.id
                        ? 'border-emerald-600 bg-emerald-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="substitute"
                        value={sub.id}
                        checked={selectedSub === sub.id}
                        onChange={() => setSelectedSub(sub.id)}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                          <span>{sub.name}</span>
                          {isTopMatch && (
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Top Match
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {sub.subject} • Workload: {sub.lecturesPerWeek}/25
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedTeacherForSub(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubstitute}
                disabled={!selectedSub}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 disabled:opacity-50"
              >
                Assign Substitute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

