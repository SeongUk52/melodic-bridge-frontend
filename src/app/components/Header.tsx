import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/">홈</Link></li>
                    <li><Link href="/login">로그인</Link></li>
                    <li><Link href="/signup">회원가입</Link></li>
                </ul>
            </nav>
        </header>
    );
}