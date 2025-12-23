import React from 'react';

/**
 * Simple skeleton block for loading placeholders.
 */
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} aria-hidden="true" />
  );
};

export default Skeleton;
