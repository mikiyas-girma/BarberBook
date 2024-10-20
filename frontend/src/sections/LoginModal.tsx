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
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/auth/login/", {
                email,
                password,
            });
            console.log("Login successful");
            setError("");
            dispatch(setUserLogin(response.data.user));
            if (response.data.user.role === "barber") {
                navigate("/dashboard");
            } else if (response.data.user.role === "customer") {
                navigate("/barbers");
            }
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
                        name="email"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <p className="text-center text-white mt-4">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                navigate("/signup");
                            }}
                            className="text-blue-500 underline"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
