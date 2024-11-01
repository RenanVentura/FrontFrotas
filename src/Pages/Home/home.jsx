import './home.css';
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import icon from '../../assets/lapis.png';

function ListaSolicitacao() {


    return (
        <div className='container'>
            <div className='Cabecalho'>
                <img src={Logo} alt="LogoQually" className='LogoImage' />
            </div>
            <div className="containerCards">
                <div className="cards">
                    <div className='CardHeader'>
                        <h2 className='CardTitle'>Equipamento</h2>
                        <button className='Edit'><img src={icon} alt="edit" className='Logo' /></button>
                    </div>
                    <div className='bodyCard'>
                        <label>Solicitante: </label>
                        <label>Filial: </label>
                        <label>Data Solicitação: </label>
                        <label>Tipo de Serviço: </label>
                        <label>Serviço/Tipo</label>
                        <label>Urgencia: </label>
                        <label>Descrição:</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaSolicitacao;
