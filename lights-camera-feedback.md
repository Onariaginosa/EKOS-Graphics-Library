

## EKOS!

##### https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos

| Category | Feedback | Points |
| --- | --- | ---: |
| | **Normal vectors** | |
| • Computation | Normal vectors appear to be computed correctly | 10/10 |
| • Faceted and smooth looks | Faceted vs. smooth vectors appear to be computed correctly | 5/5 |
| • Storage | Normals are appropriately stored within 3D objects | 9/(9\|5) |
| • GLSL | Normal vectors are passed into GLSL correctly | 6/(6\|3) |
| | **Lighting** | |
| • Modeling | Light is modeled sufficiently well in the scene | 10/10 |
| • GLSL | Light information is passed as an attribute variable and not uniform—this is quite inefficient, because there is no reason to have one light position per vertex (that would break some laws of physics haha 🤓). A uniform variable will do the trick…and use muuuuuuch fewer resources (–2) | 8/10 |
| • Computation | Lighting calculations are mostly correct except they don’t use the instance transform (`objectMatrix`) on the vertex position. That means lighting is always calculated on objects in their “untransformed” state—i.e., the object is lit as if there were no repositioning, no rotation, and no scaling. This results in occasional unintuitive lighting effects, like objects appearing to be lit from different directions (–2)<br><br>The instance transform _is_ correctly applied to the normal vector (since those should get transformed too), but normal vectors shouldn’t move—translations should be eliminated by making their fourth vector coefficient 0.0 rather than 1.0 (–1) | 17/20 |
| | **Camera** | |
| • Look-at | The look-at matrix is computed correctly | 10/10 |
| • Modeling | The camera object is well-modeled by the library | 7/7 |
| • Shader | The camera matrix is successfully passed into and used by the shader code | 3/3 |
| | **Usage in Scene** | |
| | The included scene uses the latest features—though `SnowBox` has  a typo, setting the diffuse light’s `positon` rather than `position`—no wonder that light never changes 😅 (–1) | 9/10 |
| | **Per-vertex coloring** | |
| • Storage | n/a |  |
| • GLSL | n/a |  |
| Texture mapping (if any) |  |  |
| Code maintainability | No major code maintainability issues seen |  |
| Code readability | No major code readability issues seen |  |
| Version control | Good version control habits in evidence during this phase |  |
| Punctuality | Last commit before the extended due date is 4/25 3:37pm<br /><br /> **Graded commit:** https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos/tree/0c103e64d1d300c1bbddbfa8d8fadf6a3f33fe87 |  |
| | **Total** | **94/100** |

Only five-member groups had to implement vertex coloring, totaling 7 points (4 + 3). To keep totals the same, these groups get 8 points total for normal vector storage and passing into GLSL rather than 15.
