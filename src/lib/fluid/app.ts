import { createSimulation, initializeSimulation, Simulation } from './Simulation';
import { handleMouseDown, handleMouseUp, handleMouseMove } from '../utils/HandleMouse';

export type FluidApp = {
  canvas?: HTMLCanvasElement;
  gl?: WebGL2RenderingContext;
  sim?: Simulation;
};

export function webGLStart(): FluidApp | null {
  try {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const options = {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false
    };

    const gl = initWebGL(canvas, options);
    const sim = createSimulation(gl);
    if(!sim) {
      throw new Error('Failed to create simulation');
    }
    
    if(!initializeSimulation(sim)) {
      throw new Error('Failed to initialize simulation');
    }

    // Set up mouse event handlers
    canvas.onmousedown = (event: MouseEvent) => handleMouseDown(event, sim);
    canvas.onmouseup = (event: MouseEvent) => handleMouseUp(event, sim);
    canvas.onmousemove = (event: MouseEvent) => handleMouseMove(event, sim);
  
    return {
      canvas,
      gl,
      sim
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function initWebGL(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): WebGL2RenderingContext {
  try {
    const gl = canvas.getContext('webgl2', options);
    if (!gl) {
      throw new Error('Failed to get WebGL2 context');
    }
    return gl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}