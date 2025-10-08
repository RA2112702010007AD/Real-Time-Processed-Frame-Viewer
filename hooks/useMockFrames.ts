
import { useState, useEffect, useCallback } from 'react';
import type { FrameStats } from '../types';

const RESOLUTION = { width: 1280, height: 720 };

export const useMockFrames = (isRunning: boolean) => {
  const [frameUrl, setFrameUrl] = useState<string>(`https://picsum.photos/${RESOLUTION.width}/${RESOLUTION.height}?random=1`);
  const [stats, setStats] = useState<FrameStats>({
    fps: 0,
    resolution: RESOLUTION,
    frameCount: 1,
  });

  const generateNewFrame = useCallback(() => {
    setStats(prevStats => {
      const newFrameCount = prevStats.frameCount + 1;
      // Simulate FPS between 10 and 15, as requested in the assessment.
      const newFps = 10 + Math.random() * 5; 
      
      setFrameUrl(`https://picsum.photos/${RESOLUTION.width}/${RESOLUTION.height}?random=${newFrameCount}`);
      
      return {
        ...prevStats,
        fps: parseFloat(newFps.toFixed(1)),
        frameCount: newFrameCount,
      };
    });
  }, []);
  
  useEffect(() => {
    if (!isRunning) return;

    // Simulate a framerate of ~14 FPS to stay within the 10-15 FPS target
    const intervalId = setInterval(() => {
      generateNewFrame();
    }, 1000 / 14);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return { frameUrl, stats, generateNewFrame };
};
