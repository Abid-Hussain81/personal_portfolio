import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { BallCollider, CuboidCollider, RigidBody, useBeforePhysicsStep, useRopeJoint, useSphericalJoint, type RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Euler, MathUtils, Plane, Quaternion, Vector3, type Texture } from "three";
import { faceSize, resumeHitbox } from "./badge-art";
import { BadgeRibbon } from "./BadgeRibbon";

const attachment = 1.68;
const step = 1 / 60;
const ropeLength = 0.38;
const swivelMaterial = { color: "#a59e8c", metalness: 0.9, roughness: 0.33, anisotropy: 0.56 };
type BadgePointer = ThreeEvent<PointerEvent>;
type Press = { id: number; x: number; y: number; resume: boolean };

type Props = {
  front: Texture;
  back: Texture;
  resumeUrl: string;
  touch: boolean;
  flipped: boolean;
  onFlip: () => void;
  onReady: () => void;
};

export function BadgeRig({ front, back, resumeUrl, touch, flipped, onFlip, onReady }: Props) {
  // Rapier's joint hooks accept refs before their bodies mount but declare non-null refs.
  const anchor = useRef<RapierRigidBody>(null!);
  const upper = useRef<RapierRigidBody>(null!);
  const middle = useRef<RapierRigidBody>(null!);
  const swivel = useRef<RapierRigidBody>(null!);
  const badge = useRef<RapierRigidBody>(null!);
  const press = useRef<Press | null>(null);
  const dragging = useRef(false);
  const ready = useRef(false);
  const deviceTilt = useRef({ pitch: 0, yaw: 0 });
  const canvas = useThree(state => state.gl.domElement);
  const drag = useRef({
    plane: new Plane(new Vector3(0, 0, 1), 0),
    point: new Vector3(), offset: new Vector3(), target: new Vector3(),
  });
  const orientation = useRef({ rotation: new Quaternion(), euler: new Euler(), yaw: 0 });

  useRopeJoint(anchor, upper, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(upper, middle, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(middle, swivel, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useSphericalJoint(swivel, badge, [[0, 0, 0], [0, attachment, 0]]);

  useEffect(() => {
    const cancel = () => { press.current = null; dragging.current = false; };
    canvas.addEventListener("pointercancel", cancel);
    canvas.addEventListener("lostpointercapture", cancel);
    window.addEventListener("blur", cancel);
    return () => {
      canvas.removeEventListener("pointercancel", cancel);
      canvas.removeEventListener("lostpointercapture", cancel);
      window.removeEventListener("blur", cancel);
    };
  }, [canvas]);

  useEffect(() => {
    if (!touch) return;
    let zero: { pitch: number; yaw: number } | undefined;
    const orient = ({ beta, gamma }: DeviceOrientationEvent) => {
      if (beta === null || gamma === null) return;
      zero ??= { pitch: beta, yaw: gamma };
      deviceTilt.current.pitch = MathUtils.degToRad(MathUtils.clamp(beta - zero.pitch, -15, 15)) * 0.5;
      deviceTilt.current.yaw = MathUtils.degToRad(MathUtils.clamp(gamma - zero.yaw, -20, 20)) * 0.5;
    };
    window.addEventListener("deviceorientation", orient);
    return () => window.removeEventListener("deviceorientation", orient);
  }, [touch]);

  useBeforePhysicsStep(() => {
    const body = badge.current;
    if (!body) return;
    const pose = orientation.current;
    const q = body.rotation();
    const angular = body.angvel();
    pose.rotation.set(q.x, q.y, q.z, q.w);
    const rotation = pose.euler.setFromQuaternion(pose.rotation, "YXZ");
    const wrappedYaw = rotation.y - pose.yaw;
    pose.yaw += Math.atan2(Math.sin(wrappedYaw), Math.cos(wrappedYaw));
    const yawError = (flipped ? Math.PI : 0) + deviceTilt.current.yaw - pose.yaw;
    body.applyTorqueImpulse({
      x: ((deviceTilt.current.pitch - rotation.x) * 3 - angular.x) * step,
      y: (yawError * 9 - angular.y * 1.1) * step,
      z: (-rotation.z * 2.1 - angular.z * 0.7) * step,
    }, true);

    if (dragging.current) {
      const { target } = drag.current;
      const position = body.translation();
      const velocity = body.linvel();
      body.applyImpulse({
        x: MathUtils.clamp((target.x - position.x) * 27 - velocity.x * 5, -20, 20) * step,
        y: MathUtils.clamp((target.y - position.y) * 27 - velocity.y * 5, -20, 20) * step,
        z: (-position.z * 8 - velocity.z * 4) * step,
      }, true);
    }
  });

  useFrame(() => {
    if (!ready.current && badge.current) {
      ready.current = true;
      onReady();
    }
  });

  const handleDown = (event: BadgePointer) => {
    if (event.button !== 0 || !badge.current) return;
    event.stopPropagation();
    press.current = { id: event.pointerId, x: event.clientX, y: event.clientY, resume: !!event.object.userData.resume };
    if (event.pointerType === "touch") return;
    const pointer = drag.current;
    (event.target as Element).setPointerCapture(event.pointerId);
    const p = badge.current.translation();
    if (event.ray.intersectPlane(pointer.plane, pointer.point)) {
      pointer.offset.set(p.x - pointer.point.x, p.y - pointer.point.y, 0);
    }
  };

  const handleMove = (event: BadgePointer) => {
    const start = press.current;
    if (!start || start.id !== event.pointerId || event.pointerType === "touch") return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) < 7 && !dragging.current) return;
    const pointer = drag.current;
    if (!event.ray.intersectPlane(pointer.plane, pointer.point)) return;
    dragging.current = true;
    pointer.target.copy(pointer.point).add(pointer.offset);
    pointer.target.x = MathUtils.clamp(pointer.target.x, -0.9, 0.9);
    pointer.target.y = MathUtils.clamp(pointer.target.y, -0.45, 1.8);
  };

  const handleUp = (event: BadgePointer) => {
    const start = press.current;
    if (!start || start.id !== event.pointerId) return;
    event.stopPropagation();
    press.current = null;
    const moved = dragging.current;
    dragging.current = false;
    const target = event.target as Element;
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
    const dx = Math.abs(event.clientX - start.x);
    const dy = Math.abs(event.clientY - start.y);
    if (moved || Math.hypot(dx, dy) >= 9) {
      if (moved && dx > 62 && dx > dy * 0.9) onFlip();
      return;
    }
    if (start.resume) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "";
      link.click();
      return;
    }
    onFlip();
  };

  return (
    <>
      <RigidBody ref={anchor} type="fixed" position={[0, 3, 0]} colliders={false} />
      <RigidBody ref={upper} position={[0.07, 2.64, 0]} colliders={false} linearDamping={1.8}>
        <BallCollider args={[0.025]} mass={0.055} collisionGroups={0} />
      </RigidBody>
      <RigidBody ref={middle} position={[0.14, 2.28, 0]} colliders={false} linearDamping={1.8}>
        <BallCollider args={[0.025]} mass={0.055} collisionGroups={0} />
      </RigidBody>
      <RigidBody ref={swivel} position={[0.21, 1.92, 0]} colliders={false} linearDamping={1.8}>
        <BallCollider args={[0.03]} mass={0.07} collisionGroups={0} />
      </RigidBody>
      <RigidBody ref={badge} position={[0.21, 0.24, 0]} rotation={[0.04, -0.2, 0.045]}
        colliders={false} linearDamping={1.55} angularDamping={1.4} canSleep={false}>
        <CuboidCollider args={[1.1, 1.55, 0.04]} mass={0.8} collisionGroups={0} />
        <group onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp}>
          {/* Drei's extrusion extends to 0.16 with this radius. Scale Z to keep the printed faces flush. */}
          <RoundedBox args={[2.2, 3.1, 0.08]} radius={0.12} smoothness={6} scale-z={0.5}>
            <meshPhysicalMaterial color="#f0ebdd" clearcoat={0.8} clearcoatRoughness={0.15} roughness={0.25} metalness={0.05} />
          </RoundedBox>
          <mesh position={[0, 0, 0.041]}>
            <planeGeometry args={[...faceSize]} />
            <meshBasicMaterial map={front} alphaTest={0.5} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, -0.041]} rotation-y={Math.PI}>
            <planeGeometry args={[...faceSize]} />
            <meshBasicMaterial map={back} alphaTest={0.5} toneMapped={false} />
          </mesh>
          <mesh position={[0, resumeHitbox.y, 0.044]} userData={{ resume: true }}>
            <planeGeometry args={[resumeHitbox.width, resumeHitbox.height]} />
            <meshBasicMaterial colorWrite={false} depthWrite={false} />
          </mesh>
          <RoundedBox args={[0.29, 0.27, 0.13]} radius={0.035} position={[0, 1.53, 0]}>
            <meshPhysicalMaterial {...swivelMaterial} />
          </RoundedBox>
          <mesh position={[0, 1.69, 0]}>
            <torusGeometry args={[0.111, 0.025, 12, 28]} />
            <meshPhysicalMaterial {...swivelMaterial} />
          </mesh>
          <RoundedBox args={[0.25, 0.035, 0.024]} radius={0.009} position={[0, 1.52, 0.072]}>
            <meshStandardMaterial color="#c9c2aa" metalness={0.85} roughness={0.4} />
          </RoundedBox>
        </group>
      </RigidBody>
      <BadgeRibbon points={[anchor, upper, middle, badge]} attachment={attachment} />
    </>
  );
}
