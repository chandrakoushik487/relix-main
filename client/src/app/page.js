'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Map, Cpu, Users, BarChart } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans selection:bg-primary selection:text-white">
      {/* 1. Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-4' : 'bg-sidebar/95 backdrop-blur py-5'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-sidebar' : 'text-white'}`}>RELIX</span>
          </div>
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${scrolled ? 'text-text-light' : 'text-slate-300'}`}>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${scrolled ? 'text-sidebar border border-sidebar hover:bg-slate-50' : 'text-white border border-white hover:bg-white/10'}`}
            >
              Login
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-sidebar overflow-hidden">
        {/* Subtle dot-grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up">
            Coordinating Relief.<br className="hidden md:block"/> Saving Lives.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            RELIX connects NGOs, volunteers, and field data into one intelligent relief operations platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Enter Dashboard <ArrowRight size={18} />
            </Link>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/30 hover:border-white text-white font-semibold rounded-lg transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section className="bg-slate-100 border-y border-slate-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex-1 min-w-[150px]">
              <p className="text-3xl font-extrabold text-sidebar tabular-nums transition-all">312</p>
              <p className="text-sm font-semibold text-text-light uppercase tracking-wider mt-1">Active Volunteers</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-3xl font-extrabold text-sidebar tabular-nums transition-all">133</p>
              <p className="text-sm font-semibold text-text-light uppercase tracking-wider mt-1">Incidents Tracked</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-3xl font-extrabold text-sidebar tabular-nums transition-all">5</p>
              <p className="text-sm font-semibold text-text-light uppercase tracking-wider mt-1">Regions Covered</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-3xl font-extrabold text-sidebar tabular-nums transition-all">59%</p>
              <p className="text-sm font-semibold text-text-light uppercase tracking-wider mt-1">Resolution Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-24 bg-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-sidebar tracking-tight mb-4">Everything you need to coordinate relief.</h2>
            <p className="text-text-light">A complete toolkit for managing on-the-ground operations effectively and intelligently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature Cards */}
            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all group border border-slate-100">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-bold text-sidebar mb-3">Real-Time Emergency Mapping</h3>
              <p className="text-text-light text-sm leading-relaxed">Visualize incidents on an interactive map. Pinpoint critical areas and monitor resource distribution instantly.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all group border border-slate-100">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-sidebar mb-3">AI-Powered Intelligence</h3>
              <p className="text-text-light text-sm leading-relaxed">Leverage artificial intelligence to prioritize incidents, predict resource needs, and provide actionable operational insights.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all group border border-slate-100">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-sidebar mb-3">Volunteer & NGO Coordination</h3>
              <p className="text-text-light text-sm leading-relaxed">Assign units, track volunteer statuses, and communicate effortlessly with rapid response teams in the field.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all group border border-slate-100">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform mb-6">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-sidebar mb-3">Data Analytics & Reporting</h3>
              <p className="text-text-light text-sm leading-relaxed">Track resolution rates, supply levels, and historic response data to improve future operations through clear reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-sidebar tracking-tight mb-20">How RELIX works.</h2>
          <div className="flex flex-col md:flex-row items-start justify-center gap-8 relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-slate-200 z-0"></div>
            
            <div className="flex-1 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-lg mb-6 ring-8 ring-white">1</div>
              <h3 className="text-lg font-bold text-sidebar mb-2">NGOs upload data</h3>
              <p className="text-sm text-text-light">Staff upload field data and log new incident reports securely.</p>
            </div>
            <div className="flex-1 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sidebar text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-lg mb-6 ring-8 ring-white">2</div>
              <h3 className="text-lg font-bold text-sidebar mb-2">AI Analyzes & Maps</h3>
              <p className="text-sm text-text-light">Incidents are automatically prioritized and mapped for intelligence operations.</p>
            </div>
            <div className="flex-1 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-lg mb-6 ring-8 ring-white">3</div>
              <h3 className="text-lg font-bold text-sidebar mb-2">Volunteers respond</h3>
              <p className="text-sm text-text-light">Units are assigned efficiently, resolving issues and delivering relief.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-20 bg-sidebar">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">Ready to coordinate smarter relief operations?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/login" className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-lg transition-all">
              Create Account
            </Link>
            <Link href="/login" className="px-8 py-3.5 bg-transparent border border-gray-400 hover:border-white hover:text-white text-gray-300 font-semibold rounded-lg transition-all">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#0b1120] py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-white tracking-tight">RELIX</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span className="text-slate-400 text-sm">Intelligence for Relief Operations</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm text-slate-500">
            © 2025 RELIX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
