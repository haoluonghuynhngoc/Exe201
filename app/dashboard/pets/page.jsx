"use client"
import styles from "@/app/ui/dashboard/pets/pets.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import useSWR from 'swr'

const PetsPage = ({ searchParams }) => {
    const query = searchParams?.name || "";
    const page = searchParams?.page || 1;
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/pets?PageNumber=${page}&PageSize=5&search=${query}`, fetcher);
    const hasPreviousPage = data?.hasPreviousPage;
    const hasNextPage = data?.hasNextPage;
    //console.log(data);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..." />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Gender</td>
                        <td>Birth Date</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.contents?.map((petDB, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.pets}>
                                    <Image
                                        src={petDB?.imagePet || "/noproduct.jpg"}
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className={styles.petsImage}
                                    />
                                    {petDB.name}
                                </div>
                            </td>
                            <td>{petDB.gender === 1 ? 'Male' : 'Female'}</td>
                            <td>{petDB.birthDate.split("T")[0]}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/pets/${petDB?.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
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

export default PetsPage;