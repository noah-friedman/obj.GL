import {Shape} from ".";
import {GLInfo} from "../..";
jest.mock("twgl.js");

describe("the checkPositionArray method", () => {
  let shape: Shape;
  beforeEach(() => {
    shape = new Shape({} as GLInfo, [[0, 0], [0, 0], [0, 0]]);
  });

  it("should not throw an error when given valid data", () => {
    expect(() => shape.setPositionArray([[0, 0], [0, 0], [0, 0]])).not.toThrowError();
  });
  it("should throw an error when given invalid data", () => {
    expect(() => shape.setPositionArray([[0, 0]])).toThrowError();
    expect(() => shape.setPositionArray(([[0, 0, 0], [0, 0, 0], [0, 0, 0]] as unknown as [number, number][]))).toThrowError();
  });
});
