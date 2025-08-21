import React, { useState, useMemo } from 'react';
import { Icon } from '../ui/Icon';
import { ContextMenu } from '../ui/ContextMenu';
import { FileItem, PathItem, ContextMenuState, ViewType } from '../../types';
import { TranslationStrings } from '../../types/translations';
import { FILE_ALLOWED_TYPES } from '../../constants/fileTypes';

interface ManageFilesPageProps {
  t: TranslationStrings;
  files: FileItem[];
  onFileUpload: (files: FileList, parentId: string) => void;
  onNewFolder: (name: string, parentId: string) => void;
  onRenameFile: (fileId: string, newName: string) => void;
  currentPath: PathItem[];
  setCurrentPath: (path: PathItem[]) => void;
  openModal: (type: string, item?: FileItem) => void;
}

export const ManageFilesPage = ({ t, files, onFileUpload, onNewFolder, currentPath, setCurrentPath, openModal }: ManageFilesPageProps) => {
  const [view, setView] = useState<ViewType>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0, item: null });

  const currentFolderId = currentPath[currentPath.length - 1].id;

  const handleFiles = (fileList: FileList) => {
    onFileUpload(fileList, currentFolderId);
  };

  const handleNavigate = (folder: FileItem) => {
    setCurrentPath([...currentPath, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (pathIndex: number) => {
    setCurrentPath(currentPath.slice(0, pathIndex + 1));
  };

  const handleContextMenu = (e: React.MouseEvent, item: FileItem) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, item });
  };

  const closeContextMenu = () => setContextMenu({ ...contextMenu, visible: false });

  const filteredFiles = useMemo(() => {
    return files
      .filter(file => file.parentId === currentFolderId)
      .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [files, searchTerm, currentFolderId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" onClick={closeContextMenu}>
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.visible}
        onClose={closeContextMenu}
        t={t}
        onRename={() => openModal('rename', contextMenu.item!)}
        onDelete={() => openModal('delete', contextMenu.item!)}
      />

      <nav className="flex items-center text-sm font-semibold text-gray-500 mb-4">
        {currentPath.map((path, index) => (
          <React.Fragment key={path.id}>
            <span
              className={`hover:text-blue-600 cursor-pointer ${
                index === currentPath.length - 1 ? 'text-gray-800' : ''
              }`}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {path.name}
            </span>
            {index < currentPath.length - 1 && <span className="mx-2">/</span>}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
        <div className="relative flex-grow max-w-xs">
          <input
            type="text"
            placeholder={t.manageFilesPage.searchPlaceholder}
            className="w-full py-2 px-4 rounded-lg border bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Icon path="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" className="w-5 h-5 absolute top-1/2 -translate-y-1/2 text-gray-400 ltr:right-3 rtl:left-3" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('newFolder')}
            className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            <Icon path="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z M16 14h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z" className="w-5 h-5"/>
            {t.manageFilesPage.newFolder}
          </button>
          <button
            onClick={() => document.getElementById('managePageFileInput')?.click()}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            <Icon path="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" className="w-5 h-5"/>
            {t.manageFilesPage.upload}
          </button>
          <input
            type="file"
            id="managePageFileInput"
            multiple
            className="hidden"
            accept={FILE_ALLOWED_TYPES.join(',')}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
        <div className="flex items-center bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-1 rounded ${view === 'grid' ? 'bg-white shadow' : ''}`}
          >
            <Icon path="M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z" className="w-5 h-5"/>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1 rounded ${view === 'list' ? 'bg-white shadow' : ''}`}
          >
            <Icon path="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onDoubleClick={() => file.kind === 'folder' && handleNavigate(file)}
              onContextMenu={(e) => handleContextMenu(e, file)}
              className="relative group flex flex-col items-center p-4 border rounded-lg hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer"
            >
              <Icon path={file.icon.path} className={`w-16 h-16 ${file.icon.color}`} />
              <span className="mt-2 font-semibold text-gray-800 text-center w-full truncate" title={file.name}>
                {file.name}
              </span>
              <span className="text-sm text-gray-500">
                {file.kind === 'folder' 
                  ? `${files.filter(f => f.parentId === file.id).length} ${t.manageFilesPage.items}` 
                  : file.size
                }
              </span>
              <button
                onClick={(e) => handleContextMenu(e, file)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon path="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" className="w-5 h-5"/>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 text-left">{t.manageFilesPage.name}</th>
              <th className="py-3 px-4 text-left">{t.manageFilesPage.size}</th>
              <th className="py-3 px-4 text-left">{t.manageFilesPage.lastModified}</th>
              <th className="py-3 px-4 text-left">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr
                key={file.id}
                onDoubleClick={() => file.kind === 'folder' && handleNavigate(file)}
                onContextMenu={(e) => handleContextMenu(e, file)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3 max-w-xs">
                    <Icon path={file.icon.path} className={`w-6 h-6 flex-shrink-0 ${file.icon.color}`} />
                    <span className="font-semibold truncate" title={file.name}>{file.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{file.kind === 'folder' ? '—' : file.size}</td>
                <td className="py-3 px-4 text-gray-600">{file.modified}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleContextMenu(e, file); }}
                      className="text-gray-500 hover:text-gray-800 p-2"
                    >
                      <Icon path="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};