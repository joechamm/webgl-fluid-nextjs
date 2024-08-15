import { vec4 } from 'gl-matrix';
import { 
  WebGL2Surface,
  createWebGL2Surface,
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

export function destroyWebGL2Slab(slab: WebGL2Slab): void {
  destroyWebGL2Surface(slab.ping);
  destroyWebGL2Surface(slab.pong);
}

export function initWebGL2Slab(slab: WebGL2Slab): void {
  initWebGL2Surface(slab.ping);
  initWebGL2Surface(slab.pong);
}

export function swapPingPong(slab: WebGL2Slab): void {
  const temp = slab.ping;
  slab.ping = slab.pong;
  slab.pong = temp;
}

export function clearPingSurface(slab: WebGL2Slab, color?: vec4): void {
  clearWebGL2Surface(slab.ping, color);
}

export function clearPongSurface(slab: WebGL2Slab, color?: vec4): void {
  clearWebGL2Surface(slab.pong, color);
}

export function attachPingFBO(slab: WebGL2Slab): void {
  attachFBOToWebGL2Surface(slab.ping);
}

export function attachPongTex(slab: WebGL2Slab, texUnit: number): void {
  attachTexToWebGL2Surface(slab.pong, texUnit);
}