"use client";

import Link from 'next/link';
import {useAuth} from "@/app/features/AuthContext";

const HomePage: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <div className="home-container">
            <h1>환영합니다! 서비스에 오신 것을 환영해요.</h1>

            {!isLoggedIn ? (
                <>
                    <p>서비스에 로그인하거나 회원가입하여 시작해보세요.</p>
                    <div>
                        <Link href="/login">로그인</Link>
                        <Link href="/signup">회원가입</Link>
                    </div>
                </>
                ) : (
                <div>
                    <button onClick={logout}>로그아웃</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;