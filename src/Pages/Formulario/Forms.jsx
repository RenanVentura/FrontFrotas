import React, { useRef, useState } from 'react';
import './Forms.css';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import api from '../../Services/api';

function Forms() {
  const inputSolicitante = useRef();
  const inputFilial = useRef();
  const inputTipoServico = useRef();
  const inputServico = useRef();
  const inputEquipamento = useRef();
  const inputUrgencia = useRef();
  const inputObs = useRef();
  

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  const [dataSolicitacao, setDataSolicitacao] = useState(formatDate(new Date()));

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  async function sendInfo() {
    if (
      !inputSolicitante.current.value ||
      !dataSolicitacao ||
      !inputServico.current.value ||
      !inputEquipamento.current.value ||
      !inputObs.current.value ||
      inputTipoServico.current.value === 'Selecione' ||
      inputFilial.current.value === 'Selecione' ||
      inputUrgencia.current.value === 'Selecione'
    ) {
      alert('Por favor, preencha todos os campos corretamente!');
      return;
    }
  
    const parsedDataSolicitacao = formatDate(parseDate(dataSolicitacao));
    const dataEmissao = formatDate(new Date());
  
    await api.post('/solicitacao', {
      Solicitante: inputSolicitante.current.value,
      Filial: inputFilial.current.value,
      TipoServ: inputTipoServico.current.value,
      Servico: inputServico.current.value,
      Equipamento: inputEquipamento.current.value,
      Urgencia: inputUrgencia.current.value,
      Descricao: inputObs.current.value,
      DataSolicitacao: parsedDataSolicitacao,
      DataEmissao: dataEmissao,
      Estado: 'Pendente',
      DataEncerrado: ""
    });
  
    alert('Cadastrado!');

    inputSolicitante.current.value = '';
    inputFilial.current.value = 'Selecione';
    inputTipoServico.current.value = 'Selecione';
    inputServico.current.value = '';
    inputEquipamento.current.value = '';
    inputUrgencia.current.value = 'Selecione';
    inputObs.current.value = '';
  }

  return (
    <div className='container'>
      <div className='Cabecalho'>
        <img src={Logo} alt="LogoQually" className='LogoImage' />
      </div>
      <form>
        <h1>Solicitação de Serviço</h1>
        Solicitante:
        <input name="solicitante" type='text' ref={inputSolicitante} />
        Data da Solicitação:
        <input
          name="datasolicitacao"
          type='text'
          value={dataSolicitacao}
          onChange={(e) => setDataSolicitacao(e.target.value)}
          placeholder="DD/MM/AAAA"
        />
        Filial:
        <select name="filial" ref={inputFilial}>
          <option>Selecione</option>
          <option value="Qually Matriz">Qually Matriz</option>
          <option value="Qually Bahia">Qually Bahia</option>
          <option value="Qually Ceara">Qually Ceara</option>
          <option value="Qually Paraiba">Qually Paraiba</option>
          <option value="Isaac Cereais">Isaac Cereais</option>
          <option value="Isaac Feno">Isaac Feno</option>
        </select>
        Tipo de Serviço:
        <select name="tipoServ" ref={inputTipoServico}>
          <option>Selecione</option>
          <option value="Mecanico">Mecânico</option>
          <option value="Eletrico">Elétrico</option>
          <option value="Boracheiro">Borracharia</option>
        </select>
        Serviço/Peça:
        <input name="servico" type='text' ref={inputServico} />
        Equipamento:
        <input name="equipamento" type='text' ref={inputEquipamento} />
        Urgência:
        <select name="urgencia" ref={inputUrgencia}>
          <option>Selecione</option>
          <option value="urgente">Urgente</option>
          <option value="corretiva">Corretiva</option>
          <option value="programada">Programada</option>
        </select>
        Descrição:
        <textarea rows={4} cols={50} className='Descricao' ref={inputObs}></textarea>

        <button type='button' onClick={sendInfo}>Finalizar Solicitação</button>
      </form>
    </div>
  );
}

export default Forms;
