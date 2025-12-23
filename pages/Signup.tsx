
import React, { useState } from 'react';
// @ts-ignore
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      signup(response.data);
      navigate('/profile/edit');
    } catch (err) {
      alert("Error creating account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Form */}
      <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
        <Link to="/" className="text-2xl font-bold text-nexio-blue mb-12 font-heading tracking-tight">nexio</Link>
        
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold text-nexio-dark mb-2">Start with <span className="text-nexio-blue italic">proof</span></h2>
          <p className="text-nexio-medium mb-10">Evidence-first visibility for serious talent.</p>

          <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-nexio-dark mb-8">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative px-4 bg-white text-xs text-nexio-medium uppercase font-bold tracking-widest">or continue with</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-nexio-dark mb-2">User Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nexio-blue focus:ring-1 focus:ring-nexio-blue outline-none transition-all"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-nexio-dark mb-2">Email</label>
              <input
                required
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nexio-blue focus:ring-1 focus:ring-nexio-blue outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-nexio-dark mb-2">Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nexio-blue focus:ring-1 focus:ring-nexio-blue outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-nexio-medium"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-nexio-dark mb-2">Confirm Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-nexio-blue focus:ring-1 focus:ring-nexio-blue outline-none transition-all"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <p className="text-xs text-nexio-medium leading-relaxed">
              By registering you accept Nexio <Link to="/" className="underline text-nexio-blue font-semibold">Terms of Service</Link> & <Link to="/" className="underline text-nexio-blue font-semibold">Privacy Policy</Link>
            </p>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-nexio-blue text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-nexio-medium">
            Already have an account? <Link to="/login" className="text-nexio-blue font-bold">Login</Link>
          </p>
        </div>
      </div>

      {/* Right Image/Content */}
      <div className="hidden lg:block w-1/2 p-12 bg-gray-50 overflow-hidden relative">
        <div className="h-full w-full rounded-[40px] overflow-hidden relative shadow-2xl border-8 border-white">
          <img 
            src="https://picsum.photos/seed/nigeria-talent/1200/1600" 
            alt="Professional" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-2xl max-w-sm ml-auto">
               <div className="flex items-center gap-4 mb-4">
                  <img src="https://ui-avatars.com/api/?name=Martha+Aston" alt="User" className="w-12 h-12 rounded-full shadow" />
                  <div>
                    <h4 className="font-bold text-nexio-dark">Martha Aston</h4>
                    <p className="text-xs text-nexio-medium">Software Engineer</p>
                  </div>
                  <div className="ml-auto bg-blue-100 text-nexio-blue px-3 py-1 rounded-full text-[10px] font-bold">12 matches</div>
               </div>
               <p className="text-sm text-nexio-medium leading-relaxed">Verified Proof: "Built a distributed API serving 10M+ daily requests with 99.9% uptime"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;