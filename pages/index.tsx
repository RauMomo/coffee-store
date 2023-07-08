import Head from 'next/head';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connossieur</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Coffee Connossieur
        </h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
