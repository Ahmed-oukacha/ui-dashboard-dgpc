import { Menu, Bell, Languages } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { TranslationStrings } from '../../types/translations';
import { Button } from '../ui/button'; // استيراد مكون الزر
import { Language } from '../../types'; // استيراد النوع Language

interface HeaderProps {
  t: TranslationStrings;
  language: Language; // تعديل النوع من string إلى Language
  setLanguage: (lang: Language) => void; // تعديل النوع من string إلى Language
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const Header = ({ t, language, setLanguage, toggleSidebar, toggleMobileSidebar }: HeaderProps) => {

  // دالة لتبديل اللغة عند النقر على الزر
  const handleLanguageToggle = () => {
    const nextLanguage = language === 'fr' ? 'ar' : 'fr';
    setLanguage(nextLanguage);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
            <Menu className="h-6 w-6" />
        </Button>
        
        {/* Desktop Sidebar Toggle */}
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
        </Button>

      {/* Right Side: Icons and User Menu */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
        </Button>

        {/* Language Switcher Button */}
        <Button variant="ghost" size="icon" onClick={handleLanguageToggle}>
          <Languages className="h-5 w-5" />
        </Button>

        {/* Clerk UserButton */}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};