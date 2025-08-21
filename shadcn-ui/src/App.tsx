import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './components/pages/DashboardPage';
import { ManageFilesPage } from './components/pages/ManageFilesPage';
import { UsersPage } from './components/pages/UsersPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { PlaceholderPage } from './components/pages/PlaceholderPage';
import { NewFolderModal } from './components/modals/NewFolderModal';
import { RenameModal } from './components/modals/RenameModal';
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';
import { FilePreviewModal } from './components/modals/FilePreviewModal';
import { Toast } from './components/ui/Toast';
import { useFileManagement } from './hooks/useFileManagement';
import { useToast } from './hooks/useToast';
import { translations } from './locales/translations';
import { Language, ModalState, PathItem } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<PathItem[]>([{ id: 'root', name: 'Home' }]);
  const [modalState, setModalState] = useState<ModalState>({ type: null, item: null });
  
  const { toast, showToast, hideToast } = useToast();
  const { files, handleFileUpload, handleRenameFile, handleDeleteFile, handleNewFolder } = useFileManagement();
  
  const t = translations[language];

  const openModal = (type: ModalState['type'], item = null) => {
    setModalState({ type, item });
  };

  const closeModal = () => {
    setModalState({ type: null, item: null });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            t={t}
            onFileUpload={handleFileUpload}
            files={files}
            openModal={openModal}
            showToast={showToast}
            onDeleteFile={handleDeleteFile}
          />
        );
      case 'manage-files':
        return (
          <ManageFilesPage
            t={t}
            onFileUpload={handleFileUpload}
            files={files}
            onNewFolder={handleNewFolder}
            onRenameFile={handleRenameFile}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
            openModal={openModal}
          />
        );
      case 'users':
        return <UsersPage t={t} />;
      case 'reports':
        return <ReportsPage t={t} />;
      case 'settings':
        return <PlaceholderPage title={t.pages.settings} />;
      default:
        return (
          <DashboardPage
            t={t}
            onFileUpload={handleFileUpload}
            files={files}
            openModal={openModal}
            showToast={showToast}
            onDeleteFile={handleDeleteFile}
          />
        );
    }
  };

  return (
    <div dir={t.dir} className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 font-sans overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        t={t}
        isCollapsed={isSidebarCollapsed}
      />
      
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 p-8 overflow-y-auto">
          <Header
            t={t}
            language={language}
            setLanguage={setLanguage}
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          {renderPage()}
        </div>
        
        {/* Modals */}
        <NewFolderModal
          isOpen={modalState.type === 'newFolder'}
          onClose={closeModal}
          onSubmit={(name) => handleNewFolder(name, currentPath[currentPath.length - 1].id)}
          t={t}
        />
        <RenameModal
          isOpen={modalState.type === 'rename'}
          onClose={closeModal}
          onSubmit={(newName) => handleRenameFile(modalState.item!.id, newName)}
          t={t}
          currentName={modalState.item?.name || ''}
        />
        <ConfirmDeleteModal
          isOpen={modalState.type === 'delete'}
          onClose={closeModal}
          onConfirm={() => {
            handleDeleteFile(modalState.item!.id);
            closeModal();
          }}
          t={t}
          item={modalState.item}
        />
        <FilePreviewModal
          isOpen={modalState.type === 'preview'}
          onClose={closeModal}
          t={t}
          item={modalState.item}
        />
        
        {/* Toast */}
        <Toast message={toast.message} show={toast.show} onHide={hideToast} />
      </main>
    </div>
  );
}