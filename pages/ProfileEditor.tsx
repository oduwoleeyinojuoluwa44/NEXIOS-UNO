import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, Briefcase as BriefcaseIcon, Loader2, UploadCloud, CheckCircle2, Lightbulb, Link as LinkIcon } from 'lucide-react';
import api from '../lib/axios';
import { SkillProof, Experience } from '../types';

const ProfileEditor: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(user?.profilePhoto);

  // Form States
  const [basicInfo, setBasicInfo] = useState({
    fullName: user?.fullName || '',
    professionalTitle: user?.professionalTitle || '',
    country: user?.country || '',
    street: user?.street || '',
    bio: (user as any)?.bio || (user as any)?.intentStatement || '',
    remotePreference: 'Remote',
    availabilityStatus: 'Actively Looking',
    experienceYears: '',
    gmail: (user as any)?.gmail || ''
  });

  const [skills, setSkills] = useState<SkillProof[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    if (user) {
      setBasicInfo({
        fullName: user.fullName || '',
        professionalTitle: user.professionalTitle || '',
        country: user.country || '',
        street: user.street || '',
        bio: (user as any)?.bio || (user as any)?.intentStatement || '',
        remotePreference: (user as any)?.remotePreference || 'Remote',
        availabilityStatus: (user as any)?.availabilityStatus || 'Actively Looking',
        experienceYears: (user as any)?.experienceYears || '',
        gmail: (user as any)?.gmail || ''
      });
      setPhotoPreview(user.profilePhoto);
      // Skills and experiences could be hydrated here if returned with user payload
    }
  }, [user]);

  const handleSaveBasic = async () => {
    setIsLoading(true);
    try {
      const res = await api.put('/api/users/me', {
        country: basicInfo.country,
        street: basicInfo.street,
        bio: basicInfo.bio,
        fullName: basicInfo.fullName,
        professionalTitle: basicInfo.professionalTitle,
        remotePreference: basicInfo.remotePreference,
        availabilityStatus: basicInfo.availabilityStatus,
        experienceYears: basicInfo.experienceYears
      });
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
      const newSkillData: SkillProof = { 
        id: crypto.randomUUID(),
        name: 'Product Design', 
        level: 'expert',
        projectName: 'E-commerce Platform Redesign',
        description: 'Describe your proof of impact',
        impact: '+34% conversion, -22% cart abandonment',
        projectLink: '',
        supportingMaterials: []
      };
      const res = await api.post('/api/users/me/skills', { name: newSkillData.name, level: newSkillData.level });
      const merged = { ...newSkillData, ...(res.data || {}) };
      setSkills(prev => [...prev, merged]);
    } catch (err) {
      alert("Failed to add skill.");
    } finally {
      setIsSubmitting(null);
    }
  };

  const patchSkill = async (id: string, updates: Partial<SkillProof>) => {
    const current = skills.find(s => s.id === id);
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    try {
      const res = await api.patch(`/api/users/me/skills/${id}`, { 
        name: updates.name ?? current?.name, 
        level: updates.level ?? current?.level 
      });
      setSkills(prev => prev.map(s => s.id === id ? { ...s, ...res.data } : s));
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
        company: 'Company Name', 
        title: 'Job Role', 
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* Top bar */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-nexio-medium uppercase">Build Your Profile</p>
              <p className="text-sm text-nexio-medium">Tell the right stories to attract the right opportunities.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-nexio-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBasic}
                disabled={isLoading}
                className="px-5 py-2 bg-nexio-blue text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Build Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nexio-blue" />
                <h3 className="text-lg font-bold text-nexio-dark">Basic Information</h3>
              </div>

              <div className="grid md:grid-cols-[150px,1fr] gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-28 h-28 rounded-full bg-slate-100 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <UploadCloud className="text-nexio-medium" size={32} />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-nexio-blue hover:bg-blue-50"
                  >
                    Upload New Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPhotoPreview(URL.createObjectURL(file));
                    }}
                  />
                  <p className="text-[11px] text-nexio-medium text-center">JPG, PNG or GIF. Max 2MB.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Full Name</label>
                      <input
                        type="text"
                        value={basicInfo.fullName}
                        onChange={e => setBasicInfo({...basicInfo, fullName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Professional Title</label>
                      <input
                        type="text"
                        value={basicInfo.professionalTitle}
                        onChange={e => setBasicInfo({...basicInfo, professionalTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                        placeholder="Product Designer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Location</label>
                      <input
                        type="text"
                        value={basicInfo.country}
                        onChange={e => setBasicInfo({...basicInfo, country: e.target.value})}
                        placeholder="Delta, Nigeria"
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Experience</label>
                      <input
                        type="text"
                        value={basicInfo.experienceYears}
                        onChange={e => setBasicInfo({...basicInfo, experienceYears: e.target.value})}
                        placeholder="4 years"
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Email</label>
                      <input
                        type="email"
                        value={basicInfo.gmail}
                        readOnly
                        className="w-full px-4 py-3 bg-slate-100 rounded-lg border border-gray-200 text-nexio-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Remote Preference</label>
                      <select
                        value={basicInfo.remotePreference}
                        onChange={e => setBasicInfo({...basicInfo, remotePreference: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                      >
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Availability Status</label>
                      <select
                        value={basicInfo.availabilityStatus}
                        onChange={e => setBasicInfo({...basicInfo, availabilityStatus: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                      >
                        <option>Actively Looking</option>
                        <option>Open to Offers</option>
                        <option>Not Looking</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Street</label>
                      <input
                        type="text"
                        value={basicInfo.street}
                        onChange={e => setBasicInfo({...basicInfo, street: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                        placeholder="Street address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intent statement */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nexio-blue" />
                <h4 className="font-bold text-nexio-dark">What You Are Looking For</h4>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-nexio-medium">Intent Statement</label>
                <textarea
                  rows={5}
                  value={basicInfo.bio}
                  onChange={e => setBasicInfo({...basicInfo, bio: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-lg border border-gray-200 focus:border-nexio-blue outline-none text-sm"
                  placeholder="Write a clear summary of your impact and the roles you're targeting..."
                />
              </div>
            </div>

            {/* Skill proof entry */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nexio-blue" />
                <h3 className="text-lg font-bold text-nexio-dark">Skill Proof Entry</h3>
              </div>

              {skills.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-nexio-medium">
                  No skill proofs yet. Start by adding your strongest skill and its level.
                </div>
              )}

              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-5 rounded-xl bg-slate-50 border border-gray-100 relative">
                    <button onClick={() => removeSkill(skill.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-nexio-medium">Skill</label>
                        <input
                          value={skill.name}
                          onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, name: e.target.value} : s))}
                          onBlur={() => patchSkill(skill.id, { name: skill.name })}
                          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                          placeholder="Product Design"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-nexio-medium">Project Name</label>
                        <input
                          value={skill.projectName || ''}
                          onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, projectName: e.target.value} : s))}
                          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                          placeholder="E-commerce Platform Redesign"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Proof Description</label>
                      <textarea
                        rows={3}
                        value={skill.description || ''}
                        onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, description: e.target.value} : s))}
                        className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-nexio-blue outline-none text-sm"
                        placeholder="Describe what you built and how you did it..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-nexio-medium">Impact</label>
                        <input
                          value={skill.impact || ''}
                          onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, impact: e.target.value} : s))}
                          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                          placeholder="+34% conversion, -22% cart abandonment"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-nexio-medium">Project Link</label>
                        <input
                          value={skill.projectLink || ''}
                          onChange={e => setSkills(prev => prev.map(s => s.id === skill.id ? {...s, projectLink: e.target.value} : s))}
                          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-nexio-blue outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-nexio-medium">Supporting Materials</label>
                      <div className="w-full min-h-[120px] rounded-xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-2 text-nexio-medium text-sm">
                        <UploadCloud size={20} />
                        <p>Drag/drop files here or click to upload</p>
                        <p className="text-[11px]">Images, PDFs, Videos up to 10MB each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addSkill}
                disabled={isSubmitting === 'skill'}
                className="w-full py-3 border-2 border-dashed border-gray-200 text-nexio-blue rounded-lg font-bold text-sm hover:border-nexio-blue transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting === 'skill' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Skill
              </button>
            </div>

            {/* Career history */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nexio-blue" />
                <h3 className="text-lg font-bold text-nexio-dark">Career History</h3>
              </div>
              {experiences.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-nexio-medium">
                  Add your recent roles to complete your proof profile.
                </div>
              )}
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-xl bg-slate-50 border border-gray-100 relative">
                    <button onClick={() => removeExp(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <BriefcaseIcon size={16} className="text-nexio-blue" />
                      <input
                        className="bg-white font-bold text-nexio-dark outline-none border border-gray-200 rounded-lg px-3 py-2 w-full focus:border-nexio-blue"
                        value={exp.title}
                        onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, title: e.target.value} : ex))}
                        onBlur={() => updateExp(exp.id, { title: exp.title })}
                        placeholder="Job Title"
                      />
                    </div>
                    <input
                      placeholder="Company Name"
                      className="bg-white text-sm text-nexio-medium w-full outline-none border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:border-nexio-blue"
                      value={exp.company}
                      onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, company: e.target.value} : ex))}
                      onBlur={() => updateExp(exp.id, { company: exp.company })}
                    />
                    <textarea
                      placeholder="Briefly describe your responsibilities..."
                      className="bg-white text-sm text-nexio-medium w-full outline-none border border-gray-200 rounded-lg px-3 py-2 focus:border-nexio-blue"
                      value={exp.description}
                      onChange={e => setExperiences(prev => prev.map(ex => ex.id === exp.id ? {...ex, description: e.target.value} : ex))}
                      onBlur={() => updateExp(exp.id, { description: exp.description })}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addExperience}
                disabled={isSubmitting === 'exp'}
                className="w-full py-3 border-2 border-dashed border-gray-200 text-nexio-blue rounded-lg font-bold text-sm hover:border-nexio-blue transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting === 'exp' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Experience
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-nexio-blue" />
                <h4 className="text-sm font-bold text-nexio-dark">Profile Tips</h4>
              </div>
              <div className="space-y-4 text-sm text-nexio-medium">
                <div>
                  <p className="font-semibold text-nexio-dark">Be Specific with Numbers</p>
                  <p>e.g., “34% conversion uplift”, “improved conversion”.</p>
                </div>
                <div>
                  <p className="font-semibold text-nexio-dark">Show Your Process</p>
                  <p>Explain how you think and work, not just outcomes.</p>
                </div>
                <div>
                  <p className="font-semibold text-nexio-dark">Verify When Possible</p>
                  <p>Verified proof gets 2x more visibility.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-nexio-blue" />
                <h4 className="text-sm font-bold text-nexio-dark">Great Proof Examples</h4>
              </div>
              <div className="space-y-3 text-sm text-nexio-medium">
                <div>
                  <p className="font-semibold text-nexio-dark">Product Designer</p>
                  <p>Increased acquisition by 32%.</p>
                </div>
                <div>
                  <p className="font-semibold text-nexio-dark">Front-End Engineer</p>
                  <p>Built component library used by 20+ devs.</p>
                </div>
                <div>
                  <p className="font-semibold text-nexio-dark">UX Researcher</p>
                  <p>Research impacted 1.5M+ users.</p>
                </div>
              </div>
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleSaveBasic}
                  disabled={isLoading}
                  className="w-full py-3 bg-nexio-blue text-white rounded-lg font-bold shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Build Profile'}
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 border border-gray-200 text-nexio-medium rounded-lg font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2">
                <LinkIcon size={16} className="text-nexio-blue" />
                <h4 className="text-sm font-bold text-nexio-dark">Share Proof</h4>
              </div>
              <p className="text-sm text-nexio-medium">
                Share your profile link once you have at least one skill proof and experience added.
              </p>
              <button className="w-full py-3 bg-white border border-gray-200 text-nexio-blue rounded-lg font-bold hover:bg-blue-50">
                Copy Profile Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
