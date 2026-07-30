import fs from 'fs';
import path from 'path';

const filesToProcess = [
    "c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/App.tsx",
    "c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/components/landing/LandingPage.tsx",
    "c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/components/layout/Sidebar.tsx",
    "c:/Users/vedra/OneDrive/Documents/My Projects/EduOne2047/EduOne-2047/src/components/layout/Navbar.tsx"
];

filesToProcess.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');

        // Layout replacers
        content = content.replace(/max-w-7xl mx-auto px-4 sm:px-8/g, 'premium-container');
        content = content.replace(/max-w-7xl mx-auto/g, 'premium-container');
        content = content.replace(/max-w-6xl mx-auto px-4 sm:px-8/g, 'premium-container');
        content = content.replace(/max-w-4xl mx-auto px-4/g, 'premium-container');
        content = content.replace(/px-4 sm:px-8 max-w-7xl mx-auto/g, 'premium-container');
        content = content.replace(/h-\[calc\(100vh-61px\)\]/g, 'h-[calc(100vh-61px)] md:h-screen');
        
        // Hero spacing / background
        content = content.replace(
            /bg-gradient-to-r from-blue-200 via-indigo-100 to-cyan-200/g, 
            'bg-[linear-gradient(180deg,#F7FAF9_0%,#F3F8F7_100%)]'
        );
        content = content.replace(
            /text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto/g,
            'text-[clamp(2.5rem,5vw,5.5rem)] font-black tracking-tight text-slate-900 leading-tight max-w-[900px] mx-auto'
        );
        content = content.replace(
            /bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500/g,
            'bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500'
        );
        content = content.replace(
            /absolute inset-0 bg-white\/30 backdrop-blur-\[2px\]/g,
            'absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,97,87,0.08)_0%,transparent_70%)] backdrop-blur-[2px]'
        );

        // Button replacements
        content = content.replace(
            /px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600\/30 transition flex items-center gap-1.5 hover:-translate-y-0.5/g,
            'px-4 py-2 text-xs rounded-xl flex items-center gap-1.5 hover:-translate-y-0.5 btn-primary'
        );
        content = content.replace(
            /px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-blue-600\/30 transition-all flex items-center justify-center gap-2/g,
            'px-8 py-4 text-sm rounded-2xl flex items-center justify-center gap-2 btn-primary'
        );
        content = content.replace(
            /px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl border border-slate-200 shadow-sm transition-all text-center/g,
            'px-8 py-4 text-sm rounded-2xl text-center btn-secondary'
        );
        
        // Card Replacements
        content = content.replace(/bg-white p-6 rounded-2xl border border-slate-200 shadow-sm/g, 'p-6 card-enterprise');
        content = content.replace(/bg-white p-5 rounded-2xl border/g, 'p-5 card-enterprise border');
        content = content.replace(/bg-slate-50 border border-slate-200 rounded-2xl p-6/g, 'bg-slate-50 border border-slate-200 rounded-[20px] p-6');

        // Navbar/Sidebar styles
        content = content.replace(
            /bg-white\/80 backdrop-blur-md border-b border-slate-200\/80/g,
            'bg-white/85 backdrop-blur-[14px] border-b border-slate-200'
        );

        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Processed ${path.basename(filepath)}`);
    } else {
        console.log(`File not found: ${filepath}`);
    }
});
