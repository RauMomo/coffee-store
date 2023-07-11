import styles from './styles/banner.module.css';

interface Button {
  button: string;
  handleOnClick: () => void
}
export default function Banner(props : Button) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connossieur</span>
      </h1>
      <p className={styles.subtitle}>Discover Your Local Coffee Shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>{props.button}</button>
      </div>
    </div>
  );
}