"use client"
import styles from './chart.module.css';
import useSWR from 'swr'

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = () => {
    //https://petside.azurewebsites.net/api/statistics/year?year=2024
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR("https://petside.azurewebsites.net/api/statistics/year?year=2024",
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;
    const newData = Object.keys(data).map((month) => ({
        name: month,
        userRegister: data[month].userRegisterInMonth,
        proUpgrades: data[month].proUpgradesInMonth,
        revenue: data[month].revenueInMonth
    }));


    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}> Monthly Revenue</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={newData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* cần thêm ô vuông thì thêm cái này vào */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
                        <Legend />
                        {/* <Line type="monotone" dataKey="userRegister" stroke="#FFFF00" strokeDasharray="5 5" name='User Register' />
                        <Line type="monotone" dataKey="proUpgrades" stroke="#FF3333" strokeDasharray="3 4 5 2" name='Pro Account' /> */}
                        <Line type="monotone" dataKey="revenue" stroke="#33CC33" strokeDasharray="3 4 5 2" name='Revenue' />
                    </LineChart>
                </ResponsiveContainer>
            </div><br />
            <div className={styles.container}>
                <h2 className={styles.title}> Total Accounts Upgraded In 2024</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={newData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* cần thêm ô vuông thì thêm cái này vào */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
                        <Legend />
                        {/* <Line type="monotone" dataKey="userRegister" stroke="#FFFF00" strokeDasharray="5 5" name='User Register' /> */}
                        <Line type="monotone" dataKey="proUpgrades" stroke="#FF3333" strokeDasharray="3 4 5 2" name='Pro Account' />
                        {/* <Line type="monotone" dataKey="revenue" stroke="#33CC33" strokeDasharray="3 4 5 2" name='Revenue' /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div><br />
            <div className={styles.container}>
                <h2 className={styles.title}> Users Registered In 2024</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={newData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* cần thêm ô vuông thì thêm cái này vào */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
                        <Legend />
                        <Line type="monotone" dataKey="userRegister" stroke="#FFFF00" strokeDasharray="5 5" name='User Register' />
                        {/* <Line type="monotone" dataKey="proUpgrades" stroke="#FF3333" strokeDasharray="3 4 5 2" name='Pro Account' />
                        <Line type="monotone" dataKey="revenue" stroke="#33CC33" strokeDasharray="3 4 5 2" name='Revenue' /> */}
                    </LineChart>
                </ResponsiveContainer>

            </div>


        </>
    );
};
export default Chart;