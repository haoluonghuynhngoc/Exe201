"use client"
import styles from './cardMoney.module.css';
import {
    MdAttachMoney
} from 'react-icons/md';
import useSWR from 'swr'
// total money
const Cart = () => {
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR("https://petside.azurewebsites.net/api/statistics/totalMoney",
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;

    const formattedTotalMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(data.totalMoney);
    return (
        <div className={styles.container}>
            <MdAttachMoney size={24} />
            <div className={styles.texts} >
                <span className={styles.title} > Total Revenue</span>
                <span className={styles.number} >{formattedTotalMoney}</span>
                {/* <span className={styles.detail} >
                    <span className={styles.positive}>+3.7%</span> since last month
                </span> */}
            </div>
        </div>
    );
};
export default Cart;