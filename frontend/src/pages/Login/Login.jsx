import { useState, useContext, useEffect } from 'react'
import logoImage from '../../assets/Sarii-Logo.png'
import illustrationImage from '../../assets/market-illus.png'
import { LuMail, LuLock, LuEye, LuEyeOff } from 'react-icons/lu';
import api from "../../api.js";
import AuthContext from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //State Management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { fetchAuthStatus, auth, isLoadingAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    
    //useEffect
    useEffect(() => {
        if (!isLoadingAuth && auth.isLoggedIn) {
            console.log("User is already logged in. Redirecting to previous page.");
            if (auth.userType === "Customer") {
                navigate('/consumer/shop');
            } else if (auth.userType === "Merchant") {
                navigate('/merchant');
            } else {
                navigate('/');
            }
        }
    }, [auth.isLoggedIn, isLoadingAuth, navigate]); 

    //Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password }, {
            });
            await fetchAuthStatus();
            alert('Login successful!');

            if (auth.userType === "Customer") {
                navigate('/consumer');
            } else if (auth.userType === "Merchant") {
                navigate('/merchant');
            } else {
                navigate('/');
            }
        } catch (err) {
            if (err.response) {
                // The server responded with a status code outside the 2xx range
                setError(err.response.data.message);
            } else if (err.request) {
                setError('No response from server. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };


    //Component
    return (
        <div className='min-h-screen flex flex-col md:flex-row bg-gray-50 font-inter'>
            {/* Login Form */}
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 rounded-lg md:rounded-none md:rounded-1-lg '>
                <div className='mb-0.5'>
                    <img src={logoImage} alt="Sarii Logo" className='w-20 h-20 object-contain rounded-full' />
                </div>
                <h1 className='text-4xl text-primary mb-6 font-lora font-bold'>Log In</h1>
                <p className='text-gray-700 text-center mb-15 max-w-sm text-sm'>Welcome to Sarii!  -  Enter your account details</p>

                <form onSubmit={handleSubmit} className='w-full max-w-sm'>
                    {/* Username Field */}
                    <div className='mb-6'>
                        <label htmlFor="email" className='block text-primary text-sm font-semibold mb-2.5'>
                            Email
                        </label>
                        <div className='relative'>
                            <LuMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>

                    {/* Pasword Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-primary text-sm font-semibold mb-2.5">
                            Password
                        </label>
                        <div className="relative">
                            <LuLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                            />
                            <span
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-primary transition duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                            </span>
                        </div>
                    </div>

                    {error && <p className="text-primary text-sm text-center mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-gray-600 text-md">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-secondary hover:text-primary font-semibold transition duration-200">
                        Sign up
                    </a>
                </p>
            </div>

            {/* Right Section (Illustration) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-12 rounded-lg md:rounded-none md:rounded-r-lg overflow-hidden">
                <img
                    src={illustrationImage}
                    alt="Farm to Table"
                    className="max-w-full h-auto object-contain rounded-4xl shadow-md"
                />
            </div>
        </div>
    )
}

export default Login