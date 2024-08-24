import { FluidApp } from "@/lib/fluid/app";

/**
 * Default CSS dfinition for typescript, 
 * will be overridden with file-specific definitions by rollup
 */

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  var app: FluidApp;
}