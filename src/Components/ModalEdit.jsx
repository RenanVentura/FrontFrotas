import './ModalEdit.css';
import React, { useState, useEffect } from 'react';

const ModalEdit = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                DataEncerrado: initialData.DataEncerrado ? initialData.DataEncerrado.split('T')[0] : '',
            });
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            DataEncerrado: formData.DataEncerrado ? new Date(formData.DataEncerrado).toISOString() : null,
        };

        onSave(updatedData);
        onClose();
    };

    return (
         <form onSubmit={handleSubmit}>
        <div className="modal-edit">
            <div className="modal-edit-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h2 className="modal-edit-title">Editar Solicitação</h2>
                    <span className="modal-edit-close" onClick={onClose}>&times;</span>
                </div>
                
               
                    <label className="modal-edit-label">
                        Status:
                        <input
                            type="text"
                            name="Estado"
                            className="modal-edit-input"
                            value={formData.Estado || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Data Encerrado:
                        <input
                            type="date"
                            name="DataEncerrado"
                            className="modal-edit-input"
                            value={formData.DataEncerrado || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="modal-edit-label">
                        Equipamento:
                        <input
                            type="text"
                            name="Equipamento"
                            className="modal-edit-input"
                            value={formData.Equipamento || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Solicitante:
                        <input
                            type="text"
                            name="Solicitante"
                            className="modal-edit-input"
                            value={formData.Solicitante || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Filial:
                        <input
                            type="text"
                            name="Filial"
                            className="modal-edit-input"
                            value={formData.Filial || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="modal-edit-label">
                        Tipo de Serviço:
                        <input
                            type="text"
                            name="TipoServ"
                            className="modal-edit-input"
                            value={formData.TipoServ || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Serviço/Item:
                        <input
                            type="text"
                            name="Servico"
                            className="modal-edit-input"
                            value={formData.Servico || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Urgência:
                        <input
                            type="text"
                            name="Urgencia"
                            className="modal-edit-input"
                            value={formData.Urgencia || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="modal-edit-label">
                        Descrição:
                        <textarea
                            name="Descricao"
                            className="modal-edit-textarea"
                            value={formData.Descricao || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    
                    <button type="submit" className="modal-edit-button">Salvar</button>
              
            </div>
        </div>
        </form>
    );
};

export default ModalEdit;
