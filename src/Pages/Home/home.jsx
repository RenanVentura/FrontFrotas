import './home.css';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import icon from '../../assets/lapis.png';
import ModalEdit from '../../Components/ModalEdit/ModalEdit.jsx';
import ModalNotifica from '../../Components/ModalNotifica/ModalNotifica.jsx';
import LoadingModal from '../../Components/ModalLoading/ModalLoading.jsx'; // Importe o modal de carregamento
import Lixo from '../../assets/lixo.png';

function ListaSolicitacao() {
    const [solicitacao, setSolicitacao] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificaOpen, setIsNotificaOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [expandedIds, setExpandedIds] = useState(new Set());
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
    const itemsPerPage = 4;

    // Função para buscar as solicitações
    async function getSolicitacao() {
        setIsLoading(true); // Define como carregando antes da requisição
        try {
            const response = await api.get('/solicitacao');
            setSolicitacao(response.data);
            console.log('Dados de solicitação recebidos:', response.data);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        } finally {
            setIsLoading(false); // Define como não carregando após a requisição
        }
    }

    useEffect(() => {
        getSolicitacao();
    }, []);

    // Filtragem por status
    const filteredSolicitacoes = solicitacao.filter(item => {
        if (statusFilter === '') return true;
        return item.Estado === statusFilter;
    });

    // Paginação
    const totalPages = Math.ceil(filteredSolicitacoes.length / itemsPerPage);
    const currentItems = filteredSolicitacoes.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    // Função para abrir o modal de edição
    const handleEditClick = (dados) => {
        setSelectedData(dados);
        setIsModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsNotificaOpen(true);
    };

    // Função para deletar uma solicitação
    const handleDelete = async () => {
        if (deleteId) {
            try {
                await api.delete(`/solicitacao/${deleteId}`);
                setSolicitacao(prevSolicitacao => 
                    prevSolicitacao.filter(item => item.id !== deleteId)
                );
                console.log("Solicitação deletada:", deleteId);
                setDeleteId(null);
            } catch (error) {
                console.error("Erro ao deletar solicitação:", error);
            }
        }
        setIsNotificaOpen(false);
    };

    // Função para salvar as alterações no modal de edição
    const handleSave = (updatedData) => {
        console.log("Dados salvos:", updatedData);
        setIsModalOpen(false);
    };

    // Função para expandir/ocultar a descrição
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

    return (
        <div className='container'>
            <div className='Cabecalho'>
                <img src={Logo} alt="LogoQually" className='LogoImage' />
            </div>
    
            <div className="filter">
                <label htmlFor="status">Filtrar por Status:</label>
                <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
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
                                <label>Descrição: <span>{dados.Descricao}</span></label>
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
            
            {isLoading && <LoadingModal isLoading={isLoading} />} {/* Modal de carregamento */}

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
