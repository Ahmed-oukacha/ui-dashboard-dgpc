// filepath: shadcn-ui/src/components/pages/DashboardPage.tsx

import { useUser } from '@clerk/clerk-react';
import { Upload } from 'lucide-react';
import { useFileManagement } from '../../hooks/useFileManagement';
import { AnyFileItem, ModalState } from '../../types';
import { TranslationStrings } from '../../types/translations';
import { Button } from '../ui/button';
import { RecentFiles } from '../widgets/RecentFiles';
import { StatCard } from '../widgets/StatCard';
import { StorageInfo } from '../widgets/StorageInfo';

interface DashboardPageProps {
  t: TranslationStrings;
  onFileUpload: (fileList: FileList) => void;
  openModal: (type: ModalState['type'], item?: AnyFileItem | null) => void;
  showToast: (message: string, variant: 'default' | 'destructive' | 'success') => void;
}

export const DashboardPage = ({ t, onFileUpload, openModal, showToast }: DashboardPageProps) => {
  const { user } = useUser();
  
  // الإصلاح النهائي: استخدام الأقواس المعقوفة {} لتفكيك الكائن
  const { files, isLoading, error } = useFileManagement(null);
  
  if (error) {
    console.error("Failed to load files:", error);
    showToast('Failed to load dashboard files.', 'destructive');
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t.dashboard.welcome}, {user?.firstName || 'User'}!
          </h1>
          <p className="text-lg text-gray-600 mt-1">{t.dashboard.welcomeSubtitle}</p>
        </div>
        <Button onClick={() => document.getElementById('file-upload-input-dashboard')?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          {t.dashboard.upload}
        </Button>
        <input 
          id="file-upload-input-dashboard"
          type="file" 
          multiple 
          className="hidden"
          onChange={(e) => e.target.files && onFileUpload(e.target.files)}
        />
      </header>
      
      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard t={t} type="documents" value={1250} />
        <StatCard t={t} type="images" value={830} />
        <StatCard t={t} type="videos" value={45} />
        <StatCard t={t} type="audio" value={120} />
      </main>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentFiles files={files} isLoading={isLoading} onPreviewFile={openModal} t={t} />
        </div>
        <div>
          <StorageInfo files={files} isLoading={isLoading} t={t} />
        </div>
      </section>
    </div>
  );
};