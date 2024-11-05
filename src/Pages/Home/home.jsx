import './home.css';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import icon from '../../assets/lapis.png';
import ModalEdit from '../../Components/ModalEdit/ModalEdit.jsx';
import Lixo from '../../assets/lixo.png';

function ListaSolicitacao() {
    const [solicitacao, setSolicitacao] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    async function getSolicitacao() {
        try {
            const response = await api.get('/solicitacao');
            setSolicitacao(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        }
    }

    useEffect(() => {
        getSolicitacao();
    }, []);

    const handleEditClick = (dados) => {
        setSelectedData(dados);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/solicitacao/${id}`); 
            setSolicitacao(prevSolicitacao => prevSolicitacao.filter(item => item.id !== id));
            console.log("Solicitação deletada:", id);
        } catch (error) {
            console.error("Erro ao deletar solicitação:", error);
        }
    };

    const handleSave = (updatedData) => {
        console.log("Dados salvos:", updatedData);
        setIsModalOpen(false);
    };

    return (
        <div className='container'>
            <div className='Cabecalho'>
                <img src={Logo} alt="LogoQually" className='LogoImage' />
            </div>
            <div className="containerCards">
                {solicitacao.map(dados => (
                    <div key={dados.id} className="cards">
                        <div className='CardHeader'>
                            <h2 className='CardTitle'>{dados.Equipamento}</h2>
                            <div className="CardActions">
                                <button className='Edit' onClick={() => handleEditClick(dados)}>
                                    <img src={icon} alt="edit" className='Logo' />
                                </button>
                                <button className='Delete' onClick={() => handleDelete(dados.id)}>
                                    <img src={Lixo} alt="delete" className='Logo' />
                                </button>
                            </div>
                        </div>
                        <div className='bodyCard'>
                            <label>Solicitante: <span>{dados.Solicitante}</span></label>
                            <label>Filial: <span>{dados.Filial}</span></label>
                            <label>Data Solicitação: <span>{dados.DataSolicitacao}</span></label>
                            <label>Data Emissão: <span>{dados.DataEmissao}</span></label>
                            <label>Tipo de Serviço: <span>{dados.TipoServ}</span></label>
                            <label>Serviço/Item: <span>{dados.Servico}</span></label>
                            <label>Urgência: <span>{dados.Urgencia}</span></label>
                            <label>Descrição: <span>{dados.Descricao}</span></label>
                            <label>Status: <span>{dados.Estado}</span></label>
                            <label>Data Encerrado: <span>{dados.DataEncerrado}</span></label>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <ModalEdit
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialData={selectedData}
                />
            )}
        </div>
    );
}

export default ListaSolicitacao;
