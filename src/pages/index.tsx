import { Header } from '../../components/Header';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';
import clubes2024 from '../../public/timesbrasileirao2024.jpg';

export default function Home(){
    return(
        <>
        <Head>
            <title>Campeonato Brasileiro 2024</title>
        </Head>
        <div>
            <Header />                    
            <main className={styles.container}>
                <Image className={styles.clubes2024} src={clubes2024} alt='Clubes do Brasileirão 2024' />
            </main>
        </div>
        </>        
    )
}