import fetchCoffeeStores from "@/hooks/coffee-stores";
import cls from "classNames";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nearMe from '../../public/assets/icons/nearMe.svg';
import places from '../../public/assets/icons/places.svg';
import star from '../../public/assets/icons/star.svg';
import styles from '../../styles/storedetail.module.css';

export interface StoreProps {
    id: number
    name: string
    imgUrl: string
    websiteUrl: string
    address: string
    neighborhood: string
}
 

export async function getStaticProps(staticProps : any): Promise<any> {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: coffeeStores.find((store: { id: string }) => {
        console.log(store);
        return store.id.toString() === params.id
      },)
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store: { id: string; }) => {
    return {
      params: { id: store.id.toString() }
    };
  });

  return {
    paths,
    fallback: false
    
  }
}
export default function CoffeeStore(props: StoreProps) {
  const router = useRouter();

  console.log(props);

  const { address, neighborhood, name, imgUrl } = props;

  const handleUpvoteButton = () => {}

  if (router.isFallback) {
    return (<div>Loading...</div>)
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}> 
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <Image src={imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} alt={name} width={600} height={360} className={styles.storeImg} />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={places} height={24} width={24} alt="Icon"/>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={nearMe} height={24} width={24} alt="Icon"/>
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={star} height={24} width={24} alt="Icon"/>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote</button>
        </div>
      </div>
    </div>
  );
}