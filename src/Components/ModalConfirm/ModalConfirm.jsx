import './ModalConfirm.css';  

function ModalConfirm({ isOpen, onClose, numeroDoc }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlayConfirm">
    <div className="modalContentConfirm">
      <div className="modalHeaderConfirm">
        <button className="closeButtonConfirm" onClick={onClose}>X</button>
        <p className='messageConfirm'>Cadastro realizado com sucesso!</p>
      {numeroDoc && (
        <p className="numeroDocConfirm">Número da Solicitação: {numeroDoc}</p> // Exibe o NumeroDoc
        )}
      </div>
    </div>
  </div>
)
}
export default ModalConfirm;