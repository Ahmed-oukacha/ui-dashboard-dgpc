import { useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { TranslationStrings } from '../../types/translations';

interface ReportsPageProps {
  t: TranslationStrings;
}

export const ReportsPage = ({ t }: ReportsPageProps) => {
  const kpiData = useMemo(() => [
    { 
      title: t.reportsPage.totalStorage, 
      value: "1.2 GB / 10 GB", 
      icon: "M18 19H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h5l2 3h5c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2z", 
      color: "text-blue-500", 
      bg: "bg-blue-100" 
    },
    { 
      title: t.reportsPage.totalFiles, 
      value: "345", 
      icon: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z", 
      color: "text-green-500", 
      bg: "bg-green-100" 
    },
    { 
      title: t.reportsPage.activeUsers, 
      value: "4", 
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z", 
      color: "text-purple-500", 
      bg: "bg-purple-100" 
    },
  ], [t]);

  const activityData = useMemo(() => [
    { 
      user: 'Ahmed Oukacha', 
      action: t.reportsPage.fileUploaded, 
      item: 'annual-report.docx', 
      time: '2h ago', 
      avatar: 'https://placehold.co/40x40/7c3aed/ffffff?text=A' 
    },
    { 
      user: 'Fatima Zahra', 
      action: t.reportsPage.userAdded, 
      item: 'Youssef El Amrani', 
      time: '1d ago', 
      avatar: 'https://placehold.co/40x40/d946ef/ffffff?text=F' 
    },
    { 
      user: 'Admin', 
      action: t.reportsPage.fileUploaded, 
      item: 'project-alpha.pdf', 
      time: '3d ago', 
      avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=A' 
    },
  ], [t]);

  const storageData = useMemo(() => [
    { name: 'Mar', value: 50 }, 
    { name: 'Apr', value: 70 }, 
    { name: 'May', value: 60 },
    { name: 'Jun', value: 85 }, 
    { name: 'Jul', value: 75 }, 
    { name: 'Aug', value: 90 },
  ], []);

  const fileTypeData = useMemo(() => [
    { name: t.reportsPage.pdf, value: 45, color: "#ef4444" },
    { name: t.reportsPage.word, value: 25, color: "#3b82f6" },
    { name: t.reportsPage.excel, value: 20, color: "#10b981" },
    { name: t.reportsPage.text, value: 10, color: "#6b7280" },
  ], [t]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">{t.reportsPage.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map(item => (
          <div key={item.title} className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 transition-transform transform hover:-translate-y-1">
            <div className={`p-3 rounded-full ${item.bg} ${item.color}`}>
              <Icon path={item.icon} className="w-6 h-6"/>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 font-semibold text-sm">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">
            {t.reportsPage.storageUsage} 
            <span className="text-sm text-gray-500 font-normal">({t.reportsPage.last6Months})</span>
          </h3>
          <div className="h-64 w-full">
            <svg width="100%" height="100%" viewBox="0 0 500 250">
              {storageData.map((d, i) => (
                <g key={i} className="group">
                  <rect 
                    x={i * 80 + 20} 
                    y={220 - (d.value / 100 * 200)} 
                    width="40" 
                    height={d.value / 100 * 200} 
                    rx="4" 
                    className="fill-blue-400 hover:fill-blue-600 transition-colors"
                  />
                  <text x={i * 80 + 40} y="240" textAnchor="middle" className="text-xs fill-gray-500">
                    {d.name}
                  </text>
                  <text 
                    x={i * 80 + 40} 
                    y={210 - (d.value / 100 * 200)} 
                    textAnchor="middle" 
                    className="text-xs font-bold fill-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {d.value}%
                  </text>
                </g>
              ))}
              <line x1="0" y1="220" x2="500" y2="220" stroke="#e5e7eb" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">{t.reportsPage.fileTypes}</h3>
          <div className="flex items-center justify-around h-full">
            <svg width="150" height="150" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="3.8" />
              {fileTypeData.reduce((acc, data) => {
                const angle = acc.angle + data.value * 3.6;
                const largeArc = data.value > 50 ? 1 : 0;
                const x1 = 18 + 15.915 * Math.cos(Math.PI * acc.angle / 180);
                const y1 = 18 + 15.915 * Math.sin(Math.PI * acc.angle / 180);
                const x2 = 18 + 15.915 * Math.cos(Math.PI * angle / 180);
                const y2 = 18 + 15.915 * Math.sin(Math.PI * angle / 180);
                acc.paths.push(
                  <path 
                    key={data.name} 
                    d={`M ${x1} ${y1} A 15.915 15.915 0 ${largeArc} 1 ${x2} ${y2}`} 
                    fill="none" 
                    stroke={data.color} 
                    strokeWidth="3.8" 
                  />
                );
                acc.angle = angle;
                return acc;
              }, { paths: [], angle: -90 }).paths}
            </svg>
            <ul className="space-y-2">
              {fileTypeData.map(data => (
                <li key={data.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
                  <span className="font-semibold">{data.name}</span>
                  <span className="text-gray-500">{data.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">{t.reportsPage.recentActivity}</h3>
        <ul>
          {activityData.map((activity, index) => (
            <li key={index} className="flex items-center gap-4 py-3 border-b last:border-none">
              <img src={activity.avatar} alt={activity.user} className="w-10 h-10 rounded-full" />
              <div className="flex-grow">
                <p>
                  <span className="font-bold">{activity.user}</span> {activity.action} 
                  <span className="font-semibold text-blue-600">{activity.item}</span>
                </p>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};