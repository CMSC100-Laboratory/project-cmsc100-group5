import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import logoImage from '../../assets/Sarii-Logo.png';
import Lottie from "lottie-react";
import animation from "../../assets/animation-apple.json"

const Homepage = () => {
    return (
        <div className="min-h-screen bg-complement font-inter">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 md:p-8">
                <div className="flex items-center">
                    <img src={logoImage} alt="Sarii Logo" className="w-10 h-10 object-contain mr-2" />
                    <span className="text-2xl font-bold text-primary font-lora">Sarii</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#about-us" className="text-primary font-semibold transition duration-200 hover:text-secondary hover:font-bold">About us</a>
                    <a href="#products" className="text-primary font-semibold transition duration-200 hover:text-secondary hover:font-bold">Products</a>
                    <a href="#mission" className="text-primary font-semibold transition duration-200 hover:text-secondary hover:font-bold">Mission</a>
                </div>
                <div className="flex items-center space-x-2">
                    <span>
                        <button className="flex items-center bg-blend-soft-light border-2 border-primary hover:bg-primary text-primary hover:text-complement font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Shop Now
                        </button>
                    </span>
                    <button className="flex items-center bg-blend-soft-light hover:bg-primary text-primary hover:text-complement font-semibold py-2 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 border-2 border-primary">
                        <LuArrowUpRight size={24} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-96px)] p-8">
                {/* Left Side (Empty/Background in screenshot) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                    {/* Animated Illustration Placeholder */}
                    <Lottie animationData={animation} loop={true} />
                </div>

                {/* Right Side (Text Content) */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-4">
                    <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6 font-lora leading-tight">
                        Organic,<br />Sustainable,<br />and Fresh
                    </h1>
                    <p className="text-sm md:text-lg text-gray-700 mb-8 font-semibold">
                        <span>Organic Produce {" "}</span>
                        <span className='text-2xl '>•</span>
                        <span>{" "}Healthier Tomorrow</span>
                    </p>
                    <div className="flex items-center space-x-2">
                        <span>
                            <button className="flex items-center bg-primary hover:bg-secondary text-complement font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                Shop Now
                            </button>
                        </span>
                        <button className="flex items-center bg-secondary hover:bg-primary text-complement font-semibold py-2 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            <LuArrowUpRight size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Placeholder for About Us, Products, Mission sections (not in screenshot, but mentioned) */}
            {/* You would expand these sections with actual content */}
            <section id="about-us" className="py-20 px-8 bg-white text-center">
                <h2 className="text-4xl font-bold text-primary mb-8 font-lora">About Us</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    We are dedicated to providing the freshest organic produce, sourced sustainably from local farms. Our mission is to connect communities with healthy, wholesome food options.
                </p>
            </section>

            <section id="products" className="py-20 px-8 bg-gray-50 text-center">
                <h2 className="text-4xl font-bold text-primary mb-8 font-lora">Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Vegetables</h3>
                        <p className="text-gray-600">A wide selection of seasonal organic vegetables.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Organic Fruits</h3>
                        <p className="text-gray-600">Sweet and juicy fruits, ripened naturally.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Dairy & Eggs</h3>
                        <p className="text-gray-600">Farm-fresh, organic dairy products and eggs.</p>
                    </div>
                </div>
            </section>

            <section id="mission" className="py-20 px-8 bg-white text-center">
                <h2 className="text-4xl font-bold text-primary mb-8 font-lora">Our Mission</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    To cultivate a healthier community by making organic, sustainable, and fresh produce accessible to everyone, fostering a connection between consumers and ethical farming practices.
                </p>
            </section>

            {/* Footer (Optional, not in screenshot but good practice) */}
            <footer className="py-8 px-8 bg-primary text-complement text-center">
                <p>&copy; {new Date().getFullYear()} Sarii. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
