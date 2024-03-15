"use client"
import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';


// nên để interface ở đây
const MenuLink = ({ item }) => {
    const pathName = usePathname();
    // console.log(pathName);
    return (
        // ${pathName === item.Link && styles.active} dùng để kiểm tra xem pathName có trùng với item.Link không, nếu trùng thì thêm class active
        <Link href={item.link} className={`${styles.container} ${pathName === item.link && styles.active} `}>
            {item.icon}
            {item.title}
        </Link>
    )
}

export default MenuLink;