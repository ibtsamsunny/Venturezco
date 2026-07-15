"use client";

import { useEffect, useRef } from "react";

export default function HeroBlobCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let ctrl: { dispose: () => void } | null = null;
    import("@/lib/heroBlob").then(({ initHeroBlob }) => {
      if (disposed) return;
      ctrl = initHeroBlob(canvas);
    });
    return () => {
      disposed = true;
      ctrl?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "50%",
        top: "min(470px,54%)",
        transform: "translate(-50%,-50%)",
        width: "min(88vw,760px)",
        height: "min(88vw,760px)",
        zIndex: 1,
        pointerEvents: "none",
        opacity: 1,
        mixBlendMode: "screen",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 55%, rgba(0,0,0,0) 80%)",
        maskImage: "radial-gradient(circle at 50% 50%, #000 55%, rgba(0,0,0,0) 80%)",
      }}
    />
  );
}
