"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  RoundedBox,
  Sparkles,
  useTexture
} from "@react-three/drei";
import type { Group, Texture } from "three";
import { LinearFilter, LinearMipmapLinearFilter, SRGBColorSpace } from "three";

function InterfaceCard({
  position,
  rotation,
  accent,
  previewTexture
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  accent: string;
  previewTexture: Texture;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.65}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[1.9, 1.2, 0.08]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#121830" metalness={0.28} roughness={0.26} />
        </RoundedBox>
        <RoundedBox
          args={[1.78, 0.98, 0.03]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, 0.052]}
        >
          <meshStandardMaterial
            map={previewTexture}
            color="#ffffff"
            emissive="#1a2346"
            emissiveIntensity={0.14}
          />
        </RoundedBox>
        <RoundedBox
          args={[1.78, 0.98, 0.01]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, 0.068]}
        >
          <meshStandardMaterial color={accent} transparent opacity={0.04} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function PhonePanel({
  position,
  previewTexture
}: {
  position: [number, number, number];
  previewTexture: Texture;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group position={position} rotation={[0.12, -0.32, 0.12]}>
        <RoundedBox args={[1.05, 2, 0.14]} radius={0.16} smoothness={4}>
          <meshStandardMaterial color="#0d1224" metalness={0.45} roughness={0.24} />
        </RoundedBox>
        <RoundedBox
          args={[0.88, 1.68, 0.07]}
          radius={0.14}
          smoothness={4}
          position={[0, 0.01, 0.06]}
        >
          <meshStandardMaterial
            map={previewTexture}
            color="#ffffff"
            emissive="#3f3b84"
            emissiveIntensity={0.16}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

function TokenChip({
  position,
  rotation,
  color
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[0.74, 0.18, 0.05]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={color} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function Scene() {
  const rigRef = useRef<Group>(null);
  const discoverRef = useRef<Group>(null);
  const wireframeRef = useRef<Group>(null);
  const deliverRef = useRef<Group>(null);
  const imageOne = useTexture("/assets/hero/momna-hero-01.jpg");
  const imageTwo = useTexture("/assets/hero/momna-hero-02.jpg");

  imageOne.colorSpace = SRGBColorSpace;
  imageTwo.colorSpace = SRGBColorSpace;
  imageOne.minFilter = LinearMipmapLinearFilter;
  imageTwo.minFilter = LinearMipmapLinearFilter;
  imageOne.magFilter = LinearFilter;
  imageTwo.magFilter = LinearFilter;
  imageOne.anisotropy = 8;
  imageTwo.anisotropy = 8;

  useFrame(({ pointer, clock }) => {
    if (!rigRef.current) return;
    const t = clock.getElapsedTime();
    rigRef.current.rotation.y = t * 0.08 + pointer.x * 0.22;
    rigRef.current.rotation.x = pointer.y * 0.14;
    rigRef.current.position.y = Math.sin(t * 0.34) * 0.06;

    if (discoverRef.current) {
      discoverRef.current.position.x = -1.24 + Math.sin(t * 0.5) * 0.08;
      discoverRef.current.position.y = 0.72 + Math.cos(t * 0.72) * 0.05;
      discoverRef.current.rotation.z = -0.08 + Math.sin(t * 0.42) * 0.04;
    }
    if (wireframeRef.current) {
      wireframeRef.current.position.x = 0.04 + Math.sin(t * 0.45 + 1.2) * 0.1;
      wireframeRef.current.position.y = -0.84 + Math.cos(t * 0.64 + 1.2) * 0.06;
      wireframeRef.current.rotation.z = 0.08 + Math.sin(t * 0.46) * 0.05;
    }
    if (deliverRef.current) {
      deliverRef.current.position.x = 1.24 + Math.sin(t * 0.58 + 2.4) * 0.07;
      deliverRef.current.position.y = -0.14 + Math.cos(t * 0.74 + 2.4) * 0.05;
      deliverRef.current.rotation.z = 0.1 + Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[2.4, 1.9, 2]} intensity={0.95} color="#8ea2ff" />
      <pointLight position={[-1.6, -1.1, 1.8]} intensity={0.65} color="#d18dff" />
      <Sparkles count={18} size={1.2} speed={0.16} color="#b8c4ff" scale={[5.4, 4.8, 4]} />

      <group ref={rigRef}>
        <group ref={deliverRef}>
          <PhonePanel position={[0, 0, 0.2]} previewTexture={imageTwo} />
        </group>
        <group ref={discoverRef}>
          <InterfaceCard
            position={[0, 0, -0.18]}
            rotation={[0.04, 0.34, -0.08]}
            accent="#f79cd5"
            previewTexture={imageOne}
          />
        </group>
        <group ref={wireframeRef}>
          <InterfaceCard
            position={[0, 0, -0.36]}
            rotation={[-0.16, -0.3, 0.08]}
            accent="#9db3ff"
            previewTexture={imageTwo}
          />
        </group>
        <TokenChip position={[-1.42, -0.22, 0.5]} rotation={[0.2, 0.2, -0.3]} color="#f6a2d7" />
        <TokenChip position={[0.96, 1.03, 0.44]} rotation={[-0.16, -0.28, 0.28]} color="#95abff" />
      </group>
    </>
  );
}

export function LivingInterfaceScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.1]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5.8], fov: 35 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
