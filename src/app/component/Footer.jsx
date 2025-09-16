import React from 'react';
import Link from 'next/link';
import { Dumbbell, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 text-gray-700 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* About Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                        <Dumbbell className="w-10 h-10 text-green-500 font-mono" /> FITLIFE
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        We provide high-quality products and services to our customers, ensuring satisfaction and excellence in every step.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Quick Links</h2>
                    <ul className="space-y-2">
                        {['Home','About Us','Services','Contact'].map((link, idx) => (
                            <li key={idx}>
                                <Link href={`/${link === 'Home' ? '' : link.toLowerCase().replace(/\s+/g,'')}`} className="relative group text-gray-700 font-medium hover:text-green-600 transition-all">
                                    {link}
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                    <p className="text-gray-600 text-sm md:text-base">123 Street,Dhaka, Bangladesh</p>
                    <p className="text-gray-600 text-sm md:text-base">Email: fitlife@gmail.com</p>
                    <p className="text-gray-600 text-sm md:text-base">Phone: +123 456 7890</p>

                    <div className="flex gap-4 mt-4">
                        <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-green-500 text-gray-700 hover:text-white transition-all shadow-md">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-green-500 text-gray-700 hover:text-white transition-all shadow-md">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-green-500 text-gray-700 hover:text-white transition-all shadow-md">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-500 text-sm md:text-base">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
