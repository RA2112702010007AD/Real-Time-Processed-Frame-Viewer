import React from 'react';
import type { VisualEffect } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { CameraIcon } from './icons/CameraIcon';
import { SaveIcon } from './icons/SaveIcon';

interface ControlsProps {
  isRunning: boolean;
  effect: VisualEffect;
  onTogglePlayPause: () => void;
  onEffectChange: (effect: VisualEffect) => void;
  onNextFrame: () => void;
  onSaveFrame: () => void;
}

const effectOptions: { value: VisualEffect; label: string }[] = [
  { value: 'edge-detection', label: 'Edge Detection' },
  { value: 'grayscale', label: 'Grayscale' },
  { value: 'invert', label: 'Invert' },
  { value: 'none', label: 'Raw Feed' },
];

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  effect,
  onTogglePlayPause,
  onEffectChange,
  onNextFrame,
  onSaveFrame,
}) => {
  return (
    <div className="w-full max-w-5xl p-4 bg-slate-950/50 rounded-lg border border-slate-700 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 shadow-lg">
      {/* --- Playback Controls --- */}
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePlayPause}
          className="flex items-center justify-center p-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
          aria-label={isRunning ? 'Pause' : 'Play'}
        >
          {isRunning ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={onNextFrame}
          disabled={isRunning}
          className="flex items-center justify-center p-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
          aria-label="Next Frame"
          title="Next Frame (only when paused)"
        >
          <CameraIcon className="w-6 h-6" />
        </button>
      </div>

      {/* --- Effect Selection --- */}
      <div className="flex items-center gap-2">
        <label htmlFor="effect-select" className="text-sm font-medium text-slate-400">Effect:</label>
        <select
          id="effect-select"
          value={effect}
          onChange={(e) => onEffectChange(e.target.value as VisualEffect)}
          className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full min-w-[180px] px-3 py-2 transition-colors duration-200 hover:bg-slate-700/60"
        >
          {effectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      
      {/* --- Frame Actions --- */}
      <div className="flex items-center">
        <button
          onClick={onSaveFrame}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
          aria-label="Save Frame"
        >
          <SaveIcon className="w-5 h-5" />
          <span>Save Frame</span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
