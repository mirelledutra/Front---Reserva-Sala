import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios"
import Input from "../Input/index";

export default function Formulario() {

  const [exibirMensagem , setExibirMensagem] = useState('')
  const [reserva, setReserva] = useState({
    descricao: "",
    solicitante: "",
    salaId: "",
    dataInicio: "",
    dataFim: "",
    aceitaTermos: false,
  });
  function limpar() {
    setReserva({
      descricao: "",
      solicitante: "",
      salaId: "",
      dataInicio: "",
      dataFim: "",
      aceitaTermos: false,
    });
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({
      ...prevReserva,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/reservas', reserva)
      .then((response) => {
        console.log("Reserva cadastrada com sucesso!",response.data);

        limpar();
        setReserva({
          descricao: '',
          solicitante: '',
          salaId: '',
          dataInicio: '',
          dataFim: '',
          aceitaTermos: false,
        });
      })
    
      .catch((error) => {
        console.error("Erro ao cadastrar reserva", error);
       
      });
  };


  const [salas, setSalas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/salas")
      .then((response) => response.json())
      .then((data) => setSalas(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReserva((prevReserva) => ({
      ...prevReserva,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.titulo}>Reservar Sala</div>
          <div className={styles.titulo1}>Reservas Realizadas</div>
          <div>
            <div className={styles.mensagem}>
              {exibirMensagem && <p>{mensagem}</p>}
            </div>
            <div>
              <p>
                <label className={styles.labeldesc}>Descrição</label>
                <textarea
                  className={styles.descricao}
                  type="text"
                  name="descricao"
                  placeholder="Descreva aqui sua reserva."
                  rows="4"
                  cols="50"
                  value={reserva.descricao}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label className={styles.labelsolic}>Solicitante</label>
                <Input
                  className={styles.solicitante}
                  tipo="text"
                  name="solicitante"
                  placeholder="Digite o nome do solicitante."
                  value={reserva.solicitante}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="salaId" className={styles.labelsala}>
                  Sala
                </label>
                <select
                  className={styles.salaId}
                  name="salaId"
                  value={reserva.salaId}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma sala</option>
                  {salas.map((sala) => (
                    <option key={sala.id} value={sala.id}>
                      {sala.nome}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <label className={styles.labelinicio}>Início</label>
                <input
                  className={styles.datainicio}
                  type="color"
                  name="dataInicio"
                  value={reserva.dataInicio}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label className={styles.labelfim}>Fim</label>
                <input
                  className={styles.datafim}
                  type="date"
                  name="dataFim"
                  value={reserva.dataFim}
                  onChange={handleChange}
                />
              </p>
              <p>
                <input
                  className={styles.check}
                  type="checkbox"
                  name="aceitaTermos"
                  checked={reserva.aceitaTermos}
                  onChange={handleChange}
                />
                <label className={styles.labelcheck}>
                  Concordo com os termos?
                </label>
              </p>
              <button className={styles.buttonreserva} type="submit">
                Reservar Sala
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
