import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, ArrowLeft, Briefcase as BriefcaseIcon, Loader2 } from 'lucide-react';
import api from '../lib/axios';
import { SkillProof, Experience } from '../types';

const ProfileEditor: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  // Form States
  const [basicInfo, setBasicInfo] = useState({
    fullName: user?.fullName || '',
    professionalTitle: user?.professionalTitle || '',
    location: user?.location || '',
    experienceYears: user?.experienceYears || 0,
    remotePreference: user?.remotePreference || 'Flexible',
    availabilityStatus: user?.availabilityStatus || 'Actively Looking',
    intentStatement: user?.intentStatement || ''
  });

  const [skills, setSkills] = useState<SkillProof[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // We assume the user object from AuthContext may already contain these, 
  // but if not, we can hydrate them from the user's specific sub-resources
  useEffect(() => {
    if (user) {
      setBasicInfo({
        fullName: user.fullName || '',
        professionalTitle: user.professionalTitle || '',
        location: user.location || '',
        experienceYears: user.experienceYears || 0,
        remotePreference: user.remotePreference || 'Flexible',
        availabilityStatus: user.availabilityStatus || 'Actively Looking',
        intentStatement: user.intentStatement || ''
      });
      // In a real app, these might be separate GET requests or pre-populated in AuthContext
    }
  }, [user]);

  const handleSaveBasic = async () => {
    setIsLoading(true);
    try {
      const res = await api.put('/api/users/me', basicInfo);
      updateUser(res.data);
      alert("Basic profile updated!");
    } catch (err) {
      alert("Error updating basic info.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Skill Proof Management ---
  const addSkill = async () => {
    setIsSubmitting('skill');
    try {
      const newSkillData = { 
        skill: 'New Skill', 
        projectName: 'My Project', 
        description: 'Detail of work', 
        impact: 'Measurable outcome' 
      };
      const res = await api.post('/api/users/me/skills', newSkillData);
      setSkills(prev => [...prev, res.data]);
    } catch (err) {
      alert("Failed to add skill.");
    } finally {
      setIsSubmitting(null);
    }
  };

  const patchSkill = async (id: string, updates: Partial<SkillProof>) => {
    try {
      const res = await api.patch(`/api/users/me/skills/${id}`, updates);
      setSkills(prev => prev.map(s => s.id === id ? res.data : s));
    } catch (err) {
      console.error("Failed to update skill proof.");
    }
  };

  const removeSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill proof?")) return;
    try {
      await api.delete(`/api/users/me/skills-delete/${id}`);
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert("Failed to delete skill.");
    }
  };

  // --- Experience Management ---
  const addExperience = async () => {
    setIsSubmitting('exp');
    try {
      const newExpData = { 
        companyName: 'Company Name', 
        role: 'Job Role', 
        startDate: new Date().toISOString(), 
        isCurrent: true, 
        description: 'Role description' 
      };
      const res = await api.post('/api/users/me/experience', newExpData);
      setExperiences(prev => [...prev, res.data]);
    } catch (err) {
      alert("Failed to add experience.");
    } finally {
      setIsSubmitting(null);
    }
  };

  const updateExp = async (id: string, updates: Partial<Experience>) => {
    try {
      const res = await api.put(`/api/users/me/experience/${id}`, updates);
      setExperiences(prev => prev.map(e => e.id === id ? res.data : e));
    } catch (err) {
      console.error("Failed to update experience.");
    }
  };

  const removeExp = async (id: string) => {
    if (!confirm("Remove this experience?")) return;
    try {
      await api.delete(`/api/users/me/experience/${id}`);
      setExperiences(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete experience.");
    }
  };

  const sections = ['Basic Profile', 'Evidence of Skill', 'Career History'];

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
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
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 min-h-[600px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-nexio-dark font-heading">{sections[activeSection]}</h2>
              <p className="text-sm text-nexio-medium">Proof of impact over claims of talent</p>
            </div>
            {activeSection === 0 && (
              <button 
                onClick={handleSaveBasic}
                disabled={isLoading}
                className="px-8 py-2.5 bg-nexio-blue text-white rounded-xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save All
              </button>
            )}
          </div>

          {activeSection === 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nexio-dark uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={basicInfo.fullName}
                    onChange={e => setBasicInfo({...basicInfo, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nexio-dark uppercase tracking-widest">Professional Title</label>
                  <input 
                    type="text" 
                    value={basicInfo.professionalTitle}
                    onChange={e => setBasicInfo({...basicInfo, professionalTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-nexio-dark uppercase tracking-widest">Intent Statement</label>
                <textarea 
                  rows={4}
                  value={basicInfo.intentStatement}
                  onChange={e => setBasicInfo({...basicInfo, intentStatement: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none text-sm transition-all"
                  placeholder="Clearly state what roles and impact you are looking for..."
                />
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group relative">
                  <button onClick={() => removeSkill(skill.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  <div className="space-y-4">
                    <input 
                      className="bg-transparent font-bold text-nexio-dark text-lg w-full outline-none focus:border-b border-nexio-blue"
                      value={skill.skill}
                      onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, skill: e.target.value} : s))}
                      onBlur={() => patchSkill(skill.id, { skill: skill.skill })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        placeholder="Project Name"
                        className="bg-transparent text-sm text-nexio-medium outline-none border-b border-transparent focus:border-nexio-blue"
                        value={skill.projectName}
                        onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, projectName: e.target.value} : s))}
                        onBlur={() => patchSkill(skill.id, { projectName: skill.projectName })}
                      />
                      <input 
                        placeholder="Measurable Impact"
                        className="bg-transparent text-sm text-nexio-green font-bold outline-none border-b border-transparent focus:border-nexio-blue"
                        value={skill.impact}
                        onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, impact: e.target.value} : s))}
                        onBlur={() => patchSkill(skill.id, { impact: skill.impact })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addSkill}
                disabled={isSubmitting === 'skill'}
                className="w-full py-4 border-2 border-dashed border-gray-200 text-nexio-blue rounded-xl font-bold text-sm hover:border-nexio-blue transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting === 'skill' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Skill Proof
              </button>
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                  <button onClick={() => removeExp(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  <div className="flex items-center gap-3 mb-4">
                    <BriefcaseIcon size={18} className="text-nexio-blue" />
                    <input 
                      className="bg-transparent font-bold text-nexio-dark outline-none focus:border-b border-nexio-blue"
                      value={exp.role}
                      onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, role: e.target.value} : ex))}
                      onBlur={() => updateExp(exp.id, { role: exp.role })}
                    />
                  </div>
                  <input 
                    placeholder="Company Name"
                    className="bg-transparent text-sm text-nexio-medium w-full outline-none border-b border-transparent focus:border-nexio-blue mb-4"
                    value={exp.companyName}
                    onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, companyName: e.target.value} : ex))}
                    onBlur={() => updateExp(exp.id, { companyName: exp.companyName })}
                  />
                  <textarea 
                    placeholder="Briefly describe your responsibilities..."
                    className="bg-transparent text-sm text-nexio-medium w-full outline-none border-b border-transparent focus:border-nexio-blue"
                    value={exp.description}
                    onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, description: e.target.value} : ex))}
                    onBlur={() => updateExp(exp.id, { description: exp.description })}
                  />
                </div>
              ))}
              <button 
                onClick={addExperience}
                disabled={isSubmitting === 'exp'}
                className="w-full py-4 border-2 border-dashed border-gray-200 text-nexio-blue rounded-xl font-bold text-sm hover:border-nexio-blue transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting === 'exp' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Experience
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;