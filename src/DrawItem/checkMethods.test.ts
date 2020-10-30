import {DrawItem, Buffers} from ".";
import {GLInfo} from "../..";
jest.mock("twgl.js");

describe.each([
  ["checkBuffers", "setBuffers", {
    a_test1: [[0, 1], [1, 2], [2, 3]],
    a_test2: [[-10, -9, -8, -7, -6], [5, 4, 3, 2, 1]],
    a_test3: [[1.11, 1.12, 1.13], [1.21, 1.22, 1.23], [1.31, 1.32, 1.33]]
  }, {
    a_test1: [[0, 1, 2], [3]],
    a_test2: [[-10, -9], [-8, -7], [-6, 5], [4, 3], [2, 1], [0]],
    a_test3: [[1.01, 1.02, 1.03], [1.12, 1.13], [1.21, 1.23], [1.31, 1.32]]
  }],
  ["checkBufferArray", "setBufferArray",
    [[0, 1, 2], [-10, -9, -8], [1.1, 1.2, 1.3]],
    [[0, 1], [-2, -3, -4], [1.5, 1.6, 1.7, 1.8, 1.9]]
  ]
])("the %s method", (_: string, toCall: string, valid: Buffers | number[][], invalid: Buffers | number[][]) => {
  let drawItem: {[key: string]: any};
  beforeEach(() => {
    drawItem = new DrawItem({} as GLInfo) as {[key: string]: any};
  });

  it("should not throw an error when data is valid", () => expect(() => Array.isArray(valid) ? drawItem[toCall]("a_test", valid) : drawItem[toCall](valid)).not.toThrowError());

  it("should not throw an error when data is valid", () => expect(() => Array.isArray(invalid) ? drawItem[toCall]("a_test", invalid) : drawItem[toCall](invalid)).toThrowError("Buffer array must contain arrays that are all the same length"));
});
