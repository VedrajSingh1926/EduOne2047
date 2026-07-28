import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc,
  query,
  limit 
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { UserAccount, IDAuditLog, Student, Teacher, FeeRecord, DocumentItem, TimetableSlot, EscalationItem, AIActionLog, CollaborativeTask, AttendanceRecord } from '../types';

// Initialize Firebase App safely
const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID if present in config
export const db = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || undefined);

// LocalStorage Keys for Offline / Instant Fallback
const STORAGE_KEYS = {
  USERS: 'eduone_users_v1',
  IDAUDITLOGS: 'eduone_id_audit_logs_v1',
  STUDENTS: 'eduone_students_v1',
  TEACHERS: 'eduone_teachers_v1',
  FEES: 'eduone_fees_v1',
  ATTENDANCE: 'eduone_attendance_v1',
  TIMETABLE: 'eduone_timetable_v1',
  ESCALATIONS: 'eduone_escalations_v1',
  TASKS: 'eduone_tasks_v1',
  DOCUMENTS: 'eduone_documents_v1',
  AILOGS: 'eduone_ailogs_v1'
};

// Generic helper to get collection data with local fallback
async function fetchCollection<T>(collectionName: string, localKey: string, initialFallback: T[]): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const data = snapshot.docs.map(doc => doc.data() as T);
      localStorage.setItem(localKey, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn(`Firestore read for ${collectionName} failed or empty, falling back to local storage:`, err);
  }

  // Fallback to localStorage or initial preset
  const saved = localStorage.getItem(localKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Ignore parse error
    }
  }
  return initialFallback;
}

// Generic helper to save document to collection
async function saveDocument(collectionName: string, docId: string, data: any) {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.warn(`Firestore write for ${collectionName}/${docId} failed:`, err);
  }
}

// USER ACCOUNTS (User IDs & Passwords)
export async function getUsersFromFirestore(fallback: UserAccount[]): Promise<UserAccount[]> {
  return fetchCollection<UserAccount>('users', STORAGE_KEYS.USERS, fallback);
}

export async function saveUserToFirestore(user: UserAccount) {
  const savedUsersStr = localStorage.getItem(STORAGE_KEYS.USERS);
  let users: UserAccount[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];
  const idx = users.findIndex(u => u.id === user.id || u.userId === user.userId);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.unshift(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  await saveDocument('users', user.id, user);
}

// ID AUDIT LOGS
export async function getIdAuditLogsFromFirestore(fallback: IDAuditLog[]): Promise<IDAuditLog[]> {
  return fetchCollection<IDAuditLog>('idAuditLogs', STORAGE_KEYS.IDAUDITLOGS, fallback);
}

export async function saveIdAuditLogToFirestore(log: IDAuditLog) {
  const savedLogsStr = localStorage.getItem(STORAGE_KEYS.IDAUDITLOGS);
  let logs: IDAuditLog[] = savedLogsStr ? JSON.parse(savedLogsStr) : [];
  logs.unshift(log);
  localStorage.setItem(STORAGE_KEYS.IDAUDITLOGS, JSON.stringify(logs));
  await saveDocument('idAuditLogs', log.id, log);
}

// STUDENTS
export async function getStudentsFromFirestore(fallback: Student[]): Promise<Student[]> {
  return fetchCollection<Student>('students', STORAGE_KEYS.STUDENTS, fallback);
}

export async function saveStudentToFirestore(student: Student) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  let list: Student[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(s => s.id === student.id);
  if (idx >= 0) list[idx] = student;
  else list.unshift(student);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(list));
  await saveDocument('students', student.id, student);
}

// TEACHERS
export async function getTeachersFromFirestore(fallback: Teacher[]): Promise<Teacher[]> {
  return fetchCollection<Teacher>('teachers', STORAGE_KEYS.TEACHERS, fallback);
}

export async function saveTeacherToFirestore(teacher: Teacher) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.TEACHERS);
  let list: Teacher[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(t => t.id === teacher.id);
  if (idx >= 0) list[idx] = teacher;
  else list.unshift(teacher);
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(list));
  await saveDocument('teachers', teacher.id, teacher);
}

// FEES
export async function getFeesFromFirestore(fallback: FeeRecord[]): Promise<FeeRecord[]> {
  return fetchCollection<FeeRecord>('fees', STORAGE_KEYS.FEES, fallback);
}

export async function saveFeeToFirestore(fee: FeeRecord) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.FEES);
  let list: FeeRecord[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(f => f.id === fee.id);
  if (idx >= 0) list[idx] = fee;
  else list.unshift(fee);
  localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(list));
  await saveDocument('fees', fee.id, fee);
}

// ESCALATIONS
export async function getEscalationsFromFirestore(fallback: EscalationItem[]): Promise<EscalationItem[]> {
  return fetchCollection<EscalationItem>('escalations', STORAGE_KEYS.ESCALATIONS, fallback);
}

export async function saveEscalationToFirestore(escalation: EscalationItem) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.ESCALATIONS);
  let list: EscalationItem[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(e => e.id === escalation.id);
  if (idx >= 0) list[idx] = escalation;
  else list.unshift(escalation);
  localStorage.setItem(STORAGE_KEYS.ESCALATIONS, JSON.stringify(list));
  await saveDocument('escalations', escalation.id, escalation);
}

// TASKS
export async function getTasksFromFirestore(fallback: CollaborativeTask[]): Promise<CollaborativeTask[]> {
  return fetchCollection<CollaborativeTask>('tasks', STORAGE_KEYS.TASKS, fallback);
}

export async function saveTaskToFirestore(task: CollaborativeTask) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.TASKS);
  let list: CollaborativeTask[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(t => t.id === task.id);
  if (idx >= 0) list[idx] = task;
  else list.unshift(task);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(list));
  await saveDocument('tasks', task.id, task);
}

// ATTENDANCE
export async function getAttendanceFromFirestore(fallback: AttendanceRecord[]): Promise<AttendanceRecord[]> {
  return fetchCollection<AttendanceRecord>('attendance', STORAGE_KEYS.ATTENDANCE, fallback);
}

export async function saveAttendanceToFirestore(record: AttendanceRecord) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  let list: AttendanceRecord[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(r => r.id === record.id);
  if (idx >= 0) list[idx] = record;
  else list.unshift(record);
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(list));
  await saveDocument('attendance', record.id, record);
}

// TIMETABLE
export async function getTimetableFromFirestore(fallback: TimetableSlot[]): Promise<TimetableSlot[]> {
  return fetchCollection<TimetableSlot>('timetable', STORAGE_KEYS.TIMETABLE, fallback);
}

export async function saveTimetableSlotToFirestore(slot: TimetableSlot) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
  let list: TimetableSlot[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(s => s.id === slot.id);
  if (idx >= 0) list[idx] = slot;
  else list.unshift(slot);
  localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(list));
  await saveDocument('timetable', slot.id, slot);
}

// DOCUMENTS
export async function getDocumentsFromFirestore(fallback: DocumentItem[]): Promise<DocumentItem[]> {
  return fetchCollection<DocumentItem>('documents', STORAGE_KEYS.DOCUMENTS, fallback);
}

export async function saveDocumentToFirestore(docItem: DocumentItem) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  let list: DocumentItem[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(d => d.id === docItem.id);
  if (idx >= 0) list[idx] = docItem;
  else list.unshift(docItem);
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(list));
  await saveDocument('documents', docItem.id, docItem);
}

// AI LOGS
export async function getAiLogsFromFirestore(fallback: AIActionLog[]): Promise<AIActionLog[]> {
  return fetchCollection<AIActionLog>('aiLogs', STORAGE_KEYS.AILOGS, fallback);
}

export async function saveAiLogToFirestore(log: AIActionLog) {
  const savedStr = localStorage.getItem(STORAGE_KEYS.AILOGS);
  let list: AIActionLog[] = savedStr ? JSON.parse(savedStr) : [];
  const idx = list.findIndex(l => l.id === log.id);
  if (idx >= 0) list[idx] = log;
  else list.unshift(log);
  localStorage.setItem(STORAGE_KEYS.AILOGS, JSON.stringify(list));
  await saveDocument('aiLogs', log.id, log);
}
