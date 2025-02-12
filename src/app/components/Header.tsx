"use client";

import Link from 'next/link';
import {useAuth} from "@/app/features/AuthContext";

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/">홈</Link></li>
                    {!isLoggedIn ? (
                        <>
                            <li><Link href="/login">로그인</Link></li>
                            <li><Link href="/signup">회원가입</Link></li>
                        </>
                    ) : (
                        <li><button onClick={logout}>로그아웃</button></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}