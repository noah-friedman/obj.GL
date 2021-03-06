# CHANGELOG

### 0.1.0
- Add [Shape](https://github.com/noah-friedman/obj.GL/blob/v0.1.0/src/Shape) class
- Add option to choose draw mode in [DrawItem.draw()](https://github.com/noah-friedman/obj.GL/blob/v0.1.0/src/DrawItem/index.ts#L132)

### 0.0.6
- Add [.npmignore](https://github.com/noah-friedman/obj.GL/blob/v0.0.6/.npmignore)
- Reconfigure file structure in published package
- Add call to `gl.viewport` in [DrawItem.draw()](https://github.com/noah-friedman/obj.GL/blob/v0.0.6/src/DrawItem/index.ts#L141) so that canvas resizing actually works properly

### 0.0.5
- Update configuration files
- Move published files to `dist` directory

### 0.0.4
- Change [Buffers](https://github.com/noah-friedman/obj.GL/blob/v0.0.4/src/DrawItem/index.ts#L11) and [Uniforms](https://github.com/noah-friedman/obj.GL/blob/v0.0.4/src/DrawItem/index.ts#L12) from type aliases to interfaces.

### 0.0.3
- Remove unnecessary `postpublish` script
- Change SemVer to force CI to deploy TypeDoc

### 0.0.2
- NPM failed to publish 0.0.1 because it `could not overwrite previously published version`, SemVer changed to fix error

### 0.0.1
- Add [DrawItem](https://github.com/noah-friedman/obj.GL/tree/v0.0.1/src/DrawItem) class
