"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface User {
    id: number;
    username: string;
    email: string;
    nickname: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token: string) => {
        if (!token) {
            console.error("No token found!");
            return;
        }

        console.log("Sending token:", token); // 토큰 출력 (디버깅)

        try {
            const response = await axios.post<User>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Fetched user:", response.data);
            setUser(response.data);
            setIsLoggedIn(true);
        } catch (error: any) {
            console.error("Error fetching user info:", error.response?.data || error.message);
            logout();
        }
    };

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}