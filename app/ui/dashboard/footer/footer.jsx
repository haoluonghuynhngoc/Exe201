import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Lama Dev</div>
            <dic className={styles.text}>All rights reserved</dic>
        </div>
    )
}
export default Footer;