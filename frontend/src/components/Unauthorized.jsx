import logoImage from '../assets/Sarii-Logo.png'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const Unauthorized = () => {
    const navigate = useNavigate();
    const { auth, isLoadingAuth } = useContext(AuthContext);

    const handleGoBack = () => {
        if (auth.isLoggedIn) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
                Checking authentication status...
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-complement font-inter text-gray-800 p-4">
            <div className="mb-8">
                <img src={logoImage} alt="Sarii Logo" className="w-40 h-auto object-contain" />
            </div>

            <h1 className="text-7xl font-bold text-primary mb-4 font-lora text-center">
                401 Unauthorized
            </h1>

            <p className="text-lg text-gray-700 mb-10 text-center max-w-md">
                You don't have access to this resource
            </p>

            {/* Go Back Button */}
            <button
                onClick={handleGoBack}
                className="bg-primary hover:bg-secondary text-complement font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
                {auth.isLoggedIn ? 'Go Back' : 'Go Back to Homepage'}
            </button>
        </div>
    );
}

export default Unauthorized;
