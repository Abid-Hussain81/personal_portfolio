import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState, type RefObject } from "react";
import { BufferGeometry, CanvasTexture, CatmullRomCurve3, DoubleSide, type Group, Quaternion, RepeatWrapping, SRGBColorSpace, Vector3 } from "three";

const segments = 24;
const indices: number[] = [];
for (let segment = 0; segment < segments; segment++) {
  for (let edge = 0; edge < 4; edge++) {
    const start = segment * 4;
    const next = (edge + 1) % 4;
    indices.push(start + edge, start + next, start + edge + 4, start + next, start + next + 4, start + edge + 4);
  }
}
const ribbonIndices = new Uint16Array(indices);
const ribbonUv = new Float32Array((segments + 1) * 8);
for (let segment = 0; segment <= segments; segment++) {
  const length = segment / segments * 5;
  ribbonUv.set([1, length, 0, length, 0, length, 1, length], segment * 8);
}

function weaveTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 48;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#899674";
    ctx.fillRect(0, 0, 64, 48);
    for (let y = 0; y < 48; y += 4) {
      ctx.fillStyle = "#eef1e650";
      ctx.fillRect(0, y, 64, 1);
      ctx.fillStyle = "#2d3b2b55";
      ctx.fillRect(0, y + 2, 64, 1);
      ctx.fillStyle = "#d0d7c2";
      ctx.fillRect(6, y + 1, 2, 2);
      ctx.fillRect(56, y + 1, 2, 2);
    }
    ctx.fillStyle = "#2d3b2b32";
    for (let x = 0; x < 64; x += 3) ctx.fillRect(x, 0, 1, 48);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapT = RepeatWrapping;
  return texture;
}

type RibbonProps = {
  supports: RefObject<RapierRigidBody | null>[];
  badge: RefObject<Group | null>;
  attachment: number;
};

export function BadgeRibbon({ supports, badge, attachment }: RibbonProps) {
  const geometry = useRef<BufferGeometry>(null);
  const lastTwist = useRef(0);
  const [positions] = useState(() => new Float32Array((segments + 1) * 12));
  const [weave] = useState(weaveTexture);
  const [curve] = useState(() => new CatmullRomCurve3(Array.from({ length: supports.length + 2 }, () => new Vector3())));
  const scratch = useRef({
    center: new Vector3(), tangent: new Vector3(), width: new Vector3(), thickness: new Vector3(),
    attachingRight: new Vector3(), rotation: new Quaternion(),
  });
  useEffect(() => () => weave.dispose(), [weave]);

  useFrame(() => {
    const mesh = geometry.current;
    const clasp = badge.current;
    if (!mesh || !clasp) return;
    const { center, tangent, width, thickness, attachingRight, rotation } = scratch.current;
    clasp.getWorldQuaternion(rotation);
    attachingRight.set(1, 0, 0).applyQuaternion(rotation);
    const wrappedTwist = Math.atan2(-attachingRight.z, attachingRight.x) - lastTwist.current;
    lastTwist.current += Math.atan2(Math.sin(wrappedTwist), Math.cos(wrappedTwist));

    supports.forEach((point, index) => {
      const body = point.current;
      if (!body) return;
      const p = body.translation();
      curve.points[index].set(p.x, p.y, p.z);
    });
    // Match the rendered clasp, including interpolation between physics steps.
    // A short guide keeps the ribbon entering the clasp along its local up axis.
    curve.points[supports.length].set(0, attachment + 0.15, 0).applyMatrix4(clasp.matrixWorld);
    curve.points[supports.length + 1].set(0, attachment, 0).applyMatrix4(clasp.matrixWorld);

    for (let segment = 0; segment <= segments; segment++) {
      const t = segment / segments;
      curve.getPoint(t, center);
      curve.getTangent(t, tangent);
      const angle = lastTwist.current * t;
      width.set(Math.cos(angle), 0, -Math.sin(angle));
      width.addScaledVector(tangent, -width.dot(tangent));
      if (width.lengthSq() < 0.0001) {
        width.set(0, 1, 0).addScaledVector(tangent, -tangent.y);
      }
      width.normalize();
      thickness.crossVectors(width, tangent).normalize().multiplyScalar(0.013);
      width.multiplyScalar(0.092);

      for (let corner = 0; corner < 4; corner++) {
        const across = corner === 0 || corner === 3 ? 1 : -1;
        const depth = corner < 2 ? 1 : -1;
        mesh.attributes.position.setXYZ(segment * 4 + corner,
          center.x + across * width.x + depth * thickness.x,
          center.y + across * width.y + depth * thickness.y,
          center.z + across * width.z + depth * thickness.z);
      }
    }
    mesh.attributes.position.needsUpdate = true;
    mesh.computeVertexNormals();
  });

  return (
    <mesh frustumCulled={false}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="index" args={[ribbonIndices, 1]} />
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-uv" args={[ribbonUv, 2]} />
      </bufferGeometry>
      <meshStandardMaterial map={weave} roughness={0.86} metalness={0.02} side={DoubleSide} />
    </mesh>
  );
}
