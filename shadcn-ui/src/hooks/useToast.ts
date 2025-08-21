import { useState } from 'react';
import { ToastState } from '../types';

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
  };

  return {
    toast,
    showToast,
    hideToast
  };
};