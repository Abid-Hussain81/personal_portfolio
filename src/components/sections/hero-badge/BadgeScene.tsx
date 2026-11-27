"use client";

import { ContactShadows, Environment, Lightformer, OrthographicCamera } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useState } from "react";
import { TextureLoader } from "three";
import { backArtwork, frontArtwork } from "./badge-art";
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
      position={[0, 1.85, 10]}
      rotation={[-Math.atan2(1.49, 10), 0, 0]}
      zoom={Math.min(width / 2.83, height / 4.75)}
      near={0.1}
      far={30}
    />
  );
}

function Studio({ profile, flipped, onFlip, onReady }: Omit<SceneProps, "active" | "onFailure">) {
  const photo = useLoader(TextureLoader, profile.photoUrl);
  const [touch, setTouch] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  const front = useMemo(() => frontArtwork(photo.image, profile), [photo, profile]);
  const back = useMemo(() => backArtwork(profile, touch), [profile, touch]);

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
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#fff4dd" position={[0, 4.2, 1.5]} rotation-x={Math.PI / 2.7} scale={[5.5, 2.6, 1]} />
        <Lightformer form="rect" intensity={2} color="#fffaf0" position={[-3.5, 1, 1.8]} rotation-y={-Math.PI / 3} scale={[2.3, 4.4, 1]} />
        <Lightformer form="rect" intensity={2.3} color="#dfe8d6" position={[3.5, 1.1, -1.5]} rotation-y={Math.PI / 2} scale={[1.8, 4.5, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#f7e6d8" position={[1.7, -2.4, 3.5]} rotation-x={-0.35} scale={[3, 1.5, 1]} />
      </Environment>
      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60}>
        <BadgeRig front={front} back={back} resumeUrl={profile.resumeUrl} touch={touch} flipped={flipped} onFlip={onFlip} onReady={onReady} />
      </Physics>
      <ContactShadows position={[0, -2.1, 0]} opacity={0.22} scale={6} blur={2.4} far={4} color="#706859" resolution={256} frames={1} />
    </>
  );
}

export default function BadgeScene({ active, onFailure, ...scene }: SceneProps) {
  return (
    <Canvas
      className="hero-badge-renderer"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <BadgeCamera onFailure={onFailure} />
      <Suspense fallback={null}>
        <Studio {...scene} />
      </Suspense>
    </Canvas>
  );
}
