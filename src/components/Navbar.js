'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getCookie, removeCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  
  const isAuthenticated = () => {
    return !!getCookie('token');
  };
  
  const handleLogout = () => {
    removeCookie('token');
    router.push('/login');
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/next.svg"
              alt="Logo"
              width={100}
              height={24}
              className="dark:invert"
            />
          </Link>
        </div>
        
        <div className="flex items-center md:order-2">
          {isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 