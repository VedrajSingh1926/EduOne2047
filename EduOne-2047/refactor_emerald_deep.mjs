import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = findFiles('c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src');

allFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    // Aggressive generic replace for any missed tailwind colors
    // We already replaced bg-blue-, text-blue- in previous script. Now targeting focus, peer, ring, etc.
    const colorsToReplace = ['blue', 'indigo', 'cyan', 'sky', 'rose', 'amber'];
    
    colorsToReplace.forEach(color => {
        const regex = new RegExp(`(focus:|hover:|active:|peer-checked:)?(ring|border|bg|text|fill|stroke|shadow)-${color}-([0-9]{2,3})(\\/[0-9]{2})?`, 'g');
        content = content.replace(regex, (match, prefix, type, shade, opacity) => {
            const p = prefix || '';
            const o = opacity || '';
            return `${p}${type}-emerald-${shade}${o}`;
        });
    });

    // Special table header colors from prompt:
    // Header background: #F3F8F7 -> bg-emerald-50
    // Header text: #033A35 -> text-emerald-800
    // Row hover: #F8FBFA -> hover:bg-slate-50 (or hover:bg-emerald-50/50)
    // Wait, slate-50 is now mapped to #F8FBFA in the theme! So bg-slate-50 is perfectly correct for Row Hover.
    content = content.replace(/<thead[^>]*>/g, match => {
        if (!match.includes('className')) {
            return match.replace('>', ' className="bg-emerald-50 text-emerald-800">');
        } else {
            return match.replace(/bg-slate-[0-9]{2,3}/g, 'bg-emerald-50').replace(/text-slate-[0-9]{2,3}/g, 'text-emerald-800');
        }
    });

    content = content.replace(/<th([^>]*)className="([^"]*)"/g, (match, before, classes) => {
        let newClasses = classes.replace(/text-slate-[0-9]{2,3}/g, 'text-emerald-800')
                                .replace(/bg-slate-[0-9]{2,3}/g, 'bg-emerald-50')
                                .replace(/bg-white/g, 'bg-emerald-50');
        if (!newClasses.includes('text-emerald-800')) newClasses += ' text-emerald-800';
        return `<th${before}className="${newClasses}"`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Deep purged legacy colors in ${path.basename(filepath)}`);
    }
});
