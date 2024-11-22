"use client";

import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../components/ui/google-gemini-effect";

export default function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="min-h-screen bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-hidden"
      ref={ref}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          className="w-full h-full max-w-4xl max-h-[80vh] mx-auto"
        />
      </div>
      <div className="h-[300vh]" aria-hidden="true">
        {/* This div creates scrollable space */}
      </div>
    </div>
  );
}

