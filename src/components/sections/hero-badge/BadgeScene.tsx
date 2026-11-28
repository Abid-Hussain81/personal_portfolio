"use client";

import { Environment, Lightformer, OrthographicCamera } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useState } from "react";
import { TextureLoader } from "three";
import { backArtwork, frontArtwork } from "./badge-art";
import { badgeBaseZoom } from "./badge-framing";
import { BadgeRig } from "./BadgeRig";
import type { BadgeProfile } from "./HeroBadge";

type SceneProps = {
  profile: BadgeProfile;
  active: boolean;
  flipped: boolean;
  onFlip: () => void;
  onReady: () => void;
  onFailure: () => void;
};

function BadgeCamera({ onFailure }: Pick<SceneProps, "onFailure">) {
  const { width, height } = useThree(state => state.size);
  const canvas = useThree(state => state.gl.domElement);

  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [canvas, onFailure]);

  return (
    <OrthographicCamera
      makeDefault
      position={[0, 1.65, 10]}
      rotation={[-Math.atan2(1.02, 10), 0, 0]}
      zoom={badgeBaseZoom(width, height)}
      near={0.1}
      far={30}
    />
  );
}

function Studio({ profile, flipped, onFlip, onReady, mobile }: Omit<SceneProps, "active" | "onFailure"> & { mobile: boolean }) {
  const photo = useLoader(TextureLoader, profile.photoUrl);
  const narrow = useThree(state => state.size.width < 420);
  const compact = mobile || narrow;
  const [touch, setTouch] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  const front = useMemo(() => frontArtwork(photo.image, profile, compact), [photo, profile, compact]);
  const back = useMemo(() => backArtwork(profile, touch, compact), [profile, touch, compact]);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(pointer.matches);
    pointer.addEventListener("change", update);
    return () => pointer.removeEventListener("change", update);
  }, []);
  useEffect(() => () => front.dispose(), [front]);
  useEffect(() => () => back.dispose(), [back]);

  return (
    <>
      <Environment resolution={compact ? 64 : 128}>
        <Lightformer form="rect" intensity={2.7} color="#fff4dd" position={[0, 4.2, 1.5]} rotation-x={Math.PI / 2.7} scale={[5.5, 2.6, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#fffaf0" position={[-3.5, 1, 1.8]} rotation-y={-Math.PI / 3} scale={[2.3, 4.4, 1]} />
        <Lightformer form="rect" intensity={2.1} color="#dfe8d6" position={[3.5, 1.1, -1.5]} rotation-y={Math.PI / 2} scale={[1.8, 4.5, 1]} />
      </Environment>
      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} updatePriority={-1}>
        <BadgeRig front={front} back={back} resumeUrl={profile.resumeUrl} compact={compact} flipped={flipped} onFlip={onFlip} onReady={onReady} />
      </Physics>
    </>
  );
}

export default function BadgeScene({ active, onFailure, ...scene }: SceneProps) {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const viewport = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(viewport.matches);
    viewport.addEventListener("change", update);
    return () => viewport.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      className="hero-badge-renderer"
      dpr={mobile ? 1 : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
    >
      <BadgeCamera onFailure={onFailure} />
      <Suspense fallback={null}>
        <Studio {...scene} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
