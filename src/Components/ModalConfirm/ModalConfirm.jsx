import './ModalConfirm.css';  

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <button className="closeButton" onClick={onClose}>X</button>
          <p className='menssage'>Cadastrado com sucesso!</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
