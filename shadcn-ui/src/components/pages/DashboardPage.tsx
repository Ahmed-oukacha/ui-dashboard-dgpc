import { useState, useCallback } from 'react';
import { Icon } from '../ui/Icon';
import { FileItem } from '../../types';
import { TranslationStrings } from '../../types/translations';
import { FILE_ALLOWED_TYPES } from '../../constants/fileTypes';

interface DashboardPageProps {
  t: TranslationStrings;
  onFileUpload: (files: FileList, parentId: string) => void;
  files: FileItem[];
  openModal: (type: string, item?: FileItem) => void;
  showToast: (message: string) => void;
  onDeleteFile: (fileId: string) => void;
}

export const DashboardPage = ({ t, onFileUpload, files, openModal, showToast }: DashboardPageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(file => FILE_ALLOWED_TYPES.includes(file.type));
    const invalidFilesCount = fileList.length - validFiles.length;

    if (invalidFilesCount > 0) {
      setUploadError(t.uploadError);
      setTimeout(() => setUploadError(''), 5000);
    } else {
      setUploadError('');
    }

    if (validFiles.length > 0) {
      const validFileList = new DataTransfer();
      validFiles.forEach(file => validFileList.items.add(file));
      onFileUpload(validFileList.files, 'root');
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
  }, [t, onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const recentFiles = files.filter(f => f.kind === 'file').slice(0, 4);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Fichiers Total</p>
                <p className="text-3xl font-bold text-gray-900">{files.filter(f => f.kind === 'file').length}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon path="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dossiers</p>
                <p className="text-3xl font-bold text-gray-900">{files.filter(f => f.kind === 'folder').length}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon path="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Stockage Utilisé</p>
                <p className="text-3xl font-bold text-gray-900">1.2 GB</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon path="M18 19H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h5l2 3h5c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2z" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl opacity-60"></div>
        <div
          className={`relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all duration-500 ${
            isDragging 
              ? 'border-blue-400 ring-4 ring-blue-400/20 shadow-2xl scale-105' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-6">
            {t.uploadNewFile}
          </h2>
          
          <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm hover:border-blue-400 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon path="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" className="w-10 h-10 text-white" />
              </div>
              
              <p className="text-lg text-gray-600 mb-2">
                {t.dragDrop} <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.browseFiles}</span>
              </p>
              <p className="text-sm text-gray-500 mb-8">Formats supportés: PDF, Word, Excel, Text</p>
              
              <input
                type="file"
                id="fileInput"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept={FILE_ALLOWED_TYPES.join(',')}
              />
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
              >
                {t.selectFiles}
              </button>
            </div>
          </div>
          
          {uploadError && (
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl text-red-700 font-medium animate-in slide-in-from-top-3 duration-300">
              {uploadError}
            </div>
          )}
        </div>
      </div>

      {/* Recent Files */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl opacity-60"></div>
        <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent mb-6">
            {t.recentUploads}
          </h2>
          
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full bg-white/60 backdrop-blur-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">{t.fileName}</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">{t.fileType}</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">{t.fileSize}</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">{t.uploadDate}</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentFiles.length > 0 ? recentFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon path={file.icon.path} className={`w-6 h-6 ${file.icon.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">Document</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                        {file.icon.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{file.size}</td>
                    <td className="py-4 px-6 text-gray-600">{file.modified}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('preview', file)}
                          className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
                          title="Aperçu"
                        >
                          <Icon path="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => showToast(`${t.downloading} ${file.name}`)}
                          className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
                          title="Télécharger"
                        >
                          <Icon path="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal('delete', file)}
                          className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
                          title="Supprimer"
                        >
                          <Icon path="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                          <Icon path="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">{t.noFiles}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};