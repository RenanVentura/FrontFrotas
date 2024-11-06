import './ModalConfirm.css';  

function ModalConfirm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlayConfirm">
      <div className="modalContentConfirm">
        <div className="modalHeaderConfirm">
          <button className="closeButtonConfirm" onClick={onClose}>X</button>
          <p className='messageConfirm'>Cadastro realizado com sucesso!</p>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
