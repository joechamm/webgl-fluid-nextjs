import { vec2, vec3 } from "gl-matrix";
import { VelocityTemperatureSource } from "./VelocityTemperatureSource";
import { VelocitySource } from "./VelocitySource";
import { TemperatureSource } from "./TemperatureSouce";
import { VelocitySourceList } from "./VelocitySourceList";
import { TemperatureSourceList } from "./TemperatureSourceList";

export type VelocityTemperatureSourceList = {
  maxSources: number;
  sources: VelocityTemperatureSource[];
};

// Creates a new list of velocity temperature sources with the given maximum number of sources
export function createVelocityTemperatureSourceList(maxSources: number): VelocityTemperatureSourceList {
  return { maxSources, sources: [] };
}

// Adds a new velocity temperature source to the list of velocity temperature sources
export function addVelocityTemperatureSource(sources: VelocityTemperatureSourceList, source: VelocityTemperatureSource) {
  if (sources.sources.length < sources.maxSources) {
    sources.sources.push(source);
  }
}

// Removes the velocity temperature source at the given index from the list of velocity temperature sources
export function removeVelocityTemperatureSource(sources: VelocityTemperatureSourceList, index: number) {
  sources.sources.splice(index, 1);
}

// Clears all velocity temperature sources from the list of velocity temperature sources
export function clearVelocityTemperatureSourceList(sources: VelocityTemperatureSourceList) {
  sources.sources = [];
}

// Returns the number of velocity temperature sources in the list of velocity temperature sources
export function getVelocityTemperatureSourceCount(sources: VelocityTemperatureSourceList): number {
  return sources.sources.length;
}

// Returns the velocity temperature source at the given index in the list of velocity temperature sources
export function getVelocityTemperatureSource(sources: VelocityTemperatureSourceList, index: number): VelocityTemperatureSource {
  return sources.sources[index];
}

// Returns the list of velocity temperature sources
export function getVelocityTemperatureSourceList(sources: VelocityTemperatureSourceList): VelocityTemperatureSource[] {
  return sources.sources;
}

// Returns the maximum number of velocity temperature sources
export function getVelocityTemperatureSourceListMaxSources(sources: VelocityTemperatureSourceList): number {
  return sources.maxSources;
}

// Creates a new velocity temperature source at the given position with the given velocity and radius
export function createVelocityTemperatureSource(position: vec2, velocity: vec2, temperature: number, radius: number): VelocityTemperatureSource {
  return { position, velocityTemperature: vec3.fromValues(velocity[0], velocity[1], temperature), radius };
}

// Returns the velocity temperature source at the given index in the list of velocity temperature sources
export function getVelocityTemperatureSourceAtIndex(sources: VelocityTemperatureSourceList, index: number): VelocityTemperatureSource {
  return sources.sources[index];
}

// Remove all sources within the given radius
export function removeVelocityTemperatureSourcesInRadius(sources: VelocityTemperatureSourceList, position: vec2, radius: number) {
  sources.sources = sources.sources.filter(source => vec2.distance(source.position, position) > radius);
}

// create a velocity temperature source list from a velocity source list and a temperature source list
export function createVelocityTemperatureSourceListFromSources(velocitySources: VelocitySourceList, temperatureSources: TemperatureSourceList): VelocityTemperatureSourceList | null{
  try {
    // make sure the number of sources is the same
    if (velocitySources.sources.length !== temperatureSources.sources.length) {
      throw new Error("Velocity source list and temperature source list must have the same number of sources");
    }

    // create a new velocity temperature source list
    const sources = createVelocityTemperatureSourceList(velocitySources.maxSources);
    for(let i = 0; i < velocitySources.sources.length; i++) {
      const velocitySource = velocitySources.sources[i];
      const temperatureSource = temperatureSources.sources[i];
      addVelocityTemperatureSource(sources, createVelocityTemperatureSource(velocitySource.position, velocitySource.velocity, temperatureSource.temperature, velocitySource.radius));
    }
    return sources;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// pop a velocity temperature source from the list
export function popVelocityTemperatureSource(sources: VelocityTemperatureSourceList): boolean {
  try {
    if (sources.sources.length === 0) {
      throw new Error("No sources to pop");
    }
    sources.sources.pop();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}