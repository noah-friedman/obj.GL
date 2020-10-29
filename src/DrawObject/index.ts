import {GLInfo} from "../..";
import {ProgramInfo} from "twgl.js";

export type Buffers = {[id: string]: number[][]};
export type Uniforms = {[id: string]: any};

/**
 * An isolated item to draw onto a canvas element.
 */
export class DrawObject {
  /**
   * WebGL context and program info to be used when drawing.
   * @private
   */
  private glInfo: GLInfo;
  /**
   * Update the WebGL context used.
   * @param context The new context to use.
   */
  set glContext(context: WebGLRenderingContext) {
    this.glInfo.gl = context;
  }
  /**
   * Update the program info used.
   * @param programInfo The new program info to use.
   */
  set programInfo(programInfo: ProgramInfo) {
    this.glInfo.programInfo = programInfo;
  }

  /**
   * Data to map to attributes at draw time.
   * @private
   */
  private buffers: Buffers;
  /**
   * Append data to a buffer.
   * @param id The ID of the array to append data to.
   * @param data The data to append.
   * @see {@link setBufferData} - set/replace data instead of appending data.
   */
  addBufferData(id: string, data: number[][]): void {
    if (!this.buffers[id]) {
      throw new ReferenceError(`No buffer array with id "${id}"`);
    }

    const check = this.buffers[id].concat(...data);
    DrawObject.checkBufferArray(check);
    this.buffers[id] = check;
  }
  /**
   * Set/replace the data in a buffer.
   * @param id - The ID of the array to set.
   * @param data - The data to set in the array.
   * @see {@link addBufferData} - append data instead of setting/replacing data.
   */
  setBufferData(id: string, data: number[][]): void {
    DrawObject.checkBufferArray(data);
    this.buffers[id] = data;
  }

  /**
   * Set/replace the entire {@link buffers} object.
   * @param buffers The new buffers.
   */
  setBuffers(buffers: Buffers) {
    Object.entries(buffers).forEach(([_, bufferArray]) => {
      DrawObject.checkBufferArray(bufferArray);
    });
    this.buffers = buffers;
  }

  /**
   * Data to map to uniforms at draw time.
   * @private
   */
  private uniforms: Uniforms;
  /**
   * Set the data for a uniform.
   * @param id The ID of the uniform to set.
   * @param data The data to set.
   */
  setUniform(id: string, data: any): void {
    this.uniforms[id] = data;
  }
  /**
   * Replace the entire {@link uniforms} object.
   * @param uniforms The new uniforms.
   */
  setUniforms(uniforms: Uniforms) {
    this.uniforms = uniforms;
  }


  /**
   * @param glInfo Data to be used when drawing.
   * @param buffers Initial data to use in buffers.
   * @param uniforms Initial data to use for uniforms.
   */
  constructor(glInfo: GLInfo, buffers: Buffers = {}, uniforms: Uniforms = {}) {
    this.glInfo = glInfo;
    this.buffers = buffers;
    this.uniforms = uniforms;
  }

  /**
   * Helper method to check if the content of a buffer array is valid.
   * @param bufferArray The data to be checked.
   * @private
   */
  private static checkBufferArray(bufferArray: number[][]): void {
    if (!bufferArray.every((v, _, a) => v.length === a[0].length)) {
      throw new TypeError("Buffer array must contain arrays that are all the same length");
    }
  }
}
