
import React from 'react';
import { Search as SearchIcon, MapPin, Briefcase, Filter } from 'lucide-react';

const Search: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold text-nexio-dark font-heading leading-tight">Ready for <span className="text-nexio-blue">Proven Talent</span></h1>
        <p className="text-lg text-nexio-medium">Companies are actively seeking verified professionals like you. Skip the queue and show your proof.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-transparent focus-within:border-nexio-blue transition-all">
          <SearchIcon size={20} className="text-nexio-medium" />
          <input type="text" placeholder="Search roles or skills..." className="bg-transparent w-full outline-none text-sm font-medium" />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-transparent focus-within:border-nexio-blue transition-all">
          <MapPin size={20} className="text-nexio-medium" />
          <input type="text" placeholder="Lagos, Remote..." className="bg-transparent w-full outline-none text-sm font-medium" />
        </div>
        <button className="px-8 py-3 bg-nexio-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all">
          <SearchIcon size={18} /> Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <h3 className="font-bold text-nexio-dark flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>
          <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-nexio-medium uppercase mb-2 block">Job Type</label>
               <div className="space-y-2">
                 {['Full-time', 'Contract', 'Internship'].map(t => (
                   <label key={t} className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" className="rounded text-nexio-blue" />
                     <span className="text-sm font-medium text-nexio-medium">{t}</span>
                   </label>
                 ))}
               </div>
             </div>
             <div>
               <label className="text-xs font-bold text-nexio-medium uppercase mb-2 block">Salary Range</label>
               <div className="space-y-2">
                 {['Naira Salary Ranges', 'Local Companies'].map(t => (
                   <label key={t} className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" className="rounded text-nexio-blue" />
                     <span className="text-sm font-medium text-nexio-medium">{t}</span>
                   </label>
                 ))}
               </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {[
            { role: 'Senior React Developer', company: 'TechFlow Inc', location: 'Lagos, Remote', type: 'Full-time', match: '96%' },
            { role: 'Product Designer', company: 'DesignStudio', location: 'Abuja, Hybrid', type: 'Contract', match: '92%' },
            { role: 'UI/UX Tutor', company: 'Stangency', location: 'Remote', type: 'Part-time', match: '88%' }
          ].map((job, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-nexio-blue transition-all shadow-sm group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-nexio-blue text-xl font-bold font-heading">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-nexio-dark group-hover:text-nexio-blue transition-colors">{job.role}</h4>
                    <p className="text-sm text-nexio-medium font-semibold">{job.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-nexio-green bg-emerald-50 px-3 py-1 rounded-full">{job.match} match</span>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-8 text-sm text-nexio-medium font-medium">
                 <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
                 <span className="flex items-center gap-2"><Briefcase size={16} /> {job.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                   {['React', 'TypeScript', 'Framer'].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-slate-50 text-[10px] font-bold text-nexio-medium rounded-lg uppercase tracking-wider">{skill}</span>
                   ))}
                </div>
                <button className="px-6 py-2.5 bg-nexio-blue text-white rounded-xl font-bold text-sm hover:scale-105 transition-all">
                  Express Interest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
