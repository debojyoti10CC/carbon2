"use client";

import Link from "next/link";
import { Bolt, ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Monitoring", href: "/monitoring" },
    { name: "Budgeting", href: "/budgeting" },
    { name: "Analytics", href: "/analytics" },
    { name: "ESG", href: "/esg" },
    { name: "Simulation", href: "/simulation" },
    { name: "Reporting", href: "/reporting" },
  ];

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 z-50 backdrop-blur-sm bg-opacity-90">
      {/* Left Navigation */}
      <div className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-gray-300 hover:text-green-400 transition-colors duration-200 relative group"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>

      {/* Right Side: Live + Avatar */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-green-400 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition duration-200 group">
          <Bolt className="w-3.5 h-3.5 animate-pulse text-green-400 group-hover:text-white" />
          <span>Live Mode</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <div className="w-8 h-8 border border-gray-700 hover:border-green-400 transition-colors duration-200 rounded-full overflow-hidden">
              <img
                src="/avatar.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
            <DropdownMenuLabel className="text-gray-300 font-normal">
              <div className="flex flex-col">
                <span className="font-medium">Sam Brown</span>
                <span className="text-xs text-gray-400">sam@carboniq.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 focus:text-white cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 focus:text-white cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
