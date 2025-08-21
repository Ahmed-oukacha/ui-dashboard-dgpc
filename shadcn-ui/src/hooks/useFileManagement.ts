import { useState, useMemo } from 'react';
import { FileItem } from '../types';
import { getFileInfo, formatFileSize } from '../utils/fileUtils';

export const useFileManagement = () => {
  const initialFiles = useMemo(() => [
    { id: 'folder-1', parentId: 'root', kind: 'folder' as const, name: 'Projects', modified: '2025-08-18' },
    { id: 'file-1', parentId: 'root', kind: 'file' as const, name: 'annual-report.docx', size: '5.4 MB', modified: '2025-08-09', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { id: 'file-2', parentId: 'root', kind: 'file' as const, name: 'quarterly-budget.xlsx', size: '800 KB', modified: '2025-07-30', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { id: 'file-3', parentId: 'folder-1', kind: 'file' as const, name: 'project-alpha.pdf', size: '2.1 MB', modified: '2025-08-15', mimeType: 'application/pdf' },
  ].map(f => ({ ...f, icon: getFileInfo(f) })), []);

  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const handleFileUpload = (newFiles: FileList, parentId: string) => {
    const newFileObjects = Array.from(newFiles).map(file => {
      const fileObject: FileItem = {
        id: `${file.name}-${Date.now()}`,
        parentId,
        kind: 'file',
        name: file.name,
        size: formatFileSize(file.size),
        modified: new Date().toISOString().split('T')[0],
        mimeType: file.type,
        icon: { type: '', path: '', color: '' }
      };
      return { ...fileObject, icon: getFileInfo(fileObject) };
    });
    setFiles(prevFiles => [...newFileObjects, ...prevFiles]);
  };

  const handleRenameFile = (fileId: string, newName: string) => {
    setFiles(files => files.map(file => 
      file.id === fileId ? { ...file, name: newName } : file
    ));
  };

  const handleDeleteFile = (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;

    const idsToDelete = [fileId];
    if (fileToDelete.kind === 'folder') {
      const getChildIds = (folderId: string) => {
        const children = files.filter(f => f.parentId === folderId);
        children.forEach(child => {
          idsToDelete.push(child.id);
          if (child.kind === 'folder') {
            getChildIds(child.id);
          }
        });
      };
      getChildIds(fileId);
    }
    setFiles(prevFiles => prevFiles.filter(file => !idsToDelete.includes(file.id)));
  };

  const handleNewFolder = (name: string, parentId: string) => {
    const newFolder: FileItem = {
      id: `folder-${Date.now()}`,
      parentId,
      kind: 'folder',
      name,
      modified: new Date().toISOString().split('T')[0],
      icon: { type: '', path: '', color: '' }
    };
    newFolder.icon = getFileInfo(newFolder);
    setFiles(prevFiles => [newFolder, ...prevFiles]);
  };

  return {
    files,
    handleFileUpload,
    handleRenameFile,
    handleDeleteFile,
    handleNewFolder
  };
};