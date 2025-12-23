import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, HelpCircle, ArrowLeft, Upload, Briefcase as BriefcaseIcon, Loader2 } from 'lucide-react';
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

  // Fetch granular data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // These might be part of the user object or separate fetches depending on final API shape
        // For strict compliance, we'll assume they are fetched or managed via the specific endpoints
      } catch (e) {
        console.error("Failed to load granular profile data", e);
      }
    };
    fetchData();
  }, []);

  const handleSaveBasic = async () => {
    setIsLoading(true);
    try {
      await api.put('/api/users/me', basicInfo);
      updateUser(basicInfo);
      alert("Basic info updated!");
    } catch (err) {
      alert("Error saving profile basics.");
    } finally {
      setIsLoading(false);
    }
  };

  // Skill Management
  const addSkill = async () => {
    setIsSubmitting('skill');
    const newSkill = { skill: 'New Skill', projectName: 'New Project', description: '', impact: '' };
    try {
      const res = await api.post('/api/users/me/skills', newSkill);
      setSkills([...skills, res.data]);
    } catch (err) {
      alert("Failed to add skill");
    } finally {
      setIsSubmitting(null);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await api.delete(`/api/users/me/skills-delete/${id}`);
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {
      alert("Failed to delete skill");
    }
  };

  // Experience Management
  const addExperience = async () => {
    setIsSubmitting('exp');
    const newExp = { companyName: 'Company', role: 'Role', startDate: new Date().toISOString(), isCurrent: true, description: '' };
    try {
      const res = await api.post('/api/users/me/experience', newExp);
      setExperiences([...experiences, res.data]);
    } catch (err) {
      alert("Failed to add experience");
    } finally {
      setIsSubmitting(null);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await api.delete(`/api/users/me/experience/${id}`);
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete experience");
    }
  };

  const sections = ['Basic Info', 'Skill Proofs', 'Work Experience', 'Problem Solving'];

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
      </div>

      {/* Main Form Area */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-nexio-dark font-heading">{sections[activeSection]}</h2>
              <p className="text-sm text-nexio-medium">Manage your professional evidence</p>
            </div>
            {activeSection === 0 && (
              <button 
                onClick={handleSaveBasic}
                disabled={isLoading}
                className="px-8 py-2.5 bg-nexio-blue text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
              </button>
            )}
          </div>

          {activeSection === 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nexio-dark uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={basicInfo.fullName}
                    onChange={e => setBasicInfo({...basicInfo, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nexio-dark uppercase">Professional Title</label>
                  <input 
                    type="text" 
                    value={basicInfo.professionalTitle}
                    onChange={e => setBasicInfo({...basicInfo, professionalTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-nexio-dark uppercase">Intent Statement</label>
                <textarea 
                  rows={4}
                  value={basicInfo.intentStatement}
                  onChange={e => setBasicInfo({...basicInfo, intentStatement: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-nexio-blue outline-none text-sm"
                  placeholder="What are you looking for?"
                />
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <h4 className="font-bold text-nexio-dark">{skill.skill}</h4>
                  <p className="text-sm text-nexio-medium mt-1">{skill.projectName}</p>
                </div>
              ))}
              <button 
                onClick={addSkill}
                disabled={isSubmitting === 'skill'}
                className="w-full py-4 border-2 border-dashed border-gray-200 text-nexio-blue rounded-xl font-bold text-sm hover:border-nexio-blue flex items-center justify-center gap-2"
              >
                {isSubmitting === 'skill' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add New Skill Proof
              </button>
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative group">
                  <button 
                    onClick={() => deleteExperience(exp.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <BriefcaseIcon size={18} className="text-nexio-blue" />
                    <h4 className="font-bold text-nexio-dark">{exp.role}</h4>
                  </div>
                  <p className="text-sm text-nexio-medium">{exp.companyName}</p>
                </div>
              ))}
              <button 
                onClick={addExperience}
                disabled={isSubmitting === 'exp'}
                className="w-full py-4 border-2 border-dashed border-gray-200 text-nexio-blue rounded-xl font-bold text-sm hover:border-nexio-blue flex items-center justify-center gap-2"
              >
                {isSubmitting === 'exp' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Work Experience
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;