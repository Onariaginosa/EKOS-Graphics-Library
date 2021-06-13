

## EKOS!

##### https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos

| Category | Feedback | Points |
| --- | --- | ---: |
| | **4×4 matrix object/library** | |
| • Identity | New matrix defaults to the identity matrix | 2/2 |
| • Multiplication | Matrix multiplication is implemented | 8/8 |
| • Group matrix | Matrix for rotation about an arbitrary axis is implemented correctly | 4 |
| • GLSL conversion | Conversion to column-major 1D Float32 array is implemented | 3/3 |
| • Implementation | The matrix library is implemented well overall, with helper functions where appropriate | 5/5 |
| | **Matrix test suite** | |
| • Identity test | Identity matrix default is explicitly tested | 1/1 |
| • Identity coverage | Identity matrix default is fully covered by tests | 1/1 |
| • Multiplication test | Matrix multiplication function is explicitly tested and multiplication is also used in other tests | 4/4 |
| • Multiplication coverage | Matrix multiplication function is fully covered by tests | 4/4 |
| • Group matrix test | Rotation-about-an-arbitrary-axis matrix function is explicitly tested | 2 |
| • Group matrix coverage | Rotation-about-an-arbitrary-axis matrix function is fully covered by tests | 2 |
| • GLSL conversion test | `getFloat32` is not explicitly tested (–2) | 0/2 |
| • GLSL conversion coverage | Coverage might be possible even without explicit tests (if other tests eventually call `getFloat32`), but none of them do unfortunately 😭 (–1) | 0/1 |
| • _matrix-credits.md_ | _matrix-credits.md_ clearly lists who did what |  |
| | **Matrix use in 3D objects** | |
| • Instance transformation | An instance transform is maintained and used | 10/10 |
| • Parent propagation | Grouped/composite objects propagate their transforms to children | 15/15 |
| • Transform in-place | n/a |  |
| • Implementation | Matrix use by 3D objects is implemented well overall—it’s initially tricky to figure out where they are actually set, but once that is spotted the approach looks sound | 5/5 |
| | **Matrix use in projection** | |
| • Correct usage | (using commit for Assignment 0422)<br><br>Projection matrix is sufficiently configurable and integrated into the scene in its own uniform variable | 10/10 |
| • Implementation | (using commit for Assignment 0422)<br><br>Projection is implemented well—except for its defaults. First, the right/left and top/bottom defaults are switched: right should be greater than left and top should be greater than bottom. Notice that your scene is horizontally and vertically flipped because of this (–1)<br><br>Further, the near default should be positive. Near and far are supposed to be _in front_ of the camera. Negative _near_ happens to work for orthographic projection but that is incidental. It definitely won’t work with perspective projection (–1)<br><br>The math works if the right values override the defaults, so that’s OK; it’s the defaults that are incorrect | 3/5 |
| Extra credit (if any) |  |  |
| Code maintainability | No major code maintainability issues seen |  |
| Code readability | No major code readability issues seen |  |
| Version control | Decent commit count with sufficiently descriptive messages. Still can’t tell if there’s LiveShare happening 🙃 |  |
| Punctuality | Last commit before the due date is 4/5 8:41pm<br /><br /> **Graded commit:** https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos/tree/d8e7017a8e87164dccbe5d4241a37d75db453e76 |  |
| | **Total** | **79/84** |

Only four-member groups will have a group-collaborated matrix, totaling 8 points (4 + 2 + 2). Only five-member groups need to implement vertex transformation in place, also totaling 8 points. Math—it works!

Total now includes projection matrix usage and has been updated to 84. Projection matrix feedback is based on the graded commit for Assignment 0422 (lights/camera).
