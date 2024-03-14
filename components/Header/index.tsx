import styles from './styles.module.scss';
import Link from 'next/link';
import { useContext } from 'react';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="./">
                    <img src='/logotipobrasileirao.png' width={100} height={100}/>
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/">
                        Início
                    </Link>
                    <Link href="/jogosPorClube">
                        Jogos por clube
                    </Link>
                    <Link href="/jogos">
                        Adicionar Jogos
                    </Link>
                    <Link href="/atuEscudo">
                        Atualizar Escudo
                    </Link>
                    <Link href="/entrar">
                        Entrar
                    </Link>
                </nav>
            </div>
        </header>
    )
}