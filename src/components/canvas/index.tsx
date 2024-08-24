import React, { RefObject, useRef, useEffect } from 'react';
import { useWebGL } from '@/hooks/useWebGL';
import styles from './index.module.scss';
import { Simulation, createSimulation, initializeSimulation } from '@/lib/fluid/Simulation';
import { webGLStart, initWebGL } from '@/lib/fluid/app';
import { handleMouseDown } from '@/lib/utils/HandleMouse';

export interface CanvasProps {
  options?: WebGLContextAttributes;
}

let cached = global.app;

if(!cached) {
  cached = global.app = {};
}

const Canvas: React.FC<CanvasProps> = (props: CanvasProps): JSX.Element => {
  const { options } = props ?? { alpha: true, antialias: false, depth: false, premultipliedAlpha: false };
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  //const gl = useWebGL({ canvasRef, options });
  
  useEffect(() => {
    try {
      if(!canvasRef.current) {
        throw new Error('Failed to get canvas ref');
      }

      const gl = canvasRef.current.getContext('webgl2', options);
      if(!gl) {
        throw new Error('Failed to get WebGL2 context');
      }

      const sim = createSimulation(gl);
      if(!sim) {
        throw new Error('Failed to create simulation');
      }

      if(!initializeSimulation(sim)) {
        throw new Error('Failed to initialize simulation');
      }

      // Set up mouse event handlers
      canvasRef.current.onmousedown = (event: MouseEvent) => handleMouseDown(event, sim);
      canvasRef.current.onmouseup = (event: MouseEvent) => handleMouseDown(event, sim);
      canvasRef.current.onmousemove = (event: MouseEvent) => handleMouseDown(event, sim);

      cached.canvas = canvasRef.current;
      cached.gl = gl;
      cached.sim = sim;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);      
    } catch (error) {
      console.error(error);
    }
  }, [canvasRef, options]);

  useEffect(() => {
    const handleResize = () => {
      try {
        if(!canvasRef.current) { 
          throw new Error('Failed to get canvas ref');  
        }

        const gl = canvasRef.current.getContext('webgl2', options);
        if(!gl) {
          throw new Error('Failed to get WebGL2 context');
        }

        gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [canvasRef, options]);

  useEffect(() => {
    try {
      if(!canvasRef.current) {
        throw new Error('Failed to get canvas ref');
      }

      if(!cached.canvas) {
        cached.canvas = canvasRef.current;
      }

      const onContextLost = (event: WebGLContextEvent) => {
        event.preventDefault();
        console.error('WebGL context lost');
      };

      const onContextRestored = (event: WebGLContextEvent) => {
        event.preventDefault();
        console.log('WebGL context restored');
        try {
          if(!canvasRef.current) {
            throw new Error('Failed to get canvas ref');
          }

          const gl = canvasRef.current.getContext('webgl2', options);
          if(!gl) {
            throw new Error('Failed to get WebGL2 context');
          }

          const sim = createSimulation(gl);
          if(!sim) {
            throw new Error('Failed to create simulation');
          }

          if(!initializeSimulation(sim)) {
            throw new Error('Failed to initialize simulation');
          }

          cached.canvas = canvasRef.current;
          cached.gl = gl;
          cached.sim = sim;
        } catch (error) {
          console.error(error);
        }
      };

      canvasRef.current.addEventListener('webglcontextlost', onContextLost as EventListener, false);
      canvasRef.current.addEventListener('webglcontextrestored', onContextRestored as EventListener, false)

    } catch (error) {
      console.error(error);
    }
  }, [canvasRef, options]);
 
  return (
    <>
      <canvas ref={canvasRef}
        width={canvasRef.current?.clientWidth}
        height={canvasRef.current?.clientHeight}
        className={styles.canvas}
        id="canvas"
      >
      </canvas>
    </>
  );
}

export default Canvas;