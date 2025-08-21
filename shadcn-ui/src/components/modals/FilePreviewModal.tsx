import { Modal } from './Modal';
import { Icon } from '../ui/Icon';
import { FileItem } from '../../types';
import { TranslationStrings } from '../../types/translations';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationStrings;
  item: FileItem | null;
}

export const FilePreviewModal = ({ isOpen, onClose, t, item }: FilePreviewModalProps) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.filePreview}>
      <div className="flex flex-col items-center">
        <Icon path={item.icon.path} className={`w-32 h-32 ${item.icon.color}`} />
        <p className="text-lg font-bold mt-4 break-all">{item.name}</p>
        <p className="text-gray-600">{item.icon.type}</p>
        <p className="text-gray-500 text-sm mt-2">{item.size} - {item.modified}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700"
        >
          {t.close}
        </button>
      </div>
    </Modal>
  );
};