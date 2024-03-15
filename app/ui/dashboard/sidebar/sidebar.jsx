'use client';

import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
    MdDashboard,
    MdPerson,
    MdLogout,
    MdOutlineStorefront,
    MdPets,
    MdHowToReg
} from "react-icons/md";
import { useRouter } from 'next/navigation';

const menuItems = [
    {
        title: "Menu",
        lists: [
            {
                title: "Dashboard",
                link: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Profile",
                link: "/dashboard/users",
                icon: <MdPerson />
            },
            {
                title: "Store",
                link: "/dashboard/stores",
                icon: <MdOutlineStorefront />
            },
            {
                title: "Pets",
                link: "/dashboard/pets",
                icon: <MdPets />
            },
            {
                title: "Pro Accepted",
                link: "/dashboard/userRegisterPro",
                icon: <MdHowToReg />
            }
        ],
    }
];

const Sidebar = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/petImage.jpg" alt="user" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.userName}>Admin</span>
                    <span className={styles.userTitle}>PetCare Admin</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <span className={styles.cat}>{item.title}</span>

                        {item.lists.map((list) => (
                            <MenuLink item={list} key={list.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={() => { router.push('https://petside-ihc.vercel.app/login'), localStorage.setItem('isLogin', false) }}>
                <MdLogout />
                Logout
            </button>
        </div>
    );
};

export default Sidebar;