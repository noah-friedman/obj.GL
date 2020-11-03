import {Shape} from ".";
import {GLInfo} from "../..";
jest.mock("twgl.js");
jest.mock("../DrawItem");

describe("the position warnings", () => {
  const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
  const data: [number, number][] = [[0, -1], [-1, 1], [1, 1]];

  let shape: Shape;
  beforeEach(() => {
    shape = new Shape({} as GLInfo, data);
  });

  test("that no warning is logged when the setPosition method is called", () => {
    shape.setPositionArray(data);
    expect(spy).not.toHaveBeenCalled();
  });
  test.each([
    "addDataToBufferArray",
    "setBufferArray"
  ])("that a warning is logged when the %s method is used to update the position array", (method) => {
    (shape as unknown as {[key: string]: (id: string, data: [number, number][]) => void})[method]("a_position", data);
    expect(spy).toHaveBeenCalled();
  });
});
