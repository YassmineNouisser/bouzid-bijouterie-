import { useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

import * as THREE from 'three';

const DIAMOND_NAMES = ['diamonds', 'diamonds001', 'diamonds002', 'diamonds003', 'diamonds004', 'diamonds005'];

// ─── Ring Model ───────────────────────────────────────────────────
function RingModel({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const { scene } = useGLTF('/assets/ring.glb');

  useEffect(() => {
    scene.traverse((child: any) => {
      if (!child.isMesh || !child.material) return;
      const name = child.name || '';
      if (DIAMOND_NAMES.includes(name)) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#ffffff'),
          metalness: 0.1, roughness: 0.0,
          transmission: 0.9, transparent: true, opacity: 1.0,
          thickness: 3.0, ior: 2.42,
          clearcoat: 1.0, clearcoatRoughness: 0.0,
          envMapIntensity: 10.0, reflectivity: 1.0,
          specularIntensity: 1.0, specularColor: new THREE.Color('#ffffff'),
        });
        child.material.needsUpdate = true;
      } else if (name === 'silver') {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#e8e8e8'),
          metalness: 1.0, roughness: 0.03, envMapIntensity: 5.0,
          clearcoat: 1.0, clearcoatRoughness: 0.01,
        });
      } else if (name === 'gold') {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#c8922a'),
          metalness: 1.0, roughness: 0.03, envMapIntensity: 5.0,
          clearcoat: 1.0, clearcoatRoughness: 0.01,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

useGLTF.preload('/assets/ring.glb');

// ─── Camera Controller ───────────────────────────────────────────
// Reads position & target from refs every frame (GSAP animates them)
function CameraController({
  cameraPositionRef,
  targetRef,
  orbitEnabled,
}: {
  cameraPositionRef: React.MutableRefObject<THREE.Vector3>;
  targetRef: React.MutableRefObject<THREE.Vector3>;
  orbitEnabled: boolean;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!orbitEnabled) {
      camera.position.set(
        cameraPositionRef.current.x,
        cameraPositionRef.current.y,
        cameraPositionRef.current.z,
      );
      camera.lookAt(
        targetRef.current.x,
        targetRef.current.y,
        targetRef.current.z,
      );
      camera.updateProjectionMatrix();
    }
  });

  return orbitEnabled ? (
    <OrbitControls enablePan={false} minDistance={4} maxDistance={12} autoRotate autoRotateSpeed={2} />
  ) : null;
}

// ─── Exported Canvas ─────────────────────────────────────────────
interface RingCanvasProps {
  ringRef: React.RefObject<THREE.Group | null>;
  cameraPositionRef: React.MutableRefObject<THREE.Vector3>;
  targetRef: React.MutableRefObject<THREE.Vector3>;
  orbitEnabled: boolean;
}

export function RingCanvas({ ringRef, cameraPositionRef, targetRef, orbitEnabled }: RingCanvasProps) {
  return (
    <div
      id="webgi-canvas-container"
      className="fixed inset-0 max-md:-top-[90px] max-md:bottom-[122px]"
      style={{
        zIndex: orbitEnabled ? 50 : 20,
        pointerEvents: orbitEnabled ? 'auto' : 'none',
      }}
    >
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 50, near: 0.1, far: 100, position: [3, -0.8, 1.2] }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="always"
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 2.2;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          scene.background = new THREE.Color('#D9C9AB');
        }}
      >
        <CameraController cameraPositionRef={cameraPositionRef} targetRef={targetRef} orbitEnabled={orbitEnabled} />
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 8, 5]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={1.5} color="#ffeedd" />
        <pointLight position={[0, 10, 0]} intensity={2.0} color="#ffffff" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <RingModel groupRef={ringRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
