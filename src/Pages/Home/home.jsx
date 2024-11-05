import './home.css';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import icon from '../../assets/lapis.png';
import ModalEdit from '../../Components/ModalEdit/ModalEdit.jsx';
import ModalNotifica from '../../Components/ModalNotifica/ModalNotifica.jsx';
import Lixo from '../../assets/lixo.png';

function ListaSolicitacao() {
    const [solicitacao, setSolicitacao] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificaOpen, setIsNotificaOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [expandedIds, setExpandedIds] = useState(new Set());
    const [statusFilter, setStatusFilter] = useState(''); // Estado para o filtro de status

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

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsNotificaOpen(true);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await api.delete(`/solicitacao/${deleteId}`);
                setSolicitacao(prevSolicitacao => prevSolicitacao.filter(item => item.id !== deleteId));
                console.log("Solicitação deletada:", deleteId);
                setDeleteId(null);
            } catch (error) {
                console.error("Erro ao deletar solicitação:", error);
            }
        }
        setIsNotificaOpen(false);
    };

    const handleSave = (updatedData) => {
        console.log("Dados salvos:", updatedData);
        setIsModalOpen(false);
    };

    const toggleExpand = (id) => {
        setExpandedIds(prev => {
            const newExpandedIds = new Set(prev);
            if (newExpandedIds.has(id)) {
                newExpandedIds.delete(id);
            } else {
                newExpandedIds.add(id);
            }
            return newExpandedIds;
        });
    };

    // Filtragem por status
    const filteredSolicitacoes = solicitacao.filter(item => {
        if (statusFilter === '') return true; // Retorna todos se não houver filtro
        return item.Estado === statusFilter; // Filtra com base no status
    });

    // Paginação
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredSolicitacoes.length / itemsPerPage);
    const currentItems = filteredSolicitacoes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='container'>
            <div className='Cabecalho'>
                <img src={Logo} alt="LogoQually" className='LogoImage' />
            </div>
    
          
            <div className="filter">
                <label htmlFor="status">Filtrar por Status:</label>
                <select id="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Encerrado">Encerrado</option>
                </select>
            </div>

            <div className="containerCards">
                {currentItems.map(dados => (
                    <div key={dados.id} className="cards">
                        <div className='CardHeader'>
                            <h2 className='CardTitle'>{dados.Equipamento}</h2>
                            <div className="CardActions">
                                <button className='Edit' onClick={() => handleEditClick(dados)}>
                                    <img src={icon} alt="edit" className='Logo' />
                                </button>
                                <button className='Delete' onClick={() => handleDeleteClick(dados.id)}>
                                    <img src={Lixo} alt="delete" className='Logo' />
                                </button>
                            </div>
                        </div>
                        <div className='bodyCard'>
                            <label>Status: <span>{dados.Estado}</span></label>
                            <label>Data Encerrado: <span>{dados.DataEncerrado}</span></label>
                            <label>Solicitante: <span>{dados.Solicitante}</span></label>
                            <label>Filial: <span>{dados.Filial}</span></label>
                            <label>Data Solicitação: <span>{dados.DataSolicitacao}</span></label>
                            <label>Data Emissão: <span>{dados.DataEmissao}</span></label>
                            <label>Tipo de Serviço: <span>{dados.TipoServ}</span></label>
                            <label>Serviço/Item: <span>{dados.Servico}</span></label>
                            <label>Urgência: <span>{dados.Urgencia}</span></label>
                            {expandedIds.has(dados.id) ? (
                                <label>Descrição: <span>{dados.Descricao}</span></label>
                            ) : (
                                <label>Descrição: <span>{dados.Descricao.slice(0, 100)}...</span></label>
                            )}
                            {dados.Descricao.length > 100 && !expandedIds.has(dados.id) && (
                                <button className='show-more' onClick={() => toggleExpand(dados.id)}>
                                    Mostrar Mais
                                </button>
                            )}
                            {expandedIds.has(dados.id) && (
                                <button className='show-more' onClick={() => toggleExpand(dados.id)}>
                                    Mostrar Menos
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
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
            {isNotificaOpen && (
                <ModalNotifica
                    isOpen={isNotificaOpen}
                    onClose={() => setIsNotificaOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}
export default ListaSolicitacao;