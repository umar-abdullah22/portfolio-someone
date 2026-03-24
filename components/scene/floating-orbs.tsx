"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  RoundedBox,
  Sparkles
} from "@react-three/drei";
import type { Group, Mesh } from "three";

function DesignConstellation() {
  const clusterRef = useRef<Group>(null);
  const haloRef = useRef<Mesh>(null);
  const cardRef = useRef<Mesh>(null);
  const phoneRef = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!clusterRef.current || !haloRef.current || !cardRef.current || !phoneRef.current) {
      return;
    }

    clusterRef.current.rotation.y = t * 0.16 + pointer.x * 0.18;
    clusterRef.current.rotation.x = pointer.y * 0.1;
    clusterRef.current.position.y = Math.sin(t * 0.42) * 0.1;

    haloRef.current.rotation.z = t * 0.28;
    cardRef.current.position.y = 0.68 + Math.sin(t * 1.3) * 0.08;
    phoneRef.current.rotation.z = Math.sin(t * 0.7) * 0.08;
  });

  return (
    <group ref={clusterRef}>
      <Sparkles count={50} scale={[4.2, 4, 4]} size={1.5} speed={0.45} color="#b7a8ff" />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.82}>
        <mesh position={[-1.08, 0.24, -0.55]}>
          <icosahedronGeometry args={[0.85, 3]} />
          <MeshTransmissionMaterial
            thickness={0.48}
            roughness={0.12}
            clearcoat={0.35}
            chromaticAberration={0.02}
            transmission={0.95}
            ior={1.08}
            color="#8b78ff"
          />
        </mesh>
      </Float>

      <mesh ref={haloRef} position={[0.78, 0.12, -0.2]}>
        <torusGeometry args={[0.86, 0.1, 28, 120]} />
        <meshStandardMaterial color="#ff90cb" metalness={0.62} roughness={0.08} />
      </mesh>

      <group ref={phoneRef} position={[0.34, -0.58, 0]}>
        <RoundedBox args={[0.82, 1.45, 0.12]} radius={0.13} smoothness={4}>
          <meshStandardMaterial color="#11132a" metalness={0.35} roughness={0.24} />
        </RoundedBox>
        <RoundedBox args={[0.72, 1.24, 0.1]} radius={0.11} smoothness={4} position={[0, 0, 0.03]}>
          <meshStandardMaterial color="#6f63f7" emissive="#4f44b9" emissiveIntensity={0.35} />
        </RoundedBox>
      </group>

      <mesh ref={cardRef} position={[-0.35, 0.68, 0.18]}>
        <planeGeometry args={[1.05, 0.62]} />
        <meshStandardMaterial color="#f8a7d7" metalness={0.15} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.48} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} color="#93a5ff" />
      <pointLight position={[-2, 1, 1]} intensity={0.75} color="#ff9cd4" />
      <pointLight position={[0, -1.4, 1.6]} intensity={0.45} color="#80b5ff" />
      <DesignConstellation />
    </>
  );
}

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 4.5], fov: 40 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
