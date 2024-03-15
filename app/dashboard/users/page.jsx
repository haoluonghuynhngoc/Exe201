"use client"
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import useSWR from 'swr'


const UserPage = ({ searchParams }) => {
    const query = searchParams?.name || "";
    const page = searchParams?.page || 1;
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    // https://petside.azurewebsites.net/api/users/getAllInformation?PageNumber=${page}&PageSize=5&name=${query}

    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/users/getAllInformation?PageNumber=${page}&PageSize=5&name=${query}`, fetcher);
    const hasPreviousPage = data?.hasPreviousPage;
    const hasNextPage = data?.hasNextPage;
    //console.log(data);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..." />
                {/* <Link href="/dashboard/users/add">
                    <button className={styles.addButton}> Add New</button>
                </Link> */}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Birthday</td>
                        <td>Phone</td>
                        <td>Pro Account</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.contents?.map((userDB, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.user}>
                                    <Image src={userDB?.avatar || "/noavatar.png"}
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {userDB?.fullName || userDB?.email.replace(/@.*/, "")}
                                </div>
                            </td>
                            <td>{userDB?.email || "none@gmail.com"}</td>
                            <td>{userDB?.dateOfBirth || "None"}</td>
                            <td>{userDB?.phoneNumber || "None"}</td>
                            <td>{(userDB?.upgraded === true ? 'Pro Account' : 'Standard Account') || "None"}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/${userDB?.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    {/* <button className={`${styles.button} ${styles.delete}`}>Delete</button> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* code cu */}
                    {/* <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="/noavatar.png"
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
            <Pagination hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
        </div>
    );
};

export default UserPage;