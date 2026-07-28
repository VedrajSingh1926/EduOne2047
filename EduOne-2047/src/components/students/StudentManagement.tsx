import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  FileSearch,
  AlertTriangle,
  Phone,
  ShieldAlert,
  X
} from 'lucide-react';
import { Student } from '../../types';

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  onOpenDocOCR: (studentName: string) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  onAddStudent,
  onOpenDocOCR
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    grade: 'Grade 10',
    section: 'A',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    totalFees: 45000,
    paidFees: 45000
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = selectedGrade === 'ALL' || s.grade === selectedGrade;
    const matchesFee = selectedFeeStatus === 'ALL' || s.feeStatus === selectedFeeStatus;

    return matchesSearch && matchesGrade && matchesFee;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) return;

    const newStudent: Student = {
      id: `STU-${1000 + students.length + 1}`,
      name: formData.name,
      rollNo: formData.rollNo,
      grade: formData.grade,
      section: formData.section,
      parentName: formData.parentName || 'Parent Name',
      parentPhone: formData.parentPhone || '+91 99000 00000',
      parentEmail: formData.parentEmail || 'parent@example.com',
      attendancePct: 95.0,
      feeStatus: formData.paidFees >= formData.totalFees ? 'PAID' : 'PARTIAL',
      totalFees: Number(formData.totalFees),
      paidFees: Number(formData.paidFees),
      pendingFees: Math.max(0, Number(formData.totalFees) - Number(formData.paidFees)),
      documentsStatus: 'VERIFIED'
    };

    onAddStudent(newStudent);
    setShowAddModal(false);
    setFormData({
      name: '',
      rollNo: '',
      grade: 'Grade 10',
      section: 'A',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      totalFees: 45000,
      paidFees: 45000
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Students</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage student records, attendance and academic information.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all flex items-center gap-1.5 rounded-xl shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, roll number, or parent..."
            className="w-full pl-8 pr-4 py-1.5 text-xs bg-slate-100/70 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-100/70 rounded-lg border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          <select
            value={selectedFeeStatus}
            onChange={(e) => setSelectedFeeStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-100/70 rounded-lg border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Fee Status</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="PARTIAL">PARTIAL</option>
            <option value="OVERDUE">OVERDUE</option>
          </select>
        </div>
      </div>

      {/* Clean Table */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-3.5 pl-4">Student</th>
                <th className="p-3.5">Grade & Roll</th>
                <th className="p-3.5">Parent Contact</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">Fee Status</th>
                <th className="p-3.5">Documents</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="p-3.5 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {s.riskFlag && (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" title={s.riskFlag} />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{s.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-medium text-slate-800">{s.grade} - {s.section}</span>
                    <div className="text-[10px] text-slate-400">Roll: {s.rollNo}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{s.parentName}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{s.parentPhone}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            s.attendancePct >= 90 ? 'bg-emerald-500' : s.attendancePct >= 80 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${s.attendancePct}%` }}
                        />
                      </div>
                      <span className="font-medium text-slate-700">{s.attendancePct}%</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        s.feeStatus === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.feeStatus === 'PENDING'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : s.feeStatus === 'PARTIAL'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {s.feeStatus}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                        s.documentsStatus === 'VERIFIED'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {s.documentsStatus}
                    </span>
                  </td>

                  <td className="p-3.5 text-right pr-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenDocOCR(s.name)}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Run Admission OCR"
                      >
                        <FileSearch className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl relative space-y-4">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-400">{selectedStudent.id} • {selectedStudent.grade} ({selectedStudent.section})</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 space-y-1">
                <span className="font-semibold text-slate-700">Parent Contact</span>
                <div>{selectedStudent.parentName} ({selectedStudent.parentPhone})</div>
                <div className="text-slate-400">{selectedStudent.parentEmail}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-slate-400">Total Fees</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">₹{selectedStudent.totalFees.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-slate-400">Pending Balance</span>
                  <div className="font-bold text-amber-600 text-sm mt-0.5">₹{selectedStudent.pendingFees.toLocaleString()}</div>
                </div>
              </div>

              {selectedStudent.riskFlag && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Risk Alert:</span>
                    <p className="mt-0.5">{selectedStudent.riskFlag}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  onOpenDocOCR(selectedStudent.name);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-all"
              >
                Scan Admission Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl relative space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Add Student</h3>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                  placeholder="Full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                    placeholder="10-A-09"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Parent Name</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                  placeholder="Parent / Guardian"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Parent Phone</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                    placeholder="+91 98765 00000"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Parent Email</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

