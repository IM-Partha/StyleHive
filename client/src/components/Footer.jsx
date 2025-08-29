// Footer.jsx
import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AliExpress-inspired WebApp. All rights reserved.
        </p>
        <div className="mt-4">
          <button onClick={scrollToTop} className="text-white hover:text-gray-400 mx-3">
            About Us
          </button>
          <button onClick={scrollToTop} className="text-white hover:text-gray-400 mx-3">
            Contact Us
          </button>
          <button onClick={scrollToTop} className="text-white hover:text-gray-400 mx-3">
            Privacy Policy
          </button>
          <button onClick={scrollToTop} className="text-white hover:text-gray-400 mx-3">
            Terms of Service
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Follow us on{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              Facebook
            </a>{" "}
            |{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              Twitter
            </a>{" "}
            |{" "}
            <a
              href="#"
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
