import styles from "./styles.module.scss";
import Head from "next/head";
import { Header } from "../../../components/Header";
import { setupAPIClient } from "../../services/api";
import { useState, FormEvent, ChangeEvent } from "react";
import { visitante } from "@/utils/visitante";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";

type ClubeProps = {
  id: number;
  nome: string;
  escudo: string;
};

interface clubesProps {
  clubeList: ClubeProps[];
}

export default function AtualizarEscudo({ clubeList }: clubesProps) {
  const [clubes, setClubesList] = useState(clubeList);

  async function handleFile(e: ChangeEvent<HTMLInputElement>, id: number) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const resposta = confirm("Você realmente deseja salvar este escudo?");

      if (resposta === true) {
        const data = new FormData();

        data.append("id", id.toString());
        data.append("file", image);

        const apiClient = setupAPIClient();

        await apiClient.post("/updateEscudoClube", data);

        const listaAtualizadaClubes = await buscarClubes();

        setClubesList(listaAtualizadaClubes.data);

        toast.success("Escuto atualizado com sucesso");
        return;
      } else {
        toast.error("Não foi possivel atualizar escudo.");
        return;
      }
    }
  }

  async function buscarClubes(){
    const apiClient = setupAPIClient(); 

    return await apiClient("/clubes");
  }

  return (
    <>
      <Head>
        <title>Atualizar escudo clubes</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Atualização de escudos dos clubes</h1>
          <h5>Campeonato Brasileiro 2024</h5>

          <form className={styles.form}>
            <div className={styles.components}>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Escudo</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {clubes.map((clube, index) => {
                    return (
                      <tr key={clube.id}>
                        <td width={200}>{clube.nome}</td>
                        <td className={styles.escudo} width={80}>
                          {clube.escudo && (
                            <img
                              className={styles.preview}
                              src={"http://192.168.2.102:8081/" + clube.escudo}
                              width={50}
                              height={50}
                            />
                          )}
                        </td>
                        <td width={80}>
                          <label  className={styles.upload}>
                            <span>
                              <FiUpload size={25} color="#000" />
                            </span>
                            <input
                              type="file"
                              accept="image/png, image/jpg"
                              onChange={(e) => handleFile(e, clube.id)}
                            />
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = visitante(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const res = await apiClient("/clubes");

  return {
    props: {
      clubeList: res.data,
    },
  };
});
