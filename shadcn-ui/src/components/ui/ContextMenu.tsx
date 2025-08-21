import { useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { TranslationStrings } from '../../types/translations';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
  t: TranslationStrings;
}

export const ContextMenu = ({ x, y, isOpen, onClose, onRename, onDelete, t }: ContextMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      style={{ top: y, left: x }}
      className="absolute bg-white shadow-lg rounded-md py-2 z-50 w-40"
    >
      <button
        onClick={onRename}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
      >
        <Icon path="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" className="w-5 h-5" />
        {t.rename}
      </button>
      <button
        onClick={onDelete}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-red-600"
      >
        <Icon path="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" className="w-5 h-5" />
        {t.delete}
      </button>
    </div>
  );
};