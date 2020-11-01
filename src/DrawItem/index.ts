import {GLInfo} from "../..";
import {
  ProgramInfo,
  BufferInfo,
  setBuffersAndAttributes,
  createBufferInfoFromArrays,
  resizeCanvasToDisplaySize,
  setUniforms, drawBufferInfo
} from "twgl.js";

export interface Buffers {[id: string]: number[][]}
export interface Uniforms {[id: string]: any}

/**
 * An isolated item to draw onto a canvas element.
 */
export class DrawItem {
  /**
   * GLInfo to be used when drawing.
   * @private
   */
  private _glInfo: GLInfo;
  /**
   * Update the WebGL context used.
   * @param context The new context to use.
   */
  set glContext(context: WebGLRenderingContext) {
    this._glInfo.gl = context;
  }
  /**
   * Update the program info used.
   * @param programInfo The new program info to use.
   */
  set programInfo(programInfo: ProgramInfo) {
    this._glInfo.programInfo = programInfo;
  }
  /**
   * Update the GLInfo used.
   * @param glInfo
   */
  set glInfo(glInfo: GLInfo) {
    this._glInfo = glInfo;
  }

  /**
   * Data to map to attributes at draw time.
   * @private
   */
  private bufferInfo: BufferInfo;
  /**
   * Append data to a buffer.
   * @param id The ID of the array to append data to.
   * @param data The data to append.
   * @see {@link setBufferArray} - set/replace data instead of appending data.
   * @throws ReferenceError, TypeError
   */
  addBufferArray(id: string, data: number[][]): void {
    if (!this.bufferInfo.attribs?.[id]) throw ReferenceError(`No buffer array with id "${id}"`);

    const numComponents = this.bufferInfo.attribs[id].numComponents;
    DrawItem.checkBufferArray(data, numComponents);
    this.bufferInfo = createBufferInfoFromArrays(this._glInfo.gl, {
      [id]: {
        numComponents,
        data: [
          ...(this.bufferInfo.attribs.id.value as number[]),
          ...data.flat()
        ]
      }
    }, this.bufferInfo);
  }
  /**
   * Set/replace the data in a buffer.
   * @param id - The ID of the array to set.
   * @param data - The data to set in the array.
   * @see {@link addBufferArray} - append data instead of setting/replacing data.
   */
  setBufferArray(id: string, data: number[][]): void {
    DrawItem.checkBufferArray(data);
    this.bufferInfo = createBufferInfoFromArrays(this._glInfo.gl, {
      [id]: {
        numComponents: data[0].length || 0,
        data: data.flat()
      }
    }, this.bufferInfo);
  }
  /**
   * Set/replace the entire {@link bufferInfo} object.
   * @param buffers The new buffers. Leave blank or set equal to an empty Object to set buffers to empty.
   */
  setBuffers(buffers?: Buffers) {
    this.bufferInfo = buffers && JSON.stringify(buffers) !== "{}" ? this.checkBuffers(buffers) : {numElements: 0};
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
   * @param uniforms The new uniforms. Leave blank to set uniforms to empty.
   */
  setUniforms(uniforms?: Uniforms) {
    this.uniforms = uniforms || {};
  }


  /**
   * @param glInfo Data to be used when drawing.
   * @param buffers Initial data to use in buffers.
   * @param uniforms Initial data to use for uniforms.
   */
  constructor(glInfo: GLInfo, buffers?: Buffers, uniforms: Uniforms = {}) {
    this._glInfo = glInfo;
    this.bufferInfo = buffers ? this.checkBuffers(buffers) : {numElements: 0};
    this.uniforms = uniforms;
  }

  /**
   * Draw using the stored data.
   */
  draw(mode?: GLenum): void {
    const buffersEmpty = this.bufferInfo.numElements === 0;
    const uniformsEmpty = JSON.stringify(this.uniforms) === "{}";

    if (buffersEmpty && uniformsEmpty) {
      console.warn("DrawItem.draw() called without any draw data");
      return;
    }

    resizeCanvasToDisplaySize(this._glInfo.gl.canvas as HTMLCanvasElement, window.devicePixelRatio);
    this._glInfo.gl.viewport(0, 0, this._glInfo.gl.canvas.width, this._glInfo.gl.canvas.height);

    if (!buffersEmpty) setBuffersAndAttributes(this._glInfo.gl, this._glInfo.programInfo, this.bufferInfo);
    if (!uniformsEmpty) setUniforms(this._glInfo.programInfo, this.uniforms);

    drawBufferInfo(this._glInfo.gl, this.bufferInfo, mode);
  }

  /**
   * Helper method to check if the content of buffers are valid. If they are, it converts to BufferInfo and returns the result.
   * @param data The data to be checked.
   * @throws TypeError
   * @private
   */
  private checkBuffers(data: Buffers): BufferInfo {
    return createBufferInfoFromArrays(this._glInfo.gl, Object.fromEntries(Object.entries(data).map(([id, bufferArray]) => {
      DrawItem.checkBufferArray(bufferArray);
      return [id, {
        numComponents: bufferArray[0]?.length || 0,
        data: bufferArray.flat()
      }];
    })));
  }
  /**
   * Static sub-method of {@link checkBuffers} that can also be used on it's own. Runs asynchronously so that it doesn't block the main thread.
   * @param data The array to validate.
   * @param length The length arrays should be. If omitted, checks against {@code bufferArray[0].length}.
   * @throws TypeError
   */
  private static checkBufferArray(data: number[][], length?: number): void {
    if (!data.every((v, _, a) => v.length === (length || a[0].length))) {
      throw TypeError("Buffer array must contain arrays that are all the same length");
    }
  }
}
