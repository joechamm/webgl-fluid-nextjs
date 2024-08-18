export type WebGL2Shader = {
  gl: WebGL2RenderingContext;
  type: GLenum;
  source: string;
  shader: WebGLShader;
};

export type WebGL2Program = {
  gl: WebGL2RenderingContext;
  vertexShader: WebGL2Shader;
  fragmentShader: WebGL2Shader;
  program: WebGLProgram;
};

export function createWebGL2Shader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGL2Shader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('Failed to create shader');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const infoLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Failed to compile shader: ${infoLog}`);
  }

  return { gl, type, source, shader };
}

export function deleteWebGL2Shader(shader: WebGL2Shader): void {
  shader.gl.deleteShader(shader.shader);
}

export function createWebGL2Program(gl: WebGL2RenderingContext, vertexShader: WebGL2Shader, fragmentShader: WebGL2Shader): WebGL2Program {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('Failed to create program');
  }

  gl.attachShader(program, vertexShader.shader);
  gl.attachShader(program, fragmentShader.shader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const infoLog = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Failed to link program: ${infoLog}`);
  }

  return { gl, vertexShader, fragmentShader, program };
}