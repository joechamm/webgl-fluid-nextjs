import React, { RefObject, useMemo, useState, useLayoutEffect } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  options?: WebGLContextAttributes;
}

const DefaultOptions: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  depth: false,
  premultipliedAlpha: false,
};

export const useWebGL = ({ canvasRef, options }: Props): WebGL2RenderingContext | undefined => {
  const [gl, setGl] = useState<WebGL2RenderingContext | undefined>();

  useLayoutEffect(() => {
    if (canvasRef.current) {
      try {
        const gl = canvasRef.current.getContext("webgl2", options ?? DefaultOptions);
        if (!gl) {
          throw new Error("Failed to get WebGL2 context");
        }
        setGl(gl);
      } catch (error) {
        console.error(error);
      }
    }
  }, [canvasRef, options]);

  const glProxy = useMemo(() => {
    // if(window.location.search.includes('webgl2') || window.location.search.indexOf("proxy") < 0) {
    //   return gl;
    // }
    if(window.location.search.indexOf("proxy") < 0) {
      return gl;
    }
    const proxy = gl ? new Proxy<WebGL2RenderingContext>(gl, {
      get(target, prop) {
        const t = target as any;
        const result = t[prop];
        if (typeof result === "function") {
          const fn = (...params: any[]) => {
            const returnValue = result.apply(t, params);
            console.log(`gl.${String(prop)}(`, params, ') = ', returnValue);
            return returnValue;
          };
          return fn;
        } else {
          console.log(`gl.${String(prop)} = `, result);
          return result;
        }         
      },
    }) : undefined;
  }, [gl]);

  return glProxy;

  // useMemo(() => {
  //   if (canvasRef.current) {
  //     try {
  //       const gl = canvasRef.current.getContext("webgl2", options);
  //       if (!gl) {
  //         throw new Error("Failed to get WebGL2 context");
  //       }
  //       setGl(gl);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [canvasRef, options]);

  // return gl;
};