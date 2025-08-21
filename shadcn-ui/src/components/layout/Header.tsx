import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { Language } from '../../types';
import { TranslationStrings } from '../../types/translations';

interface HeaderProps {
  t: TranslationStrings;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
}

export const Header = ({ t, language, setLanguage, toggleSidebar }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const languages = { en: 'English', fr: 'Français', ar: 'العربية' };

  return (
    <header className="relative mb-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl opacity-60"></div>
      
      {/* Main Content */}
      <div className="relative flex justify-between items-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
        <div className="flex items-center gap-6">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="group p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Icon 
              path="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" 
              className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" 
            />
          </button>
          
          {/* Welcome Title */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.welcomeAdmin}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Système actif</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-3 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 transition-all duration-300 hover:scale-110 group">
            <Icon path="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" className="w-5 h-5 text-orange-600 group-hover:animate-bounce" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{language.toUpperCase()}</span>
              </div>
              <span className="text-gray-700 font-medium">{languages[language]}</span>
              <Icon 
                path="M7 10l5 5 5-5z" 
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 z-50 overflow-hidden animate-in slide-in-from-top-5 duration-200">
                {Object.entries(languages).map(([code, name]) => (
                  <a
                    href="#"
                    key={code}
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguage(code as Language);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:text-blue-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-bold">{code.toUpperCase()}</span>
                    </div>
                    <span className="font-medium">{name}</span>
                    {language === code && (
                      <Icon path="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="flex items-center gap-4 px-4 py-2 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="relative">
              <img
                src="https://placehold.co/40x40/E2E8F0/4A5568?text=A"
                alt="Admin"
                className="w-10 h-10 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Administrateur</p>
              <p className="text-xs text-gray-500">admin@exemple.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </header>
  );
};