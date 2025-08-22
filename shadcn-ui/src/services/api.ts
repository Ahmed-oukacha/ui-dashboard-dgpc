// أنشئ ملفًا جديدًا هنا
// filepath: c:\Users\user\Desktop\workspace\shadcn-ui\src\services\api.ts
import { useAuth } from '@clerk/clerk-react';
import { AnyFileItem } from '../types';

const API_URL = 'http://localhost:5001/api';

// دالة مساعدة للحصول على التوكن وإعداد الهيدرز
const getAuthHeaders = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    if (!token) throw new Error("User not authenticated");
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

// يمكنك استخدام هذا الـ hook في مكوناتك
export const useApi = () => {
    const { getToken } = useAuth();

    const getDashboardStats = async () => {
        const headers = await getAuthHeaders(getToken);
        const response = await fetch(`${API_URL}/dashboard/stats`, { headers });
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    };

    const getContents = async (parentId: string | null): Promise<AnyFileItem[]> => {
        const headers = await getAuthHeaders(getToken);
        const url = parentId ? `${API_URL}/files?parentId=${parentId}` : `${API_URL}/files`;
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch contents');
        return response.json();
    };
    
    const createFolder = async (name: string, parentId: string | null): Promise<AnyFileItem> => {
        const headers = await getAuthHeaders(getToken);
        const body = JSON.stringify({ name, parentId });
        const response = await fetch(`${API_URL}/files/folders`, { method: 'POST', headers, body });
        if (!response.ok) throw new Error('Failed to create folder');
        return response.json();
    };

    const deleteItem = async (id: string, type: 'file' | 'folder') => {
        const headers = await getAuthHeaders(getToken);
        const response = await fetch(`${API_URL}/files/${id}?type=${type}`, { method: 'DELETE', headers });
        if (!response.ok) throw new Error('Failed to delete item');
        return response.json();
    };

    const renameItem = async (id: string, newName: string, type: 'file' | 'folder'): Promise<AnyFileItem> => {
        const headers = await getAuthHeaders(getToken);
        const body = JSON.stringify({ name: newName, type: type });
        const response = await fetch(`${API_URL}/files/${id}`, { method: 'PUT', headers, body });
        if (!response.ok) throw new Error('Failed to rename item');
        return response.json();
    };

    return { getDashboardStats, getContents, createFolder, deleteItem, renameItem };
};