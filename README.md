just for study purpose

# SHADOWS

- The canvas need to have the property shadows true
- One or more light need to have the property cast shadow true
- The object (the ball) also need to have the property cast shadow true
- The surface (the floor) need to receive de property receive shadow true

# ENVIRONMENT from drei

- It is whats surround the entire scene

# MESH

- To make metal effect, metalness + roughness should be = 1

# ANIMATION

- gsap doc: https://greensock.com/docs/v3/Eases
- gsap time line: https://greensock.com/docs/v3/GSAP/Timeline

# IMPORT 3D MODEL

- can get some in sketchfab.com
- glTF format is easier

# TEXTURE

- We can render custom textures using the useTexture hook from drei

# COMPRESS 3D MODEL

- https://www.npmjs.com/package/gltf-pipeline
- compress 3d model: gltf-pipeline -i scene.gltf -o model.glb --draco.compressionLevel 10 -d -b
- create a react component from compressed 3d mobel .gbl: gltfjsx model.glb -T --shadows
- When we import some 3D model it can came with any dimensions, so maybe we need to change the scale inside the 3d model component
