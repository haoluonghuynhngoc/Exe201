import Image from 'next/image';
import styles from './rightbar.module.css';
import {
    MdPlayCircleFilled
} from "react-icons/md";

const RightBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    {/* fill lấy theo thằng cha */}
                    <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text} >
                    <span className={styles.notification}>
                        Pet health care</span>
                    <h3 className={styles.title} >
                        How to take care of pets effectively ?
                    </h3>
                    <span className={styles.subtitle}> Takes 4 minutes to learn </span>
                    <p className={styles.description} >
                        Stay informed, connected, and empowered in providing the best care for your beloved pet, all in one user-friendly platform.
                    </p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled />
                        Watch Now
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RightBar;