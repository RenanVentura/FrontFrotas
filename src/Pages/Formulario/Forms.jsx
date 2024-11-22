import React, { useRef, useState } from 'react';
import './Forms.css';
import Logo from '../../assets/Logo Qually-Sem fundo LetraPreta.png';
import api from '../../Services/api';
import ModalLoading from '../../Components/ModalLoading/ModalLoading.jsx';
import ModalConfirm from '../../Components/ModalConfirm/ModalConfirm.jsx';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [numeroDoc, setNumeroDoc] = useState(null); // Estado para armazenar o NumeroDoc gerado

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
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

    setIsLoading(true);

    const parsedDataSolicitacao = formatDate(parseDate(dataSolicitacao));
    const dataEmissao = formatDate(new Date());

    try {
      // Obtém o maior NumeroDoc já cadastrado
      const response = await api.get('/solicitacao');
      const solicitacoes = response.data || [];
      const maxNumeroDoc = solicitacoes.reduce((max, solicitacao) => {
        return solicitacao.NumeroDoc > max ? solicitacao.NumeroDoc : max;
      }, 0);
      const newNumeroDoc = maxNumeroDoc + 1;

      // Cadastra a nova solicitação
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
        DataEncerrado: "",
        StatusDelete: true,
        NumeroDoc: newNumeroDoc
      });

      setNumeroDoc(newNumeroDoc); // Define o NumeroDoc para exibição no modal
      setIsConfirmOpen(true); // Abre o modal de confirmação

      // Limpa os campos do formulário
      inputSolicitante.current.value = '';
      inputFilial.current.value = 'Selecione';
      inputTipoServico.current.value = 'Selecione';
      inputServico.current.value = '';
      inputEquipamento.current.value = '';
      inputUrgencia.current.value = 'Selecione';
      inputObs.current.value = '';
    } catch (error) {
      console.error("Erro ao cadastrar a solicitação:", error);
      alert("Ocorreu um erro ao cadastrar a solicitação.");
    } finally {
      setIsLoading(false);
    }
  }

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div className="container">
      <ModalLoading isLoading={isLoading} />
      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={closeConfirmModal}
        numeroDoc={numeroDoc} // Passa o NumeroDoc para o modal
      />
      <div className="Cabecalho">
        <img src={Logo} alt="LogoQually" className="LogoImage" />
      </div>
      <form>
        <h1>Solicitação de Serviço</h1>
        <span>Solicitante:</span>
        <input name="solicitante" type="text" ref={inputSolicitante} />
        <span>Data da Solicitação:</span>
        <input
          name="datasolicitacao"
          type="text"
          value={dataSolicitacao}
          onChange={(e) => setDataSolicitacao(e.target.value)}
          placeholder="DD/MM/AAAA"
        />
        <span>Filial:</span>
        <select name="filial" ref={inputFilial}>
          <option>Selecione</option>
          <option value="Qually Matriz">Qually Matriz</option>
          <option value="Qually Bahia">Qually Bahia</option>
          <option value="Qually Ceara">Qually Ceara</option>
          <option value="Qually Paraiba">Qually Paraiba</option>
          <option value="Isaac Grama">Isaac Grama</option>
          <option value="Isaac Cereais">Isaac Cereais</option>
          <option value="Isaac Feno">Isaac Feno</option>
        </select>
        <span>Tipo de Serviço:</span>
        <select name="tipoServ" ref={inputTipoServico}>
          <option>Selecione</option>
          <option value="Mecanico">Mecânico</option>
          <option value="Eletrico">Elétrico</option>
          <option value="Boracheiro">Borracharia</option>
        </select>
        <span>Serviço/Peça:</span>
        <input name="servico" type="text" ref={inputServico} />
        <span>Equipamento:</span>
        <input name="equipamento" type="text" ref={inputEquipamento} />
        <span>Urgência:</span>
        <select name="urgencia" ref={inputUrgencia}>
          <option>Selecione</option>
          <option value="Urgente">Urgente</option>
          <option value="Corretiva">Corretiva</option>
          <option value="Programada">Programada</option>
        </select>
        <span>Descrição:</span>
        <textarea rows={4} cols={50} className="Descricao" ref={inputObs}></textarea>
        <button type="button" onClick={sendInfo}>
          Finalizar Solicitação
        </button>
      </form>
    </div>
  );
}

export default Forms;