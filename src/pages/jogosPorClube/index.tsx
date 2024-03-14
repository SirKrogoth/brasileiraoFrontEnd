import { useState, FormEvent, useEffect } from "react";
import { setupAPIClient } from "@/services/api";
import Head from "next/head";
import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";
import { visitante } from "../../utils/visitante";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

type ClubeProps = {
  id: number;
  nome: string;
  estado: string;
  estadio: string;
};

type ClubeJogosProps = {
  Turno: number;
  Horario: string;
  DataJogo: string;
  timeCasa: string;
  timeFora: string;
};

interface iClubesProps {
  clubesList: ClubeProps[];
}

export default function JogosPorClube({ clubesList }: iClubesProps) {
  const [clubes, setClubes] = useState(clubesList);
  const [clubeSelecionado, setClubeSelecionado] = useState(0);
  const [jogosClubeSelecionado, setJogosClubeSelecionado] =
    useState<ClubeJogosProps[]>();

  function handleClubeSelecionado(e: any) {
    e.preventDefault();
    setClubeSelecionado(e.target.value);
  }

  async function handlePesquisarJogos(e: any) {
    e.preventDefault();

    try {
      const apiClient = setupAPIClient();

      const retorno = await apiClient.get(`/getJogosClube/${clubeSelecionado}`);

      setJogosClubeSelecionado(retorno.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (jogosClubeSelecionado !== undefined) {
      console.log(jogosClubeSelecionado);
    }
  }, [jogosClubeSelecionado]);

  return (
    <>
      <Head>
        <title>Jogos por clube</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Listagem de jogos por clube</h1>
          <h5>
            Aqui você irá visualizar a listagem dos jogos por clube.
            <br /> Selecione um clube e veja quais são os seus jogos para cada
            rodada do Brasileirão.
          </h5>

          <form onSubmit={handlePesquisarJogos}>
            <div className={styles.pesquisarClubes}>
              <label>Selecione o clube</label>
              <Form.Select
                value={clubeSelecionado}
                onChange={handleClubeSelecionado}
                className={styles.selecionaClube}
                size="sm"
              >
                {clubes.map((clube) => {
                  return (
                    <option key={clube.id} value={clube.id}>
                      {clube.nome}
                    </option>
                  );
                })}
              </Form.Select>
              <Button
                variant="primary"
                className={styles.botaoPesquisar}
                type="submit"
              >
                Pesquisar
              </Button>
            </div>
          </form>
          <div className={styles.containerTabela}>
            <p className={styles.paragrafo}>
              A tabela abaixo foi desevolvida usando React Bootstrap.
            </p>
            <Table striped bordered hover className={styles.tabela}>
              <thead>
                <tr>
                  <th>Turno</th>
                  <th>Horário</th>
                  <th>Data</th>
                  <th>Clube Casa</th>
                  <th>Clube Fora</th>
                </tr>
              </thead>
              <tbody>
                {jogosClubeSelecionado?.map((jogo, index) => {
                  const dataString = jogo.DataJogo.substring(0, 10);
                  const data = new Date(dataString);

                  const dia = data.getUTCDate().toString().padStart(2, "0");
                  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
                  const ano = data.getFullYear();

                  const dataFormatada = `${dia}/${mes}/${ano}`;

                  return (
                    <tr key={index}>
                      <td>
                        {jogo.Turno === 1
                          ? "Primeiro"
                          : jogo.Turno === 2
                          ? "Segundo"
                          : ""}
                      </td>
                      <td>{jogo.Horario}</td>
                      <td>{dataFormatada}</td>
                      <td>{jogo.timeCasa}</td>
                      <td>{jogo.timeFora}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = visitante(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const res = await apiClient.get("/clubes");

  return {
    props: {
      clubesList: res.data,
    },
  };
});
