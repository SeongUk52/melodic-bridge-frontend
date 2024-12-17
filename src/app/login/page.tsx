"use client";

import styles from './Login.module.css';
import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // next/navigation에서 useRouter를 임포트

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter(); // router 초기화

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post<{ token: string }>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, // 환경 변수 사용
                { username, password }
            );
            // 로그인 성공 시 JWT 토큰 저장
            localStorage.setItem("token", response.data.token);
            alert("로그인 성공!");

            await router.push("/"); // 홈으로 이동
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>로그인</h1>
            <form onSubmit={handleLogin}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.button}>로그인</button>
            </form>
        </div>
    );
};

export default Login;