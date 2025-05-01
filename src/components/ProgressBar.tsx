import { useState, useEffect, useRef } from "react";

export interface IProgressBarProps {}

export default function ProgressBar({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  useEffect(() => {
    if (loading) {
      //gives precise high-resolution time (better than Date.now() for animations
      const start = performance.now();
      const animate = (time: number) => {
        //how many milliseconds passed since start
        const elapsed = time - start;

        //3000ms means 3 seconds for full load.
        const estimatedDuration = 3000;
        const newProgress = Math.min((elapsed / estimatedDuration) * 90, 90); // 3 seconds to full
        setProgress(newProgress);

        if (newProgress < 100) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // when loading becomes false
      setProgress(100);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    //cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loading]);
  return (
    <div className="w-full bg-gray-200 h-1 overflow-hidden relative">
      <div
        className="bg-green-800 h-full animate-loading"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
