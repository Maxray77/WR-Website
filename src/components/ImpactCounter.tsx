"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ImpactCounterProps {
  number: number;
  suffix?: string;
  label: string;
}

export default function ImpactCounter({ number, suffix = "", label }: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-teal font-[family-name:var(--font-poppins)]">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-slate mt-1 font-medium">{label}</div>
    </motion.div>
  );
}
