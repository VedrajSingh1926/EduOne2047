import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else if (filePath.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allTsxFiles = findFiles('c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/components');

allTsxFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    // Standardize max-width classes to premium-container
    content = content.replace(/max-w-7xl mx-auto px-4 sm:px-8/g, 'premium-container');
    content = content.replace(/max-w-7xl mx-auto/g, 'premium-container');
    content = content.replace(/max-w-6xl mx-auto px-4 sm:px-8/g, 'premium-container');
    content = content.replace(/max-w-6xl mx-auto/g, 'premium-container');
    content = content.replace(/max-w-5xl mx-auto/g, 'premium-container');
    content = content.replace(/max-w-screen-xl mx-auto/g, 'premium-container');
    content = content.replace(/px-4 sm:px-8 max-w-7xl mx-auto/g, 'premium-container');
    
    // Convert hardcoded padding that conflicts with premium-container
    content = content.replace(/premium-container px-4 sm:px-6 lg:px-8/g, 'premium-container');
    
    // Card and Button enterprise replacements for dashboards
    content = content.replace(/bg-white p-6 rounded-2xl border border-slate-200 shadow-sm/g, 'p-6 card-enterprise');
    content = content.replace(/bg-white p-5 rounded-2xl border/g, 'p-5 card-enterprise border');
    content = content.replace(/bg-white rounded-2xl shadow-sm border border-slate-200/g, 'card-enterprise');
    content = content.replace(/bg-white rounded-xl border border-slate-200 shadow-sm/g, 'card-enterprise');
    content = content.replace(/bg-white shadow-sm border border-slate-200 rounded-2xl/g, 'card-enterprise');
    content = content.replace(/bg-slate-50 border border-slate-200 rounded-2xl/g, 'bg-slate-50 border border-slate-200 rounded-[20px]');

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated layout in ${path.basename(filepath)}`);
    }
});
