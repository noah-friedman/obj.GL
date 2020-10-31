import {ProgramInfo, getContext, isWebGL1, createProgramInfo} from "twgl.js";

export interface GLInfo {
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo
}

/**
 * Single function to get a WebGL context and generate a program from shaders. The created program is automatically bound to the WebGL context.
 * @param canvas The canvas to get the WebGL context from.
 * @param vertexShader The source for the vertex shader to be used in the WebGL program.
 * @param fragmentShader The source for the fragment shader to be used in the WebGL program.
 * @param webGl2Required Specify if WebGL2 is required for this program. If a WebGL1 context is received a TypeError will be thrown.
 */
export function getGLInfo(canvas: HTMLCanvasElement, vertexShader: string, fragmentShader: string, webGl2Required?: boolean): GLInfo {
  const gl = getContext(canvas);
  if (webGl2Required && isWebGL1(gl)) {
    throw new TypeError("WebGL2 is required but received a WebGL1 context");
  }
  const programInfo = createProgramInfo(gl, [vertexShader, fragmentShader]);
  gl.useProgram(programInfo.program);
  return {gl, programInfo};
}

export * from "./src/DrawItem";
