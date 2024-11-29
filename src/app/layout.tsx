import './globals.css'; // 글로벌 스타일 임포트
import Link from 'next/link';

export default function RootLayout({children, // 각 페이지의 내용이 여기에 들어가
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body>
        <div className="main-layout">
            <header>
                <nav>
                    <ul>
                        <li><Link href="/">홈</Link></li>
                        <li><Link href="/signup">회원가입</Link></li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>

            <footer>
                <p>© 2024 나만의 웹앱</p>
            </footer>
        </div>
        </body>
        </html>
    );
}