export interface FileItem {
  id: string;
  parentId: string;
  kind: 'file' | 'folder';
  name: string;
  size?: string;
  modified: string;
  mimeType?: string;
  icon: {
    type: string;
    path: string;
    color: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'invited';
  joined: string;
  avatar: string;
}

export interface PathItem {
  id: string;
  name: string;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  item: FileItem | null;
}

export interface ModalState {
  type: 'newFolder' | 'rename' | 'delete' | 'preview' | null;
  item: FileItem | null;
}

export interface ToastState {
  show: boolean;
  message: string;
}

export type Language = 'ar' | 'fr' | 'en';
export type ViewType = 'grid' | 'list';