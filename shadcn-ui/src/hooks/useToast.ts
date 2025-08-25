// filepath: shadcn-ui/src/hooks/useToast.ts

import { toast } from 'sonner';

// تعريف الأنواع الممكنة للـ Toast
type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'default';

// هذا هو الـ hook المخصص
export const useToast = () => {
  
  // هذه هي الدالة التي ستستخدمها في مكوناتك
  const showToast = (message: string, variant: ToastVariant = 'default') => {
    
    // بناءً على النوع، نستدعي الدالة المناسبة من "sonner"
    switch (variant) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  // الـ hook يُرجع الدالة لتتمكن من استخدامها
  return { showToast };
};