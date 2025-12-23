import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, HelpCircle, ArrowLeft, Upload } from 'lucide-react';
import api from '../lib/axios';

const ProfileEditor: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [basicInfo, setBasicInfo] = useState({
    fullName: user?.fullName || '',
    professionalTitle: user?.professionalTitle || '',
    location: user?.location || '',
    experienceYears: user?.experienceYears || 0,
    remotePreference: user?.remotePreference || 'Flexible',
    availabilityStatus: user?.availabilityStatus || 'Actively Looking'
  });

  const [intent, setIntent] = useState(user?.intentStatement || '');
  
  const [proofs, setProofs] = useState([
    { id: '1', skill: '', projectName: '', description: '', impact: '', projectLink: '' }
  ]);

  const [problemResponses, setProblemResponses] = useState([
    { id: '1', question: '', response: '', impact: '' }
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Updated to match PRD: PUT /api/users/me
      await api.put('/api/users/me', { 
        ...basicInfo, 
        intentStatement: intent 
      });
      
      updateUser({ ...basicInfo, intentStatement: intent });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Error saving profile. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const sections = ['Basic Info', 'Career Intent', 'Skill Proof', 'Problem Solving'];

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-nexio-medium hover:text-nexio-blue mb-8 font-bold text-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="space-y-1">
          {sections.map((section, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeSection === i ? 'bg-white text-nexio-blue shadow-sm border border-gray-100' : 'text-nexio-medium hover:bg-gray-100'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
           <div className="flex items-center gap-2 text-nexio-blue mb-3 font-bold text-sm">
             <HelpCircle size={18} /> Profile Tips
           </div>
           <ul className="text-xs text-nexio-medium space-y-4 leading-relaxed italic">
             <li>"Increased user retention by 45%" is much stronger than "Improved user experience".</li>
             <li>Focus on outcomes, not just tasks.</li>
             <li>Include links to live projects where possible.</li>
           </ul>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-nexio-dark font-heading">Build Profile</h2>
              <p className="text-sm text-nexio-medium">Tell the right stories to attract the right opportunities</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 text-sm font-bold text-nexio-medium rounded-xl hover:bg-gray-100">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="px-8 py-2.5 bg-nexio-blue text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Save size={18} /> {isLoading ? "Saving..." : "Build Profile"}
              </button>
            </div>
          </div>

          {/* Dynamic Sections */}
          {activeSection === 0 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-inner bg-gray-100 flex items-center justify-center text-nexio-medium relative overflow-hidden group">
                       {user?.profilePhoto ? (
                         <img src={user.profilePhoto} className="w-full h-full object-cover" />
                       ) : (
                         <Upload size={32} />
                       )}
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <span className="text-[10px] font-bold">Change</span>
                       </div>
                    </div>
                    <span className="text-xs font-bold text-nexio-medium">Max 2MB: JPG, PNG</span>
                 </div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-nexio-dark uppercase tracking-wider">Full Name</label>
                       <input 
                         type="text" 
                         value={basicInfo.fullName}
                         onChange={e => setBasicInfo({...basicInfo, fullName: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-nexio-dark uppercase tracking-wider">Professional Title</label>
                       <input 
                         type="text" 
                         placeholder="Senior Product Designer"
                         value={basicInfo.professionalTitle}
                         onChange={e => setBasicInfo({...basicInfo, professionalTitle: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-nexio-dark uppercase tracking-wider">Location</label>
                       <input 
                         type="text" 
                         placeholder="Lagos, Nigeria"
                         value={basicInfo.location}
                         onChange={e => setBasicInfo({...basicInfo, location: e.target.value})}
                         className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-nexio-dark uppercase tracking-wider">Experience (Years)</label>
                       <input 
                         type="number" 
                         value={basicInfo.experienceYears}
                         onChange={e => setBasicInfo({...basicInfo, experienceYears: parseInt(e.target.value)})}
                         className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                       />
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="space-y-3">
                  <label className="text-sm font-bold text-nexio-dark">Intent Statement</label>
                  <textarea 
                    rows={5}
                    placeholder="I'm seeking a Senior Product Designer role at a growth-stage company where I can drive product strategy through user-centered design..."
                    value={intent}
                    onChange={e => setIntent(e.target.value)}
                    className="w-full p-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all text-sm leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[10px] text-nexio-medium font-bold uppercase">
                     <span>Be specific about what you want - this helps matching</span>
                     <span>{intent.length}/500</span>
                  </div>
               </div>
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-8">
               {proofs.map((proof, idx) => (
                 <div key={proof.id} className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-6 relative group">
                    <button className="absolute top-6 right-6 text-nexio-medium hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-nexio-medium uppercase">Skill</label>
                          <input type="text" placeholder="e.g. Product Design" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-nexio-medium uppercase">Project Name</label>
                          <input type="text" placeholder="e.g. E-commerce Website Redesign" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-nexio-medium uppercase">Proof Description</label>
                       <textarea rows={3} placeholder="Describe what you built..." className="w-full p-4 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-nexio-medium uppercase">Impact (Quantified)</label>
                          <input type="text" placeholder="+34% conversion" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-nexio-medium uppercase">Project Link (Optional)</label>
                          <input type="text" placeholder="https://" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                       </div>
                    </div>
                    <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-nexio-medium hover:border-nexio-blue hover:text-nexio-blue transition-all cursor-pointer">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-bold">Drag & drop files or click to upload</span>
                        <span className="text-[10px] opacity-70 mt-1">Images, PDFs, Videos up to 10MB</span>
                    </div>
                 </div>
               ))}
               <button 
                 onClick={() => setProofs([...proofs, { id: Math.random().toString(), skill: '', projectName: '', description: '', impact: '', projectLink: '' }])}
                 className="w-full py-4 border border-nexio-blue border-dashed text-nexio-blue rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
               >
                 <Plus size={18} /> Add Skill
               </button>
            </div>
          )}

          {activeSection === 3 && (
            <div className="space-y-8">
               <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl text-orange-600 mb-8 border border-orange-100">
                  <HelpCircle size={20} />
                  <span className="text-xs font-bold leading-snug">Optional: Respond to common problem-solving questions to show how you think.</span>
               </div>
               {problemResponses.map((resp, idx) => (
                 <div key={resp.id} className="p-8 rounded-2xl bg-orange-50/20 border border-orange-100 space-y-6 relative">
                    <button className="absolute top-6 right-6 text-nexio-medium hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-nexio-medium uppercase">Problem/Question</label>
                       <input type="text" placeholder="e.g. How do you handle conflicting stakeholder feedback?" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-nexio-medium uppercase">Response</label>
                       <textarea rows={4} className="w-full p-4 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-nexio-medium uppercase">Impact</label>
                       <input type="text" placeholder="Reduced design revision cycles by 40%" className="w-full px-4 py-2 bg-white rounded-lg border border-gray-100 outline-none focus:border-nexio-blue" />
                    </div>
                 </div>
               ))}
               <button 
                 onClick={() => setProblemResponses([...problemResponses, { id: Math.random().toString(), question: '', response: '', impact: '' }])}
                 className="w-full py-4 border border-orange-200 border-dashed text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
               >
                 <Plus size={18} /> Add Response
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;