import { useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { User } from '../../types';
import { TranslationStrings } from '../../types/translations';

interface UsersPageProps {
  t: TranslationStrings;
}

export const UsersPage = ({ t }: UsersPageProps) => {
  const users: User[] = useMemo(() => [
    { 
      id: 1, 
      name: 'Ahmed Oukacha', 
      email: 'ahmed.oukacha@example.com', 
      role: 'admin', 
      status: 'active', 
      joined: '2025-01-15', 
      avatar: 'https://placehold.co/40x40/7c3aed/ffffff?text=A' 
    },
    { 
      id: 2, 
      name: 'Fatima Zahra', 
      email: 'fatima.zahra@example.com', 
      role: 'editor', 
      status: 'active', 
      joined: '2025-02-20', 
      avatar: 'https://placehold.co/40x40/d946ef/ffffff?text=F' 
    },
    { 
      id: 3, 
      name: 'Youssef El Amrani', 
      email: 'youssef.elamrani@example.com', 
      role: 'viewer', 
      status: 'invited', 
      joined: '2025-03-10', 
      avatar: 'https://placehold.co/40x40/10b981/ffffff?text=Y' 
    },
    { 
      id: 4, 
      name: 'Salma Bennani', 
      email: 'salma.bennani@example.com', 
      role: 'editor', 
      status: 'active', 
      joined: '2024-12-05', 
      avatar: 'https://placehold.co/40x40/f59e0b/ffffff?text=S' 
    },
  ], []);

  const roleStyles = {
    admin: 'bg-purple-100 text-purple-800',
    editor: 'bg-blue-100 text-blue-800',
    viewer: 'bg-gray-100 text-gray-800',
  };

  const statusStyles = {
    active: 'bg-green-100 text-green-800',
    invited: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">{t.usersPage.title}</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t.usersPage.searchPlaceholder}
              className="w-full py-2 px-4 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Icon path="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" className="w-5 h-5 absolute top-1/2 -translate-y-1/2 text-gray-400 ltr:right-3 rtl:left-3" />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            <Icon path="M12 5v14m-7-7h14" className="w-5 h-5"/>
            {t.usersPage.addUser}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 text-left">{t.usersPage.user}</th>
              <th className="py-3 px-4 text-left">{t.usersPage.role}</th>
              <th className="py-3 px-4 text-left">{t.usersPage.status}</th>
              <th className="py-3 px-4 text-left">{t.usersPage.joined}</th>
              <th className="py-3 px-4 text-left">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleStyles[user.role]}`}>
                    {t.usersPage[user.role]}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[user.status]}`}>
                    {t.usersPage[user.status]}
                  </span>
                </td>
                <td className="py-3 px-4">{user.joined}</td>
                <td className="py-3 px-4">
                  <button className="text-gray-500 hover:text-gray-800 p-2">
                    <Icon path="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};