import logoImage from '../assets/Sarii-Logo.png'

const Unauthorized = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-complement font-inter text-gray-800 p-4">
            <div className="mb-8">
                <img src={logoImage} alt="Sarii Logo" className="w-40 h-auto object-contain" />
            </div>

            <h1 className="text-8xl font-bold text-primary mb-4 font-lora text-center">
                Not Authorized
            </h1>

            <p className="text-lg text-gray-700 mb-10 text-center max-w-md">
                You don't have access to this resource
            </p>

            {/* Go Back Button */}
            <a
                href="/" // Link back to the homepage
                className="bg-primary hover:bg-secondary text-complement font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
                Go Back to Homepage
            </a>
        </div>
    );
}

export default Unauthorized;
