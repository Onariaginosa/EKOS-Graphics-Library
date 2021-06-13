

## EKOS!

##### https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos

| Category | Feedback | Points |
| --- | --- | ---: |
| Stub web app | Stub web app provides testbed for scene library—lovin’ that cross-promotion! | 5/5 |
| | **Screen construct/framework** | |
| • Setup | Scene code is structured to handle WebGL setup and connection to `canvas` in a reusable manner | 4/4 |
| • Add/remove | `Scene` handles addition and removal | 4/4 |
| • Rendering | Scene code renders to a canvas in a reusable manner | 4/4 |
| • Implementation | Overall things look good—clean separation, clear reusability | 3/3 |
| | **3D object framework** | |
| • Different shapes | 3D object framework accommodates different shapes | 2/2 |
| • Color | 3D object framework stores at least a single color | 2/2 |
| • Groups/composites | 3D object framework includes a proper group/composite construct | 8/8 |
| • Implementation | 3D object framework implementation is generally clear and straightforward | 3/3 |
| | **Polygon mesh data structure** | |
| • Vertices/triangles | Mesh data structure stores vertices and faces (triangles) appropriately. Faces inline vertices directly—might be an issue when computing vertex normals later, but for now it works | 10/10 |
| • Extensibility | Mesh data structure (specifically, `Composite`) is straightforward to extend | 5/5 |
| • Solid vs. wireframe | Mesh data structure produces wireframe and solid renders in a straightforward manner (good idea to cache these from the get-go!) | 5/5 |
| • Implementation | Overall mesh implementation looks clean and straightforward. A fewer layers to get through, but once assimilated it makes sense | 5/5 |
| | **Mesh maker library** | |
| • Sphere | Sphere appears to be implemented correctly | 20* |
| • Regular polygon | n/a |  |
| • _shape-credits.md_ | _shape-credits.md_ clearly lists who did what |  |
| • Implementation | Shape framework is overall implemented consistently and sufficiently well—there’s a slight bit of redundancy in that every shape’s constructor appears to end with the exact same three lines…if all shapes start out this way, some kind of helper might be called for in order to minimize the possibility of errors (–1) | 9/10 |
| Extra credit (if any) |  |  |
| Code maintainability | No major code maintainability issues seen |  |
| Code readability | No major code readability issues seen |  |
| Version control | Decent commit count with sufficiently descriptive messages. Do you use LiveShare? Hard to tell based on the commit messages 😄 |  |
| Punctuality | Last commit before the due date is 4/5 8:41pm<br /><br /> **Graded commit:** https://github.com/lmu-cmsi371-spring2021/hw-our-3d-library-ekos/tree/d8e7017a8e87164dccbe5d4241a37d75db453e76 |  |
| | **Total** | **89/90** |

Sphere score is out of 20 for four-person groups and out of 12 for five-person groups, for whom the remaining 8 points are allocated to the regular polygon.
