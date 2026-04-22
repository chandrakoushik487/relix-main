'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * Animated counter that counts from 0 to the target value with easing.
 * Supports formatted strings like "8.2k" or "1,284" — animates the numeric value.
 */
export default function AnimatedCounter({ value, duration = 1500, className = '' }) {
  const [display, setDisplay] = useState('0');
  const prevValue = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Parse the target number
    const raw = String(value);
    let target;
    let suffix = '';
    let prefix = '';
    let decimals = 0;
    let useCommas = false;

    if (raw.includes('k')) {
      target = parseFloat(raw.replace(/[^0-9.]/g, ''));
      suffix = 'k';
      decimals = raw.includes('.') ? raw.split('.')[1].replace(/[^0-9]/g, '').length : 0;
    } else if (raw.includes(',')) {
      target = parseInt(raw.replace(/,/g, ''));
      useCommas = true;
    } else {
      target = parseFloat(raw.replace(/[^0-9.]/g, ''));
      decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    }

    if (isNaN(target)) {
      setDisplay(raw);
      return;
    }

    const start = prevValue.current !== null ? prevValue.current : 0;
    prevValue.current = target;

    const startTime = performance.now();

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = start + (target - start) * easedProgress;

      let formatted;
      if (suffix) {
        formatted = current.toFixed(decimals) + suffix;
      } else if (useCommas) {
        formatted = Math.round(current).toLocaleString();
      } else if (decimals > 0) {
        formatted = current.toFixed(decimals);
      } else {
        formatted = Math.round(current).toString();
      }

      setDisplay(prefix + formatted);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <span className={className}>{display}</span>;
}
