import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  navbarLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ navbarLogo = false }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        {/* Logo Image */}
        <img
          src="https://i.postimg.cc/NFsNR2rF/logo.png"
          alt="Shah Sultan's IELTS Academy Logo"
          className="h-10 md:h-12"
        />

        {/* Text Section */}
        <div className="ml-2 leading-tight">
          <h1
            className={`text-lg md:text-xl font-bold flex items-center gap-1 ${
              navbarLogo ? 'text-primary' : 'text-white'
            }`}
          >
            Shah Sultan
            <span className="text-red-600">'</span>
            s
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-wide text-blue-800">
            IELTS ACADEMY
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
