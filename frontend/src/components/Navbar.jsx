'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import little from '../../public/little.png';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <nav className="w-full flex items-center py-5 fixed top-0 z-20 bg-darkest">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image 
            src={little} 
            alt="logo" 
            className="w-24 h-auto object-contain"
            priority
          />
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 justify-center mx-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

      {/* Links. */}
        <ul className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-gray-200"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              {link.title}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;