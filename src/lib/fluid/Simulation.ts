import { vec2, vec3 } from 'gl-matrix';
import { createWebGL2Shader, createWebGL2Program, WebGL2Shader, WebGL2Program, WebGL2ProgramAttributeBinding } from './gl/Shader';
import { createWebGL2Texture, initWebGL2TextureWithData, WebGL2Texture, initWebGL2Texture } from './gl/Texture';
import { createSquareBuffer } from './gl/SquareBuffer';
import { WebGL2Slab, attachPingFBO, createWebGL2Slab, createWebGL2SlabFromContext, initWebGL2Slab, swapPingPong } from './gl/Slab';
import { VelocitySourceList, createVelocitySourceList } from './VelocitySourceList';
import { TemperatureSourceList, createTemperatureSourceList } from './TemperatureSourceList';
import { create } from 'domain';
import { createTemperatureSource } from './TemperatureSouce';
import { init } from 'next/dist/compiled/webpack/webpack';

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
  showInkProgram: WebGL2Program | null;
  sepiaDensityShowProgram: WebGL2Program | null;
  temperatureDensityShowProgram: WebGL2Program | null;
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
  obstacleColor: vec3;
  impulseColor: vec3;
  initialCirclePosition: vec2;
  initialCircleVelocity: vec2;
  circlePosition: vec2;
  circleVelocity: vec2;
  lastMousePosition: vec2;
  mousePosition: vec2;
  staticMousePosition: vec2;
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
    const temperatureDensityShowProgram = null;
    const showInkProgram = null;
    const sepiaDensityShowProgram = null;
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
    
    const lastTime = 0;
    const initTexConfig = 0;
    const impulseConfig = 0;
    const mouseConfig = 0;
    const sourceConfiguration = 0;

    const borderOffset = 0.02;
    const circleRadius = 0.05;
    const time = 0.0;
    const frames = 0;
    const dt = 0.001;
    const deltaTime = 0.001;
    const timeSum = 0.001;
    const fps = 0.0;

    const viewportWidth = 512;
    const viewportHeight = 512;
    const numberOfJacobiIterations = 20;
    const ambientTemperature = 0.0;
    const velocityDissipation = 1.0;
    const densityDissipation = 1.0;
    const currentScale = 10.0;
    const bigScale = 10.0;
    const smallScale = 1.0;
    const kappa = dt * (0.5 * 20.0);
    const sigma = 1.0;
    const texVelocityScale = 1.0;
    const epsilon = 0.01;
    const gravity = 9.8;

    const mouseDown = false;
    const ballOn = true;
    const wallsOn = true;
    const paused = false;
    const needsReset = false;

    const obstacleColor = vec3.create();
    obstacleColor[0] = 1.0;
    obstacleColor[1] = 1.0;
    obstacleColor[2] = 0.0; // yellow
    
    const impulseColor = vec3.create();
    impulseColor[0] = 0.0;
    impulseColor[1] = 0.0;
    impulseColor[2] = 0.5; // blue
    
    const initialCirclePosition = vec2.create();
    initialCirclePosition[0] = 0.0;
    initialCirclePosition[1] = 1.0 - borderOffset - circleRadius;

    const initialCircleVelocity = vec2.create();
    initialCircleVelocity[0] = 0.0;
    initialCircleVelocity[1] = 0.0;

    const circlePosition = vec2.copy(vec2.create(), initialCirclePosition);
    const circleVelocity = vec2.copy(vec2.create(), initialCircleVelocity);

    const lastMousePosition = vec2.create();
    const mousePosition = vec2.create();
    const staticMousePosition = vec2.create();

    return {
      canvas,
      gl,
      currentProgram,
      showProgram,
      advectProgram,
      divergenceProgram,
      bouyancyProgram,
      pressureProgram,
      testProgram,
      inkProgram,
      fillProgram,
      impulseProgram,
      velocityShowProgram,
      temperatureDensityProgram,
      velocityDensityProgram,
      densityTestProgram,
      densityShowProgram,
      sepiaDensityProgram,
      obstacleProgram,
      showInkProgram,
      sepiaDensityShowProgram,
      temperatureDensityShowProgram,
      obstacleFrameBuffer,
      velocityPressureTemperatureSlab,
      densitySlab,
      imageSlab,
      initialVelocityPressureTexture,
      initialDensityTexture,
      obstacleTexture,
      squarePositionBuffer,
      sourceBuffer,
      circleBuffer,
      temperatureSources,
      velocitySources,
      dropImage,
      imageSource,
      obstacleColor,
      impulseColor,
      initialCirclePosition,
      initialCircleVelocity,
      circlePosition,
      circleVelocity,
      lastMousePosition,
      mousePosition,
      staticMousePosition,
      sourceConfiguration,
      selectedSource: 0,
      circleRadius,
      time,
      frames,
      dt,
      deltaTime,
      timeSum,
      fps,
      lastTime,
      initTexConfig,
      impulseConfig,
      mouseConfig,
      viewportWidth,
      viewportHeight,
      numberOfJacobiIterations,
      ambientTemperature,
      velocityDissipation,
      densityDissipation,
      currentScale,
      bigScale,
      smallScale,
      kappa,
      sigma,
      texVelocityScale,
      epsilon,
      gravity,
      borderOffset,
      mouseDown,
      ballOn,
      wallsOn,
      paused,
      needsReset,
    }

  } catch (error) {
    console.error(error);
    return null;
  }

  return null;
}
    
export function initializeSimulation(sim: Simulation): boolean {
  try {
    if(!sim.gl || !sim.canvas) {
      throw new Error('No WebGL2 context');
    }

    const gl = sim.gl;
    const availableExtensions = gl.getSupportedExtensions();
    
    // check to make sure we have the extensions we need
    // float textures are required for the simulation
    if(!(availableExtensions?.includes('OES_texture_float') && availableExtensions?.includes('OES_texture_float_linear'))
      || !(availableExtensions?.includes('OES_texture_half_float') && availableExtensions?.includes('OES_texture_half_float_linear'))) {
      throw new Error('Float texture extension not available');
    }

    // texture derivatives are required for the simulation
    if(!availableExtensions?.includes('OES_standard_derivatives')) {
      throw new Error('Texture derivatives extension not available');
    }

    // some debugging extensions we'll use
    if(!availableExtensions?.includes('WEBGL_debug_renderer_info')) {
      throw new Error('Renderer info extension not available');
    }

    if(!availableExtensions?.includes('WEBGL_debug_shaders')) {
      throw new Error('Shader debugging extension not available');
    }

    if(!availableExtensions?.includes('WEBGL_lose_context')) {
      throw new Error('Context loss extension not available');
    }

    // some other useful extensions
    if(!availableExtensions?.includes('OES_vertex_array_object')) {
      throw new Error('Vertex Array Object extension not available');
    }


    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// TODO: move our shaders to a separate file
const vertexShaderSource = `
  precision mediump float;

  attribute vec2 a_position;
  attribute vec2 a_texCoord;

  varying vec2 uv;

  // our basic vertex shader, which just passes on texture values
  void main() {
    uv = a_texCoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const vertexShaderFillSource = `
  precision mediump float;

  attribute vec2 a_position;

  // used to 'fill' up obstacle fragments
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const vertexShaderObstacleUpdateSource = `
  precision mediump float;

  attribute vec2 a_position;

  // used to update obstacle fragments
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderFillSource = `
  precision mediump float;

  // just fill up with red
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const fragmentShaderObstacleUpdateSource = `
  precision mediump float;

  uniform vec2 u_obstacleVelocity;

  void main() {
    gl_FragColor = vec4(u_obstacleVelocity, 0.0, 1.0);
  }
`;

const fragmentShaderImpulseSource = `
  // the impulse shader is used to apply a force to the fluid
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_velocityPressureTemperature;
  uniform sampler2D u_obstacles;

  // store velocity in xy components and temperature in z component
  uniform vec3 u_impulseColor;
  // location of a source or the mouse coordinates
  uniform vec2 u_currentPosition;
  // location of the mouse coordinates at the last time step
  uniform vec2 u_lastPosition;
  // our delta values
  uniform float u_dx;
  uniform float u_dy;
  // determines the radius around u_currentPosition to apply an impulse to
  uniform float u_epsilon;
  // how much to scale the force
  uniform float u_scale;
  // how we are going to apply the impulse
  uniform int u_impulseConfiguration;

  // scale down to uv coordinates (i.e. range = [0, 1])
  vec2 getScaledPosition(vec2 position) {
    vec2 scaleCoordinates = vec2(u_dx, u_dy);
    vec2 newCoordinates = position * scaleCoordinates;
    return newCoordinates;
  }

  // get the distance between position and this fragment's coordinate
  float getDistance(vec2 position) {
    vec2 delta = uv - position;
    return sqrt(dot(delta, delta));
  }

  // convert, then get distance
  float getScaledDistance(vec2 position) {
    vec2 scaledPosition = getScaledPosition(position);
    vec2 delta = uv - scaledPosition;
    return sqrt(dot(delta, delta));
  }

  // get the impulse difference
  vec2 getImpulseDifference(vec2 currentVelocity) {
    vec2 newVelocity = currentVelocity;
    vec2 currentPosition = getScaledPosition(u_currentPosition);
    float d = getDistance(currentPosition);
    if(d < u_epsilon) {
      vec2 lastPosition = getScaledPosition(u_lastPosition);
      vec2 delta = u_scale * (currentPosition - lastPosition);
      delta.x /= u_dx;
      delta.y /= u_dy;
      newVelocity += delta;      
    }

    return newVelocity;
}

vec2 impulseVelocity(vec2 currentVelocity) {
  vec2 newVelocity = currentVelocity;
float d = getScaledDistance(u_currentPosition);
  if(d < u_epsilon) {
    newVelocity += u_impulseColor.xy * u_scale;
  }

  return newVelocity;
}

vec3 impulseVelocityTemperature(vec3 currentVelocityTemperature) {
  vec3 newVelocityTemperature = currentVelocityTemperature;
  float d = getScaledDistance(u_currentPosition);
  if(d < u_epsilon) {
    newVelocityTemperature += u_impulseColor.xyz * u_scale;
  }

  return newVelocityTemperature;
}

float impulseTemperature(float currentTemperature) {
  float newTemperature = currentTemperature;
  float d = getScaledDistance(u_currentPosition);
  if(d < u_epsilon) {
    newTemperature += u_impulseColor.z * u_scale;
  }

  return newTemperature;
}

vec3 impulseDivergence(vec3 currentDivergence) {
  vec3 newDivergence = currentDivergence;
  vec2 currentPosition = getScaledPosition(u_currentPosition);
  float d = getDistance(currentPosition);
  if(d < u_epsilon) {
    vec2 lastPosition = getScaledPosition(u_lastPosition);
    vec2 delta = currentPosition - lastPosition;
    float deltaTemperature = currentPosition.x + currentPosition.y - lastPosition.x - lastPosition.y;
    newDivergence.xy += delta * u_scale;
    newDivergence.z += deltaTemperature * u_scale;
  }

  return newDivergence;
}

void main(void)
{
  vec4 fragColor = texture2D(u_velocityPressureTemperature, uv);

  float obstacleScale = 0.5;

  vec2 coordinate = uv + vec2(0.0, dy) * 0.5;
  vec4 upObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(dx, dy) * 0.5;
  vec4 upRightObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(dx, 0.0) * 0.5;
  vec4 rightObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(dx, -dy) * 0.5;
  vec4 downRightObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(0.0, -dy) * 0.5;
  vec4 downObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(-dx, -dy) * 0.5;
  vec4 downLeftObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(-dx, 0.0) * 0.5;
  vec4 leftObstacle = texture2D(u_obstacles, coordinate);

  coordinate = uv + vec2(-dx, dy) * 0.5;
  vec4 upLeftObstacle = texture2D(u_obstacles, coordinate);

  float obstacle = texture2D(u_obstacles, uv).a;

  if(upObstacle.a > 0.0)
  {
    fragColor.y += upObstacle.y;
  } else if(upRightObstacle.a > 0.0)
  {
    fragColor.xy += upRightObstacle.xy * obstacleScale;
  } else if(rightObstacle.a > 0.0) {
    fragColor.x += rightObstacle.x;
  } else if(downRightObstacle.a > 0.0) {
    fragColor.xy += downRightObstacle.xy * obstacleScale;
  } else if(downObstacle.a > 0.0) {
    fragColor.y += downObstacle.y;
  } else if(downLeftObstacle.a > 0.0) {
    fragColor.xy += downLeftObstacle.xy * obstacleScale;
  } else if(leftObstacle.a > 0.0) {
    fragColor.x += leftObstacle.x;
  } else if(upLeftObstacle.a > 0.0) {
    fragColor.xy += upLeftObstacle.xy * obstacleScale;
  } else if(!(obstacle > 0.0)) {
    if(u_impulseConfiguration == 0) {
      fragColor.z = impulseTemperature(fragColor.z);
    } else if(u_impulseConfiguration == 1) {
      fragColor.xy = impulseVelocity(fragColor.xy);
    } else if(u_impulseConfiguration == 2) {
      fragColor.xyz = impulseVelocityTemperature(fragColor.xyz);
    } else if(u_impulseConfiguration == 3) {
      fragColor.xy = getImpulseDifference(fragColor.xy);
    } else if(u_impulseConfiguration == 4) {
      fragColor.xyz = impulseDivergence(fragColor.xyz);
    }
  }

  gl_FragColor = fragColor;
}
`;

const fragmentShaderImpulseObstaclesSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_velocityPressureTemperature;
  uniform sampler2D u_obstacles;

  // our deltas
  uniform float u_dx;
  uniform float u_dy;
  // our epsilon value
  uniform float u_epsilon;

  void main(void)
  {
    vec4 fragColor = texture2D(u_velocityPressureTemperature, uv);

    float obstacleScale = 0.5;

    vec4 upObstacle = texture2D(u_obstacles, uv + vec2(0.0, u_dy) * 0.5);
    vec4 upRightObstacle = texture2D(u_obstacles, uv + vec2(u_dx, u_dy) * 0.5);
    vec4 rightObstacle = texture2D(u_obstacles, uv + vec2(u_dx, 0.0) * 0.5);
    vec4 downRightObstacle = texture2D(u_obstacles, uv + vec2(u_dx, -u_dy) * 0.5);
    vec4 downObstacle = texture2D(u_obstacles, uv + vec2(0.0, -u_dy) * 0.5);
    vec4 downLeftObstacle = texture2D(u_obstacles, uv + vec2(-u_dx, -u_dy) * 0.5);
    vec4 leftObstacle = texture2D(u_obstacles, uv + vec2(-u_dx, 0.0) * 0.5);
    vec4 upLeftObstacle = texture2D(u_obstacles, uv + vec2(-u_dx, u_dy) * 0.5);

    float obstacle = texture2D(u_obstacles, uv).a;

    if(!(obstacle > 0.0))
    {
      if(upObstacle.a > 0.0)
      {
        fragColor.y = upObstacle.y / u_dy;
      } else if(upRightObstacle.a > 0.0)
      {
        fragColor.xy = upRightObstacle.xy * obstacleScale / (0.5 * (u_dx + u_dy));
      } else if(rightObstacle.a > 0.0) {
        fragColor.x = rightObstacle.x / u_dx;
      } else if(downRightObstacle.a > 0.0) {
        fragColor.xy = downRightObstacle.xy * obstacleScale / (0.5 * (u_dx + u_dy));
      } else if(downObstacle.a > 0.0) {
        fragColor.y = downObstacle.y / u_dy;
      } else if(downLeftObstacle.a > 0.0) {
        fragColor.xy = downLeftObstacle.xy * obstacleScale / (0.5 * (u_dx + u_dy));
      } else if(leftObstacle.a > 0.0) {
        fragColor.x = leftObstacle.x / u_dx;
      } else if(upLeftObstacle.a > 0.0) {
        fragColor.xy = upLeftObstacle.xy * obstacleScale / (0.5 * (u_dx + u_dy));
      }   
    }

    gl_FragColor = fragColor;
  }
`;

const fragmentShaderPressureSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_velocityPressureTemperature;
  uniform sampler2D u_obstacles;

  uniform float u_dx;
  uniform float u_dy;

  void main(void)
  {
    vec4 fragColor = texture2D(u_velocityPressureTemperature, uv);

    vec2 leftCoordinate = uv - vec2(u_dx, 0.0);
    vec2 rightCoordinate = uv + vec2(u_dx, 0.0);
    vec2 downCoordinate = uv - vec2(0.0, u_dy);
    vec2 upCoordinate = uv + vec2(0.0, u_dy);

    // we use half coordinates to get a staggered grid for velocity

    vec2 leftHalfCoordinate = uv - vec2(u_dx * 0.5, 0.0);
    vec2 rightHalfCoordinate = uv + vec2(u_dx * 0.5, 0.0);
    vec2 downHalfCoordinate = uv - vec2(0.0, u_dy * 0.5);
    vec2 upHalfCoordinate = uv + vec2(0.0, u_dy * 0.5);

    float centerPressure = fragColor.a;

    float leftPressure = texture2D(u_velocityPressureTemperature, leftCoordinate).a;
    float rightPressure = texture2D(u_velocityPressureTemperature, rightCoordinate).a;
    float downPressure = texture2D(u_velocityPressureTemperature, downCoordinate).a;
    float upPressure = texture2D(u_velocityPressureTemperature, upCoordinate).a;

    float leftObstacle = texture2D(u_obstacles, leftLeftCoordinate).a;
    float rightObstacle = texture2D(u_obstacles, rightRightCoordinate).a;
    float downObstacle = texture2D(u_obstacles, downDownCoordinate).a;
    float upObstacle = texture2D(u_obstacles, upUpCoordinate).a;

    // if we run into an obstacle we assume the pressure there is the same as here

    if(leftObstacle > 0.0) {
      leftPressure = centerPressure;
    }

    if(rightObstacle > 0.0) {
      rightPressure = centerPressure;
    }

    if(downObstacle > 0.0) {
      downPressure = centerPressure;
    }

    if(upObstacle > 0.0) {
      upPressure = centerPressure;
    }

    float leftHalfVelocityX = texture2D(u_velocityPressureTemperature, leftHalfCoordinate).x;
    float rightHalfVelocityX = texture2D(u_velocityPressureTemperature, rightHalfCoordinate).x;
    float downHalfVelocityY = texture2D(u_velocityPressureTemperature, downHalfCoordinate).y;
    float upHalfVelocityY = texture2D(u_velocityPressureTemperature, upHalfCoordinate).y;

    float leftHalfObstacle = texture2D(u_obstacles, leftHalfCoordinate).a;
    float rightHalfObstacle = texture2D(u_obstacles, rightHalfCoordinate).a;
    float downHalfObstacle = texture2D(u_obstacles, downHalfCoordinate).a;
    float upHalfObstacle = texture2D(u_obstacles, upHalfCoordinate).a;

    if(leftHalfObstacle > 0.0) {
      leftHalfVelocityX = 0.0;
    }
    if(rightHalfObstacle > 0.0) {
      rightHalfVelocityX = 0.0;
    }
    if(downHalfObstacle > 0.0) {
      downHalfVelocityY = 0.0;
    }
    if(upHalfObstacle > 0.0) {
      upHalfVelocityY = 0.0;
    }

    // the new pressure is calculated using the discrete pressure gradient, which is the average of the local pressures minus the velocity gradient
    float deltaVelocityX = rightHalfVelocityX - leftHalfVelocityX;
    float deltaVelocityY = upHalfVelocityY - downHalfVelocityY;

    float pressureSum = leftPressure + rightPressure + downPressure + upPressure;

    float newPressure = (pressureSum - (deltaVelocityX * u_dx + deltaVelocityY * u_dy)) * 0.25;

    fragColor.a = newPressure;

    gl_FragColor = fragColor;
  }
`;

const fragmentShaderAdvectSource = `
  precision mediump float;

  // position of this fragment in scaled coordinates, i.e. range [0, 1]
  varying vec2 uv;

  // vector field holding the values of the fluid's velocity in red and green channels, temperature in blue channel, and pressure in alpha channel
  uniform sampler2D u_velocityPressureTemperature;

  // vector field of the quantity we are advecting
  uniform sampler2D u_sourceTexture;

  // holds the velocity of the obstacles in red and green channels. If alpha is greater than 0.0, then it is an obstacle
  uniform sampler2D u_obstacles;

  // timestep
  uniform float u_dt;

  // our deltas, dx = 1.0 / gridWidth, dy = 1.0 / gridHeight
  uniform float u_dx;
  uniform float u_dy;

  // constant of dissipation for the substance we are advecting
  uniform float u_dissipation;

  void main(void)
  {
    // get the quantity currently at this location
    vec4 fragColor = texture2D(u_sourceTexture, uv);
    
    // get the velocity at this location
    vec2 localVelocity = texture2D(u_velocityPressureTemperature, uv).xy;

    // get the left cell's location
    vec2 leftStep = uv - vec2(u_dx, 0.0);

    // get the lower cell's location
    vec2 downStep = uv - vec2(0.0, u_dy);

    // get the left x component of velocity and down y component of velocity which will be used to 'average' the local velocity.
    // Using this average velocity, we track back one timestep to determine where the local quantity was last timestep.
    float leftVelocityX = texture2D(u_velocityPressureTemperature, leftStep).x;
    float downVelocityY = texture2D(u_velocityPressureTemperature, downStep).y;

    // midVelocity is calculated as the average of the local velocity and the offset's velocity (with respect to the offset), rescaled by the cell's width/height. 
    // It is then multiplied by dt to return a displacement vector.
    float midVelocityX = (leftVelocityX + localVelocity.x) * (- 0.5 * u_dt / u_dx);
    float midVelocityY = (downVelocityY + localVelocity.y) * (- 0.5 * u_dt / u_dy);

    // Here we make the assumption that the assumption that our displacement vector has not taken us past a one cell border, 
    // and we use the floor function to 'lock-in' unit grid coordinates (no-fractions) to get the spatial derivatives.
    float dFx = floor(midVelocityX);
    float dFy = floor(midVelocityY);
    float dDx = midVelocityX - dFx;
    float dDy = midVelocityY - dFy;

    vec2 midStep = uv + vec2(dFx * u_dx, dFy * u_dy);
    vec2 midStepUp = midStep + vec2(0.0, u_dy);
    vec2 midStepRight = midStep + vec2(u_dx, 0.0);
    vec2 midStepDiagonal = midStep + vec2(u_dx, u_dy);

    vec3 centerSource = texture2D(u_sourceTexture, midStep).xyz;
    vec3 upSource = texture2D(u_sourceTexture, midStepUp).xyz;
    vec3 rightSource = texture2D(u_sourceTexture, midStepRight).xyz;
    vec3 diagonalSource = texture2D(u_sourceTexture, midStepDiagonal).xyz;

    float centerObstacle = texture2D(u_obstacles, midStep).a;
    float upObstacle = texture2D(u_obstacles, midStepUp).a;
    float rightObstacle = texture2D(u_obstacles, midStepRight).a;
    float diagonalObstacle = texture2D(u_obstacles, midStepDiagonal).a;

    // check to make sure we're not about to update an obstacle
    if(centerObstacle > 0.0)
    {
      centerSource = fragColor.xyz;
    }
    if(upObstacle > 0.0)
    {
      upSource = centerSource;
    }
    if(rightObstacle > 0.0)
    {
      rightSource = centerSource;
    }
    if(diagonalObstacle > 0.0)
    {
      diagonalSource = centerSource;
    }

    // Finally we interpolate the new quantity, first using centerSource and upSource as endpoints and dDy as our parameter to get one of the final end points.
    // Then rightSource and diagonalSource are used as endpoints and dDx is used as the parameter to get the other final endpoint. We then interpolate across
    // dDx to get the final value.
    vec3 newSource = (centerSource * (1.0 - dDy) + upSource * dDy) * (1.0 - dDx);
    newSource += (rightSource * (1.0 - dDy) + diagonalSource * dDy) * dDx;
    fragColor.xyz = newSource * u_dissipation;

    gl_FragColor = fragColor;  
  }
`;

const fragmentShaderDivergenceSource = `
  prcision mediump float;

  varying vec2 uv;

  uniform sampler2D u_velocityPressureTemperature;
  uniform sampler2D u_obstacles;

  uniform float u_dx;
  uniform float u_dy;

  void main(void)
  {
    vec4 fragColor = texture2D(u_velocityPressureTemperature, uv);
    
    vec2 rightCoordinate = uv + vec2(u_dx, 0.0);
    vec2 upCoordinate = uv + vec2(0.0, u_dy);

    float invDx = 1.0 / u_dx;
    float invDy = 1.0 / u_dy;

    float rightPressure = texture2D(u_velocityPressureTemperature, rightCoordinate).a;
    float upPressure = texture2D(u_velocityPressureTemperature, upCoordinate).a;

    float rightObstacle = texture2D(u_obstacles, rightCoordinate).a;
    float upObstacle = texture2D(u_obstacles, upCoordinate).a;

    if(rightObstacle > 0.0) {
      rightPressure = fragColor.a;
    }
    if(upObstacle > 0.0) {
      upPressure = fragColor.a;
    }

    // calculate the pressure difference with respect to X and Y. Scaling by cell width/height this gives the change in velocity which is then 
    // written to this fragment's color. Performing this calculation for each fragment ensures a divergence free field.
    float dpX = (rightPressure - fragColor.a);
    float dpY = (upPressure - fragColor.a);
    fragColor.x -= dpX * invDx;
    fragColor.y -= dpY * invDy;
    gl_FragColor = fragColor;
  }
`;

const fragmentShaderBouyancySource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_velocityPressureTemperature;
  uniform sampler2D u_density;
  uniform sampler2D u_obstacles;

  uniform float u_dx;
  uniform float u_dy;
  uniform float u_dt;
  uniform float u_ambientTemperature;
  uniform float u_sigma;
  uniform float u_kappa;

  void main(void)
  {
    vec4 fragColor = texture2D(u_velocityPressureTemperature, uv); // get current state

    // applies a bouyancy force to the fluid, which is proportional to the temperature difference between the fluid and the ambient temperature
    float temperature = fragColor.z;
    float density = texture2D(u_density, uv).x;
    float temperatureDelta = temperature - u_ambientTemperature;
    temperatureDelta *= (u_dt * u_sigma);
    temperatureDelta -= (density * u_kappa);

    vec2 velocity = vec2(0.0, 1.0);
    velocity *= temperatureDelta;
    fragColor.xy += velocity;

    gl_FragColor = fragColor;
  }
`;

const fragmentShaderTestSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;

  void main(void)
  {
    vec4 fragColor = texture2D(u_sampler, uv);
    gl_FragColor = fragColor;
  }
`;

const fragmentShaderShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      float temperature = texture2D(u_sampler, uv).z;
      if(temperature > 0.0) {
        gl_FragColor = vec4(temperature, 0.0, 0.0, 1.0);
      } else {
        gl_FragColor = vec4(0.0, 0.0, - temperature, 1.0);
      }
    }
  }
`;

const fragmentShaderTemperatureDensityShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform sampler2D u_density;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      float temperature = texture2D(u_sampler, uv).z;
      float density = texture2D(u_density, uv).x;
      if(density == 0.0)
      {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        density = abs(density);
        if(density > 1.0) {
          density = 1.0;
        }
        if(temperature > 0.0) {
          // hot is red
          gl_FragColor = vec4(temperature, 0.0, 0.0, density);
        } else {
          // cold is blue
          gl_FragColor = vec4(0.0, 0.0, - temperature, density);
        } 
      }      
    }
  }
`;

const fragmentShaderVelocityDensityShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform sampler2D u_density;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      vec2 velocity = texture2D(u_sampler, uv).xy;
      float density = texture2D(u_density, uv).x;
      if(density == 0.0)
      {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        velocity = normalize(velocity) * 0.5;

        density = abs(density);

        if(density > 1.0) {
          density = 1.0;
        }

        gl_FragColor = vec4(velocity, 0.0, density);
      }
    }  
  }
`;

const fragmentShaderSepiaDensityShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform sampler2D u_density;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      vec3 color = texture2D(u_sampler, uv).xyz;
    float density = texture2D(u_density, uv).x;
    if(density == 0.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
    else {
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      color = vec3(1.2, 1.0, 0.8);
      color *= gray;

      color = normalize(color);
      color *= 0.5;

      density = abs(density);

      if(density > 1.0) {
        density = 1.0;
      }

      gl_FragColor = vec4(color, density);
    }
  }
`;

const fragmentShaderDensityShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform sampler2D u_density;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;
    
    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      float density = texture2D(u_density, uv).x;
      if(density == 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        if(density > 0.0) {
          if(density > 1.0) {
            density = 1.0;
          }

          gl_FragColor = vec4(0.0, density, 0.0, 1.0);
        } else {
          if(density < -1.0) {
            density = -1.0;
          }

          gl_FragColor = vec4(- density, 0.0, -density, 1.0); 
        }
      }
    }
  }
`;

const fragmentShaderVelocityShowSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      vec3 velocityPressureTemperature = texture2D(u_sampler, uv).xyz;
      float magnitude = sqrt(dot(velocityPressureTemperature, velocityPressureTemperature));
      velocityPressureTemperature *= (1.0 / (magnitude + 0.0001));
      velocityPressureTemperature.x = abs(velocityPressureTemperature.x);
      velocityPressureTemperature.y = abs(velocityPressureTemperature.y);
      velocityPressureTemperature.z = abs(velocityPressureTemperature.z);
      gl_FragColor = vec4(velocityPressureTemperature, 1.0);
    }  
  }
`;

const fragmentShaderShowInkSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      float rg = 1.0 + texture2D(u_sampler, uv).z;

      gl_FragColor = vec4(rg, rg, 1.0 + rg, 1.0);
    }
  }
`;

const fragmentShaderDensityTestSource = `
  precision mediump float;

  varying vec2 uv;

  uniform sampler2D u_sampler;
  uniform sampler2D u_obstacles;
  uniform vec3 u_obstacleColor;

  void main(void)
  {
    float obstacle = texture2D(u_obstacles, uv).a;

    if(obstacle > 0.0) {
      gl_FragColor = vec4(u_obstacleColor, 1.0);
    } else {
      gl_FragColor = texture2D(u_sampler, uv);
    }
  }
`;

export function initShaders(sim: Simulation): boolean {
  try {
    const gl = sim.gl;

    if(!gl) {
      throw new Error('No WebGL2 context');
    }

    const vertexShader = createWebGL2Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShaderBouyancy = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderBouyancySource);

    const attributeBindings = [
      { location: 0, name: 'a_position' },
      { location: 1, name: 'a_texCoord' },
    ];

    const bouyancyProgram = createWebGL2Program(gl, vertexShader, fragmentShaderBouyancy, attributeBindings);

    const fragmentShaderAdvect = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderAdvectSource);
    const advectProgram = createWebGL2Program(gl, vertexShader, fragmentShaderAdvect, attributeBindings);

    const fragmentShaderShow = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderShowSource);
    const showProgram = createWebGL2Program(gl, vertexShader, fragmentShaderShow, attributeBindings);

    const fragmentShaderVelocityShow = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderVelocityShowSource);
    const velocityShowProgram = createWebGL2Program(gl, vertexShader, fragmentShaderVelocityShow, attributeBindings);

    const fragmentShaderImpulse = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderImpulseSource);
    const impulseProgram = createWebGL2Program(gl, vertexShader, fragmentShaderImpulse, attributeBindings);

    const fragmentShaderDivergence = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderDivergenceSource);
    const divergenceProgram = createWebGL2Program(gl, vertexShader, fragmentShaderDivergence, attributeBindings);

    const fragmentShaderTest = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderTestSource);
    const testProgram = createWebGL2Program(gl, vertexShader, fragmentShaderTest, attributeBindings);

    const fragmentShaderPressure = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderPressureSource);
    const pressureProgram = createWebGL2Program(gl, vertexShader, fragmentShaderPressure, attributeBindings);

    const fragmentShaderShowInk = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderShowInkSource);
    const showInkProgram = createWebGL2Program(gl, vertexShader, fragmentShaderShowInk, attributeBindings);

    const fragmentShaderFill = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderFillSource);
    const vertexShaderFill = createWebGL2Shader(gl, gl.VERTEX_SHADER, vertexShaderFillSource);
    const fillProgram = createWebGL2Program(gl, vertexShader, fragmentShaderFill, attributeBindings.slice(0, 1));

    const fragmentShaderTemperatureDensityShow = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderTemperatureDensityShowSource);
    const temperatureDensityShowProgram = createWebGL2Program(gl, vertexShader, fragmentShaderTemperatureDensityShow, attributeBindings);

    const fragmentShaderDensityTest = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderDensityTestSource);
    const densityTestProgram = createWebGL2Program(gl, vertexShader, fragmentShaderDensityTest, attributeBindings);

    const fragmentShaderDensityShow = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderDensityShowSource);
    const densityShowProgram = createWebGL2Program(gl, vertexShader, fragmentShaderDensityShow, attributeBindings);

    const fragmentShaderSepiaDensityShow = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSepiaDensityShowSource);
    const sepiaDensityShowProgram = createWebGL2Program(gl, vertexShader, fragmentShaderSepiaDensityShow, attributeBindings);

    const fragmentShaderObstacleUpdate = createWebGL2Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderObstacleUpdateSource);
    const obstacleUpdateProgram = createWebGL2Program(gl, vertexShaderFill, fragmentShaderObstacleUpdate, attributeBindings.slice(0, 1));
        
    advectProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    advectProgram.uniformLocations.set('u_velocityPressureTemperature', gl.getUniformLocation(advectProgram, 'u_velocityPressureTemperature'));
    advectProgram.uniformLocations.set('u_sourceTexture', gl.getUniformLocation(advectProgram, 'u_sourceTexture'));
    advectProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(advectProgram, 'u_obstacles'));
    advectProgram.uniformLocations.set('u_dt', gl.getUniformLocation(advectProgram, 'u_dt'));
    advectProgram.uniformLocations.set('u_dx', gl.getUniformLocation(advectProgram, 'u_dx'));
    advectProgram.uniformLocations.set('u_dy', gl.getUniformLocation(advectProgram, 'u_dy'));
    advectProgram.uniformLocations.set('u_dissipation', gl.getUniformLocation(advectProgram, 'u_dissipation'));
    
    bouyancyProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    bouyancyProgram.uniformLocations.set('u_velocityPressureTemperature', gl.getUniformLocation(bouyancyProgram, 'u_velocityPressureTemperature'));
    bouyancyProgram.uniformLocations.set('u_density', gl.getUniformLocation(bouyancyProgram, 'u_density'));
    bouyancyProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(bouyancyProgram, 'u_obstacles'));
    bouyancyProgram.uniformLocations.set('u_dt', gl.getUniformLocation(bouyancyProgram, 'u_dt'));
    bouyancyProgram.uniformLocations.set('u_dx', gl.getUniformLocation(bouyancyProgram, 'u_dx'));
    bouyancyProgram.uniformLocations.set('u_dy', gl.getUniformLocation(bouyancyProgram, 'u_dy'));
    bouyancyProgram.uniformLocations.set('u_ambientTemperature', gl.getUniformLocation(bouyancyProgram, 'u_ambientTemperature'));
    bouyancyProgram.uniformLocations.set('u_sigma', gl.getUniformLocation(bouyancyProgram, 'u_sigma'));
    bouyancyProgram.uniformLocations.set('u_kappa', gl.getUniformLocation(bouyancyProgram, 'u_kappa'));

    divergenceProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    divergenceProgram.uniformLocations.set('u_velocityPressureTemperature', gl.getUniformLocation(divergenceProgram, 'u_velocityPressureTemperature'));
    divergenceProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(divergenceProgram, 'u_obstacles'));
    divergenceProgram.uniformLocations.set('u_dx', gl.getUniformLocation(divergenceProgram, 'u_dx'));
    divergenceProgram.uniformLocations.set('u_dy', gl.getUniformLocation(divergenceProgram, 'u_dy'));

    impulseProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    impulseProgram.uniformLocations.set('u_velocityPressureTemperature', gl.getUniformLocation(impulseProgram, 'u_velocityPressureTemperature'));
    impulseProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(impulseProgram, 'u_obstacles'));
    impulseProgram.uniformLocations.set('u_dx', gl.getUniformLocation(impulseProgram, 'u_dx'));
    impulseProgram.uniformLocations.set('u_dy', gl.getUniformLocation(impulseProgram, 'u_dy'));
    impulseProgram.uniformLocations.set('u_epsilon', gl.getUniformLocation(impulseProgram, 'u_epsilon'));

    pressureProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    pressureProgram.uniformLocations.set('u_velocityPressureTemperature', gl.getUniformLocation(pressureProgram, 'u_velocityPressureTemperature'));
    pressureProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(pressureProgram, 'u_obstacles'));
    pressureProgram.uniformLocations.set('u_dx', gl.getUniformLocation(pressureProgram, 'u_dx'));
    pressureProgram.uniformLocations.set('u_dy', gl.getUniformLocation(pressureProgram, 'u_dy'));
    
    showProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    showProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(showProgram, 'u_sampler'));
    showProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(showProgram, 'u_obstacles'));
    showProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(showProgram, 'u_obstacleColor'));

    velocityShowProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    velocityShowProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(velocityShowProgram, 'u_sampler'));
    velocityShowProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(velocityShowProgram, 'u_obstacles'));
    velocityShowProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(velocityShowProgram, 'u_obstacleColor'));

    testProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    testProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(testProgram, 'u_sampler'));

    temperatureDensityShowProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    temperatureDensityShowProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(temperatureDensityShowProgram, 'u_sampler'));
    temperatureDensityShowProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(temperatureDensityShowProgram, 'u_obstacles'));
    temperatureDensityShowProgram.uniformLocations.set('u_density', gl.getUniformLocation(temperatureDensityShowProgram, 'u_density'));
    temperatureDensityShowProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(temperatureDensityShowProgram, 'u_obstacleColor'));

    densityTestProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    densityTestProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(densityTestProgram, 'u_sampler'));
    densityTestProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(densityTestProgram, 'u_obstacles'));
    densityTestProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(densityTestProgram, 'u_obstacleColor'));

    densityShowProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    densityShowProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(densityShowProgram, 'u_sampler'));
    densityShowProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(densityShowProgram, 'u_obstacles'));
    densityShowProgram.uniformLocations.set('u_density', gl.getUniformLocation(densityShowProgram, 'u_density'));
    densityShowProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(densityShowProgram, 'u_obstacleColor'));

    sepiaDensityShowProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    sepiaDensityShowProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(sepiaDensityShowProgram, 'u_sampler'));
    sepiaDensityShowProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(sepiaDensityShowProgram, 'u_obstacles'));
    sepiaDensityShowProgram.uniformLocations.set('u_density', gl.getUniformLocation(sepiaDensityShowProgram, 'u_density'));
    sepiaDensityShowProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(sepiaDensityShowProgram, 'u_obstacleColor'));

    showInkProgram.uniformLocations = new Map<string, WebGLUniformLocation>();
    showInkProgram.uniformLocations.set('u_sampler', gl.getUniformLocation(showInkProgram, 'u_sampler'));
    showInkProgram.uniformLocations.set('u_obstacles', gl.getUniformLocation(showInkProgram, 'u_obstacles'));
    showInkProgram.uniformLocations.set('u_obstacleColor', gl.getUniformLocation(showInkProgram, 'u_obstacleColor'));

    sim.advectProgram = advectProgram;
    sim.bouyancyProgram = bouyancyProgram;
    sim.divergenceProgram = divergenceProgram;
    sim.impulseProgram = impulseProgram;
    sim.pressureProgram = pressureProgram;
    sim.showProgram = showProgram;
    sim.velocityShowProgram = velocityShowProgram;
    sim.testProgram = testProgram;
    sim.temperatureDensityShowProgram = temperatureDensityShowProgram;
    sim.densityTestProgram = densityTestProgram;
    sim.densityShowProgram = densityShowProgram;
    sim.sepiaDensityShowProgram = sepiaDensityShowProgram;
    sim.showInkProgram = showInkProgram;
    
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initBuffers(sim: Simulation): boolean {
  try {
    if(!sim.gl) {
      throw new Error('No WebGL2 context');
    }

    const gl = sim.gl;

    sim.squarePositionBuffer = createSquareBuffer(gl);
    
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initTextures(sim: Simulation): boolean {
  try {
    const gl = sim.gl;
    const width = sim.viewportWidth;
    const height = sim.viewportHeight;
    const config = sim.initTexConfig;
    const texVelocityScale = sim.texVelocityScale;

    if(!gl) {
      throw new Error('No WebGL2 context');
    }

    if(width <= 0 || height <= 0) {
      throw new Error('Invalid dimensions');
    }

    let i, j, T, h, x, y, rx, ry, densityValue, pixels, densityPixels;
    rx = Math.random();
    ry = - Math.random();
    
    pixels = new Float32Array(width * height * 4);
    densityPixels = new Float32Array(width * height * 4);

    if(config === 0) {
      for(i = 0; i < width; i++) {
        for(j = 0; j < height; j++) {
          T = 0.0;
          x = 0.0;
          y = 0.0;
          densityValue = 0.0;

          if((i < (300)) && (i > 200)) {
            if((j < (240)) && (j > 100)) {
              T = 1.0;
              x = rx * texVelocityScale;
              y = ry * texVelocityScale;
              densityValue = 1.0;
            } else if(j > 260 && j < 400) {
              T = -1.0;
              x = -ry * texVelocityScale;
              y = rx * texVelocityScale;
              densityValue = -1.0;
            }
          }

          pixels[(i + j * width) * 4] = x;
          pixels[(i + j * width) * 4 + 1] = y;
          pixels[(i + j * width) * 4 + 2] = T;
          pixels[(i + j * width) * 4 + 3] = 0.0;

          densityPixels[(i + j * width) * 4] = densityValue;
          densityPixels[(i + j * width) * 4 + 1] = densityValue;
          densityPixels[(i + j * width) * 4 + 2] = densityValue;
          densityPixels[(i + j * width) * 4 + 3] = 1.0;         
        }
      }
    } else if(config === 1) {
      for(i = 0; i < width; i++) {
        for(j = 0; j < height; j++) {
          h = 2.0 / width;
          x = h * (j - width / 2);
          y = h * (i - height / 2) - 0.75;
          densityValue = 0.0;
          
          if(x * x + y * y > 0.05) {
            T = 0.0;
          } else {
            T = - 2.0;
            densityValue = 1.0;
          }

          pixels[(i + j * width) * 4] = 0.0;
          pixels[(i + j * width) * 4 + 1] = 0.0;
          pixels[(i + j * width) * 4 + 2] = T;
          pixels[(i + j * width) * 4 + 3] = 0.0;

          densityPixels[(i + j * width) * 4] = densityValue;
          densityPixels[(i + j * width) * 4 + 1] = densityValue;
          densityPixels[(i + j * width) * 4 + 2] = densityValue;
          densityPixels[(i + j * width) * 4 + 3] = 1.0;
        }
      }

    } else if(config === 2) {
      for(i = 0; i < width; i++) {
        for(j = 0; j < height; j++) {
          const theta = ((i * width + j) * (4.0 * Math.PI)) / (width * height);
          const cTheta = Math.cos(theta);
          const sTheta = Math.sin(theta);

          T = cTheta * sTheta;

          h = 2.0 / width;
          x = h * (j - width / 2);
          y = h * (i - height / 2);

          const dist = Math.sqrt(x * x + y * y);

          T /= (dist * dist + 1.0);
          x = cTheta / (dist * dist + 1.0);
          y = sTheta / (dist * dist + 1.0);

          densityValue = 1.0 / (dist * dist + 1.0);

          pixels[(i + j * width) * 4] = x;
          pixels[(i + j * width) * 4 + 1] = y;
          pixels[(i + j * width) * 4 + 2] = T;
          pixels[(i + j * width) * 4 + 3] = 0.0;

          densityPixels[(i + j * width) * 4] = densityValue;
          densityPixels[(i + j * width) * 4 + 1] = densityValue;
          densityPixels[(i + j * width) * 4 + 2] = densityValue;
          densityPixels[(i + j * width) * 4 + 3] = 1.0;
        }
      }

    } else if(config === 3) {
      for(i = 0; i < width; i++) {
        for(j = 0; j < height; j++) {
          x = Math.random() * Math.cos(i);
          y = Math.random() * Math.sin(j);

          pixels[(i + j * width) * 4] = x;
          pixels[(i + j * width) * 4 + 1] = y;

          x = Math.random() * Math.cos(i * i);
          y = Math.random() * Math.sin(j * j);

          pixels[(i + j * width) * 4 + 2] = x;
          pixels[(i + j * width) * 4 + 3] = y;
        }
      }
    } else if(config === 4) {
      for(i = 0; i < width; i++) {
        for(j = 0; j < height; j++) {
          pixels[(i + j * width) * 4] = 0.0;
          pixels[(i + j * width) * 4 + 1] = 0.0;
          pixels[(i + j * width) * 4 + 2] = 0.0;
          pixels[(i + j * width) * 4 + 3] = 0.0;

          densityPixels[(i + j * width) * 4] = 0.0;
          densityPixels[(i + j * width) * 4 + 1] = 0.0;
          densityPixels[(i + j * width) * 4 + 2] = 0.0;
          densityPixels[(i + j * width) * 4 + 3] = 1.0;
        }
      }
    }

    if(gl.isTexture(sim.initialVelocityPressureTexture)) {
      gl.deleteTexture(sim.initialVelocityPressureTexture);
    }

    sim.initialVelocityPressureTexture = createWebGL2Texture(gl, gl.NEAREST, gl.NEAREST, gl.REPEAT, gl.REPEAT, gl.RGBA, gl.FLOAT);
    initWebGL2TextureWithData(sim.initialVelocityPressureTexture, width, height, pixels);

    if(gl.isTexture(sim.initialDensityTexture)) {
      gl.deleteTexture(sim.initialDensityTexture);
    }

    sim.initialDensityTexture = createWebGL2Texture(gl, gl.NEAREST, gl.NEAREST, gl.REPEAT, gl.REPEAT, gl.RGBA, gl.FLOAT);
    initWebGL2TextureWithData(sim.initialDensityTexture, width, height, densityPixels);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initImage(sim: Simulation, image: HTMLImageElement): boolean {
  try {
    const gl = sim.gl;

    if(!gl) {
      throw new Error('No WebGL2 context');
    }


    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initFrameBuffers(sim: Simulation): boolean {
  try {
    const gl = sim.gl;
    const width = sim.viewportWidth;
    const height = sim.viewportHeight;
    if(!gl) {
      throw new Error('No WebGL2 context');
    }

    sim.velocityPressureTemperatureSlab = createWebGL2SlabFromContext(gl, width, height);
    sim.densitySlab = createWebGL2SlabFromContext(gl, width, height);
    sim.imageSlab = createWebGL2SlabFromContext(gl, width, height);

    initWebGL2Slab(sim.velocityPressureTemperatureSlab);
    initWebGL2Slab(sim.densitySlab);
    initWebGL2Slab(sim.imageSlab);

    sim.obstacleFrameBuffer = gl.createFramebuffer();
    sim.obstacleTexture = createWebGL2Texture(gl, gl.NEAREST, gl.NEAREST, gl.REPEAT, gl.REPEAT, gl.RGBA, gl.FLOAT);
    initWebGL2Texture(sim.obstacleTexture, width, height);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sim.obstacleTexture, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initSurfaces(sim: Simulation): boolean {
  try {
    const gl = sim.gl;

    if(!gl) {
      throw new Error('No WebGL2 context');
    }

    const u_samplerLocation = sim.testProgram?.uniformLocations?.get('u_sampler') as WebGLUniformLocation;
    const initialVelocityPressureTexture = sim.initialVelocityPressureTexture;
    const testProgram = sim.testProgram;
    const squarePositionBuffer = sim.squarePositionBuffer;
    const numVertices = 6;
    const positionSize = 2 * Float32Array.BYTES_PER_ELEMENT;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, initialVelocityPressureTexture);

    gl.useProgram(testProgram);
    gl.uniform1i(u_samplerLocation, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, squarePositionBuffer);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, (positionSize * numVertices));

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    gl.flush();

    swapPingPong(sim.velocityPressureTemperatureSlab);

    attachPingFBO(sim.velocityPressureTemperatureSlab);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    gl.flush();

    swapPingPong(sim.velocityPressureTemperatureSlab);

    attachPingFBO(sim.densitySlab);

    gl.bindTexture(gl.TEXTURE_2D, sim.initialDensityTexture);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    gl.flush();

    swapPingPong(sim.densitySlab);

    attachPingFBO(sim.densitySlab);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    gl.flush();

    swapPingPong(sim.densitySlab);

    attachPingFBO(sim.densitySlab);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    gl.flush();

    /**
     * if(gl.isTexture(sim.dropImageTexture)) {
     *   attachPingFBO(sim.imageSlab);
     *  gl.bindTexture(gl.TEXTURE_2D, sim.dropImageTexture);
     * 
     * gl.drawArrays(gl.TRIANGLES, 0, numVertices);
     * gl.flush();
     * 
     * swapPingPong(sim.imageSlab);
     * 
     * attachPingFBO(sim.imageSlab);
     * 
     * gl.drawArrays(gl.TRIANGLES, 0, numVertices);
     * gl.flush();
     */

    // resetState(sim);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.useProgram(null);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/*
  initObstacles(obsFBO, wallsOn, ballOn)
*/

export function initObstacles(sim: Simulation): boolean {
  try {
    const gl = sim.gl;
    const width = sim.viewportWidth;
    const height = sim.viewportHeight;
    const wallsOn = sim.wallsOn;
    const ballOn = sim.ballOn;
    const borderOffset = sim.borderOffset;
    
    if(!gl) {
      throw new Error('No WebGL2 context');
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, sim.obstacleFrameBuffer);
    gl.viewport(0, 0, width, height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if(wallsOn) {
      gl.useProgram(sim.fillProgram);

      const outer = 1.0;
      const inner = outer - borderOffset;

      const bottomEdgePositions = new Float32Array([
        - outer, - outer,
          outer, - outer,
          outer, - inner,
        - outer, - inner,
      ]);

      const leftEdgePositions = new Float32Array([
        - outer, - inner,
        - inner, - inner,
        - inner,   outer,
        - outer,   outer,
      ]);

      const rightEdgePositions = new Float32Array([
        inner, - inner,
        outer, - inner,
        outer,   outer,
        inner,   outer,
      ]);

      const topEdgePositions = new Float32Array([
        - inner, inner,
          inner, inner,
          inner, outer,
        - inner, outer,
      ]);

      const squareBottomBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareBottomBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, bottomEdgePositions, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      const squareLeftBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareLeftBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, leftEdgePositions, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      const squareRightBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareRightBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, rightEdgePositions, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      const squareTopBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, squareTopBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, topEdgePositions, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      gl.flush();

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(squareBottomBuffer);
      gl.deleteBuffer(squareLeftBuffer);
      gl.deleteBuffer(squareRightBuffer);
      gl.deleteBuffer(squareTopBuffer);
    }

    if(ballOn) {
      const obstacleVelocityUniformLocation = sim.obstacleProgram?.uniformLocations?.get('u_velocityPressureTemperature') as WebGLUniformLocation;
      const numSlices = 64;
      const twopi = 2.0 * Math.PI;
      const dtheta = twopi / (numSlices - 1.0);
      const circlePositionsArray = new Float32Array(numSlices * 6);
      const circlePositionX = sim.circlePosition[0];
      const circlePositionY = sim.circlePosition[1];
      const circleRadius = sim.circleRadius;
      const ratio = height / width;
      let x, y, ctheta, stheta, theta, i;

      gl.useProgram(sim.obstacleProgram);
      gl.uniform2fv(obstacleVelocityUniformLocation, sim.circleVelocity as Float32Array);
      
      theta = 0.0;

      for(i = 0; i < numSlices; i++) {
        ctheta = Math.cos(theta);
        stheta = Math.sin(theta);

        x = circlePositionX;
        y = circlePositionY;

        circlePositionsArray[i * 6] = x;
        circlePositionsArray[i * 6 + 1] = y;

        x = circleRadius * ctheta * ratio + circlePositionX;
        y = circleRadius * stheta + circlePositionY;

        circlePositionsArray[i * 6 + 2] = x;
        circlePositionsArray[i * 6 + 3] = y;

        theta += dtheta;

        ctheta = Math.cos(theta);
        stheta = Math.sin(theta);

        x = circleRadius * ctheta * ratio + circlePositionX;
        y = circleRadius * stheta + circlePositionY;

        circlePositionsArray[i * 6 + 4] = x;
        circlePositionsArray[i * 6 + 5] = y;        
      } 

      const circleBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, circlePositionsArray, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, numSlices * 3);
      gl.flush();

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(circleBuffer);
    }

    gl.useProgram(null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}