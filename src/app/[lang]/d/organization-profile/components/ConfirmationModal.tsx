import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  message : string;
  onConfirm: () => void;
  confirmText : string;
  onCancel: () => void;
  cancelText : string;
}

export default function ConfirmationModal({ isOpen, message, onConfirm, confirmText, onCancel, cancelText }: ConfirmationModalProps) {
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
    
      if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[300px] text-center">
        <h2 className="font-bree-serif text-black text-lg mb-4">{message}</h2>
        <div className="flex justify-around mt-4">
          <button
            className="font-bree-serif bg-orange hover:bg-orange-600 text-black py-2 px-8 rounded-lg" 
            onClick={onConfirm}>
            {confirmText}
          </button>
          <button
            className="font-bree-serif bg-[#8AABAD] hover:bg-[#AABAD] text-black py-2 px-8 rounded-lg"
            onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
