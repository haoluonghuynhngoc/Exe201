"use client"
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import useSWR from 'swr'


const UserPageRegisterPro = ({ searchParams }) => {
    const query = searchParams?.name || "";
    const page = searchParams?.page || 1;
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    // https://petside.azurewebsites.net/api/users/getAllInformation?PageNumber=${page}&PageSize=5&name=${query}

    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/users/getAllInformation?PageNumber=${page}&PageSize=5&name=${query}&CheckIsUpgrade=true`, fetcher);
    const hasPreviousPage = data?.hasPreviousPage;
    const hasNextPage = data?.hasNextPage;
    //console.log(data);
    const handleDelete = async (id) => {
        // API call to delete an item
    };
    const handleAccept = async (id) => {
        try {
            const res = await fetch(`https://petside.azurewebsites.net/api/account/${id}/pro-upgrade`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    id: id, // Nếu có dữ liệu cần truyền, thêm vào đây
                })
            });

            if (!res.ok) {
                throw new Error("Failed to update Account item");
            }
            window.location.reload();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };
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
                            <td>{(userDB?.upgraded === 1 ? 'Pro Account' : 'Standard Account') || "None"}</td>
                            <td>
                                <div className={styles.buttons}>

                                    <button onClick={() => handleDelete(userDB?.id)}
                                        className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    <button onClick={() => handleAccept(userDB?.id)}
                                        className={`${styles.button} ${styles.acceptUser}`}>Accept</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <Pagination hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
        </div>
    );
};

export default UserPageRegisterPro;