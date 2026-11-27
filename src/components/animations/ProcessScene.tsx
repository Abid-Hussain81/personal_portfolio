"use client";

import { ContactShadows, Environment, Lightformer, OrthographicCamera, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { animate } from "framer-motion";
import { Component, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import {
  Color, CubicBezierCurve3, Euler, MathUtils, Quaternion, Vector3,
  type Group, type Mesh, type MeshBasicMaterial, type MeshPhysicalMaterial, type OrthographicCamera as Camera,
} from "three";
import { processPieces, type PiecePose } from "./process-poses";

function Piece({ step, poses, frosted = false }: { step: number; poses: readonly PiecePose[]; frosted?: boolean }) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshPhysicalMaterial>(null);
  const initial = poses[0];
  const pose = poses[step] ?? initial;
  const target = useMemo(() => ({
    position: new Vector3(...pose.position),
    size: new Vector3(...pose.size),
    rotation: new Quaternion().setFromEuler(new Euler(...pose.rotation)),
    color: new Color(pose.color),
  }), [pose]);

  useFrame(({ invalidate }, delta) => {
    const block = mesh.current;
    const coat = material.current;
    if (!block || !coat) return;
    const amount = 1 - Math.exp(-6.5 * Math.min(delta, 0.05));
    block.position.lerp(target.position, amount);
    block.scale.lerp(target.size, amount);
    block.quaternion.slerp(target.rotation, amount);
    coat.color.lerp(target.color, amount);

    const busy = block.position.distanceToSquared(target.position) > 0.00001 ||
      block.scale.distanceToSquared(target.size) > 0.00001 ||
      block.quaternion.angleTo(target.rotation) > 0.003 ||
      Math.max(
        Math.abs(coat.color.r - target.color.r),
        Math.abs(coat.color.g - target.color.g),
        Math.abs(coat.color.b - target.color.b),
      ) > 0.002;
    if (busy) invalidate();
  });

  return (
    <RoundedBox ref={mesh} args={[1, 1, 1]} radius={0.07} smoothness={5}
      position={initial.position} rotation={initial.rotation} scale={initial.size}>
      <meshPhysicalMaterial
        ref={material}
        color={initial.color}
        roughness={frosted ? 0.44 : 0.63}
        clearcoat={frosted ? 0.45 : 0.18}
        clearcoatRoughness={0.38}
        transmission={frosted ? 0.08 : 0}
        thickness={0.18}
      />
    </RoundedBox>
  );
}

function DataFlow({ active }: { active: boolean }) {
  const tube = useRef<MeshBasicMaterial>(null);
  const halo = useRef<MeshBasicMaterial>(null);
  const particles = useRef<Group>(null);
  const progress = useRef(0);
  const curve = useMemo(() => new CubicBezierCurve3(
    new Vector3(-0.62, -0.25, 0.31),
    new Vector3(-0.12, -0.74, 1.12),
    new Vector3(0.10, 0.69, 0.88),
    new Vector3(0.62, 0.23, 0.31),
  ), []);

  useFrame(({ invalidate }, delta) => {
    if (!tube.current || !halo.current || !particles.current) return;
    const time = Math.min(delta, 0.05);
    const opacity = MathUtils.damp(tube.current.opacity, active ? 0.9 : 0, 8, time);
    tube.current.opacity = opacity;
    halo.current.opacity = opacity * 0.23;
    particles.current.visible = opacity > 0.01;
    if (particles.current.visible) {
      progress.current = (progress.current + time * 0.52) % 1;
      particles.current.children.forEach((dot, index) => {
        const along = (progress.current + index / 3) % 1;
        curve.getPointAt(along, dot.position);
        dot.scale.setScalar(Math.sin(Math.PI * along) * 0.68 + 0.32);
        (dot as Mesh<never, MeshBasicMaterial>).material.opacity = opacity;
      });
    }
    if (active || opacity > 0.003) invalidate();
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 40, 0.038, 8, false]} />
        <meshBasicMaterial ref={tube} transparent opacity={0} color="#709c8a" depthWrite={false} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 40, 0.091, 8, false]} />
        <meshBasicMaterial ref={halo} transparent opacity={0} color="#9fd8b6" depthWrite={false} />
      </mesh>
      <group ref={particles} visible={false}>
        {[0, 1, 2].map(index => (
          <mesh key={index}>
            <sphereGeometry args={[0.076, 12, 12]} />
            <meshBasicMaterial transparent opacity={0} color="#edfff4" depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function HandoverSeal({ active }: { active: boolean }) {
  const seal = useRef<Group>(null);
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => {
    const group = seal.current;
    if (!group) return;
    const spring = animate(group.scale.x, active ? 1 : 0.001, {
      type: "spring", stiffness: 175, damping: 15,
      onUpdate: size => {
        const scale = Math.max(0.001, size);
        group.scale.setScalar(scale);
        group.position.y = -0.67 - (1 - scale) * 0.18;
        invalidate();
      },
    });
    return () => spring.stop();
  }, [active, invalidate]);

  return (
    <group ref={seal} position={[1.23, -0.67, 0.42]} rotation={[0, 0, 0.08]} scale={0.001}>
      <mesh rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.43, 0.43, 0.14, 32]} />
        <meshPhysicalMaterial color="#6f9380" roughness={0.28} clearcoat={0.65} />
      </mesh>
      <RoundedBox args={[0.085, 0.22, 0.038]} radius={0.018} position={[-0.105, -0.039, 0.082]} rotation-z={0.77}>
        <meshBasicMaterial color="#fff7e9" />
      </RoundedBox>
      <RoundedBox args={[0.085, 0.34, 0.038]} radius={0.018} position={[0.075, 0.027, 0.082]} rotation-z={-0.74}>
        <meshBasicMaterial color="#fff7e9" />
      </RoundedBox>
    </group>
  );
}

function StudioCamera() {
  const ref = useRef<Camera>(null);
  const { width, height } = useThree(state => state.size);
  useLayoutEffect(() => ref.current?.lookAt(0, 0.04, 0), []);
  return <OrthographicCamera ref={ref} makeDefault position={[3.65, 2.65, 8.5]} zoom={Math.min(width / 5.7, height / 4.55)} near={0.1} far={30} />;
}

function SceneStatus({ step, onReady, onFailure }: { step: number; onReady: () => void; onFailure: () => void }) {
  const ready = useRef(false);
  const canvas = useThree(state => state.gl.domElement);
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [canvas, onFailure]);
  useEffect(() => invalidate(), [step, invalidate]);
  useFrame(() => {
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function ProcessScene({ step, onReady, onFailure }: { step: number; onReady: () => void; onFailure: () => void }) {
  return (
    <SceneBoundary onFailure={onFailure}>
      <div className="process-stage-canvas">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} frameloop="demand">
          <StudioCamera />
          <SceneStatus step={step} onReady={onReady} onFailure={onFailure} />
          <Environment resolution={128}>
            <Lightformer form="rect" color="#fff4e1" intensity={2.8} position={[0, 4, 2]} rotation-x={Math.PI / 3} scale={[6, 3, 1]} />
            <Lightformer form="rect" color="#fff7ee" intensity={1.8} position={[-4, 1.25, 2.5]} rotation-y={-Math.PI / 3} scale={[3, 4, 1]} />
            <Lightformer form="rect" color="#e2e9f7" intensity={1.6} position={[3, 1.4, -3]} rotation-y={Math.PI / 2} scale={[2, 5, 1]} />
          </Environment>
          <directionalLight position={[3, 4, 5]} intensity={1.22} />
          {Object.entries(processPieces).map(([name, poses]) => (
            <Piece key={name} step={step} poses={poses} frosted={name === "foundation" || name === "secondaryPanel"} />
          ))}
          <DataFlow active={step === 2} />
          <HandoverSeal active={step === 3} />
          <ContactShadows position={[0, -1.62, 0]} color="#796b59" opacity={0.32} scale={7} blur={2.5} far={4} resolution={256} frames={1} />
        </Canvas>
      </div>
    </SceneBoundary>
  );
}
