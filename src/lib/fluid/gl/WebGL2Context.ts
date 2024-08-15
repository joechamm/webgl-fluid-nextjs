

export function createWebGL2Context(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): WebGL2RenderingContext {
    return canvas.getContext('webgl2', options) as WebGL2RenderingContext;
}

