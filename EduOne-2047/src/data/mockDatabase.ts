import {
  Student,
  Teacher,
  FeeRecord,
  DocumentItem,
  TimetableSlot,
  EscalationItem,
  AIActionLog,
  SupplyItem,
  CollaborativeTask,
  AttendanceRecord
} from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-1001',
    name: 'Aarav Sharma',
    rollNo: '10-A-01',
    grade: 'Grade 10',
    section: 'A',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 98765 43210',
    parentEmail: 'rajesh.sharma@example.com',
    attendancePct: 94.5,
    feeStatus: 'PAID',
    totalFees: 45000,
    paidFees: 45000,
    pendingFees: 0,
    documentsStatus: 'VERIFIED',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'STU-1002',
    name: 'Ananya Verma',
    rollNo: '10-A-02',
    grade: 'Grade 10',
    section: 'A',
    parentName: 'Sanjay Verma',
    parentPhone: '+91 98123 45678',
    parentEmail: 'sanjay.verma@example.com',
    attendancePct: 78.2,
    feeStatus: 'MISMATCH',
    totalFees: 45000,
    paidFees: 30000,
    pendingFees: 15000,
    documentsStatus: 'PENDING',
    riskFlag: 'Continuous 3-day absence & payment discrepancy detected',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'STU-1003',
    name: 'Rohan Gupta',
    rollNo: '10-B-14',
    grade: 'Grade 10',
    section: 'B',
    parentName: 'Vikram Gupta',
    parentPhone: '+91 99887 76655',
    parentEmail: 'vikram.g@example.com',
    attendancePct: 88.0,
    feeStatus: 'PENDING',
    totalFees: 45000,
    paidFees: 20000,
    pendingFees: 25000,
    documentsStatus: 'VERIFIED'
  },
  {
    id: 'STU-1004',
    name: 'Diya Patel',
    rollNo: '11-A-08',
    grade: 'Grade 11',
    section: 'A',
    parentName: 'Amit Patel',
    parentPhone: '+91 97112 23344',
    parentEmail: 'amit.patel@example.com',
    attendancePct: 98.1,
    feeStatus: 'PAID',
    totalFees: 52000,
    paidFees: 52000,
    pendingFees: 0,
    documentsStatus: 'VERIFIED'
  },
  {
    id: 'STU-1005',
    name: 'Kabir Mehta',
    rollNo: '12-C-19',
    grade: 'Grade 12',
    section: 'C',
    parentName: 'Pankaj Mehta',
    parentPhone: '+91 98990 11223',
    parentEmail: 'pankaj.m@example.com',
    attendancePct: 69.4,
    feeStatus: 'OVERDUE',
    totalFees: 58000,
    paidFees: 10000,
    pendingFees: 48000,
    documentsStatus: 'MISSING',
    riskFlag: 'Low attendance alert (69.4%) - Medical cert unverified'
  },
  {
    id: 'STU-1006',
    name: 'Isha Reddy',
    rollNo: '9-A-11',
    grade: 'Grade 9',
    section: 'A',
    parentName: 'Ramesh Reddy',
    parentPhone: '+91 95432 10987',
    parentEmail: 'ramesh.reddy@example.com',
    attendancePct: 92.0,
    feeStatus: 'PAID',
    totalFees: 42000,
    paidFees: 42000,
    pendingFees: 0,
    documentsStatus: 'VERIFIED'
  },
  {
    id: 'STU-1007',
    name: 'Vihaan Joshi',
    rollNo: '11-B-22',
    grade: 'Grade 11',
    section: 'B',
    parentName: 'Sunil Joshi',
    parentPhone: '+91 98877 66554',
    parentEmail: 'sunil.j@example.com',
    attendancePct: 81.5,
    feeStatus: 'PARTIAL',
    totalFees: 52000,
    paidFees: 30000,
    pendingFees: 22000,
    documentsStatus: 'VERIFIED'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'TCH-201',
    name: 'Dr. Alok Nath',
    subject: 'Physics',
    secondarySubjects: ['Mathematics'],
    gradeClasses: ['Grade 10-A', 'Grade 11-A', 'Grade 12-A'],
    status: 'PRESENT',
    availability: 'Available (Max 5/day)',
    lecturesPerWeek: 22,
    maxLecturesPerDay: 5,
    phone: '+91 98111 22233',
    email: 'alok.nath@eduone.org'
  },
  {
    id: 'TCH-202',
    name: 'Mrs. Sunita Deshmukh',
    subject: 'Mathematics',
    secondarySubjects: ['Physics'],
    gradeClasses: ['Grade 9-A', 'Grade 10-B', 'Grade 11-B'],
    status: 'ABSENT',
    availability: 'On Medical Leave (Substitute required for 3 classes today)',
    lecturesPerWeek: 24,
    maxLecturesPerDay: 5,
    phone: '+91 98222 33344',
    email: 'sunita.d@eduone.org'
  },
  {
    id: 'TCH-203',
    name: 'Prof. Rajesh Kulkarni',
    subject: 'Chemistry',
    secondarySubjects: ['Biology'],
    gradeClasses: ['Grade 10-A', 'Grade 11-A', 'Grade 12-B'],
    status: 'PRESENT',
    availability: 'Available for substitution',
    lecturesPerWeek: 20,
    maxLecturesPerDay: 5,
    phone: '+91 98333 44455',
    email: 'rajesh.k@eduone.org'
  },
  {
    id: 'TCH-204',
    name: 'Ms. Priyamvada Sen',
    subject: 'English Literature',
    secondarySubjects: ['Social Studies'],
    gradeClasses: ['Grade 9-B', 'Grade 10-A', 'Grade 12-C'],
    status: 'PRESENT',
    availability: 'Available (3 free slots today)',
    lecturesPerWeek: 18,
    maxLecturesPerDay: 4,
    phone: '+91 98444 55566',
    email: 'p.sen@eduone.org'
  },
  {
    id: 'TCH-205',
    name: 'Mr. David Miller',
    subject: 'Computer Science',
    secondarySubjects: ['Mathematics'],
    gradeClasses: ['Grade 11-A', 'Grade 11-B', 'Grade 12-A'],
    status: 'PRESENT',
    availability: 'Lab session active',
    lecturesPerWeek: 20,
    maxLecturesPerDay: 5,
    phone: '+91 98555 66677',
    email: 'd.miller@eduone.org'
  }
];

export const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'FEE-9001',
    studentId: 'STU-1002',
    studentName: 'Ananya Verma',
    gradeClass: 'Grade 10-A',
    invoiceNo: 'INV-2026-089',
    receiptNo: 'REC-UPI-9921',
    amount: 15000,
    paidAmount: 12000,
    dueDate: '2026-07-20',
    paidDate: '2026-07-22',
    paymentMode: 'UPI',
    status: 'MISMATCH',
    confidenceScore: 84,
    mismatchReason: 'OCR read receipt as ₹12,000, but bank transaction logged ₹15,000 reference. Requires Accountant human check.',
    sourceDoc: 'receipt_ananya_july.pdf'
  },
  {
    id: 'FEE-9002',
    studentId: 'STU-1003',
    studentName: 'Rohan Gupta',
    gradeClass: 'Grade 10-B',
    invoiceNo: 'INV-2026-092',
    amount: 25000,
    paidAmount: 0,
    dueDate: '2026-07-15',
    status: 'PENDING',
    confidenceScore: 98,
    mismatchReason: 'Fee reminder scheduled via Finance Agent'
  },
  {
    id: 'FEE-9003',
    studentId: 'STU-1005',
    studentName: 'Kabir Mehta',
    gradeClass: 'Grade 12-C',
    invoiceNo: 'INV-2026-041',
    amount: 48000,
    paidAmount: 10000,
    dueDate: '2026-06-30',
    status: 'OVERDUE',
    confidenceScore: 99
  },
  {
    id: 'FEE-9004',
    studentId: 'STU-1001',
    studentName: 'Aarav Sharma',
    gradeClass: 'Grade 10-A',
    invoiceNo: 'INV-2026-012',
    receiptNo: 'REC-BANK-4410',
    amount: 45000,
    paidAmount: 45000,
    dueDate: '2026-07-01',
    paidDate: '2026-06-28',
    paymentMode: 'BANK_TRANSFER',
    status: 'PAID',
    confidenceScore: 99
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-801',
    fileName: 'Admission_Form_Ananya_Verma.pdf',
    type: 'ADMISSION_FORM',
    uploadedAt: '2026-07-26 14:20',
    studentOrTeacherName: 'Ananya Verma',
    extractedFields: {
      studentName: 'Ananya Verma',
      dob: '2011-04-12',
      guardianName: 'Sanjay Verma',
      address: '742 Evergreen Terrace, Sector 4',
      phone: '+91 98123 45678',
      previousSchool: 'St. Xavier High School',
      aadhaarNo: '4829-XXXX-1029'
    },
    confidenceScore: 88,
    status: 'NEEDS_REVIEW',
    reason: 'Handwritten address section has 88% optical OCR confidence. Requires quick approval.',
    fileSize: '1.8 MB'
  },
  {
    id: 'DOC-802',
    fileName: 'UPI_Fee_Receipt_STU1002.png',
    type: 'FEE_RECEIPT',
    uploadedAt: '2026-07-27 08:10',
    studentOrTeacherName: 'Ananya Verma',
    extractedFields: {
      utrNumber: 'UPI/20260727/882199',
      amountPaid: '₹12,000',
      bankName: 'HDFC Bank',
      timestamp: '2026-07-27 08:05:12'
    },
    confidenceScore: 84,
    status: 'NEEDS_REVIEW',
    reason: 'Amount mismatch against Invoice INV-2026-089 (₹15,000 vs ₹12,000).',
    fileSize: '420 KB'
  },
  {
    id: 'DOC-803',
    fileName: 'Medical_Leave_Mrs_Deshmukh.pdf',
    type: 'LEAVE_APPLICATION',
    uploadedAt: '2026-07-27 07:00',
    studentOrTeacherName: 'Mrs. Sunita Deshmukh',
    extractedFields: {
      applicant: 'Mrs. Sunita Deshmukh',
      leaveType: 'Medical Leave',
      fromDate: '2026-07-27',
      toDate: '2026-07-28',
      reason: 'Acute Fever',
      doctorCertAttached: 'Yes'
    },
    confidenceScore: 96,
    status: 'APPROVED',
    fileSize: '890 KB'
  },
  {
    id: 'DOC-804',
    fileName: 'Paper_Supply_Invoice_Vendor_P10.pdf',
    type: 'SUPPLY_INVOICE',
    uploadedAt: '2026-07-26 18:30',
    studentOrTeacherName: 'PaperBuddy Stationers',
    extractedFields: {
      vendor: 'PaperBuddy Stationers Pvt Ltd',
      items: 'A4 Printing Paper (50 Reams), Whiteboard Markers (10 Boxes)',
      totalAmount: '₹24,500',
      poNumber: 'PO-SCHOOL-9941'
    },
    confidenceScore: 95,
    status: 'APPROVED',
    fileSize: '2.1 MB'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  {
    id: 'TS-101',
    day: 'Monday',
    period: 1,
    timeSlot: '08:30 - 09:20 AM',
    gradeClass: 'Grade 10-A',
    subject: 'Physics',
    teacherId: 'TCH-201',
    teacherName: 'Dr. Alok Nath',
    room: 'Lab 2'
  },
  {
    id: 'TS-102',
    day: 'Monday',
    period: 2,
    timeSlot: '09:25 - 10:15 AM',
    gradeClass: 'Grade 10-A',
    subject: 'Mathematics',
    teacherId: 'TCH-202',
    teacherName: 'Mrs. Sunita Deshmukh',
    room: 'Room 301',
    isSubstitute: true,
    originalTeacherName: 'Mrs. Sunita Deshmukh (Absent)'
  },
  {
    id: 'TS-103',
    day: 'Monday',
    period: 3,
    timeSlot: '10:30 - 11:20 AM',
    gradeClass: 'Grade 10-A',
    subject: 'Chemistry',
    teacherId: 'TCH-203',
    teacherName: 'Prof. Rajesh Kulkarni',
    room: 'Lab 1'
  },
  {
    id: 'TS-104',
    day: 'Monday',
    period: 4,
    timeSlot: '11:25 - 12:15 PM',
    gradeClass: 'Grade 10-A',
    subject: 'English',
    teacherId: 'TCH-204',
    teacherName: 'Ms. Priyamvada Sen',
    room: 'Room 301'
  },
  {
    id: 'TS-105',
    day: 'Monday',
    period: 5,
    timeSlot: '01:00 - 01:50 PM',
    gradeClass: 'Grade 11-A',
    subject: 'Computer Science',
    teacherId: 'TCH-205',
    teacherName: 'Mr. David Miller',
    room: 'Computer Lab B'
  }
];

export const INITIAL_ESCALATIONS: EscalationItem[] = [
  {
    id: 'ESC-001',
    title: 'Fee Receipt Payment Discrepancy (₹3,000 short)',
    category: 'FEE_MISMATCH',
    severity: 'CRITICAL',
    entityName: 'Ananya Verma (Grade 10-A)',
    reason: 'Uploaded receipt shows ₹12,000 paid vs ₹15,000 billed term fee. Automated matching confidence is 84% (<90%).',
    source: 'Finance Agent / OCR Module',
    confidenceScore: 84,
    requiresHumanApproval: true,
    createdAt: '10 mins ago',
    suggestedAction: 'Approve manual adjustment or request parent to re-submit remaining ₹3,000 receipt proof.',
    status: 'UNRESOLVED'
  },
  {
    id: 'ESC-002',
    title: 'Substitute Needed for Grade 10-B Math (Period 4)',
    category: 'TEACHER_ABSENT',
    severity: 'CRITICAL',
    entityName: 'Mrs. Sunita Deshmukh (Medical Leave)',
    reason: 'Teacher absent today. Dr. Alok Nath or Mr. David Miller recommended as available substitutes.',
    source: 'Timetable Agent',
    confidenceScore: 97,
    requiresHumanApproval: false,
    createdAt: '25 mins ago',
    suggestedAction: 'Assign Dr. Alok Nath for Period 4 Grade 10-B Math.',
    status: 'UNRESOLVED'
  },
  {
    id: 'ESC-003',
    title: 'Admission Form Handwritten Address Verification',
    category: 'OCR_REVIEW',
    severity: 'HIGH',
    entityName: 'Ananya Verma Admission Form',
    reason: 'OCR OCR confidence is 88% on handwritten address "742 Evergreen Terrace, Sector 4".',
    source: 'Admission Agent',
    confidenceScore: 88,
    requiresHumanApproval: true,
    createdAt: '1 hour ago',
    suggestedAction: 'Verify address text in pop-up document preview.',
    status: 'UNRESOLVED'
  },
  {
    id: 'ESC-004',
    title: 'Paper & Printing Cartridge Stock Reaching Critical Level',
    category: 'SUPPLY_SHORTAGE',
    severity: 'HIGH',
    entityName: 'A4 Paper Reams (PaperBuddy Inventory)',
    reason: 'Current stock is 12 reams. Predictive burn rate estimates runout in 3.5 days before quarterly exams.',
    source: 'Operations & Supply Chain Agent',
    confidenceScore: 96,
    requiresHumanApproval: true,
    createdAt: '2 hours ago',
    suggestedAction: 'Approve Auto-Purchase Order PO-SUP-2026-44 (50 Reams @ ₹11,500).',
    status: 'UNRESOLVED'
  },
  {
    id: 'ESC-005',
    title: 'Continuous 3-Day Absence Pattern Alert',
    category: 'PARENT_COMPLAINT',
    severity: 'HIGH',
    entityName: 'Kabir Mehta (Grade 12-C)',
    reason: 'Student absent for 3 consecutive days without prior leave note. Attendance dropped to 69.4%.',
    source: 'Attendance Agent',
    confidenceScore: 99,
    requiresHumanApproval: false,
    createdAt: '3 hours ago',
    suggestedAction: 'Dispatch automated WhatsApp & SMS alert to parent Pankaj Mehta.',
    status: 'UNRESOLVED'
  }
];

export const INITIAL_AI_LOGS: AIActionLog[] = [
  {
    id: 'LOG-301',
    agentName: 'Finance Agent',
    actionTitle: 'Fee Mismatch Detected',
    details: 'Flagged ₹3,000 difference for Ananya Verma receipt REC-UPI-9921.',
    confidenceScore: 84,
    reason: 'Receipt amount (12,000) != Invoice amount (15,000).',
    source: 'Receipt OCR Service',
    timestamp: '08:12 AM',
    status: 'REQUIRES_APPROVAL'
  },
  {
    id: 'LOG-302',
    agentName: 'Timetable Agent',
    actionTitle: 'Substitute Assigned',
    details: 'Auto-assigned Dr. Alok Nath for Grade 10-A Period 2 Math.',
    confidenceScore: 98,
    reason: 'Dr. Alok Nath has free slot & secondary subject qualification in Math.',
    source: 'Teacher Schedule Graph',
    timestamp: '07:45 AM',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-303',
    agentName: 'Admission Agent',
    actionTitle: 'Admission Forms Processed',
    details: 'Extracted records for 6 new applicants with 95% average accuracy.',
    confidenceScore: 95,
    reason: 'OCR data parsed successfully into Student Ledger schema.',
    source: 'Document Center OCR',
    timestamp: '07:15 AM',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-304',
    agentName: 'Attendance Agent',
    actionTitle: 'Parents Notified',
    details: 'Sent instant absence notices to 4 parents for morning assembly absence.',
    confidenceScore: 99,
    reason: 'Assembly biometric log cross-referenced with attendance roster.',
    source: 'Smart Attendance Matrix',
    timestamp: '08:30 AM',
    status: 'SUCCESS'
  }
];

export const INITIAL_SUPPLY_ITEMS: SupplyItem[] = [
  {
    id: 'SUP-01',
    itemName: 'A4 Examination Paper Reams',
    category: 'Paper & Printing',
    currentStock: 12,
    minThreshold: 30,
    unit: 'Reams',
    monthlyBurnRate: 65,
    predictedRunoutDays: 3.5,
    status: 'CRITICAL',
    supplier: 'PaperBuddy Stationers',
    estimatedCost: 11500
  },
  {
    id: 'SUP-02',
    itemName: 'Dry Erase Markers (Black/Blue)',
    category: 'Stationery',
    currentStock: 24,
    minThreshold: 20,
    unit: 'Boxes',
    monthlyBurnRate: 18,
    predictedRunoutDays: 14,
    status: 'HEALTHY',
    supplier: 'EduCraft Supplies',
    estimatedCost: 3600
  },
  {
    id: 'SUP-03',
    itemName: 'Physics Lab Beakers (500ml)',
    category: 'Lab Equipment',
    currentStock: 8,
    minThreshold: 15,
    unit: 'Units',
    monthlyBurnRate: 5,
    predictedRunoutDays: 6,
    status: 'LOW_STOCK',
    supplier: 'Scientific World Inc',
    estimatedCost: 8200
  },
  {
    id: 'SUP-04',
    itemName: 'Smart Board Stylus Pens',
    category: 'IT Hardware',
    currentStock: 15,
    minThreshold: 10,
    unit: 'Units',
    monthlyBurnRate: 4,
    predictedRunoutDays: 28,
    status: 'HEALTHY',
    supplier: 'TechEdu Solutions',
    estimatedCost: 12000
  }
];

export const INITIAL_TASKS: CollaborativeTask[] = [
  {
    id: 'TSK-101',
    title: 'Verify Ananya Verma Fee Receipt & Approve Adjustment',
    assignedRole: 'Accountant',
    assignedTo: 'Finance Dept',
    priority: 'HIGH',
    dueDate: '2026-07-27',
    status: 'IN_PROGRESS',
    module: 'Smart Fee Management',
    aiSuggested: true
  },
  {
    id: 'TSK-102',
    title: 'Confirm Substitute Assignment for Grade 10-B Math',
    assignedRole: 'Vice Principal',
    assignedTo: 'Vice Principal Office',
    priority: 'HIGH',
    dueDate: '2026-07-27',
    status: 'BACKLOG',
    module: 'AI Timetable',
    aiSuggested: true
  },
  {
    id: 'TSK-103',
    title: 'Approve Reorder PO-SUP-2026-44 for A4 Paper Stock',
    assignedRole: 'Operations Lead',
    assignedTo: 'Ops Team',
    priority: 'HIGH',
    dueDate: '2026-07-28',
    status: 'BACKLOG',
    module: 'Supply Chain Operations',
    aiSuggested: true
  },
  {
    id: 'TSK-104',
    title: 'Review Medical Certificate for Kabir Mehta Attendance Waiver',
    assignedRole: 'Registrar',
    assignedTo: 'Student Records',
    priority: 'MEDIUM',
    dueDate: '2026-07-29',
    status: 'IN_PROGRESS',
    module: 'Smart Attendance',
    aiSuggested: false
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: 'ATT-1', date: '2026-07-27', gradeClass: 'Grade 10-A', studentId: 'STU-1001', studentName: 'Aarav Sharma', status: 'PRESENT' },
  { id: 'ATT-2', date: '2026-07-27', gradeClass: 'Grade 10-A', studentId: 'STU-1002', studentName: 'Ananya Verma', status: 'ABSENT', riskDetected: true, riskReason: '3rd consecutive day absent without medical note' },
  { id: 'ATT-3', date: '2026-07-27', gradeClass: 'Grade 10-B', studentId: 'STU-1003', studentName: 'Rohan Gupta', status: 'PRESENT' },
  { id: 'ATT-4', date: '2026-07-27', gradeClass: 'Grade 11-A', studentId: 'STU-1004', studentName: 'Diya Patel', status: 'PRESENT' },
  { id: 'ATT-5', date: '2026-07-27', gradeClass: 'Grade 12-C', studentId: 'STU-1005', studentName: 'Kabir Mehta', status: 'ABSENT', riskDetected: true, riskReason: 'Attendance dropped to 69.4%' }
];
