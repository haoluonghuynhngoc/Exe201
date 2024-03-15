"use client"
import styles from "@/app/ui/dashboard/stores/stores.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr'


const StorePage = ({ searchParams }) => {
    const query = searchParams?.name || "";
    // const page = searchParams?.page || 1;
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/providers/getAllInformation?name=${query}`, fetcher);

    //console.log(query);
    // console.log(data);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a Store..." />
                {/* <Link href="/dashboard/store/add">
                    <button className={styles.addButton}> Add New</button>
                </Link> */}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Store Name</td>
                        <td>Contact Information</td>
                        <td>Location</td>
                        <td>Rating</td>
                        <td>Service Type</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((store, index) => (
                        <tr key={index}>
                            <td >
                                <div className={styles.user}>
                                    <Image
                                        src={store?.imageProvider || "/noproduct.jpg"}
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {store?.providerName}
                                </div>
                            </td>
                            <td> {store?.contactInformation || "None@gmail.com"}</td>
                            <td> {store?.location || "None"}</td>
                            <td>
                                {store.rating !== undefined ? (
                                    store.rating
                                ) : (
                                    1
                                )}
                            </td>
                            <td> {store?.serviceType || "None"}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/stores/${store?.providerId}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    {/* <button className={`${styles.button} ${styles.delete}`}>Delete</button> */}
                                </div>
                            </td>
                        </tr>
                    ))}

                    {/* <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="/noproduct.jpg"
                                    alt="user"
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td>SuperDex@gmail.com</td>
                        <td>13.01.2022</td>
                        <td>SuperDev</td>
                        <td>Active</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/users/test">
                                    <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr> */}
                </tbody>
            </table>

        </div>
    );
};

export default StorePage;