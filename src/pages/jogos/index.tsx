import styles from "./styles.module.scss";
import Head from "next/head";
import { Header } from "../../../components/Header";
import { setupAPIClient } from '../../services/api';
import { useState, FormEvent } from "react";
import { visitante } from "@/utils/visitante";
import { toast } from 'react-toastify';

type ClubeProps = {
    id: number;
    nome: string;
    estado: string;
    estadio: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

interface ClubesProps{
    clubesList: ClubeProps[];
} 

export default function Jogos({ clubesList }: ClubesProps) {
    const [clubes, setClubesList] = useState(clubesList);
    const [clubeCasaSelected, setClubeCasaSelected] = useState(0);
    const [clubeForaSelected, setClubeForaSelected] = useState(0);
    
    const [dataJogo, setDataJogo] = useState('');
    const [horaJogo, setHoraJogo] = useState('');
    const [rodadaJogo, setRodadaJogo] = useState(0);
    const [turnoSelected, setTurnoJogo] = useState(0);


    function handleChangeClubeCasa(event: any){
        event.preventDefault();
        setClubeCasaSelected(event.target.value);
    }

    function handleChangeClubeFora(event: any){
        event.preventDefault();
        setClubeForaSelected(event.target.value);
    }

    async function handleAdicionarJogo(event: FormEvent){
        event.preventDefault();
        
        try {                   

            if(dataJogo === ''){
                toast.warning("O campo Data deverá ser preenchido.");
                return;
            }
            if(horaJogo === ''){
                toast.warning("O campo Hora deverá ser preenchido.");
                return;
            }
            if(rodadaJogo === 0){
                toast.warning("O campo Rodada deverá ser preenchido.");
                return;
            }
            if(turnoSelected === 0){
                toast.warning("O campo Turno deverá ser preenchido.");
                return;
            }               

            if(clubeCasaSelected === clubeForaSelected){
                toast.error("Clube casa e Clube Fora devem ser diferentes.");
                return;
            }

            const apiClient = setupAPIClient();

            await apiClient.post('/addJogosDaRodada', {
                data: dataJogo,
                hora: horaJogo,
                rodada: rodadaJogo.toString(),
                turno: turnoSelected.toString(),
                timeCasa: clubesList[clubeCasaSelected].id.toString(),
                timeFora: clubesList[clubeForaSelected].id.toString()
            });

            toast.success("Jogo adicionado a rodada " + rodadaJogo);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao registrar jogo da rodada " + rodadaJogo);
        }

        handleLimpar();
    }

    function handleLimpar(){
        setDataJogo('');
        setHoraJogo('');
        setRodadaJogo(0);
        setTurnoJogo(0);
        setClubeCasaSelected(0);
        setClubeForaSelected(0);
    }

  return (
    <>
      <Head>
        <title>Adicionar jogos ao campeonato</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
            <h1>Adicionar jogos ao campeonato</h1>

            <form className={styles.form} onSubmit={handleAdicionarJogo}>
                <div className={styles.datas}>
                    <label>Data</label>
                    <input 
                        type="text"
                        placeholder="2024/04/14"
                        name="data"        
                        size={6}
                        onChange={(e) => setDataJogo(e.target.value)}
                        className={styles.input}
                    />
                    <label>Hora</label>
                    <input 
                        type="text"
                        placeholder="20:30"
                        name="hora"
                        size={3}
                        onChange={(e) => setHoraJogo(e.target.value)}
                        className={styles.input}
                    />
                    <label>Turno</label>
                    <select value={turnoSelected} onChange={(e) => setTurnoJogo(parseInt(e.target.value))}>
                        <option value={0}>Selecione</option>
                        <option value={1}>Prim.</option>
                        <option value={2}>Seg.</option>
                    </select>
                    <label>Rodada</label>
                    <input 
                        type="text"
                        placeholder="1"
                        size={3}
                        onChange={(e) => setRodadaJogo(parseInt(e.target.value))}
                        className={styles.input}
                    />
                </div>
                <div className={styles.jogos}>
                    <label>Casa</label>

                    <select value={clubeCasaSelected} onChange={handleChangeClubeCasa}>                                                
                        {                                                    
                            clubes.map((clube, index) => {
                                return(
                                    <option key={clube.id} value={index}>
                                        {clube.nome}
                                    </option>
                                )
                            })
                        }
                        <option key={0} value={0}>Selecione</option>
                    </select>

                    <label> X </label>
                    
                    <label>Fora</label>
                    <select value={clubeForaSelected} onChange={handleChangeClubeFora}>                        
                        {                            
                            clubes.map((clube, index) => {
                                return(
                                    <option key={clube.id} value={index}>
                                        {clube.nome}
                                    </option>
                                )
                            })
                        }
                        <option key={0} value={0}>Selecione</option>
                    </select>
                </div>
                <div className="buttons">
                    <button className={styles.adicionar} type="submit">
                        Adicionar
                    </button>
                    <button className={styles.limpar} onClick={handleLimpar}>
                        Limpar
                    </button>
                </div>
                
            </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = visitante(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const res = await apiClient.get('/clubes');

    return {
        props: {
            clubesList: res.data
        }
    }
})