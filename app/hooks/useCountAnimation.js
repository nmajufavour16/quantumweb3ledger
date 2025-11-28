'use client'
import { useState, useEffect, useRef } from 'react';

export function useCountAnimation(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = Number(end.replace(/[^0-9.-]+/g, ""));

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
      setCount(currentValue);

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [end, duration]);

  return typeof end === 'string' && end.includes('+') 
    ? `${count}+`
    : end.startsWith('$') 
      ? `$${count}B+`
      : `${count}%`;
}
