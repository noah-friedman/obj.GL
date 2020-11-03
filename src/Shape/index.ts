import {DrawItem, Buffers, Uniforms} from "../DrawItem";
import {GLInfo} from "../..";

/**
 * A class that draws a shape using a triangle strip.
 */
export class Shape extends DrawItem {
  /**
   * The name of the position variable in the vertex shader.
   * @private
   */
  private positionAttribName: string;
  /**
   * Change the name used to configure the position attribute.
   * @param positionAttribName The new position attribute name to use.
   */
  set positionAttributeName(positionAttribName: string) {
    this.positionAttribName = positionAttribName;
  }

  /**
   * @param glInfo Data to be used when drawing.
   * @param positions Positions of the vertices of the shape.
   * @param positionAttribName The name of the position variable.
   * @param buffers Initial data to be used in buffers.
   * @param uniforms Initial data to be used in uniforms.
   * @throws ReferenceError, TypeError
   */
  constructor(glInfo: GLInfo, positions: [number, number][], positionAttribName: string = "a_position", buffers?: Buffers, uniforms?: Uniforms) {

    super(glInfo, {...buffers, [positionAttribName]: Shape.checkPositionArray(positions)}, uniforms);
    this.positionAttribName = positionAttribName;
  }

  /**
   * Append data to a buffer.
   * @param id The ID of the array to append data to.
   * @param data The data to append.
   * @see {@link setBufferArray} - set/replace data instead of appending data.
   * @see {@link setPositionArray} - change the position array data
   * @throws ReferenceError, TypeError
   */
  addDataToBufferArray(id: string, data: number[][]): void {
    if (id === this.positionAttribName) console.warn("shape position was changed through Shape.addDataToBufferArray instead of Shape.setPositionArray, position data may be invalid");
    super.addDataToBufferArray(id, data);
  }
  /**
   * Set/replace the data in a buffer.
   * @param id - The ID of the array to set.
   * @param data - The data to set in the array.
   * @see {@link addDataToBufferArray} - append data instead of setting/replacing data
   * @see {@link setPositionArray} - change the position array data
   * @throws TypeError
   */
  setBufferArray(id: string, data: number[][]): void {
    if (id === this.positionAttribName) console.warn("shape position was changed through Shape.setBufferArray instead of Shape.setPositionArray, position data may be invalid");
    super.setBufferArray(id, data);
  }

  /**
   * Change the position array data.
   * @param data The new position array.
   * @see {@link addDataToBufferArray} - append data to other buffer arrays
   * @see {@link setBufferArray} - set/replace other buffer arrays
   */
  setPositionArray(data: [number, number][]): void {
    super.setBufferArray(this.positionAttribName, Shape.checkPositionArray(data));
  }

  /**
   * Draw using the stored data.
   */
  draw() {
    super.draw(this._glInfo.gl.TRIANGLE_STRIP);
  }

  /**
   * {@link DrawItem.checkBufferArray} extended to ensure the array has a length of at least 3. Each sub-array must have a length of 2. If it passes the validation, it returns the array, sorted.
   * @param data The array to validate.
   * @throws ReferenceError, TypeError
   * @private
   */
  private static checkPositionArray(data: [number, number][]): [number, number][] {
    if (data.length < 3) throw new ReferenceError("Position array must have a length of at least 3. If you'd like to draw a point or a line, use a DrawItem and configure the draw mode in the draw method call.");
    super.checkBufferArray(data, 2);
    return data.sort((a, b) => {
      const zero = a[0] - b[0];
      const one = a[1] - b[1];

      if (one !== 0) return one;
      else return zero;
    });
  }
}
