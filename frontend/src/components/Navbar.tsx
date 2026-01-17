'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-light-border-primary dark:border-dark-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Interactive with Icon */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="icon-3d w-10 h-10 group-hover:scale-110 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-gradient group-hover:scale-105 inline-block transition-transform duration-300">Task</span>
              <span className="text-light-text-primary dark:text-dark-text-primary group-hover:text-accent-500 transition-smooth">Flow</span>
            </div>
          </Link>

          {/* Navigation Links */}
          {!loading && isAuthenticated() && (
            <div className="hidden sm:flex sm:items-center sm:space-x-2">
              <Link href="/dashboard">
                <div
                  className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
                    isActive('/dashboard')
                      ? 'bg-accent-500 text-white shadow-glow'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary'
                  }`}
                >
                  📊 Dashboard
                </div>
              </Link>
              <Link href="/tasks">
                <div
                  className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
                    isActive('/tasks')
                      ? 'bg-accent-500 text-white shadow-glow'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary'
                  }`}
                >
                  📝 Tasks
                </div>
              </Link>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {loading ? (
              <div className="spinner" />
            ) : isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary hidden sm:block">
                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary font-medium transition-smooth">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="btn-primary">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
