import { vec2 } from "gl-matrix";

// A localized constant temperature source for our fluid field

export type TemperatureSource = {
  position: vec2;
  temperature: number;
  radius: number;
};

// Creates a new temperature source at the given position with the given temperature and radius
export function createTemperatureSource(position: vec2, temperature: number, radius: number): TemperatureSource {
  return { position, temperature, radius };
}

// Updates the temperature source's position
export function updateTemperatureSourcePosition(source: TemperatureSource, position: vec2) {
  source.position = position;
}

// Updates the temperature source's temperature
export function updateTemperatureSourceTemperature(source: TemperatureSource, temperature: number) {
  source.temperature = temperature;
}

// Updates the temperature source's radius
export function updateTemperatureSourceRadius(source: TemperatureSource, radius: number) {
  source.radius = radius;
}

// Returns true if the given point is within the temperature source's radius
export function isPointInTemperatureSource(source: TemperatureSource, point: vec2): boolean {
  return vec2.distance(source.position, point) <= source.radius;
}

// Returns the temperature at the given point in the temperature source
export function getTemperatureAtPointInTemperatureSource(source: TemperatureSource, point: vec2): number {
  return source.temperature;
}

// Returns the temperature source's position
export function getTemperatureSourcePosition(source: TemperatureSource): vec2 {
  return source.position;
}

// Returns the temperature source's temperature
export function getTemperatureSourceTemperature(source: TemperatureSource): number {
  return source.temperature;
}

// Returns the temperature source's radius
export function getTemperatureSourceRadius(source: TemperatureSource): number {
  return source.radius;
}

// Returns the temperature source's radius squared
export function getTemperatureSourceRadiusSquared(source: TemperatureSource): number {
  return source.radius * source.radius;
}
