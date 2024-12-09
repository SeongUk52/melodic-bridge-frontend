"use client";

import { useState, FormEvent } from "react";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">로그인</button>
        </form>
    );
};

export default Login;