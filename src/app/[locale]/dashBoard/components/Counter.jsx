"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Counter({ end, duration = 2, decimals = 0, separator = "" }) {
  const [count, setCount] = useState(0);
  const startCount = useRef(0);
  const startTime = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    startCount.current = count;
    startTime.current = null;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const totalDuration = duration * 1000;
      const easedProgress = Math.min(1, progress / totalDuration);
      const nextCount = startCount.current + (end - startCount.current) * easedProgress;
      setCount(parseFloat(nextCount.toFixed(decimals)));
      if (progress < totalDuration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [end, duration, decimals]);

  return (
    <>
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace(/,/g, separator)}
    </>
  );
}
