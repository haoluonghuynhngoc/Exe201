"use client"
import styles from './cardUser.module.css';
import {
    MdSupervisedUserCircle
} from 'react-icons/md';
import useSWR from 'swr'

const CartUser = () => {
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/statistics/statisticsUser`,
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;

    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts} >
                <span className={styles.title} >Total Users</span>
                <span className={styles.number} >{data.totalUser}</span>
                {/* <span className={styles.detail} >
                    <span className={styles.positive}>+ {data.userInMonth}%</span> since last month
                </span> */}
            </div>
        </div>
    );
};
export default CartUser;