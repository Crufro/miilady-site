import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CharacterGenerator from '../components/CharacterGenerator';
import { LoadingQueueProvider } from '../components/LoadingQueueContext'; // Adjust the path based on your project structure

// Console log the imported components/functions
console.log("CharacterGenerator:", CharacterGenerator);

const Home: NextPage = () => {
  const [traits, setTraits] = useState([]);

  return (
    <div className={`${styles.container} ${styles.gradientBackground}`}>
	<div className={styles.devPreviewBanner}>DEV PREVIEW</div>
      <Head>
        <title>Miilady Site</title>
        <meta content="Miilady NFT Minting Site" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <LoadingQueueProvider> 
          <CharacterGenerator />
        </LoadingQueueProvider> 
      </main>
    </div>
  );
};

export default Home;
