// Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AliExpress-inspired WebApp. All rights
          reserved.
        </p>
        <div className="mt-4">
          <a href="/about" className="text-white hover:text-gray-400 mx-3">
            About Us
          </a>
          <a href="/contact" className="text-white hover:text-gray-400 mx-3">
            Contact Us
          </a>
          <a href="/privacy" className="text-white hover:text-gray-400 mx-3">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white hover:text-gray-400 mx-3">
            Terms of Service
          </a>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Follow us on{" "}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              Facebook
            </a>{" "}
            |{" "}
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              Twitter
            </a>{" "}
            |{" "}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
