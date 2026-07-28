import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { StaffHelpModal } from './components/layout/StaffHelpModal';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';
import { OperationsDashboard } from './components/dashboard/OperationsDashboard';
import { AICommandCenter } from './components/commandCenter/AICommandCenter';
import { StudentManagement } from './components/students/StudentManagement';
import { TeacherManagement } from './components/teachers/TeacherManagement';
import { SmartAttendance } from './components/attendance/SmartAttendance';
import { SmartFeeManagement } from './components/fees/SmartFeeManagement';
import { AIDocumentCenter } from './components/documents/AIDocumentCenter';
import { AITimetable } from './components/timetable/AITimetable';
import { NeedsAttention } from './components/escalations/NeedsAttention';
import { ReportsAnalytics } from './components/analytics/ReportsAnalytics';
import { CollaborativeTaskManager } from './components/tasks/CollaborativeTaskManager';
import { GmailCommsCenter } from './components/gmail/GmailCommsCenter';
import { LoginForm } from './components/auth/LoginForm';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_FEES,
  INITIAL_DOCUMENTS,
  INITIAL_TIMETABLE,
  INITIAL_ESCALATIONS,
  INITIAL_AI_LOGS,
  INITIAL_SUPPLY_ITEMS,
  INITIAL_TASKS,
  INITIAL_ATTENDANCE_RECORDS
} from './data/mockDatabase';

import { Role, CurrentUser, Student, Teacher, FeeRecord, DocumentItem, TimetableSlot, EscalationItem, AIActionLog, SupplyItem, CollaborativeTask, AttendanceRecord } from './types';
import { initializeDatabase } from './lib/db-init';

function InitDBRoute() {
  const [status, setStatus] = useState('Initializing...');
  useEffect(() => {
    initializeDatabase().then((success) => {
      setStatus(success ? 'Database populated successfully!' : 'Failed to populate database.');
    });
  }, []);
  return <div className="p-10 text-xl font-bold text-white bg-slate-900 min-h-screen">{status}</div>;
}

function CoreApplication() {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  
  // Authentication State
  const initialRole = (new URLSearchParams(window.location.search).get('role') as Role) || 'Admin';
  // If there's a role parameter, assume they bypassed login (e.g. from local testing). 
  // Otherwise, default to unauthenticated.
  const hasRoleParam = !!new URLSearchParams(window.location.search).get('role');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasRoleParam);
  
  const [currentRole, setCurrentRole] = useState<Role>(initialRole);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [initialCommandPrompt, setInitialCommandPrompt] = useState<string | undefined>(undefined);

  // Staff Accessibility States
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [easyMode, setEasyMode] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input, textarea or contenteditable element
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInputActive = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable;

      // Close modals on Escape
      if (e.key === 'Escape') {
        setIsHelpModalOpen(false);
        setIsShortcutsModalOpen(false);
        return;
      }

      // Toggle shortcuts modal on Ctrl + / or Cmd + /
      if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.key === '?')) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      // Allow shortcut navigation when holding Ctrl/Cmd + Shift
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const key = e.key.toLowerCase();
        if (key === 'd') {
          e.preventDefault();
          setActiveModule('dashboard');
        } else if (key === 'a') {
          e.preventDefault();
          setActiveModule('attendance');
        } else if (key === 's') {
          e.preventDefault();
          setActiveModule('students');
        } else if (key === 't') {
          e.preventDefault();
          setActiveModule('teachers');
        } else if (key === 'f') {
          e.preventDefault();
          setActiveModule('fees');
        } else if (key === 'm') {
          e.preventDefault();
          setActiveModule('timetable');
        } else if (key === 'g') {
          e.preventDefault();
          setActiveModule('gmail-inbox');
        } else if (key === 'c') {
          e.preventDefault();
          setActiveModule('command-center');
        } else if (key === 'h') {
          e.preventDefault();
          setIsHelpModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // App State Store
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [fees, setFees] = useState<FeeRecord[]>(INITIAL_FEES);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [timetable, setTimetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [escalations, setEscalations] = useState<EscalationItem[]>(INITIAL_ESCALATIONS);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>(INITIAL_AI_LOGS);
  const [supplyItems, setSupplyItems] = useState<SupplyItem[]>(INITIAL_SUPPLY_ITEMS);
  const [tasks, setTasks] = useState<CollaborativeTask[]>(INITIAL_TASKS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);

  const unresolvedEscalationsCount = escalations.filter((e) => e.status === 'UNRESOLVED').length;

  const handleOpenCommandCenter = (prompt?: string) => {
    if (prompt) {
      setInitialCommandPrompt(prompt);
    }
    setActiveModule('command-center');
  };

  // State Updates
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleAssignSubstitute = (teacherOrSlotId: string, substituteTeacherName: string) => {
    setTimetable((prev) =>
      prev.map((slot) => {
        if (slot.id === teacherOrSlotId || slot.teacherId === teacherOrSlotId) {
          return {
            ...slot,
            teacherName: substituteTeacherName,
            isSubstitute: true,
            originalTeacherName: `${slot.teacherName} (On Leave)`
          };
        }
        return slot;
      })
    );

    // Add log
    const newLog: AIActionLog = {
      id: `LOG-${Date.now()}`,
      agentName: 'Timetable Agent',
      actionTitle: 'Substitute Assigned',
      details: `Assigned ${substituteTeacherName} for class coverage.`,
      confidenceScore: 98,
      reason: 'Matched subject qualification & free slot schedule.',
      source: 'Teacher Schedule Graph',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS'
    };
    setAiLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateTeacherStatus = (teacherId: string, newStatus: 'PRESENT' | 'ABSENT' | 'ON_LEAVE') => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, status: newStatus } : t))
    );
  };

  const handleMarkAttendance = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPct = status === 'ABSENT' ? Math.max(50, s.attendancePct - 1.5) : Math.min(100, s.attendancePct + 0.5);
          return { ...s, attendancePct: Number(newPct.toFixed(1)) };
        }
        return s;
      })
    );
  };

  const handleSendParentAlert = (studentName: string, parentPhone: string, reason: string) => {
    const newLog: AIActionLog = {
      id: `LOG-${Date.now()}`,
      agentName: 'Attendance Agent',
      actionTitle: 'Parent Notified',
      details: `Dispatched SMS/WhatsApp alert to ${parentPhone} for ${studentName} (${reason}).`,
      confidenceScore: 99,
      reason: 'Attendance dropped below threshold or consecutive absences detected.',
      source: 'Smart Attendance Matrix',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS'
    };
    setAiLogs((prev) => [newLog, ...prev]);
  };

  const handleUploadReceipt = (fileName: string, studentName: string) => {
    const newDoc: DocumentItem = {
      id: `DOC-${Date.now()}`,
      fileName,
      type: 'FEE_RECEIPT',
      uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      studentOrTeacherName: studentName,
      extractedFields: {
        studentName,
        utrCode: 'UPI/20260727/110099',
        amountPaid: '₹15,000',
        bankName: 'ICICI Bank'
      },
      confidenceScore: 96,
      status: 'APPROVED',
      fileSize: '620 KB'
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleResolveMismatch = (feeId: string) => {
    setFees((prev) =>
      prev.map((f) => (f.id === feeId ? { ...f, status: 'PAID', confidenceScore: 99 } : f))
    );
    setEscalations((prev) =>
      prev.map((e) => (e.id === 'ESC-001' ? { ...e, status: 'RESOLVED' } : e))
    );
  };

  const handleSendFeeReminder = (studentName: string) => {
    const newLog: AIActionLog = {
      id: `LOG-${Date.now()}`,
      agentName: 'Finance Agent',
      actionTitle: 'Fee Reminder Sent',
      details: `Sent payment reminder notice to parent of ${studentName}.`,
      confidenceScore: 99,
      reason: 'Pending ledger balance detected.',
      source: 'Student Fee Ledger',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS'
    };
    setAiLogs((prev) => [newLog, ...prev]);
  };

  const handleUploadDocument = (file: File) => {
    const newDoc: DocumentItem = {
      id: `DOC-${Date.now()}`,
      fileName: file.name,
      type: 'ADMISSION_FORM',
      uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      studentOrTeacherName: file.name.split('.')[0],
      extractedFields: {
        candidateName: file.name.split('.')[0].replace(/_/g, ' '),
        dateOfBirth: '2011-08-15',
        parentName: 'Guardian Name',
        status: 'Extracted via Gemini 2.5 Flash OCR'
      },
      confidenceScore: 95,
      status: 'APPROVED',
      fileSize: `${(file.size / 1024).toFixed(0)} KB`
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleApproveDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'APPROVED' } : d))
    );
  };

  const handleRejectDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'REJECTED' } : d))
    );
  };

  const handleGenerateTimetable = () => {
    const newLog: AIActionLog = {
      id: `LOG-${Date.now()}`,
      agentName: 'Timetable Agent',
      actionTitle: 'Timetable Regenerated',
      details: 'Conflict-free weekly schedule generated across 18 classrooms.',
      confidenceScore: 99,
      reason: 'Zero room collisions & faculty workload cap respected.',
      source: 'Schedule Optimizer',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS'
    };
    setAiLogs((prev) => [newLog, ...prev]);
  };

  const handleResolveEscalation = (id: string) => {
    setEscalations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'RESOLVED' } : e))
    );
  };

  const handleAddTask = (newTask: CollaborativeTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, status: CollaborativeTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const handleExecuteSystemAction = (actionType: string, actionData?: any) => {
    if (actionType === 'TIMETABLE_GENERATE') {
      handleGenerateTimetable();
    } else if (actionType === 'ABSENT_TEACHERS') {
      handleAssignSubstitute('TCH-202', 'Dr. Alok Nath');
    } else if (actionType === 'FEE_REMINDER') {
      handleSendFeeReminder('Rohan Gupta');
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={(user) => {
      setIsAuthenticated(true);
      setCurrentRole(user.role);
      setCurrentUser(user);
    }} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white ${
      textSize === 'large' ? 'text-scale-large' : textSize === 'xlarge' ? 'text-scale-xlarge' : ''
    } ${easyMode ? 'easy-mode' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        unresolvedEscalationsCount={unresolvedEscalationsCount}
        onNavigateToModule={setActiveModule}
        onOpenCommandCenter={handleOpenCommandCenter}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        easyMode={easyMode}
        onToggleEasyMode={() => setEasyMode(!easyMode)}
        onOpenHelpGuide={() => setIsHelpModalOpen(true)}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          unresolvedEscalationsCount={unresolvedEscalationsCount}
          onOpenHelpGuide={() => setIsHelpModalOpen(true)}
          currentRole={currentRole}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeModule === 'admin-panel' && currentRole === 'Admin' && (
            <SuperAdminDashboard />
          )}

          {activeModule === 'dashboard' && (
            <OperationsDashboard
              currentUser={currentUser}
              onNavigate={setActiveModule}
              onOpenCommandCenter={handleOpenCommandCenter}
              escalations={escalations}
              aiLogs={aiLogs}
              onOpenAddStudent={() => setActiveModule('students')}
              onOpenDocUpload={() => setActiveModule('documents')}
            />
          )}

          {activeModule === 'gmail-inbox' && (
            <GmailCommsCenter
              onAddTaskToGoogle={(title, notes) => {
                handleAddTask({
                  id: `TSK-${Date.now()}`,
                  title,
                  assignedRole: currentRole,
                  assignedTo: `${currentRole} Team`,
                  priority: 'HIGH',
                  dueDate: new Date().toISOString().split('T')[0],
                  status: 'IN_PROGRESS',
                  module: 'Gmail Comms',
                  aiSuggested: true
                });
              }}
              onOpenCommandCenter={handleOpenCommandCenter}
            />
          )}

          {activeModule === 'command-center' && (
            <AICommandCenter
              currentRole={currentRole}
              initialPrompt={initialCommandPrompt}
              aiLogs={aiLogs}
              onExecuteSystemAction={handleExecuteSystemAction}
            />
          )}

          {activeModule === 'students' && (
            <StudentManagement
              students={students}
              onAddStudent={handleAddStudent}
              onOpenDocOCR={(name) => {
                setActiveModule('documents');
              }}
            />
          )}

          {activeModule === 'teachers' && (
            <TeacherManagement
              teachers={teachers}
              onAssignSubstitute={handleAssignSubstitute}
              onUpdateTeacherStatus={handleUpdateTeacherStatus}
            />
          )}

          {activeModule === 'attendance' && (
            <SmartAttendance
              students={students}
              attendanceRecords={attendanceRecords}
              onMarkAttendance={handleMarkAttendance}
              onSendParentAlert={handleSendParentAlert}
            />
          )}

          {activeModule === 'fees' && (
            <SmartFeeManagement
              feeRecords={fees}
              students={students}
              onUploadReceipt={handleUploadReceipt}
              onResolveMismatch={handleResolveMismatch}
              onSendReminder={handleSendFeeReminder}
            />
          )}

          {activeModule === 'documents' && (
            <AIDocumentCenter
              documents={documents}
              onUploadDocument={handleUploadDocument}
              onApproveDocument={handleApproveDocument}
              onRejectDocument={handleRejectDocument}
            />
          )}

          {activeModule === 'timetable' && (
            <AITimetable
              timetable={timetable}
              teachers={teachers}
              onGenerateTimetable={handleGenerateTimetable}
              onAssignSubstitute={handleAssignSubstitute}
            />
          )}

          {activeModule === 'needs-attention' && (
            <NeedsAttention
              escalations={escalations}
              onResolveEscalation={handleResolveEscalation}
              onOpenCommandCenter={handleOpenCommandCenter}
            />
          )}

          {activeModule === 'reports' && (
            <ReportsAnalytics supplyItems={supplyItems} />
          )}

          {activeModule === 'tasks' && (
            <CollaborativeTaskManager
              tasks={tasks}
              currentRole={currentRole}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}
        </main>
      </div>

      {/* Interactive Staff Help & How To Guide Modal */}
      <StaffHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onNavigateToModule={setActiveModule}
        onOpenCommandCenter={handleOpenCommandCenter}
      />

      {/* Keyboard Shortcuts Navigation Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
        onNavigate={setActiveModule}
        onOpenHelp={() => {
          setIsShortcutsModalOpen(false);
          setIsHelpModalOpen(true);
        }}
        onOpenCommandCenter={() => {
          setIsShortcutsModalOpen(false);
          handleOpenCommandCenter();
        }}
      />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LandingPage onOpenLogin={() => navigate('/app')} />} />
      <Route path="/app" element={<CoreApplication />} />
      <Route path="/init-db" element={<InitDBRoute />} />
    </Routes>
  );
}
