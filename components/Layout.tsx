
import React from 'react';
// @ts-ignore
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, UserPlus, LogOut, Search as SearchIcon, Briefcase } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Active Matches', icon: <Users size={20} />, path: '/search' },
    { label: 'Build Proof', icon: <Briefcase size={20} />, path: '/profile/edit' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-nexio-blue tracking-tight font-heading">nexio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                location.pathname === item.path ? 'text-nexio-blue' : 'text-nexio-medium hover:text-nexio-blue'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link to={`/u/${user?.username}`}>
              <img
                src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.fullName}&background=4a90e2&color=fff`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-nexio-medium hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;