"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { MathUtils, type Group } from "three";

const stageColors = ["#75896a", "#ad7052", "#6f855d", "#527e72"];
const ivory = "#fbf8ee";
const ink = "#384d43";

type Vector = [number, number, number];

function Block({ at, size, color, angle = 0 }: { at: Vector; size: Vector; color: string; angle?: number }) {
  return (
    <mesh position={at} rotation-z={angle}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.62} />
    </mesh>
  );
}

function Interface({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <group>
      <Block at={[0, 0, 0]} size={[wireframe ? 2.8 : 2.65, 1.75, 0.16]} color={ivory} />
      <Block at={[0, 0.68, 0.12]} size={[2.38, 0.16, 0.08]} color={color} />
      {[-1.08, -0.9, -0.72].map(x => (
        <Block key={x} at={[x, 0.68, 0.17]} size={[0.09, 0.06, 0.03]} color={ivory} />
      ))}
      {wireframe ? (
        <>
          <Block at={[-0.65, -0.04, 0.13]} size={[1.05, 0.9, 0.06]} color="#d3ddc9" />
          <Block at={[-0.65, -0.04, 0.17]} size={[0.86, 0.7, 0.04]} color={ivory} />
          {[0.27, 0.06, -0.15, -0.36].map(y => (
            <Block key={y} at={[0.62, y, 0.13]} size={[0.85, 0.065, 0.06]} color={color} />
          ))}
        </>
      ) : (
        <>
          <Block at={[0, 0.29, 0.13]} size={[2.35, 0.27, 0.08]} color="#e5dacb" />
          {[-0.8, 0, 0.8].map(x => (
            <group key={x} position-x={x}>
              <Block at={[0, -0.28, 0.12]} size={[0.69, 0.6, 0.09]} color="#ecdfd1" />
              <Block at={[0, -0.21, 0.18]} size={[0.5, 0.24, 0.04]} color={color} />
              <Block at={[0, -0.44, 0.18]} size={[0.38, 0.05, 0.04]} color={ink} />
            </group>
          ))}
        </>
      )}
    </group>
  );
}

function Connections({ color }: { color: string }) {
  return (
    <group>
      <Block at={[-0.01, 0, 0]} size={[1.95, 0.11, 0.12]} color={color} />
      <Block at={[0.93, 0, 0]} size={[0.11, 1.12, 0.12]} color={color} />
      {[-0.56, 0.56].map(y => (
        <group key={y} position-y={y}>
          <Block at={[1.06, 0, 0]} size={[0.35, 0.11, 0.12]} color={color} />
          <Block at={[1.48, 0, 0]} size={[0.74, 0.44, 0.22]} color={ivory} />
          <Block at={[1.48, 0, 0.15]} size={[0.36, 0.065, 0.07]} color={color} />
        </group>
      ))}
      <group position={[-0.94, 0, 0.08]} scale={0.68}>
        <Interface color={color} wireframe={false} />
      </group>
    </group>
  );
}

function Confirmation({ color }: { color: string }) {
  return (
    <group>
      <group position={[-0.22, 0, 0]}>
        <Block at={[0, 0, 0]} size={[1.72, 2, 0.18]} color={ivory} />
        <Block at={[0, 0.72, 0.13]} size={[1.35, 0.16, 0.08]} color={color} />
        {[0.35, 0.06, -0.23, -0.52].map(y => (
          <Block key={y} at={[-0.15, y, 0.13]} size={[0.98, 0.09, 0.08]} color="#a7b6a6" />
        ))}
      </group>
      <mesh position={[0.95, -0.31, 0.22]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.61, 0.61, 0.24, 24]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <Block at={[0.79, -0.38, 0.38]} size={[0.11, 0.32, 0.08]} color={ivory} angle={0.77} />
      <Block at={[1.02, -0.29, 0.38]} size={[0.11, 0.52, 0.08]} color={ivory} angle={-0.76} />
    </group>
  );
}

function Stage({ step, onReady }: { step: number; onReady: () => void }) {
  const group = useRef<Group>(null);
  const ready = useRef(false);
  const color = stageColors[step] ?? stageColors[0];
  useFrame(({ invalidate }, delta) => {
    const model = group.current;
    if (!model) return;
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    const amount = Math.min(delta, 0.05);
    model.rotation.y = MathUtils.damp(model.rotation.y, -0.4, 7, amount);
    model.position.y = MathUtils.damp(model.position.y, 0, 7, amount);
    if (Math.abs(model.rotation.y + 0.4) > 0.002) invalidate();
  });

  return (
    <group ref={group} position-y={-0.28} rotation={[0.23, -0.8, -0.09]}>
      {step < 2 && <Interface color={color} wireframe={step === 0} />}
      {step === 2 && <Connections color={color} />}
      {step === 3 && <Confirmation color={color} />}
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function ContextMonitor({ onLost }: { onLost: () => void }) {
  const canvas = useThree(state => state.gl.domElement);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, onLost]);
  return null;
}

function Scene({ step }: { step: number }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className={ready ? "process-3d-ready" : undefined}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 6], zoom: 66 }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <ContextMonitor onLost={() => setFailed(true)} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[2, 4, 6]} intensity={2} />
        <directionalLight position={[-4, -2, 1]} intensity={0.7} color="#d5e7d0" />
        <Stage key={step} step={step} onReady={() => setReady(true)} />
      </Canvas>
    </div>
  );
}

export default function ProcessScene({ step }: { step: number }) {
  return (
    <SceneBoundary>
      <Scene step={step} />
    </SceneBoundary>
  );
}
