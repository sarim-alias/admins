// Imports.
"use client";
import React, { useState } from "react";
import Image from "next/image";
import little from "../../public/little.png";
import { Search } from "lucide-react";
import ModeToggle from "./ModeToggle";
import Link from "next/link";

// Frontend.
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="w-full flex items-center py-5 fixed top-0 z-20 bg-darkest">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo */}
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

        {/* Login, Signup, Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-8 py-2  text-white bg-gray-700 hover:bg-gray-600 rounded-[30px] transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-8 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-[30px] transition"
          >
            Sign Up
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
