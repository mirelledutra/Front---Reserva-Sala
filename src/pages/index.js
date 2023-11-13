import { useEffect, useState } from "react";
import Mensagem from "@/components/Mensage";
import Header from "@/components/Header";
import ReservasTable from "@/components/ReservasTable";
import axios from "axios";
import Container from "@/components/Container";
import Label from "@/components/Label";
import Textarea from "@/components/Textarea";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [mensagem, setMensagem] = useState(null);
  const [mensagemErro, setMensagemErro] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [formularioValues, setFormularioValues] = useState({
    descricao: "",
    solicitante: "",
    salaId: "",
    dataInicio: "",
    dataFim: "",
    aceitaTermos: false,
  });
  const salas = [
    {
      nome: "Sala 1",
    },
    {
      nome: "Sala 2",
    },
    {
      nome: "Sala 3",
    },
    {
      nome: "Sala 4",
    }
  ]
  const handleDescricaoChange = (e) => {
    setFormularioValues({ ...formularioValues, descricao: e.target.value });
  };

  const handleSolicitanteChange = (e) => {
    setFormularioValues({ ...formularioValues, solicitante: e.target.value });
  };

  const handleSalaChange = (e) => {
    setFormularioValues({ ...formularioValues, salaId: e.target.value });
  };

  const handleInicioChange = (e) => {
    setFormularioValues({ ...formularioValues, dataInicio: e.target.value });
  };

  const handleFimChange = (e) => {
    setFormularioValues({ ...formularioValues, dataFim: e.target.value });
  };

  const handleTermosChange = (e) => {
    setFormularioValues({ ...formularioValues, aceitaTermos: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formularioValues.descricao ||
      !formularioValues.solicitante ||
      !formularioValues.salaId ||
      !formularioValues.dataInicio ||
      !formularioValues.dataFim ||
      !formularioValues.aceitaTermos
    ) {
      setMensagemErro({
        type: "error",
        text: "É obrigatório preencher todos os campos!"
      });
      setTimeout(() => {
        setMensagemErro(null);
      }, 2000);
      return;
    }
    try {
      await axios.post("http://localhost:3001/reservas", formularioValues);
      buscarReservas();

      setMensagem({
        type: "success",
        text: "Reserva cadastrada com sucesso!",
      });
      setFormularioValues({
        descricao: "",
        solicitante: "",
        salaId: "",
        dataInicio: "",
        dataFim: "",
        aceitaTermos: false,
      });

    } catch (error) {
      console.error("Erro ao cadastrar reserva", error);
      setMensagemErro({
        type: "error",
        text: "Erro ao cadastrar reserva. Tente novamente",
      });
    }

  };

  async function buscarReservas() {
    axios.get("http://localhost:3001/reservas").then(res => setReservas(res.data)).catch(error => console.log(error))
  }

  function formatarData(data) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', options);


    return dataFormatada.replace(",", "").replace(" ", " às ");
  }

  useEffect(() => {
    buscarReservas()
  }, [])

  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "880px" }}>
        <div
          style={{
            width: "30%",
            backgroundColor: "#E8EAEE",
          }}
        >
          <div style={{ marginBottom: "5 px" }}>
            <div
              style={{
                margin: "10px",
                fontWeight: 600,
              }}
            >
              <label>Reservar sala</label>
            </div>
            {mensagemErro && <Mensagem type="error">{mensagemErro.text}</Mensagem>}
            {mensagem && <Mensagem type="success">{mensagem.text}</Mensagem>}
          </div>

          <Container>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.containerForm}>
                <Label className={styles.labeldesc}>Descrição</Label>
                <Textarea
                  className={styles.descricao}
                  type="text"
                  name="descricao"
                  placeholder="Descreva aqui sua reserva."
                  rows="4"
                  cols="50"
                  value={formularioValues.descricao}
                  onChange={handleDescricaoChange}
                />
              </div>
              <div className={styles.containerForm}>
                <Label className={styles.labelsolic}>Solicitante</Label>
                <Input
                  className={styles.solicitante}
                  tipo="text"
                  name="solicitante"
                  placeholder="Digite o nome do solicitante."
                  value={formularioValues.solicitante}
                  onChange={handleSolicitanteChange}
                />
              </div>
              <div className={styles.containerForm}>
                <Label className={styles.labelsala}>Sala</Label>
                <Select
                  className={styles.salaId}
                  name="salaId"
                  value={formularioValues.salaId}
                  onChange={handleSalaChange}
                  options={salas}
                  placeholder="Selecione uma sala"
                />
              </div>
              <div className={styles.containerForm}>
                <Label className={styles.labelinicio}>Início</Label>
                <Input
                  className={styles.datainicio}
                  type="datetime-local"
                  name="dataInicio"
                  value={formularioValues.dataInicio}
                  onChange={handleInicioChange}
                />
              </div>
              <div className={styles.containerForm}>
                <Label className={styles.labelfim}>Fim</Label>
                <Input
                  className={styles.datafim}
                  type="datetime-local"
                  name="dataFim"
                  value={formularioValues.dataFim}
                  onChange={handleFimChange}
                />
              </div>
              <div className={styles.containerFormCheck}>
                <Input
                  className={styles.check}
                  type="checkbox"
                  name="aceitaTermos"
                  checked={formularioValues.aceitaTermos}
                  onChange={handleTermosChange}
                />
                <Label className={styles.labelcheck}>Concordo com os termos?</Label>
              </div>
              <Button type="submit" className={styles.buttonreserva}>
                Reservar Sala
              </Button>
            </form>
            {mensagem && (
              <Mensagem type={mensagem.type}>{mensagem.text}</Mensagem>
            )}
          </Container>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            width: "70%",
          }}
        >
          <label> 🗓 Reservas realizadas: {reservas.length}</label>
          <ReservasTable reservas={reservas} />


        </div>
      </div>
    </>
  );
}