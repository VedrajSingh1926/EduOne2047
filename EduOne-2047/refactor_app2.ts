import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const handleSendParentAlert = \(studentName: string, parentPhone: string, reason: string\) => \{[\s\S]*?setAiLogs\(\(prev\) => \[newLog, \.\.\.prev\]\);\n  \};/,
  `const handleSendParentAlert = async (studentName: string, parentPhone: string, reason: string) => {
    try {
      const newLog: AIActionLog = {
        id: \`LOG-\${Date.now()}\`,
        agentName: 'Attendance Agent',
        actionTitle: 'Parent Notified',
        details: \`Dispatched SMS/WhatsApp alert to \${parentPhone} for \${studentName} (\${reason}).\`,
        confidenceScore: 99,
        reason: 'Attendance dropped below threshold or consecutive absences detected.',
        source: 'Smart Attendance Matrix',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'SUCCESS'
      };
      await set(ref(db, \`ai_logs/\${newLog.id}\`), newLog);
      toast.success('Parent alert sent.');
    } catch(e) {
      toast.error('Failed to send parent alert.');
    }
  };`
);

content = content.replace(
  /const handleUploadReceipt = \(fileName: string, studentName: string\) => \{[\s\S]*?setDocuments\(\(prev\) => \[newDoc, \.\.\.prev\]\);\n  \};/,
  `const handleUploadReceipt = async (fileName: string, studentName: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.DOCUMENTS_UPLOAD_FEE)) {
      toast.error("UNAUTHORIZED: You do not have permission to upload fee receipts.");
      return;
    }
    try {
      const newDoc: DocumentItem = {
        id: \`DOC-\${Date.now()}\`,
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
      await set(ref(db, \`documents/\${newDoc.id}\`), newDoc);
      toast.success('Fee receipt uploaded.');
    } catch(e) {
      toast.error('Failed to upload receipt.');
    }
  };`
);

content = content.replace(
  /const handleResolveMismatch = \(feeId: string\) => \{[\s\S]*?setEscalations\(\(prev\) =>[\s\S]*?prev\.map\(\(e\) => \(e\.id === 'ESC-001' \? \{ \.\.\.e, status: 'RESOLVED' \} : e\)\)[\s\S]*?\);\n  \};/,
  `const handleResolveMismatch = async (feeId: string) => {
    if (!hasPermission(activeUser, PERMISSIONS.FEES_RECONCILE)) {
      toast.error("UNAUTHORIZED: You do not have permission to reconcile fees.");
      return;
    }
    try {
      await update(ref(db, \`fees/\${feeId}\`), { status: 'PAID', confidenceScore: 99 });
      // Resolve the static escalation ESC-001
      await update(ref(db, \`escalations/ESC-001\`), { status: 'RESOLVED' });
      toast.success('Fee mismatch resolved.');
    } catch(e) {
      toast.error('Failed to resolve mismatch.');
    }
  };`
);

content = content.replace(
  /const handleSendFeeReminder = \(studentName: string\) => \{[\s\S]*?setAiLogs\(\(prev\) => \[newLog, \.\.\.prev\]\);\n  \};/,
  `const handleSendFeeReminder = async (studentName: string) => {
    try {
      const newLog: AIActionLog = {
        id: \`LOG-\${Date.now()}\`,
        agentName: 'Finance Agent',
        actionTitle: 'Fee Reminder Sent',
        details: \`Sent payment reminder notice to parent of \${studentName}.\`,
        confidenceScore: 99,
        reason: 'Pending ledger balance detected.',
        source: 'Student Fee Ledger',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'SUCCESS'
      };
      await set(ref(db, \`ai_logs/\${newLog.id}\`), newLog);
      toast.success('Fee reminder sent.');
    } catch(e) {
      toast.error('Failed to send fee reminder.');
    }
  };`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Successfully refactored App.tsx handlers part 2');
