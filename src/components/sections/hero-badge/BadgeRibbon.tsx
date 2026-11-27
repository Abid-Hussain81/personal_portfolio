import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState, type RefObject } from "react";
import { BufferGeometry, CanvasTexture, CatmullRomCurve3, DoubleSide, Quaternion, RepeatWrapping, SRGBColorSpace, Vector3 } from "three";

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

export function BadgeRibbon({ points, attachment }: { points: RefObject<RapierRigidBody | null>[]; attachment: number }) {
  const geometry = useRef<BufferGeometry>(null);
  const lastTwist = useRef(0);
  const [positions] = useState(() => new Float32Array((segments + 1) * 12));
  const [weave] = useState(weaveTexture);
  const curve = useRef(new CatmullRomCurve3(points.map(() => new Vector3())));
  const scratch = useRef({
    center: new Vector3(), tangent: new Vector3(), width: new Vector3(), thickness: new Vector3(),
    attachingRight: new Vector3(), rotation: new Quaternion(),
  });
  useEffect(() => () => weave.dispose(), [weave]);

  useFrame(() => {
    const mesh = geometry.current;
    const badge = points[points.length - 1].current;
    if (!mesh || !badge) return;
    const { center, tangent, width, thickness, attachingRight, rotation } = scratch.current;
    const q = badge.rotation();
    rotation.set(q.x, q.y, q.z, q.w);
    attachingRight.set(1, 0, 0).applyQuaternion(rotation);
    const wrappedTwist = Math.atan2(-attachingRight.z, attachingRight.x) - lastTwist.current;
    lastTwist.current += Math.atan2(Math.sin(wrappedTwist), Math.cos(wrappedTwist));

    points.forEach((point, index) => {
      const body = point.current;
      if (!body) return;
      const p = body.translation();
      const sample = curve.current.points[index];
      if (body === badge) sample.set(0, attachment, 0).applyQuaternion(rotation).add(p);
      else sample.set(p.x, p.y, p.z);
    });

    for (let segment = 0; segment <= segments; segment++) {
      const t = segment / segments;
      curve.current.getPoint(t, center);
      curve.current.getTangent(t, tangent);
      const angle = lastTwist.current * t;
      width.set(Math.cos(angle), 0, -Math.sin(angle));
      width.addScaledVector(tangent, -width.dot(tangent)).normalize();
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
