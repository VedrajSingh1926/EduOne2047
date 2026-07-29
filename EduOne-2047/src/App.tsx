import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './components/landing/LandingPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { StaffHelpModal } from './components/layout/StaffHelpModal';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';
import { DashboardRouter } from './components/dashboard/RoleDashboards';
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
import { useFirebaseState } from './hooks/useFirebaseState';
import { ref, set, update, push, get } from 'firebase/database';
import { db } from './lib/firebase';
import toast from 'react-hot-toast';

import { Student, Teacher, FeeRecord, DocumentItem, TimetableSlot, EscalationItem, AIActionLog, SupplyItem, CollaborativeTask, AttendanceRecord, CurrentUser, Role } from './types';
import { canAccess, getDefaultDashboard, hasPermission } from './hooks/usePermissions';
import { APP_ROUTES } from './config/routes';
import { PERMISSIONS } from './config/rbac';
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

  // Fallback for direct role URL testing
  const activeUser = currentUser || { id: 'TEST-000', name: 'Test User', role: currentRole };

  useEffect(() => {
    // Route Protection
    if (isAuthenticated && activeUser) {
      const currentRoute = APP_ROUTES.find(r => r.id === activeModule);
      if (!currentRoute || !canAccess(activeUser, currentRoute.permission)) {
        console.warn(`Unauthorized access attempt to ${activeModule}. Redirecting to default dashboard.`);
        setActiveModule(getDefaultDashboard(activeUser.role));
      }
    }
  }, [activeModule, isAuthenticated, activeUser]);
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
  const students = useFirebaseState<Student>('students', INITIAL_STUDENTS);
  const teachers = useFirebaseState<Teacher>('teachers', INITIAL_TEACHERS);
  const fees = useFirebaseState<FeeRecord>('fees', INITIAL_FEES);
  const documents = useFirebaseState<DocumentItem>('documents', INITIAL_DOCUMENTS);
  const timetable = useFirebaseState<TimetableSlot>('timetable', INITIAL_TIMETABLE);
  const escalations = useFirebaseState<EscalationItem>('escalations', INITIAL_ESCALATIONS);
  const aiLogs = useFirebaseState<AIActionLog>('ai_logs', INITIAL_AI_LOGS);
  const supplyItems = useFirebaseState<SupplyItem>('supplies', INITIAL_SUPPLY_ITEMS);
  const tasks = useFirebaseState<CollaborativeTask>('tasks', INITIAL_TASKS);
  const attendanceRecords = useFirebaseState<AttendanceRecord>('attendance', INITIAL_ATTENDANCE_RECORDS);

  const unresolvedEscalationsCount = escalations.filter((e) => e.status === 'UNRESOLVED').length;

  const handleOpenCommandCenter = (prompt?: string) => {
    if (prompt) {
      setInitialCommandPrompt(prompt);
    }
    setActiveModule('command-center');
  };

  // State Updates
  const handleAddStudent = async (newStudent: Student) => {
    try {
      await set(ref(db, `students/${newStudent.id}`), newStudent);
      toast.success('Student added successfully!');
    } catch (e) {
      toast.error('Failed to add student.');
    }
  };

  const handleAssignSubstitute = async (teacherOrSlotId: string, substituteTeacherName: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.TIMETABLE_MANAGE)) {
      toast.error("UNAUTHORIZED: You do not have permission to manage timetables.");
      return;
    }
    try {
      const slot = timetable.find(s => s.id === teacherOrSlotId || s.teacherId === teacherOrSlotId);
      if (slot) {
        await update(ref(db, `timetable/${slot.id}`), {
          teacherName: substituteTeacherName,
          isSubstitute: true,
          originalTeacherName: `${slot.teacherName} (On Leave)`
        });
        
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
        await set(ref(db, `ai_logs/${newLog.id}`), newLog);
        toast.success('Substitute assigned successfully.');
      } else {
        toast.error('Timetable slot not found.');
      }
    } catch(e) {
      toast.error('Failed to assign substitute.');
    }
  };

  const handleUpdateTeacherStatus = async (teacherId: string, newStatus: 'PRESENT' | 'ABSENT' | 'ON_LEAVE') => {
    if (!hasPermission(activeUser, PERMISSIONS.TEACHERS_MANAGE)) {
      toast.error("UNAUTHORIZED: You do not have permission to manage teachers.");
      return;
    }
    try {
      await update(ref(db, `teachers/${teacherId}`), { status: newStatus });
      toast.success('Teacher status updated.');
    } catch(e) {
      toast.error('Failed to update status.');
    }
  };

  const handleMarkAttendance = async (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
    if (!hasPermission(activeUser, PERMISSIONS.ATTENDANCE_MARK_HOMEROOM)) {
      toast.error("UNAUTHORIZED: You do not have permission to mark attendance.");
      return;
    }
    try {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const newPct = status === 'ABSENT' ? Math.max(50, student.attendancePct - 1.5) : Math.min(100, student.attendancePct + 0.5);
        await update(ref(db, `students/${studentId}`), { attendancePct: Number(newPct.toFixed(1)) });
        toast.success(`Attendance marked ${status}.`);
      }
    } catch(e) {
      toast.error('Failed to mark attendance.');
    }
  };


  const handleSendParentAlert = async (studentName: string, parentPhone: string, reason: string) => {
    try {
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
      await set(ref(db, `ai_logs/${newLog.id}`), newLog);
      toast.success('Parent alert sent.');
    } catch(e) {
      toast.error('Failed to send parent alert.');
    }
  };

  const handleUploadReceipt = async (fileName: string, studentName: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_UPLOAD_FEE)) {
      toast.error("UNAUTHORIZED: You do not have permission to upload fee receipts.");
      return;
    }
    try {
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
      await set(ref(db, `documents/${newDoc.id}`), newDoc);
      toast.success('Fee receipt uploaded.');
    } catch(e) {
      toast.error('Failed to upload receipt.');
    }
  };

  const handleResolveMismatch = async (feeId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.FEES_RECONCILE)) {
      toast.error("UNAUTHORIZED: You do not have permission to reconcile fees.");
      return;
    }
    try {
      await update(ref(db, `fees/${feeId}`), { status: 'PAID', confidenceScore: 99 });
      // Resolve the static escalation ESC-001
      await update(ref(db, `escalations/ESC-001`), { status: 'RESOLVED' });
      toast.success('Fee mismatch resolved.');
    } catch(e) {
      toast.error('Failed to resolve mismatch.');
    }
  };

  const handleSendFeeReminder = async (studentName: string) => {
    try {
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
      await set(ref(db, `ai_logs/${newLog.id}`), newLog);
      toast.success('Fee reminder sent.');
    } catch(e) {
      toast.error('Failed to send fee reminder.');
    }
  };

  const handleUploadDocument = async (file: File) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_UPLOAD_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to upload general documents.");
      return;
    }
    try {
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
      await set(ref(db, `documents/${newDoc.id}`), newDoc);
      toast.success('Document uploaded successfully.');
    } catch(e) {
      toast.error('Failed to upload document.');
    }
  };

  const handleApproveDocument = async (docId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_MANAGE_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to approve documents.");
      return;
    }
    try {
      await update(ref(db, `documents/${docId}`), { status: 'APPROVED' });
      toast.success('Document approved.');
    } catch(e) {
      toast.error('Failed to approve document.');
    }
  };

  const handleRejectDocument = async (docId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_MANAGE_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to reject documents.");
      return;
    }
    try {
      await update(ref(db, `documents/${docId}`), { status: 'REJECTED' });
      toast.success('Document rejected.');
    } catch(e) {
      toast.error('Failed to reject document.');
    }
  };

  const handleGenerateTimetable = async () => {
    try {
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
      await set(ref(db, `ai_logs/${newLog.id}`), newLog);
      toast.success('Timetable regenerated.');
    } catch(e) {
      toast.error('Failed to regenerate timetable.');
    }
  };

  const handleResolveEscalation = async (id: string) => {
    try {
      await update(ref(db, `escalations/${id}`), { status: 'RESOLVED' });
      toast.success('Escalation resolved.');
    } catch(e) {
      toast.error('Failed to resolve escalation.');
    }
  };

  const handleAddTask = async (newTask: CollaborativeTask) => {
    try {
      await set(ref(db, `tasks/${newTask.id}`), newTask);
      toast.success('Task added.');
    } catch(e) {
      toast.error('Failed to add task.');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: CollaborativeTask['status']) => {
    try {
      await update(ref(db, `tasks/${taskId}`), { status });
      // omit toast for silent checkbox updates to reduce noise, or keep it subtle
    } catch(e) {
      toast.error('Failed to update task.');
    }
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
      setActiveModule(getDefaultDashboard(user.role));
    }} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white ${
      textSize === 'large' ? 'text-scale-large' : textSize === 'xlarge' ? 'text-scale-xlarge' : ''
    } ${easyMode ? 'easy-mode' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        currentUser={activeUser}
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }}
        onRoleChange={setCurrentRole}
        unresolvedEscalationsCount={unresolvedEscalationsCount}
        onNavigateToModule={setActiveModule}
        onOpenCommandCenter={handleOpenCommandCenter}
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
          currentUser={activeUser}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeModule === 'admin-panel' && canAccess(activeUser, PERMISSIONS.USERS_MANAGE_ALL) && (
            <SuperAdminDashboard />
          )}

          {activeModule === 'dashboard' && (
            <DashboardRouter
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
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          className: 'text-sm font-bold',
          duration: 3000,
        }} 
      />
      <Routes>
        <Route path="/" element={<LandingPage onOpenLogin={() => navigate('/app')} />} />
        <Route path="/app" element={<CoreApplication />} />
        <Route path="/init-db" element={<InitDBRoute />} />
      </Routes>
    </>
  );
}
