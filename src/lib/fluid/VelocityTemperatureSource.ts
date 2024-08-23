import { vec2, vec3 } from 'gl-matrix';

export type VelocityTemperatureSource = {
  position: vec2;
  velocityTemperature: vec3;
  radius: number;
}

export function createVelocityTemperatureSourceFromVec3(position: vec2, velocityTemperature: vec3, radius: number): VelocityTemperatureSource {
  return { position, velocityTemperature, radius };
}

export function createVelocityTemperatureSourceFromVelocityAndTemperature(position: vec2, velocity: vec2, temperature: number, radius: number): VelocityTemperatureSource {
  return { position, velocityTemperature: vec3.fromValues(velocity[0], velocity[1], temperature), radius };
}

// update the position of the velocity temperature source
export function updateVelocityTemperatureSourcePosition(source: VelocityTemperatureSource, position: vec2) {
  source.position = position;
}

// update the velocity of the velocity temperature source
export function updateVelocityTemperatureSourceVelocity(source: VelocityTemperatureSource, velocity: vec2) {
  source.velocityTemperature[0] = velocity[0];
  source.velocityTemperature[1] = velocity[1];
}

// update the temperature of the velocity temperature source
export function updateVelocityTemperatureSourceTemperature(source: VelocityTemperatureSource, temperature: number) {
  source.velocityTemperature[2] = temperature;
}

// update the velocity and temperature of the velocity temperature source
export function updateVelocityTemperatureSourceVelocityAndTemperature(source: VelocityTemperatureSource, velocity: vec2, temperature: number) {
  source.velocityTemperature[0] = velocity[0];
  source.velocityTemperature[1] = velocity[1];
  source.velocityTemperature[2] = temperature;
}

// update the radius of the velocity temperature source
export function updateVelocityTemperatureSourceRadius(source: VelocityTemperatureSource, radius: number) {
  source.radius = radius;
}

// returns true if the given point is within the velocity temperature source's radius
export function isPointInVelocityTemperatureSource(source: VelocityTemperatureSource, point: vec2): boolean {
  return vec2.distance(source.position, point) <= source.radius;
}

// return the velocity at the given point in the velocity temperature source
export function getVelocityAtPointInVelocityTemperatureSource(source: VelocityTemperatureSource, point: vec2): vec2 {
  return vec2.fromValues(source.velocityTemperature[0], source.velocityTemperature[1]);
}

// return the temperature at the given point in the velocity temperature source
export function getTemperatureAtPointInVelocityTemperatureSource(source: VelocityTemperatureSource, point: vec2): number {
  return source.velocityTemperature[2];
}

// return the position of the velocity temperature source
export function getVelocityTemperatureSourcePosition(source: VelocityTemperatureSource): vec2 {
  return source.position;
}

// return the velocity of the velocity temperature source
export function getVelocityTemperatureSourceVelocity(source: VelocityTemperatureSource): vec2 {
  return vec2.fromValues(source.velocityTemperature[0], source.velocityTemperature[1]);
}

// return the temperature of the velocity temperature source
export function getVelocityTemperatureSourceTemperature(source: VelocityTemperatureSource): number {
  return source.velocityTemperature[2];
}

// return the radius of the velocity temperature source
export function getVelocityTemperatureSourceRadius(source: VelocityTemperatureSource): number {
  return source.radius;
}

// return the radius squared of the velocity temperature source
export function getVelocityTemperatureSourceRadiusSquared(source: VelocityTemperatureSource): number {
  return source.radius * source.radius;
}