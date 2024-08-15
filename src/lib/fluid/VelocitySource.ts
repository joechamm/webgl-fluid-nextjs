import { vec2 } from "gl-matrix";

// A localized constant velocity source for our fluid field. For example a fan or a drain.
export type VelocitySource = {
  position: vec2;
  velocity: vec2;
  radius: number;
};


// Creates a new velocity source at the given position with the given velocity and radius
export function createVelocitySource(position: vec2, velocity: vec2, radius: number): VelocitySource {
  return { position, velocity, radius };
}

// Updates the velocity source's position
export function updateVelocitySourcePosition(source: VelocitySource, position: vec2) {
  source.position = position;
}

// Updates the velocity source's velocity
export function updateVelocitySourceVelocity(source: VelocitySource, velocity: vec2) {
  source.velocity = velocity;
}

// Updates the velocity source's radius
export function updateVelocitySourceRadius(source: VelocitySource, radius: number) {
  source.radius = radius;
}

// Returns true if the given point is within the velocity source's radius
export function isPointInVelocitySource(source: VelocitySource, point: vec2): boolean {
  return vec2.distance(source.position, point) <= source.radius;
}

// Returns the velocity at the given point in the velocity source
export function getVelocityAtPointInVelocitySource(source: VelocitySource, point: vec2): vec2 {
  return source.velocity;
}

// Returns the velocity source's position
export function getVelocitySourcePosition(source: VelocitySource): vec2 {
  return source.position;
}

// Returns the velocity source's velocity
export function getVelocitySourceVelocity(source: VelocitySource): vec2 {
  return source.velocity;
}

// Returns the velocity source's radius
export function getVelocitySourceRadius(source: VelocitySource): number {
  return source.radius;
}
