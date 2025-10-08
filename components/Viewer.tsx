import React, { useState, useEffect } from 'react';
import StatsOverlay from './StatsOverlay';
import { ErrorIcon } from './icons/ErrorIcon';
// Fix: Corrected import path for types
import type { FrameStats, VisualEffect } from '../types';

interface ViewerProps {
  frameUrl: string;
  stats: FrameStats;
  effect: VisualEffect;
  renderingFps: number;
}

const getFilterForEffect = (effect: VisualEffect): string => {
  switch (effect) {
    case 'edge-detection':
      return 'grayscale(1) invert(1) brightness(1.5) contrast(2)';
    case 'grayscale':
      return 'grayscale(1)';
    case 'invert':
      return 'invert(1)';
    case 'none':
    default:
      return '';
  }
};

const Viewer: React.FC<ViewerProps> = ({ frameUrl, stats, effect, renderingFps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
  }, [frameUrl]);
  
  const activeFilter = getFilterForEffect(effect);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  return (
    <div className="relative aspect-video w-full max-w-5xl bg-slate-950 rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <div className="text-slate-400 animate-pulse">Loading Frame...</div>
        </div>
      )}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/50 text-red-300 p-4 z-10">
          <ErrorIcon className="w-12 h-12 mb-2"/>
          <p className="font-semibold">Failed to Load Frame</p>
          <p className="text-xs text-red-400 mt-1">The image source may be unavailable or blocked.</p>
        </div>
      )}
      <img
        key={frameUrl}
        src={frameUrl}
        alt="Processed camera frame"
        onLoad={handleImageLoad}
        onError={handleImageError}
        crossOrigin="anonymous"
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading || loadError ? 'opacity-0' : 'opacity-100'}`}
        style={{ filter: activeFilter }}
      />
      <StatsOverlay stats={stats} renderingFps={renderingFps} />
    </div>
  );
};

export default Viewer;