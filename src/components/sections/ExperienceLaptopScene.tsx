"use client";

import { ContactShadows, Environment, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { CanvasTexture, LinearFilter, LinearMipmapLinearFilter, MathUtils, Mesh, MeshBasicMaterial, SRGBColorSpace, type Group } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { LaptopMotion } from "./ExperienceLaptop";
import { frameDevices, prepareDevice } from "./ExperienceDeviceModels";
import type { ExperienceScene } from "./ExperienceDisplayConfig";
import { loadScreenAssets, paintExperienceScreen, type ScreenAssets } from "./ExperienceScreenTexture";

const laptopPath = "/models/experience/tevy-laptop.glb";
const smartphonePath = "/models/experience/tevy-smartphone.glb";
const modelPaths = [laptopPath, smartphonePath];
const shadowScale: [number, number] = [.49, .47];

function softenShadowEdge(group: Group | null) {
  const surface = group?.children[0];
  if (!(surface instanceof Mesh) || !(surface.material instanceof MeshBasicMaterial)) return;
  surface.material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `
      #include <map_fragment>
      #ifdef USE_MAP
        vec2 distanceFromEdge = min(vMapUv, 1.0 - vMapUv);
        diffuseColor.a *= smoothstep(0.02, 0.24, min(distanceFromEdge.x, distanceFromEdge.y));
      #endif
    `);
  };
  surface.material.needsUpdate = true;
}

function createTextureCache(assets: ScreenAssets, laptopAspect: number, phoneAspect: number, anisotropy: number) {
  const cache = new Map<ExperienceScene, [CanvasTexture, CanvasTexture]>();

  function texture(active: ExperienceScene, phone: boolean, aspect: number) {
    const map = new CanvasTexture(paintExperienceScreen(active, phone, aspect, assets));
    map.colorSpace = SRGBColorSpace;
    map.minFilter = LinearMipmapLinearFilter;
    map.magFilter = LinearFilter;
    map.anisotropy = anisotropy;
    return map;
  }

  return {
    get(active: ExperienceScene) {
      let pair = cache.get(active);
      if (!pair) {
        pair = [texture(active, false, laptopAspect), texture(active, true, phoneAspect)];
        cache.set(active, pair);
      }
      return pair;
    },
    dispose() {
      for (const pair of cache.values()) for (const map of pair) map.dispose();
      cache.clear();
    },
  };
}

function Studio({ active, assets, motion, onReady }: {
  active: ExperienceScene;
  assets: ScreenAssets;
  motion: RefObject<LaptopMotion>;
  onReady: (scene: ExperienceScene) => void;
}) {
  const [laptopAsset, phoneAsset] = useLoader(GLTFLoader, modelPaths, loader => loader.setMeshoptDecoder(MeshoptDecoder));
  const size = useThree(state => state.size);
  const gl = useThree(state => state.gl);
  const invalidate = useThree(state => state.invalidate);
  const compact = size.width < 440;
  const laptop = useMemo(() => prepareDevice(laptopAsset.scene, false), [laptopAsset.scene]);
  const phone = useMemo(() => prepareDevice(phoneAsset.scene, true), [phoneAsset.scene]);
  const framing = useMemo(() => frameDevices(laptop, phone, compact), [laptop, phone, compact]);
  const anisotropy = Math.max(1, Math.min(8, gl.capabilities.getMaxAnisotropy()));
  const textures = useMemo(() => createTextureCache(assets, laptop.aspect, phone.aspect, anisotropy), [assets, laptop.aspect, phone.aspect, anisotropy]);
  const rig = useRef<Group>(null);
  const drawn = useRef<ExperienceScene | null>(null);

  useLayoutEffect(() => {
    const [desktop, handset] = textures.get(active);
    laptop.setDisplay(desktop);
    phone.setDisplay(handset);
    invalidate();
  }, [active, textures, laptop, phone, invalidate]);

  useEffect(() => () => {
    laptop.dispose();
    phone.dispose();
    textures.dispose();
  }, [laptop, phone, textures]);

  useEffect(() => {
    const { setInvalidate } = motion.current;
    setInvalidate(invalidate);
    return () => setInvalidate();
  }, [invalidate, motion]);

  useFrame((_, delta) => {
    const object = rig.current;
    if (!object) return;
    const { x, y } = motion.current;
    const targetX = y * -.066;
    const targetY = x * .104;
    const time = Math.min(delta, .1);
    object.rotation.x = MathUtils.damp(object.rotation.x, targetX, 14, time);
    object.rotation.y = MathUtils.damp(object.rotation.y, targetY, 14, time);
    if (Math.abs(object.rotation.x - targetX) + Math.abs(object.rotation.y - targetY) > .00015) invalidate();
    if (drawn.current !== active) {
      drawn.current = active;
      onReady(active);
    }
  }, -1);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={framing.cameraPosition}
        quaternion={framing.cameraRotation}
        zoom={Math.min(size.width / framing.width, size.height / framing.height)}
        near={.01}
        far={10}
      />
      <group ref={rig} position={framing.center}>
        <group position={framing.offset}>
          {[framing.laptopPose, framing.phonePose].map(pose => (
            <group key={pose.device.object.uuid} position={pose.position} quaternion={pose.rotation} scale={pose.scale}>
              <primitive object={pose.device.object} />
            </group>
          ))}
          <ContactShadows
            ref={softenShadowEdge}
            position={[.034, -.0015, .023]}
            frames={1}
            scale={shadowScale}
            far={.14}
            blur={4.5}
            opacity={.25}
            color="#514841"
            resolution={256}
          />
        </group>
      </group>
    </>
  );
}

function StudioEnvironment() {
  const room = useMemo(() => new RoomEnvironment(), []);
  useEffect(() => () => room.dispose(), [room]);
  return (
    <Environment resolution={128} frames={1} environmentIntensity={.71}>
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

export default function ExperienceLaptopScene({ active, motion, visible }: {
  active: ExperienceScene;
  motion: RefObject<LaptopMotion>;
  visible: boolean;
}) {
  const [assets, setAssets] = useState<ScreenAssets | null>(null);
  const [ready, setReady] = useState<ExperienceScene | null>(null);
  const [lost, setLost] = useState(false);
  const markLost = useCallback(() => setLost(true), []);
  useEffect(() => {
    let mounted = true;
    loadScreenAssets().then(result => {
      if (mounted) setAssets(result);
    }, () => {
      if (mounted) markLost();
    });
    return () => { mounted = false; };
  }, [markLost]);

  if (lost || !assets) return null;
  return (
    <div className="workspace-laptop-live" data-ready={ready !== null} data-rendered-scene={ready}>
      <Canvas
        orthographic
        frameloop={visible ? "demand" : "never"}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
        fallback={null}
      >
        <ContextStatus onLost={markLost} />
        <Suspense fallback={null}>
          <StudioEnvironment />
          <hemisphereLight color="#fff9ed" groundColor="#a19c90" intensity={.87} />
          <directionalLight position={[-2.8, 3.8, 4.5]} color="#fff8ee" intensity={1.29} />
          <directionalLight position={[3, 2.2, -3]} color="#f0eeeb" intensity={.28} />
          <Studio active={active} assets={assets} motion={motion} onReady={setReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
