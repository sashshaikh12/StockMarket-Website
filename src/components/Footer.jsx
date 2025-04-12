import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bester. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;