// filepath: shadcn-ui/src/hooks/useFileManagement.ts

import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../services/api';
import { AnyFileItem } from '../types';

export const useFileManagement = (parentId: string | null) => {
  const [files, setFiles] = useState<AnyFileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getContents } = useApi();

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contents = await getContents(parentId);
      
      if (Array.isArray(contents)) {
        // الإصلاح النهائي: تم وضع "contents" داخل دالة لتجنب خطأ TypeScript
        setFiles(() => contents);
      } else {
        setFiles([]);
        console.warn("Received non-array data from getContents:", contents);
      }

    } catch (err: any) {
      setError(err);
      setFiles([]); // أفرغ الملفات عند حدوث خطأ
    } finally {
      setIsLoading(false);
    }
  }, [parentId, getContents]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, isLoading, error, refresh: fetchFiles };
};