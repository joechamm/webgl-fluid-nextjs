import { vec4 } from 'gl-matrix';
import { 
  WebGL2Surface,
  createWebGL2Surface,
  createWebGL2SurfaceFromContext,
  destroyWebGL2Surface,
  initWebGL2Surface,
  attachFBOToWebGL2Surface,
  attachTexToWebGL2Surface,
  clearWebGL2Surface,
} from './Surface';

// a ping-pong buffer for the slab
export type WebGL2Slab = {
  ping: WebGL2Surface;
  pong: WebGL2Surface;
};

export function createWebGL2Slab(canvas: HTMLCanvasElement, options?: WebGLContextAttributes, surfaceWidth?: number, surfaceHeight?: number): WebGL2Slab | null {
  const ping = createWebGL2Surface(canvas, options, surfaceWidth, surfaceHeight);
  const pong = createWebGL2Surface(canvas, options, surfaceWidth, surfaceHeight);
  if(ping && pong) {
    return { ping, pong };
  }
  return null;
}

export function createWebGL2SlabFromContext(gl: WebGL2RenderingContext, surfaceWidth?: number, surfaceHeight?: number): WebGL2Slab | null {
  const ping = createWebGL2SurfaceFromContext(gl, surfaceWidth, surfaceHeight);
  const pong = createWebGL2SurfaceFromContext(gl, surfaceWidth, surfaceHeight);
  if(ping && pong) {
    return { ping, pong };
  }
  return null;
}

export function destroyWebGL2Slab(slab: WebGL2Slab | null): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }
    destroyWebGL2Surface(slab.ping);
    destroyWebGL2Surface(slab.pong);
  } catch (error) {
    console.error(error);
  } 
}

export function initWebGL2Slab(slab: WebGL2Slab | null): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }
    initWebGL2Surface(slab.ping);
    initWebGL2Surface(slab.pong);
  } catch(error) {
    console.error(error);
  }
}

export function swapPingPong(slab: WebGL2Slab | null): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }

    const temp = slab.ping;
    slab.ping = slab.pong;
    slab.pong = temp;
  } catch(error) {
    console.error(error);
  }  
}

export function clearPingSurface(slab: WebGL2Slab | null, color?: vec4): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }
    clearWebGL2Surface(slab.ping, color);
  } catch(error) {
    console.error(error);
  }
}

export function clearPongSurface(slab: WebGL2Slab | null, color?: vec4): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }
    clearWebGL2Surface(slab.pong, color);
  }
  
  catch(error) {
    console.error(error);
  }
}

export function attachPingFBO(slab: WebGL2Slab | null): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }

    attachFBOToWebGL2Surface(slab.ping);
  } catch(error) {
    console.error(error);
  }  
}

export function attachPongTex(slab: WebGL2Slab | null, texUnit: number): void {
  try {
    if(!slab) {
      throw new Error('Slab is required');
    }
    attachTexToWebGL2Surface(slab.pong, texUnit);
  } catch(error) {
    console.error(error);
  }
}