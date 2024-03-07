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
                    <Link href="/tabela">
                        Tabela
                    </Link>
                    <Link href="/time">
                        Jogos por time
                    </Link>
                    <Link href="/jogos">
                        Adicionar Jogos
                    </Link>
                    <Link href="/entrar">
                        Entrar
                    </Link>
                </nav>
            </div>
        </header>
    )
}