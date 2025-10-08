
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-slate-700/50">
      <h1 className="text-2xl font-bold text-cyan-400">
        Real-Time Edge Detection Viewer
      </h1>
      <p className="text-sm text-slate-400">
        A web-based debug tool for visualizing processed camera frames from native applications.
      </p>
    </header>
  );
};

export default Header;
