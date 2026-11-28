# Experience illustration assets

Both device models are by Tevy and use the [CC0 1.0 Universal license](https://creativecommons.org/publicdomain/zero/1.0/).

- [Tevy Laptop](https://tevy.dev/models/laptop), [v1 LOD0 GLB](https://tevy.dev/models/laptop/v1/lod0.glb), 22,122 triangles.
- [Tevy Smartphone](https://tevy.dev/models/smartphone), [v1 LOD1 GLB](https://tevy.dev/models/smartphone/v1/lod1.glb), 6,038 triangles.

The local GLBs preserve the original mesh geometry, node transforms, and material assignments. The laptop textures were resized to 1024 pixels and the handset textures to 768 pixels. Both use embedded lossless WebP textures instead of a runtime Basis transcoder. The renderer applies a matte graphite finish to the laptop lid and a satin finish to the phone frame.

The two supplied display meshes have no UV coordinates. The renderer derives UVs from the laptop's 296 × 185 mm XZ aperture and the phone's 67.1 × 145.6 mm XY aperture. The meshes retain their original outlines and the phone's camera opening. The 1920 × 1200 and 832 × 1805 sRGB screen textures are generated from sample data at runtime.

The desktop and mobile WebP previews were rendered in Chrome from the same scene and sample interfaces. The courtyard photo is an original ImageGen illustration for the fictional Form & Field website.

## ImageGen prompt

Create one realistic editorial architecture photograph, for the right half of a fictional design studio website hero in a web portfolio. Portrait 4:5 crop. A warm minimal residential courtyard with subtle Mediterranean influence, a single warm travertine arch and plaster wall, a planted olive tree in an understated dark stone pot, from eye level at a slight angle. Quiet late-afternoon directional light from the left, gentle real shadows, restrained warm cream, pale muted olive and terracotta color palette, tactile grain, contemporary architectural magazine photograph. Tight composition legible as a miniature on a laptop display. No text, graphics, frames, watermark, people, flags, branding, or devices.
