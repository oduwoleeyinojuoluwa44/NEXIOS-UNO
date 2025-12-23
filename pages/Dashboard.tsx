import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';
import StatCard from '../components/StatCard';
import { Briefcase, Eye, Send, Target, ChevronRight, Plus, ExternalLink, Users, CheckCircle2 } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Updated to match PRD: GET /api/users/me/analytics
      const res = await api.get('/api/users/me/analytics');
      return res.data;
    },
    initialData: {
      selectionScore: user?.selectionScore || 89,
      activeMatches: user?.activeMatches || 24,
      applicationsOut: 7,
      profileViews: user?.profileViews || 56
    }
  });

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nexio-dark font-heading">Welcome back, {user?.fullName?.split?.(' ')?.[0] || 'there'}</h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-nexio-medium text-sm font-medium">You are ahead of 80% of designers in the world</p>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-nexio-blue rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-nexio-blue rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </div>
        <Link to="/profile/edit" className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-nexio-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
          Edit Profile
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Selection Score" value={analytics.selectionScore} suffix="/100" trend="+12%" icon={<Target size={20} />} />
        <StatCard label="Active Matches" value={analytics.activeMatches} trend="+2 new" icon={<Users size={20} />} />
        <StatCard label="Application Out" value={analytics.applicationsOut} icon={<Send size={20} />} />
        <StatCard label="Profile Views" value={analytics.profileViews} icon={<Eye size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-nexio-dark">Active Applications</h2>
              <button className="text-sm font-bold text-nexio-blue flex items-center gap-1">view all <ChevronRight size={16} /></button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { role: 'Senior Product Designer', company: 'Techflow Inc', date: 'Applied a month ago', match: '94%', status: 'Final round', color: 'bg-purple-500' },
                { role: 'Design Lead', company: 'Notion', date: 'Applied a week ago', match: '88%', status: 'Interview', color: 'bg-blue-500' },
                { role: 'UI Engineer', company: 'Figma', date: 'Applied two weeks ago', match: '90%', status: 'Under Review', color: 'bg-emerald-500' }
              ].map((app, i) => (
                <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${app.color}`}></div>
                    <div>
                      <h4 className="font-bold text-nexio-dark">{app.role}</h4>
                      <p className="text-sm text-nexio-medium flex items-center gap-2"><Briefcase size={14} /> {app.company} • {app.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-nexio-dark">{app.match} match</div>
                    <div className="text-xs text-nexio-medium mt-1">{app.status}</div>
                    <button className="text-[10px] font-bold text-nexio-blue mt-2 opacity-0 group-hover:opacity-100 transition-opacity">View details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50/30 rounded-2xl p-6 border border-orange-100">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                    <Target size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-nexio-dark">Challenges from Employers</h3>
                    <p className="text-xs text-nexio-medium">Prove your skills by responding to real challenges</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">3 new</span>
             </div>
             
             <div className="space-y-4">
                {[
                  { company: 'Airbnb', title: 'How would you redesign our host onboarding to reduce drop off?', reward: 'Fast Track to Interview' },
                  { company: 'Linear', title: 'Propose a better way to visualize project dependencies.', reward: 'Portfolio review section' }
                ].map((challenge, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all group">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-nexio-dark">{challenge.company}</h4>
                        <button className="text-xs font-bold text-nexio-blue opacity-0 group-hover:opacity-100 transition-opacity">View details</button>
                     </div>
                     <p className="text-sm text-nexio-medium mb-4 leading-relaxed">{challenge.title}</p>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-nexio-green">
                        <CheckCircle2 size={12} /> Reward: {challenge.reward}
                     </div>
                  </div>
                ))}
                <button className="w-full py-3 border border-orange-200 text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors mt-4">
                  Browse all challenges
                </button>
             </div>
          </div>
        </div>

        {/* Right Column - Side Panels */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold text-nexio-dark mb-6">Your Proof Profile</h2>
             <div className="space-y-6">
                {[
                  { title: 'Ecommerce Website Redesign', impact: '+34% conversion', views: '2.1k', verified: true },
                  { title: 'Enterprise Design System', impact: '200+ components', views: '1.2k', verified: false }
                ].map((proof, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-blue-100 hover:before:bg-nexio-blue before:rounded-full transition-all">
                    <h4 className="text-sm font-bold text-nexio-dark mb-1">{proof.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-nexio-medium">
                       <span>{proof.impact}</span>
                       <span>•</span>
                       <span>{proof.views} views</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${proof.verified ? 'bg-green-50 text-nexio-green' : 'bg-orange-50 text-orange-500'}`}>
                         {proof.verified ? 'Verified' : 'In Review'}
                       </span>
                    </div>
                  </div>
                ))}
                <Link to="/profile/edit" className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-nexio-blue rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors">
                  <Plus size={16} /> Add Proof
                </Link>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold text-nexio-dark mb-6">Recommended Steps</h2>
             <div className="space-y-4">
                {[
                  { title: 'Preparation for Interview', sub: 'Due soon', icon: <Target className="text-nexio-blue" /> },
                  { title: 'Review 8 New Matches', sub: 'High match score', icon: <Users className="text-nexio-blue" /> },
                  { title: 'Update Location Preferences', sub: 'Increase visibility by 15%', icon: <Send className="text-nexio-blue" /> }
                ].map((step, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-50 hover:bg-slate-50 transition-colors flex items-center gap-4 cursor-pointer">
                    <div className="p-2 bg-blue-50 rounded-lg">{step.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-nexio-dark">{step.title}</h4>
                      <p className="text-[10px] text-nexio-medium">{step.sub}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
             <h2 className="text-lg font-bold text-nexio-dark mb-2">Share Your Proof</h2>
             <p className="text-xs text-nexio-medium mb-6 leading-relaxed">Show your work to potential employers even outside Nexio with your unique link.</p>
             <div className="flex flex-col gap-3">
                <button className="w-full py-3 bg-white border border-blue-200 text-nexio-blue rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors">
                   <ExternalLink size={16} /> Copy Portfolio Link
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
