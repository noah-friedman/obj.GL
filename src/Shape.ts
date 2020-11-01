import {DrawItem, Buffers, Uniforms} from "./DrawItem";
import {GLInfo} from "..";

/**
 * A class that draws a shape using a triangle strip.
 */
export class Shape extends DrawItem {
  private readonly positionAttribName: string;

  /**
   * @param glInfo Data to be used when drawing.
   * @param positions Positions of the vertices of the shape.
   * @param positionAttribName The name of the position variable.
   * @param buffers Initial data to be used in buffers.
   * @param uniforms Initial data to be used in uniforms.
   */
  constructor(glInfo: GLInfo, positions: number[][], positionAttribName: string = "a_position", buffers?: Buffers, uniforms?: Uniforms) {
    super(glInfo, {...buffers, [positionAttribName]: positions}, uniforms);
    this.positionAttribName = positionAttribName;
  }

  /**
   * Append data to a buffer.
   * @param id The ID of the array to append data to.
   * @param data The data to append.
   * @see {@link setBufferArray} - set/replace data instead of appending data.
   * @throws ReferenceError, TypeError
   */
  addDataToBufferArray(id: string, data: number[][]) {
    if (id === this.positionAttribName) console.warn("shape position was changed through Shape.addDataToBufferArray instead of Shape.setPosition, position data may be invalid");
    super.addDataToBufferArray(id, data);
  }
  /**
   * Set/replace the data in a buffer.
   * @param id - The ID of the array to set.
   * @param data - The data to set in the array.
   * @see {@link addDataToBufferArray} - append data instead of setting/replacing data.
   * @throws TypeError
   */
  setBufferArray(id: string, data: number[][]) {
    if (id === this.positionAttribName) console.warn("shape position was changed through Shape.setBufferArray instead of Shape.setPosition, position data may be invalid");
    super.setBufferArray(id, data);
  }

  /**
   * Draw using the stored data.
   */
  draw() {
    super.draw(this._glInfo.gl.TRIANGLE_STRIP);
  }
}
