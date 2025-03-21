'use client';

import {useState} from 'react';

const Page: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const userData = {
            username,
            email,
            password,
            nickname,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                cache: 'no-store', // 캐시를 사용하지 않도록 설정
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '회원가입에 실패했습니다.');
            }

            alert('회원가입이 완료되었습니다.');
            window.location.href = '/login';
        } catch (error) {
            if (error instanceof Error) {
                // Error 객체에 접근
                setErrorMessage(error.message);
            } else if (error instanceof Response) {
                // API에서 발생한 네트워크 오류일 경우
                setErrorMessage("네트워크 오류가 발생했습니다.");
            } else {
                // 알 수 없는 오류 처리
                setErrorMessage("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <label htmlFor="username">사용자 이름</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
};

export default Page;