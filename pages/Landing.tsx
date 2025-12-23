import React from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingUp, Users, ShieldCheck, Globe, Check, AlertTriangle } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass border-b border-gray-100 h-20 px-6 md:px-10 flex items-center justify-between">
        <div className="text-2xl font-bold text-nexio-blue font-heading tracking-tight">nexio</div>
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-nexio-medium">
          <Link to="/" className="text-nexio-blue">Home</Link>
          <a href="#how-it-works" className="hover:text-nexio-blue transition-colors">How it Works</a>
          <Link to="/search" className="hover:text-nexio-blue transition-colors">Opportunities</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-bold text-nexio-blue border border-nexio-blue rounded-lg hover:bg-blue-50 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="px-5 py-2 text-sm font-bold text-white bg-nexio-blue rounded-lg shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
            Signup
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-36 pb-16 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center space-y-6 relative">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-nexio-medium">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-nexio-blue border border-blue-100">The Future of Talent Discovery</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nexio-dark leading-tight font-heading">
            Prove Your <span className="text-nexio-blue">Capability</span><br className="hidden md:block" /> Not Just Your Resume
          </h1>
          <p className="text-lg md:text-xl text-nexio-medium max-w-3xl mx-auto leading-relaxed">
            Skip the CV. Skip LinkedIn. Show real work with measurable impact and get matched to companies actively looking for your proof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#how-it-works" className="px-6 py-3 text-sm font-bold text-nexio-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              See How It Works
            </a>
            <Link to="/signup" className="px-6 py-3 text-sm font-bold text-white bg-nexio-blue rounded-lg shadow-lg shadow-blue-200 hover:shadow-xl transition-all flex items-center gap-2">
              Start Building Proof <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-nexio-blue mt-4">
            <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              <Globe size={14} /> Active profiles today
            </span>
            <span className="text-nexio-medium text-xs">19 new verified profiles in the past 24 hours</span>
          </div>

          {/* Floating proof cards */}
          <div className="hidden md:block">
            <div className="absolute left-0 top-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-56">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-nexio-blue">GB</div>
                <div>
                  <p className="text-sm font-bold text-nexio-dark">Gifford Boyd</p>
                  <p className="text-xs text-nexio-medium">Product Designer</p>
                </div>
              </div>
              <p className="text-xs text-nexio-medium mb-3">Redesigned checkout flow, increasing conversion by 34%</p>
              <div className="flex justify-between text-[10px] font-bold text-nexio-medium">
                <span className="flex items-center gap-1 text-nexio-green"><Check size={12} />Verified</span>
                <span className="flex items-center gap-1 text-nexio-medium">2.1k views</span>
              </div>
            </div>
            <div className="absolute right-0 top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-56">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center font-bold text-orange-500">CF</div>
                <div>
                  <p className="text-sm font-bold text-nexio-dark">Chioma Frank</p>
                  <p className="text-xs text-nexio-medium">Frontend Engineer</p>
                </div>
              </div>
              <p className="text-xs text-nexio-medium mb-3">Onboarded 60k users in 1 day; generated $2M in incremental revenue</p>
              <div className="flex justify-between text-[10px] font-bold text-nexio-medium">
                <span className="flex items-center gap-1 text-nexio-green"><Check size={12} />Verified</span>
                <span className="flex items-center gap-1 text-nexio-medium">1.8k views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {[
            { label: 'Higher callback rate', val: '3.2x', icon: <TrendingUp className="mx-auto mb-3 text-nexio-blue" /> },
            { label: 'Placement ratio', val: '92%', icon: <CheckCircle className="mx-auto mb-3 text-nexio-blue" /> },
            { label: 'Match accuracy', val: '87%', icon: <Users className="mx-auto mb-3 text-nexio-blue" /> },
            { label: 'Companies using Nexio', val: '12+', icon: <ShieldCheck className="mx-auto mb-3 text-nexio-blue" /> }
          ].map((stat, i) => (
            <div key={i}>
              {stat.icon}
              <div className="text-4xl font-bold text-nexio-dark mb-1">{stat.val}</div>
              <div className="text-nexio-medium font-medium capitalize">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-nexio-blue uppercase tracking-widest">How it Works</p>
          <h2 className="text-4xl font-bold text-nexio-dark mb-3 font-heading">Your Path to Selection</h2>
          <p className="text-lg text-nexio-medium">A streamlined process designed to put your capabilities front and center</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Build Your Proof', desc: 'Add projects and quantify the outcomes with measurable metrics.' },
            { title: 'Gain Visibility', desc: 'Your verified profile surfaces to employers searching for your skills.' },
            { title: 'Connect Directly', desc: 'Express interest in matched opportunities and get responses faster.' }
          ].map((step, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-nexio-blue transition-all shadow-sm hover:shadow-lg">
              <div className="text-5xl font-bold text-blue-50 mb-6 group-hover:text-blue-100 transition-colors font-heading">0{i + 1}</div>
              <h3 className="text-2xl font-bold text-nexio-dark mb-3">{step.title}</h3>
              <p className="text-nexio-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Professionals */}
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-nexio-blue uppercase tracking-widest">Verified Professionals</p>
            <h3 className="text-3xl font-bold text-nexio-dark font-heading">Proof-backed talent ready for their next opportunity</h3>
          </div>
          <Link to="/search" className="text-sm font-bold text-nexio-blue hover:underline">See More Profiles</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Gifford Boyd', title: 'Product Designer', impact: 'Redesigned checkout flow, increasing conversion by 34%', views: '2.1k', verified: true },
            { name: 'Shadrach Chukwu', title: 'UX Researcher', impact: 'Ran 18+ studies; reduced churn by 10%', views: '1.3k', verified: true },
            { name: 'Chioma Frank', title: 'Frontend Engineer', impact: 'Onboarded 60k users in a day; generated $2M', views: '900', verified: true }
          ].map((pro, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-nexio-blue">
                  {pro.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-nexio-dark">{pro.name}</p>
                  <p className="text-xs text-nexio-medium">{pro.title}</p>
                </div>
              </div>
              <p className="text-sm text-nexio-medium mb-3 leading-relaxed">{pro.impact}</p>
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <span className="px-2 py-1 rounded-full bg-green-50 text-nexio-green flex items-center gap-1"><Check size={12} /> Verified</span>
                <span className="text-nexio-medium">{pro.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-nexio-blue uppercase tracking-widest">Opportunities</p>
              <h3 className="text-3xl font-bold text-nexio-dark font-heading">Ready for Proven Talent</h3>
              <p className="text-sm text-nexio-medium">Companies actively seeking talent with proven track records</p>
            </div>
            <Link to="/search" className="px-4 py-2 bg-nexio-blue text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md">
              View all jobs
            </Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {[
                { role: 'Senior React Developer', company: 'Platnova', type: 'Full-time', match: '96%', location: 'Lagos (Remote)' },
                { role: 'Product Designer', company: 'Fleish', type: 'Full-time', match: '92%', location: 'Abuja (Hybrid)' },
                { role: 'UI/UX Tutor', company: 'Stangency', type: 'Contract', match: '88%', location: 'Remote' }
              ].map((job, i) => (
                <div key={i} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-nexio-blue font-bold">
                      {job.company[0]}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-nexio-dark">{job.role}</p>
                      <p className="text-sm text-nexio-medium">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-nexio-medium">
                    <span className="px-3 py-1 bg-emerald-50 text-nexio-green font-bold rounded-full">{job.match} match</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100">{job.type}</span>
                    <Link to="/login" className="text-nexio-blue font-bold text-sm">Apply</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
           <p className="text-xs font-bold text-nexio-blue uppercase tracking-widest text-center mb-3">Our Platform</p>
           <h2 className="text-4xl font-bold text-center mb-10 font-heading">Nexio vs Traditional Platforms</h2>
           <div className="overflow-hidden border border-gray-100 rounded-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2">
               <div className="p-6 bg-white">
                 <h3 className="text-lg font-bold text-nexio-dark mb-4">Traditional (CV/LinkedIn)</h3>
                 <ul className="space-y-3 text-nexio-medium">
                   <li className="flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Keywords & connections</li>
                   <li className="flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Unknown black box tracking</li>
                   <li className="flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Apply into a void</li>
                   <li className="flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Manual job searching</li>
                 </ul>
               </div>
               <div className="p-6 bg-blue-50">
                 <h3 className="text-lg font-bold text-nexio-dark mb-4">Nexio (Proof-Based)</h3>
                 <ul className="space-y-3 text-nexio-dark">
                   <li className="flex items-center gap-2 text-nexio-green"><Check size={14} /> Real work and impact</li>
                   <li className="flex items-center gap-2 text-nexio-green"><Check size={14} /> Track visibility in real-time</li>
                   <li className="flex items-center gap-2 text-nexio-green"><Check size={14} /> High-quality employer responses</li>
                   <li className="flex items-center gap-2 text-nexio-green"><Check size={14} /> Intelligent algorithm matching</li>
                 </ul>
                 <div className="mt-6">
                   <Link to="/signup" className="px-5 py-2 bg-nexio-blue text-white rounded-lg font-bold shadow-sm hover:shadow-md">
                     Start Building Proof
                   </Link>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6 md:px-10 text-nexio-medium">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-2xl font-bold text-nexio-blue font-heading tracking-tight">nexio</div>
              <p className="text-sm text-nexio-medium mt-1">Proving capability over claims.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm font-medium">
              <div>
                <p className="font-bold text-nexio-dark mb-2">Talent</p>
                <p className="text-nexio-medium">Create proof</p>
                <p className="text-nexio-medium">Showcase impact</p>
              </div>
              <div>
                <p className="font-bold text-nexio-dark mb-2">Company</p>
                <p className="text-nexio-medium">Search proofs</p>
                <p className="text-nexio-medium">Hire with confidence</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
               <Link to="/" className="hover:text-nexio-blue">Privacy</Link>
               <Link to="/" className="hover:text-nexio-blue">Terms</Link>
               <Link to="/" className="hover:text-nexio-blue">Cookies</Link>
            </div>
         </div>
         <p className="text-center text-xs text-nexio-medium mt-6">© 2025 Nexio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
