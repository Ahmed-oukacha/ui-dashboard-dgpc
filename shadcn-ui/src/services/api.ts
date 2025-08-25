// filepath: shadcn-ui/src/services/api.ts

import { useAuth } from '@clerk/clerk-react';
import { AnyFileItem } from '../types';

const API_URL = 'http://localhost:5001/api';

const getAuthHeaders = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    if (!token) throw new Error("User not authenticated");
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const useApi = () => {
    const { getToken } = useAuth();

    const getDashboardStats = async () => {
        const headers = await getAuthHeaders(getToken);
        const response = await fetch(`${API_URL}/dashboard/stats`, { headers });
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        return data;
    };

    const getContents = async (parentId: string | null): Promise<AnyFileItem[]> => {
        const headers = await getAuthHeaders(getToken);
        const url = parentId ? `${API_URL}/files?parentId=${parentId}` : `${API_URL}/files`;
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch contents');
        const data = await response.json();
        return data as AnyFileItem[];
    };
    
    const createFolder = async (name: string, parentId: string | null): Promise<AnyFileItem> => {
        const headers = await getAuthHeaders(getToken);
        const body = JSON.stringify({ name, parentId });
        const response = await fetch(`${API_URL}/files/folders`, { method: 'POST', headers, body });
        if (!response.ok) throw new Error('Failed to create folder');
        const data = await response.json();
        return data as AnyFileItem;
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
        const data = await response.json();
        return data as AnyFileItem;
    };

    // الإصلاح النهائي: إضافة "getContents" إلى الكائن المُرجع
    return { getDashboardStats, getContents, createFolder, deleteItem, renameItem };
};