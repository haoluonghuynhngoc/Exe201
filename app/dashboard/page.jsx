'use client';
import styles from "../ui/dashboard/dashboard.module.css";
import CartMoney from "../ui/dashboard/cardMoney/cardMoney";
import CartUser from "../ui/dashboard/cardUser/cardUser";
import CartProvider from "../ui/dashboard/cardProvider/cardProvider";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import { useRouter } from 'next/navigation';
const DashBoardPage = () => {
    // const router = useRouter();
    // const isLogin = localStorage.getItem('isLogin');
    // if (!isLogin) {
    //     router.push(`/login`);
    // }
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <CartMoney />
                    <CartUser />
                    <CartProvider />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className={styles.side}>
                <RightBar />
            </div>
        </div>
    );
};
export default DashBoardPage;
