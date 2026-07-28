import { Role } from '../types';

export type Permission = 
  | 'students.view' | 'students.manage'
  | 'attendance.view' | 'attendance.mark'
  | 'fees.view' | 'fees.manage'
  | 'teachers.view' | 'teachers.manage'
  | 'library.manage'
  | 'transport.manage'
  | 'reports.view'
  | 'settings.manage'
  | 'roles.manage'
  | 'staff.manage'
  | 'dashboard.view'
  | 'timetable.view' | 'timetable.manage'
  | 'exams.manage'
  | 'documents.manage'
  | 'tasks.manage'
  | 'comms.manage'
  | 'ai.manage';

export const STAFF_ROLES: Role[] = [
  'Principal',
  'Vice Principal',
  'Class Teacher',
  'Subject Teacher',
  'Exam Coordinator',
  'Accountant',
  'Receptionist',
  'Librarian',
  'Counselor',
  'Transport Manager',
  'IT Support',
  'Security Guard'
];

type RoleConfig = {
  permissions: Permission[];
  defaultDashboard: string;
};

export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  'Super Admin': {
    permissions: [
      'students.view', 'students.manage',
      'attendance.view', 'attendance.mark',
      'fees.view', 'fees.manage',
      'teachers.view', 'teachers.manage',
      'library.manage', 'transport.manage',
      'reports.view', 'settings.manage',
      'roles.manage', 'staff.manage',
      'dashboard.view', 'timetable.view', 'timetable.manage',
      'exams.manage', 'documents.manage', 'tasks.manage',
      'comms.manage', 'ai.manage'
    ],
    defaultDashboard: 'admin-panel'
  },
  'Principal': {
    permissions: [
      'students.view', 'attendance.view', 'teachers.view', 'teachers.manage',
      'reports.view', 'dashboard.view', 'timetable.view', 'timetable.manage',
      'tasks.manage', 'comms.manage', 'ai.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Vice Principal': {
    permissions: [
      'students.view', 'attendance.view', 'teachers.view',
      'reports.view', 'dashboard.view', 'timetable.view',
      'tasks.manage', 'comms.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Class Teacher': {
    permissions: [
      'students.view', 'attendance.view', 'attendance.mark',
      'dashboard.view', 'timetable.view', 'tasks.manage', 'comms.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Subject Teacher': {
    permissions: [
      'students.view', 'attendance.view', 'attendance.mark',
      'dashboard.view', 'timetable.view', 'tasks.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Exam Coordinator': {
    permissions: [
      'students.view', 'dashboard.view', 'timetable.view', 'exams.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Accountant': {
    permissions: [
      'students.view', 'fees.view', 'fees.manage', 'dashboard.view', 'reports.view'
    ],
    defaultDashboard: 'fees'
  },
  'Receptionist': {
    permissions: [
      'students.view', 'dashboard.view', 'documents.manage', 'comms.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Librarian': {
    permissions: [
      'students.view', 'dashboard.view', 'library.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Counselor': {
    permissions: [
      'students.view', 'dashboard.view', 'comms.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Transport Manager': {
    permissions: [
      'students.view', 'dashboard.view', 'transport.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'IT Support': {
    permissions: [
      'staff.manage', 'dashboard.view', 'settings.manage'
    ],
    defaultDashboard: 'dashboard'
  },
  'Security Guard': {
    permissions: [
      'dashboard.view'
    ],
    defaultDashboard: 'dashboard'
  },
  'Student': {
    permissions: [
      'dashboard.view', 'attendance.view', 'timetable.view', 'fees.view'
    ],
    defaultDashboard: 'dashboard'
  },
  'Parent': {
    permissions: [
      'dashboard.view', 'attendance.view', 'fees.view', 'comms.manage'
    ],
    defaultDashboard: 'dashboard'
  }
};
