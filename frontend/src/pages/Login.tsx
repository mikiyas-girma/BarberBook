import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, FormEvent } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserLogin } from "@/utils/userSlice"

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/login/', {
                username,
                password
            });
            console.log("Login successful");
            setError('');
            // Update user state
            dispatch(setUserLogin(response.data.user));
            // Redirect to home page
            navigate('/home');
            return response.data;
        } catch (error) {
            console.error("Login failed", error);
            setError('Invalid credentials');
        }
    }

    return (
        <>
        <div className="m-auto w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg">
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>Login to Your Account</CardTitle>
                    <CardDescription className="text-blue-900 ">Lets see what's New</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin} >
                <CardContent className='w-3/4 m-auto'>
                    <Input
                        className='m-4'
                        name='username' 
                        type='text' 
                        placeholder='user name' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        className='m-4'
                        name='password' 
                        type='password' 
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    {error && <CardFooter className='text-red-500'>{error}</CardFooter> }
                </CardContent>
                <CardContent className='text-center'>
                    <Button type='submit'>Login</Button>
                </CardContent>
                </form>
                <CardContent className='text-center'>
                    <CardDescription>Don't have an account? <a href='signup' className='text-blue-900'>Register</a></CardDescription>
                </CardContent>
            </Card>
        </div>
        </>
    )
}

export default Login
