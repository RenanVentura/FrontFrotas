import './ModalEdit.css';
import React, { useState, useEffect } from 'react';
import Lixo from '../assets/Lixo.png';
import Api from '../Services/api';

const ModalEdit = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                DataEncerrado: initialData.DataEncerrado 
                    ? formatDate(initialData.DataEncerrado) 
                    : formatDate(new Date()), // Define a data atual como valor padrão
            });
        } else {
            setFormData({
                ...formData,
                DataEncerrado: formatDate(new Date()), // Define a data atual como valor padrão
            });
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                ...formData,
                DataEncerrado: formData.DataEncerrado, // Mantém o formato DD/MM/YYYY
            };

            const response = await Api.put(`/solicitacao/${initialData.id}`, updatedData);

            if (response.status === 200 || response.status === 201) {
                console.log("Solicitação atualizada com sucesso:", response.data);
                onSave(response.data);
                onClose();
                window.location.reload(); 
            } else {
                console.error("Resposta inesperada:", response);
            }
        } catch (error) {
            console.error("Erro ao atualizar a solicitação:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-edit">
                <div className="modal-edit-content">
                    <div className="modal-edit-header">
                        <h2 className="modal-edit-title">Editar Solicitação</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="modal-edit-close" onClick={onClose}>&times;</span>
                            <img
                                src={Lixo}
                                alt="Lixeira"
                                className="modal-edit-trash"
                                onClick={onDelete}
                                style={{ width: '24px', height: '24px' }}
                            />
                        </div>
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
                            type="text"
                            name="DataEncerrado"
                            className="modal-edit-input"
                            value={formData.DataEncerrado || ''}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
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
