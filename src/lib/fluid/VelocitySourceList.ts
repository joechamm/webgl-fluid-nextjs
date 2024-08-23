import { vec2 } from 'gl-matrix';
import { VelocitySource } from './VelocitySource';

export type VelocitySourceList = {
  maxSources: number;
  sources: VelocitySource[];
};

// Creates a new list of velocity sources with the given maximum number of sources
export function createVelocitySourceList(maxSources: number): VelocitySourceList {
  return { maxSources, sources: [] };
}

// Adds a new velocity source to the list of velocity sources
export function addVelocitySource(sources: VelocitySourceList, source: VelocitySource) {
  if (sources.sources.length < sources.maxSources) {
    sources.sources.push(source);
  }
}

// Removes the velocity source at the given index from the list of velocity sources
export function removeVelocitySource(sources: VelocitySourceList, index: number) {
  sources.sources.splice(index, 1);
}

// Clears all velocity sources from the list of velocity sources
export function clearVelocitySourceList(sources: VelocitySourceList) {
  sources.sources = [];
}

// Returns the number of velocity sources in the list of velocity sources
export function getVelocitySourceCount(sources: VelocitySourceList): number {
  return sources.sources.length;
}

// Returns the velocity source at the given index in the list of velocity sources
export function getVelocitySource(sources: VelocitySourceList, index: number): VelocitySource {
  return sources.sources[index];
}

// Returns the list of velocity sources
export function getVelocitySourceList(sources: VelocitySourceList): VelocitySource[] {
  return sources.sources;
}

// Returns the maximum number of velocity sources
export function getVelocitySourceListMaxSources(sources: VelocitySourceList): number {
  return sources.maxSources;
}

// Creates a new velocity source at the given position with the given velocity and radius
export function createVelocitySource(position: vec2, velocity: vec2, radius: number): VelocitySource {
  return { position, velocity, radius };
}

// Returns the velocity source at the given index in the list of velocity sources
export function getVelocitySourceAtIndex(sources: VelocitySourceList, index: number): VelocitySource {
  return sources.sources[index];
}

// Returns the list of velocity sources
export function getVelocitySourceListList(sources: VelocitySourceList): VelocitySource[] {
  return sources.sources;
}

// Returns the maximum number of velocity sources
export function getVelocitySourceListMax(sources: VelocitySourceList): number {
  return sources.maxSources;
}

// Returns the number of velocity sources in the list of velocity sources
export function getVelocitySourceListCount(sources: VelocitySourceList): number {
  return sources.sources.length;
}

// Adds a new velocity source to the list of velocity sources
export function addVelocitySourceToList(sources: VelocitySourceList, source: VelocitySource) {
  if (sources.sources.length < sources.maxSources) {
    sources.sources.push(source);
  }
}

// Removes the velocity source at the given index from the list of velocity sources
export function removeVelocitySourceFromList(sources: VelocitySourceList, index: number) {
  sources.sources.splice(index, 1);
}

// Clears all velocity sources from the list of velocity sources
export function clearVelocitySourceListList(sources: VelocitySourceList) {
  sources.sources = [];
}

// Creates a new velocity source at the given position with the given velocity and radius
export function createVelocitySourceAt(position: vec2, velocity: vec2, radius: number): VelocitySource {
  return { position, velocity, radius };
}

// Returns the velocity source at the given index in the list of velocity sources
export function getVelocitySourceFromList(sources: VelocitySourceList, index: number): VelocitySource {
  return sources.sources[index];
}

// Removes all sources within the given radius of the given position from the list of velocity sources
export function removeSourcesInRadius(sources: VelocitySourceList, position: vec2, radius: number) {
  sources.sources = sources.sources.filter((source) => vec2.distance(source.position, position) > radius);
}