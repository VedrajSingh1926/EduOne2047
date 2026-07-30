import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = findFiles('c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src');

allFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    // 1. Process index.css with the new strict monochromatic emerald theme
    if (filepath.endsWith('index.css')) {
        const newTheme = `@theme {
  /* Core Monochromatic Emerald Scale */
  --color-emerald-50: #EAF6F4;
  --color-emerald-100: #A9D8D2;
  --color-emerald-200: #4AAFA5;
  --color-emerald-300: #159A8C;
  --color-emerald-400: #0B8A7A;
  --color-emerald-500: #066157;
  --color-emerald-600: #055248;
  --color-emerald-700: #04443D;
  --color-emerald-800: #033A35;
  --color-emerald-900: #022B28;

  /* Aliasing legacy colors strictly to Emerald to prevent ANY blue/cyan leaks */
  --color-blue-50: var(--color-emerald-50);
  --color-blue-100: var(--color-emerald-100);
  --color-blue-200: var(--color-emerald-200);
  --color-blue-300: var(--color-emerald-300);
  --color-blue-400: var(--color-emerald-400);
  --color-blue-500: var(--color-emerald-500);
  --color-blue-600: var(--color-emerald-600);
  --color-blue-700: var(--color-emerald-700);
  --color-blue-800: var(--color-emerald-800);
  --color-blue-900: var(--color-emerald-900);
  
  --color-cyan-500: var(--color-emerald-400);
  --color-teal-500: var(--color-emerald-300);
  --color-indigo-500: var(--color-emerald-600);
  --color-indigo-600: var(--color-emerald-700);
  --color-amber-500: var(--color-emerald-400);
  --color-rose-500: var(--color-emerald-600);

  /* Neutrals overriding slate */
  --color-slate-50: #F8FBFA;
  --color-slate-100: #F3F8F7;
  --color-slate-200: #DCE9E6;
  --color-slate-300: #B9D3CE;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-900: #0F172A;
}`;
        content = content.replace(/@theme\s*\{[^}]+\}/, newTheme);

        // Update card hover border
        content = content.replace(/border-color: #B7D9D4;/g, 'border-color: #A9D8D2;');
        
        // Update primary button shadow
        content = content.replace(/rgba\(6,\s*97,\s*87,\s*0\.18\)/g, 'rgba(6, 97, 87, 0.18)');
        
        // Update transition motion definitions
        content = content.replace(/transition-all duration-200 ease-in-out/g, 'transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]');
        content = content.replace(/transition-all duration-150 ease-in-out/g, 'transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]');
        content = content.replace(/hover:-translate-y-1/g, 'hover:-translate-y-1 hover:scale-[1.02]');
    }

    if (filepath.endsWith('LandingPage.tsx')) {
        // Hero background 
        content = content.replace(
            /bg-\[linear-gradient\(180deg,#F7FAF9_0%,#F3F8F7_100%\)\]/g,
            'bg-[linear-gradient(180deg,#F8FBFA_0%,#F3F8F7_100%)]'
        );
        // Hero gradient text
        content = content.replace(
            /bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500/g,
            'bg-gradient-to-r from-[#066157] via-[#0B8A7A] to-[#159A8C]'
        );
        // Fluid typography
        content = content.replace(
            /text-\[clamp\(2\.5rem,5vw,5\.5rem\)\]/g,
            'text-[clamp(3rem,5vw,5.5rem)]'
        );
    }

    if (filepath.endsWith('.tsx')) {
        // Purge legacy color classes
        content = content.replace(/bg-blue-/g, 'bg-emerald-');
        content = content.replace(/text-blue-/g, 'text-emerald-');
        content = content.replace(/border-blue-/g, 'border-emerald-');
        content = content.replace(/shadow-blue-/g, 'shadow-emerald-');
        content = content.replace(/from-blue-/g, 'from-emerald-');
        
        content = content.replace(/bg-indigo-/g, 'bg-emerald-');
        content = content.replace(/text-indigo-/g, 'text-emerald-');
        
        content = content.replace(/bg-cyan-/g, 'bg-emerald-');
        content = content.replace(/text-cyan-/g, 'text-emerald-');
        
        content = content.replace(/text-emerald-500\/40/g, 'text-emerald-500/10');
        content = content.replace(/text-emerald-500\/30/g, 'text-emerald-500/10');
        
        // Recharts colors
        content = content.replace(/#10b981/g, '#0B8A7A');
        content = content.replace(/#3b82f6/g, '#159A8C');
        content = content.replace(/#8b5cf6/g, '#066157');
        content = content.replace(/#06b6d4/g, '#4AAFA5');
        content = content.replace(/#f59e0b/g, '#A9D8D2');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Purged legacy colors in ${path.basename(filepath)}`);
    }
});
