import { ref, set } from 'firebase/database';
import { db } from './firebase';
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
} from '../data/mockDatabase';

export const initializeDatabase = async () => {
  try {
    console.log("Initializing database with starter data...");
    
    // Convert arrays to objects keyed by ID for easier fetching in RTDB
    const studentsObj = INITIAL_STUDENTS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const teachersObj = INITIAL_TEACHERS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const feesObj = INITIAL_FEES.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const docsObj = INITIAL_DOCUMENTS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const timetableObj = INITIAL_TIMETABLE.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const escalationsObj = INITIAL_ESCALATIONS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const logsObj = INITIAL_AI_LOGS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const suppliesObj = INITIAL_SUPPLY_ITEMS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const tasksObj = INITIAL_TASKS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    const attendanceObj = INITIAL_ATTENDANCE_RECORDS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

    // Create Demo Accounts for Landing Page
    const usersObj = {
      "ADMIN-001": {
        id: "ADMIN-001",
        password: "admin",
        role: "Super Admin",
        name: "Super Admin",
        email: "admin@eduone.com"
      },
      "TCH-101": {
        id: "TCH-101",
        password: "password",
        role: "Class Teacher",
        name: "Elena Rostova",
        email: "elena@eduone.com"
      },
      "IDADM-2047": {
        id: "IDADM-2047",
        password: "password",
        role: "IT Support",
        name: "Sarah Connor",
        email: "sarah@eduone.com"
      }
    };

    // Save all to RTDB
    await Promise.all([
      set(ref(db, 'students'), studentsObj),
      set(ref(db, 'teachers'), teachersObj),
      set(ref(db, 'fees'), feesObj),
      set(ref(db, 'documents'), docsObj),
      set(ref(db, 'timetable'), timetableObj),
      set(ref(db, 'escalations'), escalationsObj),
      set(ref(db, 'ai_logs'), logsObj),
      set(ref(db, 'supplies'), suppliesObj),
      set(ref(db, 'tasks'), tasksObj),
      set(ref(db, 'attendance'), attendanceObj),
      set(ref(db, 'users'), usersObj) // The manual auth users table
    ]);

    console.log("Database successfully populated!");
    return true;
  } catch (error) {
    console.error("Error populating database:", error);
    return false;
  }
};

// If run directly via node/tsx
if (typeof require !== 'undefined' && require.main === module) {
  initializeDatabase().then(() => process.exit(0));
}
