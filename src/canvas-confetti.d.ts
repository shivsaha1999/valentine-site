declare module 'canvas-confetti' {
    interface Options {
      angle?: number;
      spread?: number;
      startVelocity?: number;
      decay?: number;
      gravity?: number;
      drift?: number;
      ticks?: number;
      x?: number;
      y?: number;
      shapes?: string[];
      zIndex?: number;
      colors?: string[];
      disableForReducedMotion?: boolean;
      scalar?: number;
      particleCount?: number;
      origin?: { x: number; y: number };
    }
  
    function confetti(options?: Options): Promise<undefined>;
  
    namespace confetti {
      let Promise: PromiseLike<undefined> | null | undefined;
    }
  
    export = confetti;
  }