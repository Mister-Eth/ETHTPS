A framework for creating instant data animations. This directory contains base types like `point` or `vector2`.

The drawing logic is the following: a component containing a [react-p5](https://www.npmjs.com/package/react-p5) `Sketch` passes its `p5Types` draw object to a `InstantDataPageManager`. The `InstantDataPageManager` class handles page transitions and updates.
