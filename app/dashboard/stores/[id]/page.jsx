"use client"
import Validate from "@/app/components/validateInput";
import { updateProfile } from "@/app/components/validateInput/validateInput";
import useForm from "@/app/hooks/useForm";
import styles from "@/app/ui/dashboard/singleUser/singleUser.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from 'swr'

const SingleStorePage = () => {
    const { values, errors, handleChange, handleSubmit } = useForm(
        updatePro,
        updateProfile
    );
    function updatePro() {
        // update o day
        console.log(values);
    }
    const pathname = usePathname();
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());
    // b690935e-e1be-4efb-3a17-08dc2fcf081c
    const { data, error, isLoading } =
        useSWR(`https://petside.azurewebsites.net/api/providers/getInformation/${pathname.split("/").pop()}`,
            fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    if (!data) return null;

    // console.log(data)


    return (
        <>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer} >
                        <Image src={data?.data?.imageProvider || "/noproduct.jpg"} alt="" fill />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <label>Name Store</label>
                        {/* <input type="text" name="storeName" placeholder="Name Input" value={data?.data?.providerName} /> */}
                        <input
                            type="text"
                            name="providerName"
                            placeholder="Enter your providerName"
                            onChange={handleChange}
                            // value={values.providerName || values.providerName === "" ? "" : data?.data?.providerName}
                            value={data?.data?.providerName}
                            required
                        />
                        <Validate errors={errors.providerName} />
                        <label>Contact Information</label>
                        <input
                            type="text"
                            name="contactInformation"
                            placeholder="Enter your contactInformation"
                            onChange={handleChange}
                            // value={values.contactInformation === null ? data?.data?.contactInformation : values.contactInformation}
                            value={data?.data?.contactInformation}
                            required
                        />
                        <Validate errors={errors.providerName} />
                        <label>Service Type</label>
                        {/* <input type="text" name="serviceType" placeholder="+23232322" value={data?.data?.serviceType} /> */}
                        <input
                            type="text"
                            name="providerName"
                            placeholder={data?.data?.serviceType === null ? "Enter your providerName" : data?.data?.serviceType}
                            onChange={handleChange}
                            // value={values.serviceType === null ? data?.data?.serviceType : values.serviceType}
                            value={data?.data?.serviceType}
                            required
                        />
                        <Validate errors={errors.providerName} />
                        <label>Address</label>
                        {/* <input type="text" name="location" placeholder="" value={data?.data?.location} /> */}
                        <input
                            type="text"
                            name="providerName"
                            placeholder={data?.data?.location === null ? "Enter your providerName" : data?.data?.location}
                            onChange={handleChange}
                            // value={values.location === null ? data?.data?.location : values.location}
                            value={data?.data?.location}
                            required
                        />
                        <Validate errors={errors.location} />
                        <label>Rating</label>
                        {/* <input type="text" name="status" placeholder="None" readOnly value={data?.data?.rating !== undefined ? (
                        data?.data?.rating
                    ) : (
                        0
                    )} /> */}
                        <input
                            type="text"
                            name="providerName"
                            placeholder={data?.data?.rating === null ? "Enter your providerName" : data?.data?.rating}
                            onChange={handleChange}
                            // value={values.rating === null ? data?.data?.rating : values.rating}
                            value={data?.data?.rating}
                            required
                        />
                        <Validate errors={errors.rating} />
                        <textarea name="description"
                            id='description'
                            rows="16"
                            placeholder='Description'
                        >
                            {data?.data?.description}
                        </textarea>

                        {/* <button>Update</button> */}
                    </form>
                </div>

            </div>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Category</td>
                            {/* <td>Action</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.offerProviders?.map((services, index) => (
                            <tr key={index}>
                                <td>
                                    <div className={styles.child}>
                                        <Image
                                            src={services.offerings.image || "/noproduct.jpg"}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            className={styles.childImage}
                                        />
                                        {services?.offerings.serviceName}
                                    </div>
                                </td>
                                {/* <td>{services.offerings.price}</td> */}
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(services.offerings.price)}</td>
                                <td>{services.offerings.description}</td>
                                <td>{services.offerings.category}</td>
                                {/* <td>
                                    <div className={styles.buttons}>
                                        <Link href={`/dashboard/pets/${services.offerings?.offerId}`}>
                                            <button className={`${styles.button} ${styles.view}`}>View</button>
                                        </Link>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default SingleStorePage;