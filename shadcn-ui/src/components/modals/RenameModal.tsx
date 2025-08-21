import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { TranslationStrings } from '../../types/translations';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  t: TranslationStrings;
  currentName: string;
}

export const RenameModal = ({ isOpen, onClose, onSubmit, t, currentName }: RenameModalProps) => {
  const [name, setName] = useState(currentName);
  
  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.renameItem}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300"
          >
            {t.manageFilesPage.cancel}
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700"
          >
            {t.rename}
          </button>
        </div>
      </form>
    </Modal>
  );
};