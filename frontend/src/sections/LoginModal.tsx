import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/utils/userSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/login/", {
                username,
                password,
            });
            console.log("Login successful");
            setError("");
            dispatch(setUserLogin(response.data.user));
            navigate("/home");
            onClose(); // Close modal on success
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid credentials");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg w-96 p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-4xl text-white">&times;</button>
                <h2 className="text-center text-lg font-bold text-white">Login</h2>
                <form onSubmit={handleLogin}>
                    <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="my-2"
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="my-2"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="mt-4 w-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;