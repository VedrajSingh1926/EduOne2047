import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { APP_ROUTES, AppRoute } from '../../config/routes';
import { CurrentUser } from '../../types';
import { canAccess } from '../../hooks/usePermissions';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
  unresolvedEscalationsCount: number;
  onOpenHelpGuide?: () => void;
  currentUser: CurrentUser;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  unresolvedEscalationsCount,
  onOpenHelpGuide,
  currentUser
}) => {
  const permittedRoutes = APP_ROUTES.filter(route => canAccess(currentUser, route.permission));

  const primaryOps = permittedRoutes.filter(r => r.section === 'primary');
  const commsAndDocs = permittedRoutes.filter(r => r.section === 'comms');

  return (
    <aside className="w-64 bg-white border-r-2 border-slate-200 p-4 flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-61px)] shadow-2xs">
      <div className="space-y-5">
        
        {/* Core Operations Section */}
        <div>
          <div className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Daily Operations</span>
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          </div>

          <nav className="space-y-1">
            {primaryOps.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.title}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Administration & Workflow Section */}
        <div>
          <div className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Comms & AI Workflows</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          <nav className="space-y-1">
            {commsAndDocs.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              const count = item.id === 'needs-attention' ? unresolvedEscalationsCount : undefined;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.title}</span>
                  </div>

                  {count !== undefined && count > 0 && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-black rounded-full shrink-0 ${
                        isActive ? 'bg-white text-blue-700' : 'bg-red-600 text-white'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Staff Help CTA Box */}
      <div className="pt-4 border-t-2 border-slate-100 space-y-3">
        {onOpenHelpGuide && (
          <button
            onClick={onOpenHelpGuide}
            className="w-full p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
          >
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-amber-950">New Staff?</div>
              <div className="text-[10px] text-amber-800 font-medium">Click for Easy 1-Click Guide</div>
            </div>
          </button>
        )}

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>AI Assistant Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
