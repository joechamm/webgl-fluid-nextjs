import { vec4 } from 'gl-matrix';

export type WebGL2Surface = {
  gl: WebGL2RenderingContext;
  width: number;
  height: number;
  texture: WebGLTexture | null;
  framebuffer: WebGLFramebuffer | null;
};

export function createWebGL2Surface(canvas: HTMLCanvasElement, options?: WebGLContextAttributes, surfaceWidth?: number, surfaceHeight?: number): WebGL2Surface | null {
  try {
    if (!canvas) {
      throw new Error('Canvas is required');
    }
    const gl = canvas.getContext('webgl2', options) as WebGL2RenderingContext;
    // If the surface width and height are not provided, use the canvas width and height.
    const width = surfaceWidth ? surfaceWidth : canvas.width;
    const height = surfaceHeight ? surfaceHeight : canvas.height;
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    return { gl, width, height, texture, framebuffer };
  } catch (error) {
    console.error(error);
  }
  return null;
}

export function destroyWebGL2Surface(surface: WebGL2Surface): void {
  if(surface.texture) {
    surface.gl.deleteTexture(surface.texture);
  }
  if(surface.framebuffer) {
    surface.gl.deleteFramebuffer(surface.framebuffer);
  }
}

export function initWebGL2Surface(surface: WebGL2Surface): void {

  try {
    // check to make sure we have a valid context
    if(!surface.gl) {
      throw new Error('WebGL2RenderingContext is required');
    }
    const gl = surface.gl;

    // check if the texture is null, and if so, create a new texture
    if(!surface.texture) {
      const tex = gl.createTexture();
      if(!tex) {
        throw new Error('Failed to create texture');
      }
      surface.texture = tex;
    }

    // check if the framebuffer is null, and if so, create a new framebuffer
    if(!surface.framebuffer) {
      const fb = gl.createFramebuffer();
      if(!fb) {
        throw new Error('Failed to create framebuffer');
      }
      surface.framebuffer = fb;
    }

    // bind the framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, surface.framebuffer);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, surface.texture);

    // set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, surface.width, surface.height, 0, gl.RGBA, gl.FLOAT, null);

    // attach the texture to the framebuffer
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, surface.texture, 0);

    // check if the framebuffer is complete
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error('Framebuffer is incomplete');
    }

    // unbind the framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  } catch (error) {
    console.error(error);
  }
}

// Attach the framebuffer to the WebGL2RenderingContext
export function attachFBOToWebGL2Surface(surface: WebGL2Surface): void {
  try {
    // check to make sure we have a valid context
    if(!surface.gl) {
      throw new Error('WebGL2RenderingContext is required');
    }
    const gl = surface.gl;

    // bind the framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, surface.framebuffer);
    gl.viewport(0, 0, surface.width, surface.height);
  } catch (error) {
    console.error(error);
  }
}

// Attach the texture to the WebGL2RenderingContext
export function attachTexToWebGL2Surface(surface: WebGL2Surface, texUnit: number): void {
  try {
    // check to make sure we have a valid context
    if(!surface.gl) {
      throw new Error('WebGL2RenderingContext is required');
    }
    const gl = surface.gl;

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, surface.texture);
  } catch (error) {
    console.error(error);
  }
}

// clear color data
export function clearWebGL2Surface(surface: WebGL2Surface, clearColor?: vec4 ): void {
  try {
    // check to make sure we have a valid context
    if(!surface.gl) {
      throw new Error('WebGL2RenderingContext is required');
    }
    const gl = surface.gl;

    const color = clearColor ? clearColor : vec4.fromValues(0.0, 0.0, 0.0, 1.0);
    // clear the color buffer
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);

  } catch (error) {
    console.error(error);
  }
}