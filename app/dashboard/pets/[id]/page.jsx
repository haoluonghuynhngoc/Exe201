"use client"
import styles from "@/app/ui/dashboard/singleUser/singleUser.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useSWR from 'swr'

const SingleUserPage = () => {
    const pathname = usePathname();
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    //E391d6cd-B7b5-435d-7bfa-08dc3808c1f2
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/pets/getPetInformation/${pathname.split("/").pop()}`,
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;
    //console.log(data);

    const formatBirthDate = birthDate => {
        const dateObj = new Date(birthDate);
        return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer} >
                    <Image src={data?.data?.imagePet || "/noavatar.png"} alt="" fill />
                </div>
                {/* {data?.data?.fullName || "None Name"} <br /> */}
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name Input" value={data?.data?.name} />
                    <label>Species</label>
                    <input type="text" name="species" placeholder="" value={data?.data?.species} />
                    <label>Height</label>
                    <input type="text" name="height" placeholder="" value={data?.data?.height} />
                    <label>Height</label>
                    <input type="text" name="gender" placeholder="" value={data?.data?.gender === 1 ? 'Male' : 'Female'} />
                    <label>Birthday</label>
                    {/* <input type="text" name="birthDate" placeholder="" value={data?.data?.birthDate.split("T")[0]} /> */}
                    <input type="text" name="birthDate" placeholder="" value={data?.data?.birthDate && formatBirthDate(data?.data?.birthDate.split("T")[0])} />
                    <label>Weight</label>
                    <input type="text" name="weight" placeholder="" readOnly value={data?.data?.weight + " kg"} />
                    {/* <button>Update</button> */}

                </form>

            </div>
        </div>
    );
}
export default SingleUserPage;