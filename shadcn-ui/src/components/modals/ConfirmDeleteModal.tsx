import { Modal } from './Modal';
import { FileItem } from '../../types';
import { TranslationStrings } from '../../types/translations';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  t: TranslationStrings;
  item: FileItem | null;
}

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, t, item }: ConfirmDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.confirmDeletion}>
      <p>{t.deleteWarning}</p>
      {item?.kind === 'folder' && (
        <p className="mt-2 font-semibold text-red-600">{t.deleteFolderWarning}</p>
      )}
      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300"
        >
          {t.manageFilesPage.cancel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700"
        >
          {t.delete}
        </button>
      </div>
    </Modal>
  );
};