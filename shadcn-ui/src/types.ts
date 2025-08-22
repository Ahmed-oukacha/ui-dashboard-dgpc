export type Language = 'en' | 'fr' | 'ar';

// النوع الأساسي للملفات والمجلدات
interface BaseItem {
  _id: string; // من MongoDB
  name: string;
  createdAt: string;
  updatedAt: string;
  itemType: 'file' | 'folder';
}

// نوع المجلد
export interface FolderItem extends BaseItem {
  itemType: 'folder';
}

// نوع الملف
export interface FileItem extends BaseItem {
  itemType: 'file';
  size: number;
  type: string; // Mime type
  storageUrl: string;
}

// نوع موحد للتعامل مع أي عنصر في القائمة
export type AnyFileItem = FolderItem | FileItem;

// نوع مسار التنقل (Breadcrumb)
export interface PathItem {
  id: string | null;
  name: string;
}

// نوع حالة المودال
export interface ModalState {
  type: 'newFolder' | 'rename' | 'delete' | 'preview' | null;
  item: AnyFileItem | null;
}