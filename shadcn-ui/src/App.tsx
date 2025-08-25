import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './components/pages/DashboardPage';
import { ManageFilesPage } from './components/pages/ManageFilesPage';
import { UsersPage } from './components/pages/UsersPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { NewFolderModal,  } from './components/modals/NewFolderModal';
import { RenameModal } from './components/modals/RenameModal';
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';
import { FilePreviewModal} from './components/modals/FilePreviewModal'
import { useToast } from './hooks/useToast';
import { translations } from './locales/translations';
import { AnyFileItem, Language, ModalState, PathItem } from './types';
import { SignInPage } from './components/pages/SignInPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { useApi } from './services/api';


function ProtectedApp() {
  const [language, setLanguage] = useState<Language>('fr');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalState>({ type: null, item: null });
  
  const [files, setFiles] = useState<AnyFileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<PathItem[]>([{ id: null, name: 'Home' }]);
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();
  const { getContents, createFolder, deleteItem, renameItem } = useApi();
  const t = translations[language];

  const openModal = (type: ModalState['type'], item: AnyFileItem | null = null) => setModalState({ type, item });
  const closeModal = () => setModalState({ type: null, item: null });

  const getCurrentParentId = useCallback(() => {
    return currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null;
  }, [currentPath]);

  const refreshFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const parentId = getCurrentParentId();
      const contents = await getContents(parentId);
      setFiles(contents);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      showToast('Failed to load files.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [getCurrentParentId, getContents, showToast]);

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const handleNewFolder = async (name: string) => {
    await createFolder(name, getCurrentParentId());
    await refreshFiles();
    closeModal();
  };

  const handleFileUpload = async (fileList: FileList) => {
    showToast(`Uploading ${fileList.length} file(s) is not yet implemented.`, 'info');
  };

  const handleRenameItem = async (item: AnyFileItem, newName: string) => {
    await renameItem(item._id, newName, item.itemType);
    await refreshFiles();
    closeModal();
  };

  const handleDeleteItem = async (item: AnyFileItem) => {
    await deleteItem(item._id, item.itemType);
    await refreshFiles();
    closeModal();
  };

  return (
    <div dir={t.dir} className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 font-sans overflow-hidden">
      <Sidebar t={t} isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />
      <main className="flex-1 flex flex-col relative min-w-0">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Header t={t} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} toggleMobileSidebar={() => setIsMobileSidebarOpen(true)} language={language} setLanguage={setLanguage} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* الإصلاح النهائي: 
              1. لا نمرر 'files' إلى DashboardPage لأنه لا يحتاجها.
              2. نمرر دالة openModal كما هي لأن تعريفها الأصلي (مع item اختياري) هو الصحيح.
                 الخطأ لم يكن هنا بل في تعريف الخصائص داخل المكونات نفسها.
            */}
            <Route path="/dashboard" element={<DashboardPage t={t} onFileUpload={handleFileUpload} openModal={openModal} showToast={showToast} files={[]} />} />
            
            {/* الإصلاح النهائي:
              1. نمرر كل الخصائص كما هي.
              2. لا حاجة لتحديد نوع 'item' هنا لأن مكون ManageFilesPage يجب أن يعرف النوع المتوقع.
                 إذا استمر الخطأ هنا، فهذا يعني أن الخطأ في تعريف خصائص ManageFilesPage نفسها.
            */}
            <Route 
              path="/manage-files" 
              element={<ManageFilesPage 
                t={t} 
                files={files} 
                isLoading={isLoading} 
                onFileUpload={handleFileUpload} 
                onNewFolder={() => openModal('newFolder')} 
                onRenameFile={(item) => openModal('rename', item)} 
                onDeleteItem={(item) => openModal('delete', item)} 
                onPreviewFile={(item) => openModal('preview', item)} 
                currentPath={currentPath} 
                setCurrentPath={setCurrentPath} 
              />} 
            />
            
            <Route path="/users" element={<UsersPage t={t} />} />
            <Route path="/reports" element={<ReportsPage t={t} />} />
            <Route path="/settings" element={<SettingsPage t={t} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <NewFolderModal isOpen={modalState.type === 'newFolder'} onClose={closeModal} onSubmit={handleNewFolder} t={t} />
        <RenameModal isOpen={modalState.type === 'rename'} onClose={closeModal} onSubmit={(newName) => modalState.item && handleRenameItem(modalState.item, newName)} t={t} currentName={modalState.item?.name || ''} />
        <ConfirmDeleteModal isOpen={modalState.type === 'delete'} onClose={closeModal} onConfirm={() => modalState.item && handleDeleteItem(modalState.item)} t={t} item={modalState.item} />
        <FilePreviewModal isOpen={modalState.type === 'preview'} onClose={closeModal} t={t} item={modalState.item} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <SignedOut>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        <ProtectedApp />
      </SignedIn>
    </>
  );
}