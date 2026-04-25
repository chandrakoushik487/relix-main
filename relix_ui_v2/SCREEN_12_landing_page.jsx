import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Map, 
  Cpu, 
  Users, 
  BarChart, 
  Activity, 
  ChevronRight,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import './relix_v2.css';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="glass-card p-8 group" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform mb-6 border border-indigo-500/20">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 font-display">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPageV2 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tighter font-display">RELIX</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-[13px] font-semibold px-5 py-2 text-zinc-400 hover:text-white transition-all">
              Sign In
            </button>
            <button className="text-[13px] font-semibold px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold tracking-widest uppercase mb-8 animate-fade-in">
            <Zap size={12} />
            <span>Next-Gen Relief Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 font-display leading-[0.9] animate-fade-in">
            Coordinating Relief.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Saving Lives.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
            RELIX connects NGOs, volunteers, and field data into one intelligent platform 
            built for the most critical missions on Earth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 group">
              Launch Dashboard 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all">
              View Infrastructure
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Active Volunteers', value: '1,248' },
              { label: 'Incidents Resolved', value: '43k+' },
              { label: 'Regions Covered', value: '12' },
              { label: 'Response Time', value: '-42%' }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl font-bold font-display text-white">{stat.value}</p>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-display">Mission Critical Features</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">A unified command center for disaster response and humanitarian logistics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Map} 
              title="Tactical Mapping" 
              description="Real-time spatial awareness with Mapbox integration. Track assets and incidents with sub-meter precision."
              delay={0}
            />
            <FeatureCard 
              icon={Cpu} 
              title="AI Triage" 
              description="Automated incident prioritization using Claude 3.5. Structure messy field data into actionable intelligence."
              delay={100}
            />
            <FeatureCard 
              icon={Shield} 
              title="Secure Coordination" 
              description="Encrypted communication channels between NGOs and volunteers. Role-based access control for sensitive operations."
              delay={200}
            />
            <FeatureCard 
              icon={BarChart} 
              title="Impact Analytics" 
              description="Comprehensive dashboards to track resolution rates, supply distribution, and volunteer efficiency."
              delay={300}
            />
            <FeatureCard 
              icon={Users} 
              title="Volunteer Matching" 
              description="Smart assignment engine that matches skills and location to the most urgent needs on the ground."
              delay={400}
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Resilience" 
              description="Built to function in low-bandwidth environments with offline-first data synchronization."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tighter font-display">RELIX</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              Advancing human resilience through intelligent coordination. 
              Built for teams who refuse to settle for "good enough" when lives are on the line.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm">Platform</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Infrastructure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[12px] font-medium text-zinc-600">
          <p>© 2025 RELIX INTELLIGENCE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-zinc-400">PRIVACY POLICY</a>
            <a href="#" className="hover:text-zinc-400">TERMS OF SERVICE</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV2;
