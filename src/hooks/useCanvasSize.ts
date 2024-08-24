import React, { RefObject, useMemo, useState, useLayoutEffect, useEffect } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  gl? : WebGL2RenderingContext;
  options?: WebGLContextAttributes;
}

const DefaultOptions: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  depth: false,
  premultipliedAlpha: false,
};

interface CanvasSize {
  width: number;
  height: number;
}

export function useCanvasSize({ canvasRef, gl, options }: Props): CanvasSize {
  const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setSize({ width, height });
    }

  }, [canvasRef, gl, options]);

  useEffect(() => {
    gl?.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  } , [gl, size]);

  return size;
}