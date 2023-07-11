import cls from "classNames";
import Image from "next/image";
import Link from "next/link";
import styles from '../components/styles/card.module.css';

interface CardProps{
  name: string
  imgUrl: string
  href: string
  className: string
}

export default function Card(props : CardProps) {
  return (
    <div className={props.className}>
      <Link href={props.href}>
        <div className={cls("glass",styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image src={props.imgUrl} className={styles.cardImage} alt="Card image" width={300} height={50}
            style={{objectFit: 'cover', position: 'static'}}/>
          </div>
        </div>
      </Link>
    </div>
  )
}