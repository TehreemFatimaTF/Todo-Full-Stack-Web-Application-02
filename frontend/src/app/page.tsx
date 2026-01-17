'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg-secondary dark:bg-dark-bg-primary">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg-secondary dark:bg-dark-bg-primary relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center animate-fade-in">
          {/* Logo Icon */}
          <div className="flex justify-center mb-8">
            <div className="icon-3d w-20 h-20 animate-scale-in">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">
            <span className="text-gradient">Task</span>
            <span className="text-light-text-primary dark:text-dark-text-primary">Flow</span>
          </h1>

          <p className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary font-medium mb-4">
            Organize • Achieve • Succeed
          </p>

          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-light-text-tertiary dark:text-dark-text-tertiary leading-relaxed">
            Transform your productivity with our premium task management platform.
            <span className="block mt-3 text-accent-500 font-semibold text-xl">
              Intelligent. Precise. Powerful.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-slide-up">
            <Link href="/signup">
              <button className="btn-primary px-12 py-4 text-lg group">
                Get Started Free
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>

            <Link href="/login">
              <button className="btn-secondary px-12 py-4 text-lg">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Why Choose</span>
            <span className="text-light-text-primary dark:text-dark-text-primary"> TaskFlow?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                title: "Premium Design",
                description: "Stunning 3D effects and smooth animations that make task management a premium experience"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Optimized performance ensures smooth experience across all devices with instant response"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure & Private",
                description: "Enterprise-grade security keeps your data safe and protected with end-to-end encryption"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="stat-card p-8 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="icon-3d w-16 h-16 mb-6 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10K+", label: "Active Users", icon: "👥" },
              { number: "50K+", label: "Tasks Completed", icon: "✓" },
              { number: "99.9%", label: "Uptime", icon: "⚡" }
            ].map((stat, index) => (
              <div
                key={index}
                className="card-3d p-8 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-light-text-secondary dark:text-dark-text-secondary text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center animate-fade-in">
          <div className="card-3d p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Ready to boost</span>
              <span className="text-light-text-primary dark:text-dark-text-primary"> your productivity?</span>
            </h2>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
              Join thousands of users who are already achieving more with TaskFlow
            </p>
            <Link href="/signup">
              <button className="btn-primary px-16 py-5 text-xl">
                Start Free Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
