import React from 'react';
import { TranslationStrings } from '../../types/translations';

interface SettingsPageProps {
  t: TranslationStrings;
}

export const SettingsPage = ({ t }: SettingsPageProps) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <h1 className="text-3xl font-bold text-gray-800">{t.pages.settings}</h1>
      <div className="p-8 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-600">
          {/* يمكنك إضافة محتوى صفحة الإعدادات هنا في المستقبل. */}
          Settings page content will go here.
        </p>
      </div>
    </div>
  );
};