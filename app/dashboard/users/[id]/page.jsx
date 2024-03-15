"use client"
import styles from "@/app/ui/dashboard/singleUser/singleUser.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from 'swr'

const SingleUserPage = () => {
    const pathname = usePathname();
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    // ab8818d8-90b8-427c-74c6-08dc22362bae
    // const UserId = "ab8818d8-90b8-427c-74c6-08dc22362bae";
    // https://petside.azurewebsites.net
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/users/getInformation/${pathname.split("/").pop()}`,
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;
    //console.log(data);
    //const dataPet = [{ name: "hao", age: 1, class: "A", tag: "red", color: "black" }, { name: "hao", age: 1, class: "A", tag: "red", color: "black" }, { name: "hao", age: 1, class: "A", tag: "red", color: "black" }]
    // update Here
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // Call your API to update the user information with formData
    //         // For example:
    //         const response = await fetch(`https://localhost:7149/api/users/update/${data.data.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         });
    //         const updatedData = await response.json();
    //         // Update the client-side data with the new information
    //         mutate(`https://localhost:7149/api/users/getInformation/${data.data.id}`, updatedData, false);
    //     } catch (error) {
    //         console.error('Error updating user information:', error);
    //     }
    // };
    // End Update 
    console.log(data);
    const formatBirthDate = birthDate => {
        const dateObj = new Date(birthDate);
        return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer} >
                        <Image src={data?.data?.avatar || "/noavatar.png"} alt="" fill />
                    </div>
                    {/* {data?.data?.fullName || "None Name"} <br /> */}
                </div>
                <div className={styles.formContainer}>
                    <form action="" className={styles.form}>
                        <label>Full Name</label>
                        <input type="text" name="username" placeholder="Name Input" value={data?.data?.fullName || "None"} />
                        <label>Email</label>
                        <input type="text" name="email" placeholder="dev@gmail.com" readOnly defaultValue={data?.data?.email || "None"} />
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="+23232322" value={data?.data?.phoneNumber || "None"} />
                        <label>Address</label>
                        <input type="text" name="address" placeholder="New York" value={data?.data?.address || "None"} />
                        <label>Birthday</label>
                        <input type="text" name="birthday" placeholder="09/09/2001" value={data?.data?.dateOfBirth || "None"} />
                        <label>Pro Account</label>
                        <input type="text" name="status" placeholder="None" readOnly value={data?.data?.upgraded === true ? 'Pro Account' : 'Standard Account'} />
                        {/* <button>Update</button> */}
                    </form>
                </div>
            </div>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Gender</td>
                            <td>Birth Date</td>
                            <td>Height</td>
                            <td>Weight</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.pets.map((petDB, index) => (
                            <tr key={index}>
                                <td>
                                    <div className={styles.child}>
                                        <Image
                                            src={petDB?.imagePet || "/noproduct.jpg"}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            className={styles.childImage}
                                        />
                                        {petDB.name}
                                    </div>
                                </td>
                                <td>{petDB.gender === 1 ? 'Male' : 'Female'}</td>
                                {/* <td>{petDB.birthDate?.split("T")[0]}</td> */}
                                <td>{formatBirthDate(petDB.birthDate?.split("T")[0])}</td>
                                <td>{petDB.height}</td>
                                <td>{petDB.weight}</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <Link href={`/dashboard/pets/${petDB?.petId}`}>
                                            <button className={`${styles.button} ${styles.view}`}>View</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default SingleUserPage;