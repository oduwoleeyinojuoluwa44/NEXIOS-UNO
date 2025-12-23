
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, suffix }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 min-w-[200px] flex-1">
      <div className="flex justify-between items-start">
        <span className="text-nexio-medium text-sm font-medium">{label}</span>
        {icon && <div className="text-nexio-blue opacity-80">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-nexio-dark">{value}{suffix}</span>
        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'bg-green-50 text-nexio-green' : 'bg-blue-50 text-nexio-blue'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
