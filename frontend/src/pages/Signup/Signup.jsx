import { useState } from 'react'
import logoImage from '../../assets/Sarii-Logo.png'
import illustrationImage from '../../assets/market-illus.png'
import { LuMail, LuLock, LuEye, LuEyeOff, LuArrowLeft, LuUser } from 'react-icons/lu';
import api from "../../api.js";
import AuthContext from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

const Signup = () => {
    //State Management
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentStep, setCurrentStep] = useState(1); // 1 for personal info, 2 for account info
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {fetchAuthStatus, auth, isLoadingAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    //useEffect
    useEffect(() => {
        if (!isLoadingAuth && auth.isLoggedIn) {
            console.log("User is already logged in. Redirecting to previous page.");
            if (auth.userType === "Customer") {
                navigate('/consumer');
            } else if (auth.userType === "Merchant") {
                navigate('/merchant');
            } else {
                navigate('/');
            }
        }
    }, [auth.isLoggedIn, isLoadingAuth, navigate]); 

    //Functions
    const handleContinue = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic validation for Step 1
        if (!firstName || !lastName) {
            setError('First Name and Last Name are required.');
            return;
        }
        setCurrentStep(2);
    };

    const handleBack = () => {
        setError('');
        setCurrentStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/signup', {
                firstName,
                middleName,
                lastName,
                email,
                password,
            });

            console.log('Signup successful!', response.data);
            alert('Account created successfully!');
            await fetchAuthStatus(); //fetch user creds
            //Navigation HERE
            if (auth.userType === "Customer") {
                navigate('/consumer');
            } else if (auth.userType === "Merchant") {
                navigate('/merchant');
            } else {
                navigate('/');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Signup failed. Please try again.');
            } else if (err.request) {
                setError('No response from server. Please check your network connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    //Screen
    return (
        <div className='min-h-screen flex flex-col md:flex-row bg-gray-50 font-inter'>
            {/* SignUp Form Section */}
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 rounded-lg md:rounded-none md:rounded-1-lg overflow-hidden'>
                {currentStep === 2 && (
                    <button
                        onClick={handleBack}
                        className="absolute top-8 left-10 p-3 rounded-full bg-primary hover:bg-secondary transition duration-200"
                        aria-label="Go back">
                        <LuArrowLeft size={24} className="text-white" />
                    </button>
                )}

                <div className="mb-0.5 mt-0 md:mt-0"> {/* Adjust margin-top for back button */}
                    <img src={logoImage} alt="Sarii Logo" className="w-20 h-20 object-contain rounded-full" />
                </div>
                <h1 className="text-4xl text-primary mb-6 font-lora font-bold">Sign Up</h1>
                <p className="text-gray-700 text-center mb-15 max-w-sm text-sm">Welcome to Sarii! - Create your Account</p>


                <div className='w-full max-w-sm overflow-hidden'>
                    {/* Form Div */}
                    <div className='flex transition-transform duration-500 ease-in-out w-full max-w-sm'
                        style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>

                        <form onSubmit={handleContinue} className='w-full flex-shrink-0 p-2'>
                            {/* Name Fields*/}
                            <div className='mb-6'>
                                <label htmlFor="firstName" className='block text-primary text-sm font-semibold mb-2.5'>
                                    First Name
                                </label>
                                <div className='relative'>
                                    <LuUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="Enter your First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="middleName" className='block text-primary text-sm font-semibold mb-2.5'>
                                    Middle Name
                                </label>
                                <div className='relative'>
                                    <LuUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        id="middleName"
                                        placeholder="Enter your Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            <div className='mb-6'>
                                <label htmlFor="lastName" className='block text-primary text-sm font-semibold mb-2.5'>
                                    Last Name
                                </label>
                                <div className='relative'>
                                    <LuUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Enter your Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            {error && <p className="text-primary text-sm text-center mb-4">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-102 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        </form>

                        <form onSubmit={handleSubmit} className="w-full flex-shrink-0 p-2">
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

                            {/* Confirm Pasword Field */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-primary text-sm font-semibold mb-2.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <LuLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        placeholder="Enter your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                                    />
                                    <span
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-primary transition duration-200"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </span>
                                </div>
                            </div>

                            {error && <p className="text-primary text-sm text-center mb-4">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-102 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>

                    <p className="mt-4 text-gray-600 text-md text-center">
                        Already have an account?{' '}
                        <a href="/login" className="text-secondary hover:text-primary font-semibold transition duration-200">
                            Login
                        </a>
                    </p>
                </div>
            </div>


            <div className="w-full md:w-1/2 flex items-center justify-center p-12 rounded-lg md:rounded-none md:rounded-r-lg overflow-hidden">
                <img
                    src={illustrationImage}
                    alt="Farm to Table"
                    className="max-w-full h-auto object-contain rounded-4xl shadow-md"
                />
            </div>
        </div>
    );
}

export default Signup