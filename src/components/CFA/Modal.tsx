import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button className="text-gray-500 hover:text-gray-700 float-right" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl mb-4 font-bold">Choisissez un type de contrat</h2>
        <div className='flex'>
          <a className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-800 text-center" href="/nouveau-contrat/Apprentissage">Contrat d'apprentissage</a>
          <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800 text-center" href=''>Contrat de profesionalisation</a>
        </div>
      </div>
    </div>
  );
};

export default Modal;