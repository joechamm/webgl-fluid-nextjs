import { vec2 } from "gl-matrix";
import { TemperatureSource } from "./TemperatureSouce";

// List of temperature sources
export type TemperatureSourceList = {
  maxSources: number;
  sources: TemperatureSource[];
};

// Creates a new list of temperature sources with the given maximum number of sources
export function createTemperatureSourceList(maxSources: number): TemperatureSourceList {
  return { maxSources, sources: [] };
}

// Adds a new temperature source to the list of temperature sources
export function addTemperatureSource(sources: TemperatureSourceList, source: TemperatureSource) {
  if (sources.sources.length < sources.maxSources) {
    sources.sources.push(source);
  }
}

// Removes the temperature source at the given index from the list of temperature sources
export function removeTemperatureSource(sources: TemperatureSourceList, index: number) {
  sources.sources.splice(index, 1);
}

// Clears all temperature sources from the list of temperature sources
export function clearTemperatureSourceList(sources: TemperatureSourceList) {
  sources.sources = [];
}

// Returns the number of temperature sources in the list of temperature sources
export function getTemperatureSourceCount(sources: TemperatureSourceList): number {
  return sources.sources.length;
}

// Returns the temperature source at the given index in the list of temperature sources
export function getTemperatureSource(sources: TemperatureSourceList, index: number): TemperatureSource {
  return sources.sources[index];
}

// Returns the list of temperature sources
export function getTemperatureSourceList(sources: TemperatureSourceList): TemperatureSource[] {
  return sources.sources;
}

// Returns the maximum number of temperature sources
export function getTemperatureSourceListMaxSources(sources: TemperatureSourceList): number {
  return sources.maxSources;
}