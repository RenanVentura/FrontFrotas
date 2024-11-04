import './home.css';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import icon from '../../assets/lapis.png';

function ListaSolicitacao() {
    const [solicitacao, setSolicitacao] = useState([]);

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
                            <button className='Edit'>
                                <img src={icon} alt="edit" className='Logo' />
                            </button>
                        </div>
                        <div className='bodyCard'>
                            <label>Solicitante: <span>{dados.Solicitante}</span></label>
                            <label>Filial: <span>{dados.Filial}</span></label>
                            <label>Data Solicitação: <span>{dados.DataSolicitacao}</span></label>
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
        </div>
    );
}

export default ListaSolicitacao;
