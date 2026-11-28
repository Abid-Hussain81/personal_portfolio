import { Box3, DoubleSide, Float32BufferAttribute, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Quaternion, Vector3, type BufferAttribute, type InterleavedBufferAttribute, type Object3D, type Texture } from "three";

const up = new Vector3(0, 1, 0);

export function prepareDevice(source: Object3D, phone: boolean) {
  const object = source.clone();
  object.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(object, true);
  const screen = object.getObjectByName("screen");
  if (!(screen instanceof Mesh)) throw new Error("Missing display mesh in the experience device.");

  // The exported apertures have no UV attribute. Keep their triangles, including
  // the handset's rounded corners and camera cutout, and derive UVs in local space.
  const geometry = screen.geometry.clone();
  geometry.computeBoundingBox();
  const aperture = geometry.boundingBox;
  if (!aperture) throw new Error("Missing experience display bounds.");
  const positions = geometry.getAttribute("position");
  const vertical = phone ? "y" : "z";
  const width = aperture.max.x - aperture.min.x;
  const height = aperture.max[vertical] - aperture.min[vertical];
  const uv = new Float32BufferAttribute(new Float32Array(positions.count * 2), 2);
  for (let i = 0; i < positions.count; i++) {
    const y = phone ? positions.getY(i) : positions.getZ(i);
    uv.setXY(i, (positions.getX(i) - aperture.min.x) / width, (y - aperture.min[vertical]) / height);
  }
  geometry.setAttribute("uv", uv);
  screen.geometry = geometry;
  const scale = screen.getWorldScale(new Vector3());
  const display = new MeshBasicMaterial({ color: "#ffffff", toneMapped: false, side: DoubleSide });
  screen.material = display;

  const finish = object.getObjectByName(phone ? "body" : "lid_shell");
  let satin: MeshStandardMaterial | undefined;
  if (finish instanceof Mesh && finish.material instanceof MeshStandardMaterial) {
    satin = finish.material.clone();
    satin.color.set(phone ? "#bfc1c2" : "#373b3b");
    satin.metalness = phone ? .61 : .17;
    satin.roughness = phone ? .55 : .66;
    satin.roughnessMap = null;
    finish.material = satin;
  }

  const parts: { positions: BufferAttribute | InterleavedBufferAttribute; transform: Matrix4 }[] = [];
  object.traverse(node => {
    if (node instanceof Mesh) parts.push({ positions: node.geometry.getAttribute("position"), transform: node.matrixWorld.clone() });
  });

  return {
    object,
    parts,
    ground: bounds.min.y,
    aspect: width * scale.x / (height * scale[vertical]),
    setDisplay(texture: Texture) {
      if (!display.map) display.needsUpdate = true;
      display.map = texture;
    },
    dispose() {
      geometry.dispose();
      display.dispose();
      satin?.dispose();
    },
  };
}

type PositionedDevice = {
  device: ReturnType<typeof prepareDevice>;
  position: Vector3;
  rotation: Quaternion;
  scale: number;
};

const composition = {
  wide: { eye: [-.068, .188, .94], phone: [.185, .133], phoneScale: 1.03, fill: .865 },
  compact: { eye: [-.045, .159, .94], phone: [.174, .146], phoneScale: .96, fill: .865 },
} as const;

function extendProjectedBounds(bounds: Box3, pose: PositionedDevice, view: Matrix4) {
  const transform = new Matrix4().compose(pose.position, pose.rotation, new Vector3().setScalar(pose.scale));
  const matrix = new Matrix4();
  const point = new Vector3();
  for (const part of pose.device.parts) {
    matrix.multiplyMatrices(view, transform).multiply(part.transform);
    const { positions } = part;
    for (let i = 0; i < positions.count; i++) {
      point.set(positions.getX(i), positions.getY(i), positions.getZ(i)).applyMatrix4(matrix);
      bounds.expandByPoint(point);
    }
  }
}

export function frameDevices(laptop: ReturnType<typeof prepareDevice>, phone: ReturnType<typeof prepareDevice>, compact: boolean) {
  const design = composition[compact ? "compact" : "wide"];
  const eye = new Vector3(...design.eye);
  const cameraRotation = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(eye, new Vector3(), up));
  const laptopPose = { device: laptop, position: new Vector3(0, -laptop.ground, 0), rotation: new Quaternion(), scale: 1 };
  const phonePose = {
    device: phone,
    position: new Vector3(design.phone[0], -phone.ground * design.phoneScale, design.phone[1]),
    rotation: new Quaternion().setFromAxisAngle(up, -.07),
    scale: design.phoneScale,
  };

  const view = new Matrix4().makeRotationFromQuaternion(cameraRotation.clone().invert());
  const bounds = new Box3();
  extendProjectedBounds(bounds, laptopPose, view);
  extendProjectedBounds(bounds, phonePose, view);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3()).applyQuaternion(cameraRotation);
  return {
    laptopPose,
    phonePose,
    cameraRotation,
    cameraPosition: center.clone().add(eye),
    center,
    offset: center.clone().negate(),
    width: size.x / design.fill,
    height: size.y / design.fill,
  };
}
