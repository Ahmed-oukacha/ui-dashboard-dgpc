// هذا هو الهيكل الصحيح لأنواع البيانات في مشروعك.

// الخصائص الأساسية المشتركة بين الملفات والمجلدات
interface BaseItem {
  _id: string; // المعرف الفريد من قاعدة بيانات MongoDB
  name: string;
  parentFolder: string | null;
  createdAt: string;
  updatedAt: string;
  itemType: 'file' | 'folder';
}

// واجهة المجلد
export interface FolderItem extends BaseItem {
  itemType: 'folder';
}

// واجهة الملف
export interface FileItem extends BaseItem {
  itemType: 'file';
  size: number;
  type: string; // Mime type e.g., 'image/png'
  storageUrl: string;
}

// نوع موحد يمكن أن يكون إما ملفًا أو مجلدًا
export type AnyFileItem = FileItem | FolderItem;

// لمسار التنقل (Breadcrumbs)
export interface PathItem {
  id: string | null;
  name: string;
}

// لإدارة حالة المودالات (النوافذ المنبثقة)
export interface ModalState {
  type: 'newFolder' | 'rename' | 'delete' | 'preview' | null;
  item: AnyFileItem | null;
}

// لحالة رسائل التنبيه (Toast)
export interface ToastState {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

// أنواع أخرى
export type Language = 'ar' | 'fr' | 'en';
export type ViewType = 'grid' | 'list';