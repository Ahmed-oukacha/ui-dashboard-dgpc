import React, { useState, useCallback, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AnyFileItem, FileItem, ModalState, ToastState } from '../../types';
import { translations } from '../../locales/translations';
import { FILE_ALLOWED_TYPES } from '../../constants/fileTypes';
import { useApi } from '../../services/api';
import { getFileIcon } from '../../utils/getFileIcon/getFileIcon';
import { TranslationStrings } from '@/types/translations';

interface DashboardPageProps {
  t: TranslationStrings;
  onFileUpload: (files: FileList) => void;
  files: AnyFileItem[];
  openModal: (type: ModalState['type'], item?: AnyFileItem) => void;
  showToast: (message: string, type?: ToastState['type']) => void;
}

export const DashboardPage = ({ t, onFileUpload, files, openModal, showToast }: DashboardPageProps) => {
  const { isLoaded, user } = useUser();
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState({ totalFiles: 0, totalFolders: 0, totalStorageUsed: 0 });
  const { getDashboardStats } = useApi();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
        showToast('Failed to load dashboard stats.', 'error');
      }
    };
    fetchStats();
  }, []);

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(file => FILE_ALLOWED_TYPES.includes(file.type));
    const invalidFilesCount = fileList.length - validFiles.length;

    if (invalidFilesCount > 0) {
      showToast(`${invalidFilesCount} file(s) have an unsupported format.`, 'error');
    }

    if (validFiles.length > 0) {
      const validFileList = new DataTransfer();
      validFiles.forEach(file => validFileList.items.add(file));
      onFileUpload(validFileList.files);
    }
  };

  const handleDragEvents = (e: React.DragEvent, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    handleDragEvents(e, false);
    handleFiles(e.dataTransfer.files);
  }, [onFileUpload, showToast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const recentFiles = files.filter((f): f is FileItem => f.itemType === 'file').slice(0, 4);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {t.welcomeAdmin.replace('Admin', user?.firstName || 'User')}
        </h1>
        <p className="text-gray-500">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Total Files */}
        <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
          <p className="text-sm font-medium text-gray-500">Total Files</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalFiles}</p>
        </div>
        {/* Card: Total Folders */}
        <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
          <p className="text-sm font-medium text-gray-500">Total Folders</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalFolders}</p>
        </div>
        {/* Card: Storage Used */}
        <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
          <p className="text-sm font-medium text-gray-500">Storage Used</p>
          <p className="text-3xl font-bold text-gray-900">{(stats.totalStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      </div>

      {/* Upload Section */}
      <div
        className={`p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all duration-300 ${isDragging ? 'border-blue-400' : 'border-dashed border-gray-300'}`}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">{t.dragDrop}</p>
          <input type="file" id="fileInput" multiple className="hidden" onChange={handleFileSelect} accept={FILE_ALLOWED_TYPES.join(',')} />
          <button onClick={() => document.getElementById('fileInput')?.click()} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
            {t.browseFiles}
          </button>
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.recentUploads}</h2>
        <div className="overflow-x-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-3">{t.fileName}</th>
                <th scope="col" className="px-6 py-3">{t.fileType}</th>
                <th scope="col" className="px-6 py-3">{t.fileSize}</th>
                <th scope="col" className="px-6 py-3">{t.uploadDate}</th>
                <th scope="col" className="px-6 py-3">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.length > 0 ? recentFiles.map((file) => {
                const icon = getFileIcon(file.type);
                return (
                  <tr key={file._id} className="border-b border-gray-200/50 hover:bg-gray-50/50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{file.name}</th>
                    <td className="px-6 py-4">{file.type}</td>
                    <td className="px-6 py-4">{(file.size / 1024).toFixed(2)} KB</td>
                    <td className="px-6 py-4">{new Date(file.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => openModal('preview', file)} className="font-medium text-blue-600 hover:underline">Preview</button>
                      <button onClick={() => openModal('delete', file)} className="font-medium text-red-600 hover:underline ml-4">Delete</button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">{t.noFiles}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};