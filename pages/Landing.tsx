
import React from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass border-b border-gray-100 h-20 px-8 flex items-center justify-between">
        <div className="text-2xl font-bold text-nexio-blue font-heading tracking-tight">nexio</div>
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-nexio-medium">
          <Link to="/" className="text-nexio-blue">Home</Link>
          <a href="#how-it-works" className="hover:text-nexio-blue transition-colors">How it Works</a>
          <Link to="/search" className="hover:text-nexio-blue transition-colors">Opportunities</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-nexio-blue border border-nexio-blue rounded-xl hover:bg-blue-50 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2.5 text-sm font-bold text-white bg-nexio-blue rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
            Signup
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl lg:text-7xl font-bold text-nexio-dark leading-[1.1] font-heading">
            Prove Your <span className="text-nexio-blue">Capability</span>, Not Just Your Resume
          </h1>
          <p className="text-xl text-nexio-medium max-w-xl leading-relaxed">
            Skip the CV. Skip LinkedIn. Show real work with measurable impact and get matched to companies actively looking for your proof.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-nexio-blue text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-blue-100">
              Start Building Proof <ArrowRight size={20} />
            </Link>
            <a href="#how-it-works" className="px-8 py-4 text-nexio-medium font-bold border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              See How It Works
            </a>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/talent/800/600" 
            alt="Talent Professional" 
            className="relative rounded-3xl shadow-2xl border-8 border-white"
          />
          {/* Floating UI cards */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-[200px]">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 text-nexio-green rounded-full flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <span className="text-sm font-bold">+34% Growth</span>
             </div>
             <p className="text-xs text-nexio-medium">Impact verified by Nexio Proof Engine</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Higher Callback Rate', val: '3.2x', icon: <TrendingUp className="mx-auto mb-4 text-nexio-blue" /> },
            { label: 'Placement Ratio', val: '92%', icon: <CheckCircle className="mx-auto mb-4 text-nexio-blue" /> },
            { label: 'Match Accuracy', val: '87%', icon: <Users className="mx-auto mb-4 text-nexio-blue" /> },
            { label: 'Verified Companies', val: '12+', icon: <ShieldCheck className="mx-auto mb-4 text-nexio-blue" /> }
          ].map((stat, i) => (
            <div key={i}>
              {stat.icon}
              <div className="text-4xl font-bold text-nexio-dark mb-2">{stat.val}</div>
              <div className="text-nexio-medium font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-nexio-dark mb-4 font-heading">Your Path to Selection</h2>
          <p className="text-lg text-nexio-medium">A streamlined process designed to put your capabilities front and center</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Build Your Proof', desc: 'Add real projects with measurable outcomes. Show what you have built, not what you claim.' },
            { step: '02', title: 'Gain Visibility', desc: 'Your verified profile gets surfaced to employers actively seeking your exact skill set.' },
            { step: '03', title: 'Connect Directly', desc: 'Express interest in matched opportunities. No applying into black holes.' }
          ].map((step, i) => (
            <div key={i} className="group p-10 rounded-3xl bg-white border border-gray-100 hover:border-nexio-blue transition-all shadow-sm hover:shadow-xl">
              <div className="text-5xl font-bold text-blue-50 mb-6 group-hover:text-blue-100 transition-colors font-heading">{step.step}</div>
              <h3 className="text-2xl font-bold text-nexio-dark mb-4">{step.title}</h3>
              <p className="text-nexio-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-nexio-dark text-white px-8">
        <div className="max-w-5xl mx-auto">
           <h2 className="text-4xl font-bold text-center mb-16 font-heading">Nexio vs Traditional Platforms</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700 border border-gray-700 overflow-hidden rounded-3xl">
              <div className="bg-nexio-dark p-8">
                 <h3 className="text-xl font-bold mb-6 text-gray-400">Traditional (CV/LinkedIn)</h3>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-300 italic"><span className="text-red-500">✕</span> Keywords & connections</li>
                    <li className="flex items-center gap-3 text-gray-300 italic"><span className="text-red-500">✕</span> Unknown black box tracking</li>
                    <li className="flex items-center gap-3 text-gray-300 italic"><span className="text-red-500">✕</span> Apply into a void</li>
                    <li className="flex items-center gap-3 text-gray-300 italic"><span className="text-red-500">✕</span> Manual job searching</li>
                 </ul>
              </div>
              <div className="bg-slate-800 p-8">
                 <h3 className="text-xl font-bold mb-6 text-nexio-blue">Nexio (Proof-Based)</h3>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3"><span className="text-nexio-green">✓</span> Real work and impact</li>
                    <li className="flex items-center gap-3"><span className="text-nexio-green">✓</span> Track visibility in real-time</li>
                    <li className="flex items-center gap-3"><span className="text-nexio-green">✓</span> High-quality employer responses</li>
                    <li className="flex items-center gap-3"><span className="text-nexio-green">✓</span> Intelligent algorithm matching</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-8 text-center text-nexio-medium">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-bold text-nexio-blue font-heading tracking-tight">nexio</div>
            <div className="flex gap-8 text-sm font-medium">
               <Link to="/" className="hover:text-nexio-blue">Privacy</Link>
               <Link to="/" className="hover:text-nexio-blue">Terms</Link>
               <Link to="/" className="hover:text-nexio-blue">Cookies</Link>
            </div>
            <p className="text-sm">© 2025 Nexio. All rights reserved</p>
         </div>
      </footer>
    </div>
  );
};

export default Landing;