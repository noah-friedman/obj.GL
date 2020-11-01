import {DrawItem} from "./DrawItem";

/**
 * A class that will only use the TRIANGLE_STRIP draw mode. Buffer arrays must be sorted when passed to an object of this class.
 */
export class Shape extends DrawItem {
  draw() {
    super.draw(this._glInfo.gl.TRIANGLE_STRIP);
  }
}
