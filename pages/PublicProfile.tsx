import React from 'react';
// @ts-ignore
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, Mail, Globe, Share2, Linkedin, CheckCircle2, Target, Eye, Users, ShieldCheck, Plus, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';

const PublicProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const handleUsername = username || user?.username;

  const { data: profile, isLoading } = useQuery({
    queryKey: ['publicProfile', handleUsername],
    queryFn: async () => {
      if (!handleUsername) throw new Error('No username provided');
      // Updated to match PRD: GET /api/public/users/:username
      const res = await api.get(`/api/public/users/${handleUsername}`);
      return res.data;
    },
    enabled: !!handleUsername,
    // Mock data if API doesn't exist yet for demo
    placeholderData: {
      fullName: 'Ayomide',
      username: 'ayomide',
      professionalTitle: 'Senior Product Designer',
      location: 'Lagos, Nigeria',
      experienceYears: 8,
      email: 'toluayomide@gmail.com',
      remotePreference: 'Remote',
      selectionScore: 89,
      activeMatches: 24,
      profileViews: 56,
      proofScore: 89,
      intentStatement: "I'm seeking a Senior Product Designer role at a growth-stage company where I can drive product strategy through user-centered design. I thrive in environments that value measurable impact and want to work on products that solve real problems at scale.",
      profilePhoto: 'https://picsum.photos/seed/ayomide/400/400',
      verified: true
    }
  });

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading Profile...</div>;

  if (!profile || !handleUsername) return <div className="flex items-center justify-center h-screen">Profile not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10 mb-8">
           <div className="relative">
              <img 
                src={profile.profilePhoto || `https://ui-avatars.com/api/?name=${profile.fullName || 'User'}&background=4a90e2&color=fff`} 
                className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover" 
                alt={profile.fullName || 'Profile'} 
              />
              {profile.verified && (
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 text-nexio-blue shadow-lg">
                  <CheckCircle2 size={32} />
                </div>
              )}
           </div>
           <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-nexio-dark font-heading">{profile.fullName}</h1>
                <p className="text-xl font-bold text-nexio-blue mt-1">{profile.professionalTitle}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-nexio-medium font-semibold">
                <span className="flex items-center gap-2"><MapPin size={18} className="text-nexio-blue" /> {profile.location}</span>
                <span className="flex items-center gap-2"><Briefcase size={18} className="text-nexio-blue" /> {profile.experienceYears} years experience</span>
                <span className="flex items-center gap-2"><Mail size={18} className="text-nexio-blue" /> {profile.email}</span>
                <span className="flex items-center gap-2"><Globe size={18} className="text-nexio-blue" /> {profile.remotePreference}</span>
              </div>
           </div>
           <div className="flex flex-col gap-3">
              <button className="px-8 py-3 bg-nexio-blue text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-all">
                Express Interest
              </button>
              <button className="px-8 py-3 bg-white border border-gray-200 text-nexio-medium rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
                <Share2 size={18} /> Share Profile
              </button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <StatCard label="Selection Score" value={profile.selectionScore} suffix="/100" />
           <StatCard label="Active Matches" value={profile.activeMatches} />
           <StatCard label="Profile Views" value={profile.profileViews} />
           <StatCard label="Proof Score" value={profile.proofScore} suffix="/100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Left Content */}
           <div className="lg:col-span-2 space-y-12">
              <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-nexio-dark mb-6 flex items-center gap-3">
                  <Target size={22} className="text-nexio-blue" /> What I Am Looking For
                </h2>
                <p className="text-nexio-medium leading-relaxed mb-8">{profile.intentStatement}</p>
                <div className="flex flex-wrap gap-3">
                   {['Growth Stage', 'B2C', 'Remote First', 'N2M-N4M'].map(tag => (
                     <span key={tag} className="px-4 py-2 bg-blue-50 text-nexio-blue rounded-xl text-sm font-bold border border-blue-100">
                       {tag}
                     </span>
                   ))}
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-xl font-bold text-nexio-dark flex items-center gap-3">
                     <TrendingUp size={22} className="text-nexio-blue" /> Proof Portfolio
                   </h2>
                </div>
                <div className="space-y-6">
                   {[
                     { 
                       title: 'E-commerce Platform Redesign', 
                       skill: 'Product Design', 
                       desc: 'Redesigned checkout flow, increasing conversion by 34%', 
                       impact: '+34% conversion, -22% cart abandonment',
                       views: 47,
                       matches: 8
                     },
                     { 
                       title: 'Enterprise Design System', 
                       skill: 'Design Systems', 
                       desc: 'Built component library used by 50+ designers across 3 products', 
                       impact: '200+ components, 12 month project',
                       views: 32,
                       matches: 12
                     }
                   ].map((proof, i) => (
                     <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-nexio-blue transition-all group">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-xs font-bold text-nexio-blue uppercase bg-blue-50 px-3 py-1 rounded-full">{proof.skill}</span>
                           <button className="text-nexio-medium hover:text-nexio-blue transition-colors"><Share2 size={16} /></button>
                        </div>
                        <h3 className="text-xl font-bold text-nexio-dark mb-2">{proof.title}</h3>
                        <p className="text-nexio-medium text-sm leading-relaxed mb-6">{proof.desc}</p>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
                           <p className="text-nexio-green text-xs font-bold flex items-center gap-2">
                             <TrendingUp size={14} /> {proof.impact}
                           </p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold text-nexio-medium uppercase">
                           <span className="flex items-center gap-1.5"><Eye size={12} /> {proof.views} Views</span>
                           <span className="flex items-center gap-1.5"><Users size={12} /> {proof.matches} Matches</span>
                           <span className="text-nexio-blue flex items-center gap-1.5"><CheckCircle2 size={12} /> Very High Interest</span>
                        </div>
                     </div>
                   ))}
                </div>
              </section>
           </div>

           {/* Right Column */}
           <div className="space-y-8">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-nexio-dark mb-6 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-nexio-blue" /> Visibility Control
                </h2>
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-nexio-medium">Show to all companies</span>
                      <div className="w-10 h-5 bg-nexio-blue rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-nexio-medium">Hide from current employer</span>
                      <div className="w-10 h-5 bg-nexio-blue rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-nexio-medium">Anonymous browsing</span>
                      <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                         <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                   </div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-nexio-dark mb-4">Profile Strength</h2>
                <div className="space-y-4">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-nexio-medium">Overall Score</span>
                      <span className="text-xs font-bold text-nexio-blue">89/100</span>
                   </div>
                   <div className="w-full h-2 bg-blue-50 rounded-full overflow-hidden">
                      <div className="w-[89%] h-full bg-nexio-blue rounded-full"></div>
                   </div>
                   <ul className="space-y-2 mt-6">
                      <li className="flex items-center gap-2 text-[10px] font-bold text-nexio-green"><CheckCircle2 size={12} /> 2 verified proofs</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-nexio-green"><CheckCircle2 size={12} /> Intent statement added</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-nexio-blue"><Plus size={12} /> Add 1 more proof to reach top 5%</li>
                   </ul>
                </div>
              </section>

              <div className="bg-blue-600 p-8 rounded-3xl text-white space-y-4 shadow-xl shadow-blue-200">
                 <h3 className="text-xl font-bold font-heading">Share Your Proof</h3>
                 <p className="text-xs text-blue-100 leading-relaxed">Let employers see your verified evidence with a single shareable link.</p>
                 <div className="flex flex-col gap-3">
                    <button className="w-full py-3 bg-white text-nexio-blue rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                       <Linkedin size={16} /> Share on LinkedIn
                    </button>
                    <button className="w-full py-3 bg-blue-500 text-white border border-blue-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                       Copy Portfolio Link
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
