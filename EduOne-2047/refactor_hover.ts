import fs from 'fs';

const files = [
  'src/components/students/StudentManagement.tsx',
  'src/components/tasks/CollaborativeTaskManager.tsx',
  'src/components/documents/AIDocumentCenter.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace primary buttons
  content = content.replace(/hover:bg-blue-700 transition-all/g, 'interaction-btn-primary');
  content = content.replace(/hover:bg-blue-700/g, 'interaction-btn-primary');
  content = content.replace(/hover:bg-indigo-700 transition-all/g, 'interaction-btn-primary');

  // Replace secondary/outline buttons
  content = content.replace(/hover:bg-slate-200 transition-all/g, 'interaction-btn-secondary');
  content = content.replace(/hover:bg-slate-100 transition-all/g, 'interaction-btn-secondary');
  content = content.replace(/hover:bg-slate-100/g, 'interaction-btn-secondary');
  content = content.replace(/hover:bg-slate-50 transition-colors/g, 'interaction-btn-secondary');

  // Replace cards
  content = content.replace(/bg-white border border-slate-200\/90 shadow-2xs overflow-hidden/g, 'bg-white border border-slate-200/90 shadow-2xs overflow-hidden interaction-card');
  content = content.replace(/bg-white border border-slate-200\/90 shadow-2xs(?! overflow-hidden)/g, 'bg-white border border-slate-200/90 shadow-2xs interaction-card');

  // Replace rows
  content = content.replace(/hover:bg-slate-50\/70 transition-colors/g, 'interaction-row');
  content = content.replace(/hover:bg-slate-50/g, 'interaction-row');

  fs.writeFileSync(file, content);
}
console.log('Successfully refactored hover states for remaining components');
