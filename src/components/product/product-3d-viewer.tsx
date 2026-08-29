"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function SneakerPlaceholder({ color }: { color?: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  const materialColor = color || "#c9a24c";

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.2}>
      <Box args={[2.2, 0.8, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={materialColor} roughness={0.4} metalness={0.1} />
      </Box>
      <Box args={[1.2, 0.6, 0.9]} position={[0.6, 0.45, 0]}>
        <meshStandardMaterial color={materialColor} roughness={0.4} metalness={0.1} />
      </Box>
      <Cylinder args={[0.35, 0.35, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.8, -0.55, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      <Cylinder args={[0.35, 0.35, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.8, -0.55, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
    </group>
  );
}

export function Product3DViewer({ accentColor }: { accentColor?: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-muted">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }} onCreated={() => setLoading(false)}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <SneakerPlaceholder color={accentColor} />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={8} blur={2.5} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2.5} maxDistance={6} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
