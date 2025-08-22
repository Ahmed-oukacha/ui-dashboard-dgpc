import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useUser, UserButton } from '@clerk/clerk-react'; // 1. استيراد useUser و UserButton
import { TranslationStrings } from '../../types/translations';

interface HeaderProps {
  t: TranslationStrings;
  language: string;
  setLanguage: (lang: string) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const Header = ({ t, language, setLanguage, toggleSidebar, toggleMobileSidebar }: HeaderProps) => {
  const { user } = useUser(); // 2. جلب بيانات المستخدم

  return (
    <header className="flex items-center justify-between">
      {/* Left Side: Welcome Message */}
      <div>
        {/* سيتم نقل رسالة الترحيب إلى DashboardPage */}
      </div>

      {/* Right Side: Icons and User Menu */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-200/80 transition-colors">
          <Bell className="text-gray-600" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Language Switcher (مثال) */}
        <div className="p-2 rounded-full hover:bg-gray-200/80 transition-colors">
          {/* ... كود مغير اللغة ... */}
        </div>

        {/* 3. استخدام UserButton من Clerk مباشرة */}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};