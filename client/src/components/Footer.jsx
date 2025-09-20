import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-4 py-6">
      <div className="container mx-auto text-center">
        <img
          src="https://via.placeholder.com/200x50?text=Logo"
          alt="footer-logo"
          className="mx-auto"
        />
      </div>

      <div className="mt-4 text-center text-gray-600 space-y-1">
        <p>Company Name: Example Entertainment Ltd.</p>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Hotline: +123 456 7890</p>
      </div>
    </footer>
  );
};

export default Footer;
