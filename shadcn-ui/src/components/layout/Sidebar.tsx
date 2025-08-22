import { useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { TranslationStrings } from '../../types/translations';
import { X, LogOut } from 'lucide-react'; // 1. استيراد أيقونة LogOut
import { NavLink } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react'; // 2. استيراد useClerk

interface SidebarProps {
  t: TranslationStrings;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
}

// 2. تم حذف currentPage و setCurrentPage من هنا أيضًا
export const Sidebar = ({ t, isCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const { user } = useUser();
  const { signOut } = useClerk(); // 3. الحصول على دالة تسجيل الخروج

  const navItems = useMemo(() => [
    { 
      id: 'dashboard', 
      text: t.sidebar.dashboard, 
      icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      id: 'manage-files', 
      text: t.sidebar.manageFiles, 
      icon: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      id: 'users', 
      text: t.sidebar.users, 
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      id: 'reports', 
      text: t.sidebar.reports, 
      icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
      gradient: "from-orange-500 to-red-600"
    },
    { 
      id: 'settings', 
      text: t.sidebar.settings, 
      icon: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c.04.32.07.65.07.98s-.03.66-.07.98l-2.11 1.65c-.19-.15-.24-.42.12-.64l2-3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69-.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59-1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
      gradient: "from-gray-500 to-slate-600"
    },
  ], [t]);

  const desktopClasses = isCollapsed ? 'w-20' : 'w-64';

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          bg-white/80 backdrop-blur-lg border-r border-gray-200/80
          flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          ${desktopClasses}
        `}
      >
        {/* Mobile Close Button */}
        <button onClick={() => setIsMobileOpen(false)} className="absolute top-4 right-4 text-gray-500 md:hidden">
          <X size={24} />
        </button>
        
        {/* Header */}
        <div className="h-20 flex items-center justify-center relative border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className={`transition-all duration-500 ${isCollapsed ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.dashboardTitle}
            </h1>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Icon path="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-6 px-4 space-y-2">
          {navItems.map((item, index) => (
            <div 
              key={item.id}
              className="transform transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <NavLink 
                to={`/${item.id}`} 
                onClick={() => setIsMobileOpen(false)} 
                className={({ isActive }) => `group flex items-center gap-4 py-4 px-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl shadow-blue-500/25` 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title={isCollapsed ? item.text : ''}
              >
                {({ isActive }) => (
                  <>
                    {/* Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Icon */}
                    <div className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'} transition-colors duration-300`}>
                      <Icon path={item.icon} className="flex-shrink-0 w-6 h-6" />
                    </div>
                    
                    {/* Text */}
                    <span className={`relative z-10 font-semibold whitespace-nowrap transition-all duration-500 overflow-hidden ${
                      isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'
                    }`}>
                      {item.text}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img 
              src={user?.imageUrl} 
              alt={user?.fullName || 'User Avatar'}
              className="w-10 h-10 rounded-full"
            />
            {!isCollapsed && (
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm text-white">{user?.fullName}</p>
                  <p className="text-xs text-gray-400">En ligne</p>
                </div>
                {/* 4. إضافة زر تسجيل الخروج */}
                <button 
                  onClick={() => signOut()} 
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  title={t.sidebar.logout} // لإضافة تلميح عند الوقوف على الزر
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};