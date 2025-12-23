import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, ArrowLeft, Briefcase as BriefcaseIcon, Loader2, Check } from 'lucide-react';
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

  const [skills, setSkills] = useState<SkillProof[]>(user?.id ? [] : []); // Usually skills come with the user object
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    // On load, if skills/exp aren't in the user object, we can rely on the user object being hydrated by AuthContext
    // If the API returns them as part of GET /api/users/me, we map them here.
    if (user) {
      // Assuming skills/experience might be nested or we fetch them if needed
      // For this implementation, we initialize from user state if available
    }
  }, [user]);

  const handleSaveBasic = async () => {
    setIsLoading(true);
    try {
      const res = await api.put('/api/users/me', basicInfo);
      updateUser(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Skill Management ---
  const addSkill = async () => {
    setIsSubmitting('skill');
    const newSkillData = { 
      skill: 'New Skill', 
      projectName: 'Project Name', 
      description: 'Describe what you did', 
      impact: 'Measurable outcome' 
    };
    try {
      const res = await api.post('/api/users/me/skills', newSkillData);
      setSkills(prev => [...prev, res.data]);
    } catch (err) {
      alert("Failed to create skill proof.");
    } finally {
      setIsSubmitting(null);
    }
  };

  const updateSkill = async (id: string, updates: Partial<SkillProof>) => {
    try {
      const res = await api.patch(`/api/users/me/skills/${id}`, updates);
      setSkills(prev => prev.map(s => s.id === id ? res.data : s));
    } catch (err) {
      console.error("Failed to update skill", err);
    }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm("Delete this skill proof?")) return;
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
    const newExpData = { 
      companyName: 'Company Name', 
      role: 'Job Role', 
      startDate: new Date().toISOString().split('T')[0], 
      isCurrent: true, 
      description: 'Role description' 
    };
    try {
      const res = await api.post('/api/users/me/experience', newExpData);
      setExperiences(prev => [...prev, res.data]);
    } catch (err) {
      alert("Failed to add experience.");
    } finally {
      setIsSubmitting(null);
    }
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    try {
      const res = await api.put(`/api/users/me/experience/${id}`, updates);
      setExperiences(prev => prev.map(e => e.id === id ? res.data : e));
    } catch (err) {
      console.error("Failed to update experience", err);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      await api.delete(`/api/users/me/experience/${id}`);
      setExperiences(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete experience.");
    }
  };

  const sections = ['Basic Info', 'Skill Proofs', 'Work Experience'];

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

      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-nexio-dark font-heading">{sections[activeSection]}</h2>
              <p className="text-sm text-nexio-medium">Provide evidence for your claims</p>
            </div>
            {activeSection === 0 && (
              <button 
                onClick={handleSaveBasic}
                disabled={isLoading}
                className="px-8 py-2.5 bg-nexio-blue text-white rounded-xl font-bold shadow-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Profile
              </button>
            )}
          </div>

          {activeSection === 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={basicInfo.professionalTitle}
                    onChange={e => setBasicInfo({...basicInfo, professionalTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-nexio-dark uppercase tracking-wider">Intent Statement</label>
                <textarea 
                  rows={4}
                  value={basicInfo.intentStatement}
                  onChange={e => setBasicInfo({...basicInfo, intentStatement: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none text-sm transition-all"
                  placeholder="Tell employers exactly what roles and impact you're seeking..."
                />
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <input 
                      className="bg-transparent font-bold text-nexio-dark text-lg outline-none focus:border-b border-nexio-blue"
                      value={skill.skill}
                      onChange={e => updateSkill(skill.id, { skill: e.target.value })}
                      onBlur={() => updateSkill(skill.id, { skill: skill.skill })}
                    />
                    <button onClick={() => deleteSkill(skill.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <div className="grid gap-4">
                    <input 
                      placeholder="Project Name"
                      className="bg-transparent text-sm text-nexio-medium outline-none border-b border-transparent focus:border-nexio-blue"
                      value={skill.projectName}
                      onChange={e => updateSkill(skill.id, { projectName: e.target.value })}
                    />
                    <textarea 
                      placeholder="Measurable Impact (e.g. Reduced latency by 40%)"
                      className="bg-transparent text-sm text-nexio-green font-medium outline-none border-b border-transparent focus:border-nexio-blue"
                      value={skill.impact}
                      onChange={e => updateSkill(skill.id, { impact: e.target.value })}
                    />
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
                <div key={exp.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <BriefcaseIcon size={18} className="text-nexio-blue" />
                      <input 
                        className="bg-transparent font-bold text-nexio-dark outline-none focus:border-b border-nexio-blue"
                        value={exp.role}
                        onChange={e => updateExperience(exp.id, { role: e.target.value })}
                      />
                    </div>
                    <button onClick={() => deleteExperience(exp.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <input 
                    placeholder="Company Name"
                    className="w-full bg-transparent text-sm text-nexio-medium outline-none border-b border-transparent focus:border-nexio-blue"
                    value={exp.companyName}
                    onChange={e => updateExperience(exp.id, { companyName: e.target.value })}
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