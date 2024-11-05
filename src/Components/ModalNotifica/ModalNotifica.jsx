import React from 'react';
import './ModalNotifica.css'; 

const ModalDeletar = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmação de Deleção</h2>
        <p>Deseja deletar este item?</p>
        <div className="modal-actions">
          <button onClick={handleConfirm}>Sim</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletar;