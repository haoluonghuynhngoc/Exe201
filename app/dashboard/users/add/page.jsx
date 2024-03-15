"use client"

import styles from '@/app/ui/dashboard/users/addUser/addUser.module.css'
import useSWR from 'swr'

const AddUserPage = () => {

    // const fetcher = (url) => fetch(url)
    //     .then((res) => res.json());
    // const { data, error, isLoading } =
    //     useSWR("https://localhost:7149/api/users/getInformation/ab8818d8-90b8-427c-74c6-08dc22362bae",
    //         fetcher, {
    //         revalidateOnFocus: false,
    //         revalidateOnReconnect: false,
    //         revalidateIfStale: false
    //     });
    // if (isLoading) return <div>Loading...</div>
    // if (error) return <div>Error...</div>
    // console.log(data);

    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder="username" name='username' required />
                <input type="email" placeholder="email" name="email" required />
                <input type="password" placeholder="password" name="password" required />
                <input type="phone" placeholder="phone" name="phone" />
                <select name="isAdmin" id="isAdmin">
                    <option value={false} selected>Is Admin ?y</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <select name="isActive" id="isActive">
                    <option value={true} selected>Is Active</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <textarea name="address"
                    id='address'
                    rows="16"
                    placeholder='Address'
                >
                </textarea>
                <button type="submit"> Submit</button>
            </form>
        </div>
    );
}
export default AddUserPage;