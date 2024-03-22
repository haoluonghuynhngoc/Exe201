"use client"
import Image from 'next/image';
import styles from './transactions.module.css';
import useSWR from 'swr'
import { format } from 'date-fns-tz';
// https://petside.azurewebsites.net
const Transactions = () => {
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR("https://petside.azurewebsites.net/api/statistics/totalUser/3",
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;
    const formatDate = (dateTimeString) => {
        const [year, month, day] = dateTimeString.split('-');
        return `${day}/${month}/${year}`;
    };
    const formattedTotalMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format("190000");
    const formatDateVietnam = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return format(date, 'HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Pro Upgrade</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((transaction, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.user} >
                                    <Image src="/noavatar.png" alt="" width={40} height={40} className={styles.userImage} />
                                    {transaction?.fullName || transaction?.email.replace(/@.*/, "")}
                                </div>
                            </td>
                            <td>
                                <span className={`${styles.status} ${styles.done}`} >Success</span>
                            </td>
                            <td>{formatDate(transaction?.upgradeDate.split('T')[0])}</td>
                            <td>{formatDateVietnam(transaction?.upgradeDate)}</td>
                            {/* <td>{new Date(transaction?.upgradeDate).toLocaleTimeString()}</td> */}
                            <td>{formattedTotalMoney}</td>
                        </tr>
                    ))}

                    {/* <tr>
                        <td>
                            <div className={styles.user} >
                                <Image src="/noavatar.png" alt="" width={40} height={40} className={styles.userImage} />
                                John Doe
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`} >Pending</span>
                        </td>
                        <td>01/01/2021</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user} >
                                <Image src="/noavatar.png" alt="" width={40} height={40} className={styles.userImage} />
                                John Doe
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`} >Success</span>
                        </td>
                        <td>01/01/2021</td>
                        <td>$100</td>
                    </tr>
                    <tr>
                        <td>
                            <Image src="/noavatar.png" alt="" width={40} height={40} className={styles.userImage} />
                            John Doe
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancelled}`} >Cancelled</span>
                        </td>
                        <td>01/01/2021</td>
                        <td>$100</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};
export default Transactions;