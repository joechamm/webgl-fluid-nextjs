import { vec2, vec3 } from 'gl-matrix';
import { WebGL2Program } from './gl/Shader';
import { WebGL2Texture } from './gl/Texture';
import { createSquareBuffer } from './gl/SquareBuffer';
import { WebGL2Slab, createWebGL2Slab } from './gl/Slab';
import { VelocitySourceList, createVelocitySourceList } from './VelocitySourceList';
import { TemperatureSourceList, createTemperatureSourceList } from './TemperatureSourceList';
import { create } from 'domain';
import { createTemperatureSource } from './TemperatureSouce';

export type Simulation = {
  canvas: HTMLCanvasElement | null;
  gl: WebGL2RenderingContext | null;
  currentProgram: WebGL2Program | null;
  showProgram: WebGL2Program | null;
  advectProgram: WebGL2Program | null;
  divergenceProgram: WebGL2Program | null;
  bouyancyProgram: WebGL2Program | null;
  pressureProgram: WebGL2Program | null;
  testProgram: WebGL2Program | null;
  inkProgram: WebGL2Program | null;
  fillProgram: WebGL2Program | null;
  impulseProgram: WebGL2Program | null;
  velocityShowProgram: WebGL2Program | null;
  temperatureDensityProgram: WebGL2Program | null;
  velocityDensityProgram: WebGL2Program | null;
  densityTestProgram: WebGL2Program | null;
  densityShowProgram: WebGL2Program | null;
  sepiaDensityProgram: WebGL2Program | null;
  obstacleProgram: WebGL2Program | null;
  obstacleFrameBuffer: WebGLFramebuffer | null;
  velocityPressureTemperatureSlab: WebGL2Slab | null;
  densitySlab: WebGL2Slab | null;
  imageSlab: WebGL2Slab | null;
  initialVelocityPressureTexture: WebGL2Texture | null;  
  initialDensityTexture: WebGL2Texture | null;
  obstacleTexture: WebGL2Texture | null;
  squarePositionBuffer: WebGLBuffer | null;
  sourceBuffer: WebGLBuffer | null;
  circleBuffer: WebGLBuffer | null;
  temperatureSources: TemperatureSourceList;
  velocitySources: VelocitySourceList;
  dropImage: HTMLImageElement | null;
  imageSource: HTMLImageElement | null;
  obstacleColor: vec3 | null;
  impulseColor: vec3 | null;
  initialCirclePosition: vec2 | null;
  initialCircleVelocity: vec2 | null;
  circlePosition: vec2 | null;
  circleVelocity: vec2 | null;
  lastMousePosition: vec2 | null;
  mousePosition: vec2 | null;
  staticMousePosition: vec2 | null;
  sourceConfiguration: number;
  selectedSource: number;
  circleRadius: number;
  time: number;
  frames: number;
  dt: number;
  deltaTime: number;
  timeSum: number;
  fps: number;
  lastTime: number;
  initTexConfig: number;
  impulseConfig: number;
  mouseConfig: number;
  viewportWidth: number;
  viewportHeight: number;
  numberOfJacobiIterations: number;
  ambientTemperature: number;
  velocityDissipation: number;
  densityDissipation: number;
  currentScale: number;
  bigScale: number;
  smallScale: number;
  kappa: number;
  sigma: number;
  texVelocityScale: number;
  epsilon: number;
  gravity: number;
  borderOffset: number;
  mouseDown: boolean;
  ballOn: boolean;
  wallsOn: boolean;
  paused: boolean;
  needsReset: boolean;
};

export function createSimulation(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): Simulation | null {
  try {
    const gl = canvas.getContext('webgl2', options);
    if (!gl) {
      throw new Error('Failed to get WebGL2 context');
    }

    const currentProgram = null;
    const showProgram = null;
    const advectProgram = null;
    const divergenceProgram = null;
    const bouyancyProgram = null;
    const pressureProgram = null;
    const testProgram = null;
    const inkProgram = null;
    const fillProgram = null;
    const impulseProgram = null;
    const velocityShowProgram = null;
    const temperatureDensityProgram = null;
    const velocityDensityProgram = null;
    const densityTestProgram = null;
    const densityShowProgram = null;
    const sepiaDensityProgram = null;
    const obstacleProgram = null;
    const obstacleFrameBuffer = null;
    const velocityPressureTemperatureSlab = null;
    const densitySlab = null;
    const imageSlab = null;
    const initialVelocityPressureTexture = null;
    const initialDensityTexture = null;
    const obstacleTexture = null;
    const squarePositionBuffer = null;
    const sourceBuffer = null;
    const circleBuffer = null;
    const temperatureSources = createTemperatureSourceList(5);
    const velocitySources = createVelocitySourceList(5);
    const dropImage = null;
    const imageSource = null;



  } catch (error) {
    console.error(error);
    return null;
  }

  return null;
}
    