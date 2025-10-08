import React from 'react';
import type { FrameStats } from '../types';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { PhotoIcon } from './icons/PhotoIcon';

interface StatsOverlayProps {
  stats: FrameStats;
  renderingFps: number;
}

const StatsOverlay: React.FC<StatsOverlayProps> = ({ stats, renderingFps }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-mono select-none pointer-events-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5" title="Source FPS">
            <VideoCameraIcon className="w-4 h-4 text-cyan-400" />
            <span>SRC: {stats.fps.toFixed(1)} FPS</span>
          </div>
          <div className="flex items-center space-x-1.5" title="Frame Resolution">
            <PhotoIcon className="w-4 h-4 text-cyan-400" />
            <span>{stats.resolution.width}x{stats.resolution.height}</span>
          </div>
        </div>
        <div title="UI Rendering FPS">
          <span>UI: {renderingFps.toFixed(1)} FPS</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverlay;
