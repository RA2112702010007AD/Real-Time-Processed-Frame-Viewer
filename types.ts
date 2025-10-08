export interface FrameStats {
  fps: number;
  resolution: {
    width: number;
    height: number;
  };
  frameCount: number;
}

export type VisualEffect = 'none' | 'edge-detection' | 'grayscale' | 'invert';
