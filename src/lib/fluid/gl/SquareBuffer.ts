// a square buffer is a buffer that contains the vertices and texture coordinates of a square
// this is useful for rendering textures to the screen
// it is a simple buffer that is used to render a texture to the screen
export function createSquareBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
  try {
    const vertices = new Float32Array([
      -1.0, -1.0, 
       1.0, -1.0,
       1.0,  1.0, 

       1.0,   1.0, 
      -1.0,   1.0,
      -1.0,  -1.0 
    ]);

    const textureCoordinates = new Float32Array([
        0.0, 0.0, 
        1.0, 0.0, 
        1.0, 1.0, 

        1.0, 1.0, 
        0.0, 1.0, 
        0.0, 0.0 
    ]);

    const buffer = gl.createBuffer();
    if (!buffer) {
        throw new Error('Failed to create buffer');
    }

    const numVertices = 6;
    const positionSize = 2 * Float32Array.BYTES_PER_ELEMENT;
    const textureSize = 2 * Float32Array.BYTES_PER_ELEMENT;
    const stride = positionSize + textureSize;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, (numVertices * stride), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.bufferSubData(gl.ARRAY_BUFFER, positionSize * numVertices, textureCoordinates);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
  } catch (error) {
    console.error(error);
    return null;
  }    
}