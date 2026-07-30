import re
import os

files_to_process = [
    r"c:\Users\vedra\OneDrive\Documents\My Projects\EduOne2047\EduOne-2047\src\App.tsx",
    r"c:\Users\vedra\OneDrive\Documents\My Projects\EduOne2047\EduOne-2047\src\components\landing\LandingPage.tsx",
    r"c:\Users\vedra\OneDrive\Documents\My Projects\EduOne2047\EduOne-2047\src\components\layout\Sidebar.tsx",
    r"c:\Users\vedra\OneDrive\Documents\My Projects\EduOne2047\EduOne-2047\src\components\layout\Navbar.tsx",
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Layout replacers
    content = re.sub(r'max-w-7xl mx-auto px-4 sm:px-8', 'premium-container', content)
    content = re.sub(r'max-w-7xl mx-auto', 'premium-container', content)
    content = re.sub(r'max-w-6xl mx-auto px-4 sm:px-8', 'premium-container', content)
    content = re.sub(r'max-w-4xl mx-auto px-4', 'premium-container', content)
    content = re.sub(r'px-4 sm:px-8 max-w-7xl mx-auto', 'premium-container', content)
    content = re.sub(r'h-\[calc\(100vh-61px\)\]', 'h-[calc(100vh-61px)] md:h-screen', content)
    
    # Hero spacing / background
    content = content.replace(
        'bg-gradient-to-r from-blue-200 via-indigo-100 to-cyan-200', 
        'bg-[linear-gradient(180deg,#F7FAF9_0%,#F3F8F7_100%)]'
    )
    content = content.replace(
        'text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto',
        'text-[clamp(2.5rem,5vw,5.5rem)] font-black tracking-tight text-slate-900 leading-tight max-w-[900px] mx-auto'
    )
    content = content.replace(
        'bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500',
        'bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500'
    )
    content = content.replace(
        'absolute inset-0 bg-white/30 backdrop-blur-[2px]',
        'absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,97,87,0.08)_0%,transparent_70%)] backdrop-blur-[2px]'
    )

    # Button replacements
    content = content.replace(
        'px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5 hover:-translate-y-0.5',
        'px-4 py-2 text-xs rounded-xl flex items-center gap-1.5 hover:-translate-y-0.5 btn-primary'
    )
    content = content.replace(
        'px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2',
        'px-8 py-4 text-sm rounded-2xl flex items-center justify-center gap-2 btn-primary'
    )
    content = content.replace(
        'px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-2xl border border-slate-200 shadow-sm transition-all text-center',
        'px-8 py-4 text-sm rounded-2xl text-center btn-secondary'
    )
    
    # Card Replacements
    content = content.replace('bg-white p-6 rounded-2xl border border-slate-200 shadow-sm', 'p-6 card-enterprise')
    content = content.replace('bg-white p-5 rounded-2xl border', 'p-5 card-enterprise border')
    content = content.replace('bg-slate-50 border border-slate-200 rounded-2xl p-6', 'bg-slate-50 border border-slate-200 rounded-[20px] p-6')

    # Navbar/Sidebar styles
    content = content.replace(
        'bg-white/80 backdrop-blur-md border-b border-slate-200/80',
        'bg-white/85 backdrop-blur-[14px] border-b border-slate-200'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in files_to_process:
    if os.path.exists(f):
        process_file(f)
        print(f"Processed {os.path.basename(f)}")
