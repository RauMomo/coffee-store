import Banner from '@/components/banner';
import Card from '@/components/card';
import fetchCoffeeStores from '@/hooks/coffee-stores';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../public/assets/hero-image.png';
import styles from '../styles/home.module.css';

interface StoresProps{
  coffeeStores: {
      fsq_id: string
      categories: [],
      chains: []
      distance: number
      geocodes: []
      link: string
      location: []
      name: string
      related_places: {}
      timezone: string
  }[]
}

export async function getStaticProps(context: any) {
  const results = await fetchCoffeeStores();


  return {
    props: {
      coffeeStores: results ?? []
    }
  }
}

export default function Home(props: StoresProps) {
  console.log("props: ", props.coffeeStores);
  const handleOnBannerClick = () => {
    console.log("Hi");
  };
  

  const coffeeStores = props.coffeeStores;

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connossieur</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <Banner button='View Stores Nearby' handleOnClick={handleOnBannerClick} />
          <div className={styles.heroImage}>
            <Image src={Hero} alt='Hero Image of a girl sipping coffee' width={1200} height={400} />
          </div>
        </div>
        {coffeeStores.length > 0 && (
          <>
          <h2 className={styles.heading2}>Toronto Stores</h2>
          <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore, index) => {
            return (
              <Card
                name={coffeeStore.name}
                imgUrl={"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                href={`/coffee-store/${coffeeStore.fsq_id}`}
                className={styles.card}
                key={coffeeStore.fsq_id}
              />
            );
          })}
        </div>
        </>)}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
