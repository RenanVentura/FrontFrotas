import './ModalLoading.css'
import React from 'react';

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-modal">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}


export default LoadingModal;
