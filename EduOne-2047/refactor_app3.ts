import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const handleUploadDocument = \(file: File\) => \{[\s\S]*?setDocuments\(\(prev\) => \[newDoc, \.\.\.prev\]\);\n  \};/,
  `const handleUploadDocument = async (file: File) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_UPLOAD_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to upload general documents.");
      return;
    }
    try {
      const newDoc: DocumentItem = {
        id: \`DOC-\${Date.now()}\`,
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
        fileSize: \`\${(file.size / 1024).toFixed(0)} KB\`
      };
      await set(ref(db, \`documents/\${newDoc.id}\`), newDoc);
      toast.success('Document uploaded successfully.');
    } catch(e) {
      toast.error('Failed to upload document.');
    }
  };`
);

content = content.replace(
  /const handleApproveDocument = \(docId: string\) => \{[\s\S]*?setDocuments\(\(prev\) =>[\s\S]*?prev\.map\(\(d\) => \(d\.id === docId \? \{ \.\.\.d, status: 'APPROVED' \} : d\)\)[\s\S]*?\);\n  \};/,
  `const handleApproveDocument = async (docId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_MANAGE_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to approve documents.");
      return;
    }
    try {
      await update(ref(db, \`documents/\${docId}\`), { status: 'APPROVED' });
      toast.success('Document approved.');
    } catch(e) {
      toast.error('Failed to approve document.');
    }
  };`
);

content = content.replace(
  /const handleRejectDocument = \(docId: string\) => \{[\s\S]*?setDocuments\(\(prev\) =>[\s\S]*?prev\.map\(\(d\) => \(d\.id === docId \? \{ \.\.\.d, status: 'REJECTED' \} : d\)\)[\s\S]*?\);\n  \};/,
  `const handleRejectDocument = async (docId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_MANAGE_ALL)) {
      toast.error("UNAUTHORIZED: You do not have permission to reject documents.");
      return;
    }
    try {
      await update(ref(db, \`documents/\${docId}\`), { status: 'REJECTED' });
      toast.success('Document rejected.');
    } catch(e) {
      toast.error('Failed to reject document.');
    }
  };`
);

content = content.replace(
  /const handleGenerateTimetable = \(\) => \{[\s\S]*?setAiLogs\(\(prev\) => \[newLog, \.\.\.prev\]\);\n  \};/,
  `const handleGenerateTimetable = async () => {
    try {
      const newLog: AIActionLog = {
        id: \`LOG-\${Date.now()}\`,
        agentName: 'Timetable Agent',
        actionTitle: 'Timetable Regenerated',
        details: 'Conflict-free weekly schedule generated across 18 classrooms.',
        confidenceScore: 99,
        reason: 'Zero room collisions & faculty workload cap respected.',
        source: 'Schedule Optimizer',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'SUCCESS'
      };
      await set(ref(db, \`ai_logs/\${newLog.id}\`), newLog);
      toast.success('Timetable regenerated.');
    } catch(e) {
      toast.error('Failed to regenerate timetable.');
    }
  };`
);

content = content.replace(
  /const handleResolveEscalation = \(id: string\) => \{[\s\S]*?setEscalations\(\(prev\) =>[\s\S]*?prev\.map\(\(e\) => \(e\.id === id \? \{ \.\.\.e, status: 'RESOLVED' \} : e\)\)[\s\S]*?\);\n  \};/,
  `const handleResolveEscalation = async (id: string) => {
    try {
      await update(ref(db, \`escalations/\${id}\`), { status: 'RESOLVED' });
      toast.success('Escalation resolved.');
    } catch(e) {
      toast.error('Failed to resolve escalation.');
    }
  };`
);

content = content.replace(
  /const handleAddTask = \(newTask: CollaborativeTask\) => \{[\s\S]*?setTasks\(\(prev\) => \[newTask, \.\.\.prev\]\);\n  \};/,
  `const handleAddTask = async (newTask: CollaborativeTask) => {
    try {
      await set(ref(db, \`tasks/\${newTask.id}\`), newTask);
      toast.success('Task added.');
    } catch(e) {
      toast.error('Failed to add task.');
    }
  };`
);

content = content.replace(
  /const handleUpdateTaskStatus = \(taskId: string, status: CollaborativeTask\['status'\]\) => \{[\s\S]*?setTasks\(\(prev\) =>[\s\S]*?prev\.map\(\(t\) => \(t\.id === taskId \? \{ \.\.\.t, status \} : t\)\)[\s\S]*?\);\n  \};/,
  `const handleUpdateTaskStatus = async (taskId: string, status: CollaborativeTask['status']) => {
    try {
      await update(ref(db, \`tasks/\${taskId}\`), { status });
      // omit toast for silent checkbox updates to reduce noise, or keep it subtle
    } catch(e) {
      toast.error('Failed to update task.');
    }
  };`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Successfully refactored App.tsx handlers part 3');
