'use client';
import styles from "@/app/ui/login/login.module.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const handleSubmit = e => {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            localStorage.setItem('isLogin', true);
            router.push(`/dashboard`);
        } else {
            setError('Username or password is incorrect');
            setTimeout(() => {
                setError('');
            }, 10000); // 10 giây
        }
    }
    // video ở 2:56:16
    // https://www.youtube.com/watch?v=cBg6xA5C60s

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;