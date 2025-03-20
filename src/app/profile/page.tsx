'use client';

import { useAuth } from "@/app/features/AuthContext";

const Page: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>{user?.username}의 프로필</h1>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default Page;