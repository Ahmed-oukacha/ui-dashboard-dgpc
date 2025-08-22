import { useState } from 'react';
import { ToastState } from '../types';

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  const showToast = (message: string, type: ToastState['type'] = 'info') => {
    setToast({ show: true, message, type });
    // إخفاء الرسالة تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
      setToast(t => t.show ? { ...t, show: false } : t);
    }, 5000);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  return {
    toast,
    showToast,
    hideToast
  };
};