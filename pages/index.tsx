import Banner from '@/components/banner';
import Card from '@/components/card';
import Head from 'next/head';
import Image from 'next/image';
import coffeeStoresData from '../data/coffee-stores.json';
import Hero from '../public/assets/hero-image.png';
import styles from '../styles/home.module.css';

interface StoreProps{
  coffeeStores: {
    id: number;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
  }[]
}

export function getStaticProps(context: any): any {
  return {
    props: {
      coffeeStores: coffeeStoresData
    }
  }
}

export default function Home(props: StoreProps) {
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
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}`}
                className={styles.card}
                key={index}
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
