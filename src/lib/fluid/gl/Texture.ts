// a webgl texture
export type WebGL2Texture = {
  gl: WebGL2RenderingContext;
  texture: WebGLTexture;
  initialized: boolean;
  width: number;
  height: number;
  minFilter: GLenum;
  magFilter: GLenum;
  wrapS: GLenum;
  wrapT: GLenum;
  format: GLenum;
  type: GLenum;
  data: Uint8Array | Float32Array | null;
};

// create a webgl texture
export function createWebGL2Texture(gl: WebGL2RenderingContext, minFilter: GLenum, magFilter: GLenum, wrapS: GLenum, wrapT: GLenum, format: GLenum, type: GLenum): WebGL2Texture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error('Failed to create texture');
  }

  return { gl, texture, initialized: false, width: 0, height: 0, minFilter, magFilter, wrapS, wrapT, format, type, data: null };
}

// delete a webgl texture
export function deleteWebGL2Texture(texture: WebGL2Texture): void {
  texture.gl.deleteTexture(texture.texture);
}

// initialize a webgl texture with an image
export function initWebGL2TextureWithImage(texture: WebGL2Texture, image: HTMLImageElement): Boolean {
  const { gl, minFilter, magFilter, wrapS, wrapT, format, type } = texture;
  try {
    if(texture.initialized) {
      throw new Error('Texture already initialized');
    }
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.initialized = true;
    texture.width = image.width;
    texture.height = image.height;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function numberOfComponentsForFormat(gl: WebGLRenderingContext, format: GLenum): number {
  switch (format) {
    case gl.RGB: return 3;
    case gl.RGBA: return 4;
    case gl.LUMINANCE: return 1;
    case gl.LUMINANCE_ALPHA: return 2;
    case gl.ALPHA: return 1;
    default: return 4;
  }
}

function numberOfBytesForType(gl: WebGLRenderingContext, type: GLenum): number {
  switch (type) {
    case gl.UNSIGNED_BYTE: return 1;
    case gl.UNSIGNED_SHORT: return 2;
    case gl.FLOAT: return 4;
    default: return 4;
  }
}

function numberOfBytesForFormatAndType(gl: WebGLRenderingContext, format: GLenum, type: GLenum): number {
  return numberOfComponentsForFormat(gl, format) * numberOfBytesForType(gl, type);
}

// initialize a webgl texture with a function
export function initWebGL2TextureWithFunction(texture: WebGL2Texture, width: number, height: number, pixVal: (x: number, y: number) => number): Boolean {
  const { gl, minFilter, magFilter, wrapS, wrapT, format, type } = texture;
  try {
    if(texture.initialized) {
      throw new Error('Texture already initialized');
    }
    texture.width = width;
    texture.height = height;
    const numComponents = numberOfComponentsForFormat(gl, format);
    const numBytes = numberOfBytesForFormatAndType(gl, format, type);
    const data = new Uint8Array(width * height * numComponents * numBytes);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * numComponents;
        const value = pixVal(x, y);
        for (let c = 0; c < numComponents; c++) {
          data[i + c] = value;
        }
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.initialized = true;
    texture.data = data;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}