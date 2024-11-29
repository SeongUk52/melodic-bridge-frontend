import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <h1>환영합니다! 서비스에 오신 것을 환영해요.</h1>
            <p>서비스에 로그인하거나 회원가입하여 시작해보세요.</p>
            <div>
                <Link href="/login">로그인</Link>
                <Link href="/signup">회원가입</Link>
            </div>
        </div>
    );
};

export default HomePage;