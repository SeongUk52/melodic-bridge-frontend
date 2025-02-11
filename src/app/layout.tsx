import './globals.css'; // 글로벌 스타일 임포트
import Header from './components/Header';

export default function RootLayout({children, // 각 페이지의 내용이 여기에 들어가
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body>
                <div className="main-layout">
                    <Header />

                    <main>{children}</main>

                    <footer>
                        <p>© 2025 나만의 웹앱</p>
                    </footer>
                </div>
            </body>
        </html>
    );
}