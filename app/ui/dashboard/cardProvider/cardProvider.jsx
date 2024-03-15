"use client"
import styles from './cardProvider.module.css';
import {
    MdOutlineStoreMallDirectory
} from 'react-icons/md';
import useSWR from 'swr'
// total user count
const CartProvider = () => {
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR("https://petside.azurewebsites.net/api/statistics/statisticsProvider",
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;
    console.log(data)
    return (
        <div className={styles.container}>
            <MdOutlineStoreMallDirectory size={24} />
            <div className={styles.texts} >
                <span className={styles.title} >Total Shops</span>
                <span className={styles.number} >{data.totalProvider}</span>
                {/* <span className={styles.detail} >
                    <span className={styles.positive}>+ {data.totalProvider}%</span> since last month
                </span> */}
            </div>
        </div>
    );
};
export default CartProvider;