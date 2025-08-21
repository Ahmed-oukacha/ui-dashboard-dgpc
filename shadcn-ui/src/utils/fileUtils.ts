import { FileItem } from '../types';

export const getFileInfo = (item: FileItem) => {
  const { kind, mimeType } = item;
  
  if (kind === 'folder') {
    return { 
      type: 'Folder', 
      path: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", 
      color: "text-yellow-500" 
    };
  }
  
  if (mimeType) {
    if (mimeType.includes('pdf')) {
      return { 
        type: 'PDF', 
        path: "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zM18 14H14v-4h4v4z", 
        color: "text-red-500" 
      };
    }
    if (mimeType.includes('word')) {
      return { 
        type: 'Word', 
        path: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z", 
        color: "text-blue-500" 
      };
    }
    if (mimeType.includes('sheet') || mimeType.includes('excel')) {
      return { 
        type: 'Excel', 
        path: "M14 2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z", 
        color: "text-emerald-500" 
      };
    }
    if (mimeType.includes('plain')) {
      return { 
        type: 'Text', 
        path: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM15 16H9v-2h6v2zm0-4H9v-2h6v2z", 
        color: "text-gray-500" 
      };
    }
  }
  
  return { 
    type: 'File', 
    path: "M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm0 18V4h12v16H6z", 
    color: "text-gray-500" 
  };
};

export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};