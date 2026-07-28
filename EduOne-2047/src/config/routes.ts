import {
  LayoutDashboard,
  Bot,
  Users,
  GraduationCap,
  CalendarCheck,
  Receipt,
  FileSearch,
  CalendarDays,
  AlertTriangle,
  BarChart3,
  CheckSquare,
  Mail
} from 'lucide-react';
import { Permission } from './rbac';

export type AppRoute = {
  id: string;
  title: string;
  icon: any;
  permission?: Permission; // If undefined, everyone can access (or use specific permission)
  section: 'primary' | 'comms';
};

export const APP_ROUTES: AppRoute[] = [
  // Primary Operations
  {
    id: 'dashboard',
    title: 'Operations Dashboard',
    icon: LayoutDashboard,
    permission: 'dashboard.view',
    section: 'primary'
  },
  {
    id: 'attendance',
    title: 'Smart Attendance',
    icon: CalendarCheck,
    permission: 'attendance.view',
    section: 'primary'
  },
  {
    id: 'teachers',
    title: 'Teachers & Substitutes',
    icon: GraduationCap,
    permission: 'teachers.view',
    section: 'primary'
  },
  {
    id: 'students',
    title: 'Student Directory',
    icon: Users,
    permission: 'students.view',
    section: 'primary'
  },
  {
    id: 'fees',
    title: 'Fee & Bank Ledger',
    icon: Receipt,
    permission: 'fees.view',
    section: 'primary'
  },
  {
    id: 'timetable',
    title: 'School Timetable',
    icon: CalendarDays,
    permission: 'timetable.view',
    section: 'primary'
  },

  // Comms & AI Workflows
  {
    id: 'gmail-inbox',
    title: 'Gmail & Parent Comms',
    icon: Mail,
    permission: 'comms.manage',
    section: 'comms'
  },
  {
    id: 'documents',
    title: 'Admission OCR & Docs',
    icon: FileSearch,
    permission: 'documents.manage',
    section: 'comms'
  },
  {
    id: 'needs-attention',
    title: 'Needs Attention',
    icon: AlertTriangle,
    permission: 'staff.manage', // Super Admin mostly
    section: 'comms'
  },
  {
    id: 'command-center',
    title: 'AI Command Center',
    icon: Bot,
    permission: 'ai.manage',
    section: 'comms'
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    icon: BarChart3,
    permission: 'reports.view',
    section: 'comms'
  },
  {
    id: 'tasks',
    title: 'Staff Task Board',
    icon: CheckSquare,
    permission: 'tasks.manage',
    section: 'comms'
  },
  {
    id: 'admin-panel',
    title: 'Super Admin Panel',
    icon: Users,
    permission: 'staff.manage',
    section: 'comms'
  }
];
