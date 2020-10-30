import {DrawItem} from ".";
import {GLInfo} from "../..";
import {
  createBufferInfoFromArrays,
  resizeCanvasToDisplaySize,
  drawBufferInfo,
  setBuffersAndAttributes,
  setUniforms
} from "twgl.js";
jest.mock("twgl.js");
(createBufferInfoFromArrays as jest.MockedFunction<typeof createBufferInfoFromArrays>).mockImplementation((_, obj) => ({numElements: Object.keys(obj).length}));

describe("the draw method", () => {
  let drawItem: DrawItem;
  beforeEach(() => {
    drawItem = new DrawItem({gl: {canvas: {} as HTMLCanvasElement}} as GLInfo);
  });

  it("should log a warning when called without draw data", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

    drawItem.draw();

    drawItem.setBuffers({});
    drawItem.setUniforms({});
    drawItem.draw();

    expect(spy).toHaveBeenCalledTimes(2);
  });
  it("should resize the canvas and call drawArrays() if there is any data", () => {
    drawItem.setBuffers({a_test: [[]]});
    drawItem.draw();

    drawItem.setBuffers({});
    drawItem.setUniforms({u_test: ""});
    drawItem.draw();

    drawItem.setBuffers({a_test: [[]]});
    drawItem.draw();

    expect(resizeCanvasToDisplaySize).toHaveBeenCalledTimes(3);
    expect(drawBufferInfo).toHaveBeenCalledTimes(3);
  });
  it("should call twgl.setBuffersAndAttributes() only when buffer data is present", () => {
    drawItem.setUniforms({u_test: ""}); // Add any data to drawItem to avoid logging warning
    drawItem.draw();
    expect(setBuffersAndAttributes).not.toHaveBeenCalled();

    drawItem.setBuffers({"a_test": [[]]});
    drawItem.draw();
    expect(setBuffersAndAttributes).toHaveBeenCalledTimes(1);
  });
  it("should call twgl.setUniforms() only when uniform data is present", () => {
    drawItem.setBuffers({"a_test": [[]]}); // Add any data to drawItem to avoid logging warning
    drawItem.draw();
    expect(setUniforms).not.toHaveBeenCalled();

    drawItem.setUniforms({u_test: ""});
    drawItem.draw();
    expect(setUniforms).toHaveBeenCalledTimes(1);
  });
});
