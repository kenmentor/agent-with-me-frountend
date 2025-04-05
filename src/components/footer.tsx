import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import Feedback from "./feedback";

const Footer = () => {
  return (
    <>
    <Feedback/>
    <footer className="bg-gray-100 text-gray-700 py-10 mt">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Branding */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Agent-with-me</h2>
          <p className="mt-2 text-sm text-gray-600">
            Get the Perfect appartment without stress
          </p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-medium  text-blue-900">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link href="/" className="hover: text-blue-600 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover: text-blue-600 transition-colors">About</Link></li>
            <li><Link href="/homepage" className="hover: text-blue-600 transition-colors">Resources</Link></li>
            <li><Link href="/contact" className="hover: text-blue-600 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section - Socials */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-medium text-gray-900">Follow Us</h3>
          <div className="mt-3 flex justify-center md:justify-end gap-4 ">
            <Link href="#" className="p-3 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-all">
              <FaFacebookF />
            </Link>
            <Link href="#" className="p-3 rounded-full bg-gray-200 hover:bg-blue-400 hover:text-white transition-all">
              <FaTwitter />
            </Link>
            <Link href="#" className="p-3 rounded-full bg-gray-200 hover:bg-pink-500 hover:text-white transition-all">
              <FaInstagram />
            </Link>
            <Link href="#" className="p-3 rounded-full bg-gray-200 hover:bg-blue-700 hover:text-white transition-all">
              <FaLinkedinIn />
            </Link>
            <Link href="#" className="p-3 rounded-full bg-gray-200 hover:bg-black hover:text-white transition-all">
              <FaTiktok />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
        &copy; {new Date().getFullYear()} Agent-with-me. All rights reserved.
      </div>
    </footer>
    </>
  );
};

export default Footer;
