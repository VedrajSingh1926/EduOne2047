import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const handleAddStudent = \(newStudent: Student\) => \{[\s\S]*?\};/,
  `const handleAddStudent = async (newStudent: Student) => {
    try {
      await set(ref(db, \`students/\${newStudent.id}\`), newStudent);
      toast.success('Student added successfully!');
    } catch (e) {
      toast.error('Failed to add student.');
    }
  };`
);

content = content.replace(
  /const handleAssignSubstitute = \(teacherOrSlotId: string, substituteTeacherName: string\) => \{[\s\S]*?setAiLogs\(\(prev\) => \[newLog, \.\.\.prev\]\);\n  \};/,
  `const handleAssignSubstitute = async (teacherOrSlotId: string, substituteTeacherName: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.TIMETABLE_MANAGE)) {
      toast.error("UNAUTHORIZED: You do not have permission to manage timetables.");
      return;
    }
    try {
      const slot = timetable.find(s => s.id === teacherOrSlotId || s.teacherId === teacherOrSlotId);
      if (slot) {
        await update(ref(db, \`timetable/\${slot.id}\`), {
          teacherName: substituteTeacherName,
          isSubstitute: true,
          originalTeacherName: \`\${slot.teacherName} (On Leave)\`
        });
        
        const newLog: AIActionLog = {
          id: \`LOG-\${Date.now()}\`,
          agentName: 'Timetable Agent',
          actionTitle: 'Substitute Assigned',
          details: \`Assigned \${substituteTeacherName} for class coverage.\`,
          confidenceScore: 98,
          reason: 'Matched subject qualification & free slot schedule.',
          source: 'Teacher Schedule Graph',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'SUCCESS'
        };
        await set(ref(db, \`ai_logs/\${newLog.id}\`), newLog);
        toast.success('Substitute assigned successfully.');
      } else {
        toast.error('Timetable slot not found.');
      }
    } catch(e) {
      toast.error('Failed to assign substitute.');
    }
  };`
);

content = content.replace(
  /const handleUpdateTeacherStatus = \(teacherId: string, newStatus: 'PRESENT' \| 'ABSENT' \| 'ON_LEAVE'\) => \{[\s\S]*?\};/,
  `const handleUpdateTeacherStatus = async (teacherId: string, newStatus: 'PRESENT' | 'ABSENT' | 'ON_LEAVE') => {
    if (!hasPermission(activeUser, PERMISSIONS.TEACHERS_MANAGE)) {
      toast.error("UNAUTHORIZED: You do not have permission to manage teachers.");
      return;
    }
    try {
      await update(ref(db, \`teachers/\${teacherId}\`), { status: newStatus });
      toast.success('Teacher status updated.');
    } catch(e) {
      toast.error('Failed to update status.');
    }
  };`
);

content = content.replace(
  /const handleMarkAttendance = \(studentId: string, status: 'PRESENT' \| 'ABSENT' \| 'LATE' \| 'EXCUSED'\) => \{[\s\S]*?\};/,
  `const handleMarkAttendance = async (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
    if (!hasPermission(activeUser, PERMISSIONS.ATTENDANCE_MARK_HOMEROOM)) {
      toast.error("UNAUTHORIZED: You do not have permission to mark attendance.");
      return;
    }
    try {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const newPct = status === 'ABSENT' ? Math.max(50, student.attendancePct - 1.5) : Math.min(100, student.attendancePct + 0.5);
        await update(ref(db, \`students/\${studentId}\`), { attendancePct: Number(newPct.toFixed(1)) });
        toast.success(\`Attendance marked \${status}.\`);
      }
    } catch(e) {
      toast.error('Failed to mark attendance.');
    }
  };`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Successfully refactored App.tsx handlers part 1');
