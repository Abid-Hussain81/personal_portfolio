"use client";

import { ContactShadows, Environment, Html, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Box3, MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Quaternion, Vector3, type Group, type Object3D } from "three";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { LaptopMotion } from "./ExperienceLaptop";
import { PortalScreen, WorkspaceDisplay, type ExperienceScene } from "./ExperienceScreens";

const LAPTOP = "/models/experience/tevy-laptop.glb";
const SMARTPHONE = "/models/experience/tevy-smartphone.glb";
const lookAt = new Vector3(0, -.008, 0);
const up = new Vector3(0, 1, 0);
const wideCamera: [number, number, number] = [-.125, .19, .88];
const narrowCamera: [number, number, number] = [-.08, .17, .88];
const shadowScale: [number, number] = [.59, .64];

function softenShadowEdge(group: Group | null) {
  const surface = group?.children[0];
  if (!(surface instanceof Mesh) || !(surface.material instanceof MeshBasicMaterial)) return;
  surface.material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `
      #include <map_fragment>
      #ifdef USE_MAP
        vec2 distanceFromEdge = min(vMapUv, 1.0 - vMapUv);
        diffuseColor.a *= smoothstep(0.02, 0.25, min(distanceFromEdge.x, distanceFromEdge.y));
      #endif
    `);
  };
  surface.material.needsUpdate = true;
}

function FrameCamera() {
  const { width, height } = useThree(state => state.size);
  const compact = width < 445;
  const position = compact ? narrowCamera : wideCamera;
  const orientation = useMemo(() => new Quaternion().setFromRotationMatrix(
    new Matrix4().lookAt(new Vector3(...position), lookAt, up),
  ), [position]);
  const zoom = Math.min(width / (compact ? .407 : .445), height / (compact ? .353 : .328));

  return <OrthographicCamera makeDefault position={position} quaternion={orientation} zoom={zoom} near={.01} far={10} />;
}

// Both assets provide a screen mesh. The laptop uses local XZ, the handset local XY.
function prepareDevice(scene: Object3D, phone: boolean) {
  const object = scene.clone();
  object.updateMatrixWorld(true);
  const center = new Box3().setFromObject(object, true).getCenter(new Vector3());
  const screen = object.getObjectByName("screen");
  if (!(screen instanceof Mesh)) throw new Error("The device asset is missing its screen mesh.");

  screen.geometry.computeBoundingBox();
  const bounds = screen.geometry.boundingBox;
  if (!bounds) throw new Error("The device screen has no geometry bounds.");
  const size = bounds.getSize(new Vector3()).multiply(screen.getWorldScale(new Vector3()));
  const rotation = screen.getWorldQuaternion(new Quaternion());
  if (!phone) rotation.multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2));

  const lid = object.getObjectByName("lid_shell");
  let lidFinish: MeshStandardMaterial | undefined;
  if (lid instanceof Mesh && lid.material instanceof MeshStandardMaterial) {
    // Keep the textured bezel satin while the metal deck picks up the studio reflections.
    lidFinish = lid.material.clone();
    lidFinish.metalness = .34;
    lidFinish.roughness = .57;
    lidFinish.roughnessMap = null;
    lid.material = lidFinish;
  }

  return {
    object,
    lidFinish,
    offset: center.negate(),
    screenPosition: screen.localToWorld(bounds.getCenter(new Vector3())),
    screenRotation: rotation,
    screenWidth: size.x,
    screenHeight: phone ? size.y : size.z,
  };
}

function DisplayDevice({
  url,
  attach,
  children,
}: {
  url: string;
  attach?: (node: HTMLDivElement | null) => void;
  children: ReactNode;
}) {
  const phone = url === SMARTPHONE;
  const { scene } = useLoader(GLTFLoader, url, loader => loader.setMeshoptDecoder(MeshoptDecoder));
  const device = useMemo(() => prepareDevice(scene, phone), [scene, phone]);
  const displayWidth = phone ? 216 : 640;
  const invalidate = useThree(state => state.invalidate);
  const attachProjection = useCallback((node: HTMLDivElement | null) => {
    attach?.(node);
    if (node) invalidate();
  }, [attach, invalidate]);
  useEffect(() => () => device.lidFinish?.dispose(), [device]);

  return (
    <group position={device.offset}>
      <primitive object={device.object} />
      <Html
        ref={attachProjection}
        transform
        distanceFactor={400}
        position={device.screenPosition}
        quaternion={device.screenRotation}
        scale={device.screenWidth / displayWidth * (phone ? .978 : .993)}
        pointerEvents="none"
        wrapperClass={phone ? "workspace-phone-projection" : "workspace-display-projection"}
        zIndexRange={phone ? [5, 4] : [2, 1]}
        className="workspace-device-display"
        style={{
          width: displayWidth,
          height: displayWidth * device.screenHeight / device.screenWidth,
          borderRadius: phone ? 15 : 5,
        }}
      >
        {children}
      </Html>
    </group>
  );
}

function Phone({ compact }: { compact: boolean }) {
  const rig = useRef<Group>(null);
  const invalidate = useThree(state => state.invalidate);
  useFrame((_, delta) => {
    const object = rig.current;
    if (!object || object.position.y >= -.0341) return;
    object.position.y = MathUtils.damp(object.position.y, -.034, 13, Math.min(delta, 1 / 24));
    invalidate();
  }, -1);

  return (
    <group ref={rig} position={[compact ? .137 : .134, -.049, .171]} rotation={[0, -.13, .026]} scale={compact ? .91 : 1}>
      <DisplayDevice url={SMARTPHONE}><PortalScreen mobile /></DisplayDevice>
    </group>
  );
}

function Studio({
  active,
  motion,
  onReady,
}: {
  active: ExperienceScene;
  motion: RefObject<LaptopMotion>;
  onReady: () => void;
}) {
  const rig = useRef<Group>(null);
  const laptop = useRef<Group>(null);
  const display = useRef<HTMLDivElement | null>(null);
  const ready = useRef(false);
  const invalidate = useThree(state => state.invalidate);
  const compact = useThree(state => state.size.width < 445);
  const attachDisplay = useCallback((node: HTMLDivElement | null) => {
    display.current = node;
  }, []);
  const gaply = active === "gaply";
  const independent = active === "independent";
  const laptopX = gaply ? (compact ? -.026 : -.042) : independent ? .014 : 0;
  const laptopAngle = independent ? .09 : gaply ? -.025 : .045;

  useEffect(() => {
    const { setInvalidate } = motion.current;
    setInvalidate(invalidate);
    return () => setInvalidate();
  }, [invalidate, motion]);

  useEffect(() => {
    invalidate();
  }, [active, compact, invalidate]);

  useFrame((_, delta) => {
    if (!rig.current || !laptop.current) return;
    const { x, y } = motion.current;
    const pointer = rig.current.rotation;
    const laptopPose = laptop.current;
    const time = Math.min(delta, 1 / 24);
    const tiltX = MathUtils.degToRad(y * -5);
    const tiltY = MathUtils.degToRad(x * 8);
    pointer.x = MathUtils.damp(pointer.x, tiltX, 14, time);
    pointer.y = MathUtils.damp(pointer.y, tiltY, 14, time);
    laptopPose.position.x = MathUtils.damp(laptopPose.position.x, laptopX, 15, time);
    laptopPose.rotation.y = MathUtils.damp(laptopPose.rotation.y, laptopAngle, 15, time);
    if (
      Math.abs(pointer.x - tiltX) + Math.abs(pointer.y - tiltY) +
      Math.abs(laptopPose.position.x - laptopX) + Math.abs(laptopPose.rotation.y - laptopAngle) > .0002
    ) invalidate();

    if (!ready.current && display.current) {
      // Drei creates a separate DOM root for the textured display.
      if (display.current.parentElement?.style.transform) {
        ready.current = true;
        onReady();
      } else {
        invalidate();
      }
    }
  }, -1);

  return (
    <>
      <group ref={rig}>
        <group ref={laptop}>
          <DisplayDevice url={LAPTOP} attach={attachDisplay}><WorkspaceDisplay active={active} /></DisplayDevice>
        </group>
        {gaply && <Suspense fallback={null}><Phone compact={compact} /></Suspense>}
      </group>
      <ContactShadows
        ref={softenShadowEdge}
        position={[0, -.114, .052]}
        frames={1}
        scale={shadowScale}
        far={.16}
        blur={3.9}
        opacity={.32}
        color="#514b42"
        resolution={256}
      />
    </>
  );
}

function StudioEnvironment() {
  const room = useMemo(() => new RoomEnvironment(), []);
  useEffect(() => () => room.dispose(), [room]);
  return (
    <Environment resolution={128} frames={1} environmentIntensity={.81}>
      <primitive object={room} />
    </Environment>
  );
}

function ContextStatus({ onLost }: { onLost: () => void }) {
  const canvas = useThree(state => state.gl.domElement);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, onLost]);
  return null;
}

export default function ExperienceLaptopScene({
  active,
  motion,
  visible,
}: {
  active: ExperienceScene;
  motion: RefObject<LaptopMotion>;
  visible: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const markLost = useCallback(() => setLost(true), []);
  if (lost) return null;

  return (
    <div className="workspace-laptop-live" data-ready={ready}>
      <Canvas
        orthographic
        frameloop={visible ? "demand" : "never"}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
        fallback={null}
      >
        <FrameCamera />
        <ContextStatus onLost={markLost} />
        <Suspense fallback={null}>
          <StudioEnvironment />
          <hemisphereLight color="#fff9ed" groundColor="#9a9e91" intensity={.95} />
          <directionalLight position={[-2, 3, 4]} color="#fff9ef" intensity={1.8} />
          <Studio active={active} motion={motion} onReady={markReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
