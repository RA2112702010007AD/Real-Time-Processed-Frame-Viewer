import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Viewer from './components/Viewer';
import Controls from './components/Controls';
import Footer from './components/Footer'; // Import Footer
import { useMockFrames } from './hooks/useMockFrames';
import type { VisualEffect } from './types';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [effect, setEffect] = useState<VisualEffect>('edge-detection');
  const { frameUrl, stats, generateNewFrame } = useMockFrames(isRunning);

  // This state and effect calculates the UI's rendering frame rate.
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());
  const [renderingFps, setRenderingFps] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const calculateFps = (now: number) => {
      const delta = now - lastFrameTime;
      if (delta > 0) {
        setRenderingFps(1000 / delta);
      }
      setLastFrameTime(now);
      animationFrameId = requestAnimationFrame(calculateFps);
    };

    animationFrameId = requestAnimationFrame(calculateFps);

    return () => cancelAnimationFrame(animationFrameId);
  }, [lastFrameTime]);

  const handleSaveFrame = () => {
    const link = document.createElement('a');
    // Use a blob URL to bypass potential cross-origin issues with picsum.photos for direct downloads
    fetch(frameUrl, { cache: 'reload' }) // Use cache reload to get the image data
      .then(response => response.blob())
      .then(blob => {
        link.href = URL.createObjectURL(blob);
        link.download = `frame-${stats.frameCount}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Clean up blob URL
      })
      .catch(err => {
        console.error("Failed to download image:", err);
      });
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
        <Viewer
          frameUrl={frameUrl}
          stats={stats}
          effect={effect}
          renderingFps={renderingFps}
        />
        <Controls
          isRunning={isRunning}
          effect={effect}
          onTogglePlayPause={() => setIsRunning(!isRunning)}
          onEffectChange={setEffect}
          onNextFrame={generateNewFrame}
          onSaveFrame={handleSaveFrame}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
