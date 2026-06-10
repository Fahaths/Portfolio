"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, MeshDistortMaterial } from "@react-three/drei";

function FloatingShapes() {
  const sphereRef = useRef(null);
  const torusRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.1;
      sphereRef.current.rotation.y = time * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.08;
      torusRef.current.rotation.y = time * 0.12;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1, 64, 64]} position={[-3, 2, -5]} scale={1.5}>
          <MeshDistortMaterial
            color="#81B29A"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.5}
            roughness={0.2}
            distort={0.4}
            speed={2}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Torus ref={torusRef} args={[1.5, 0.4, 32, 100]} position={[4, -2, -8]} scale={2}>
          <MeshDistortMaterial
            color="#E07A5F"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.2}
            metalness={0.4}
            roughness={0.3}
            distort={0.2}
            speed={1.5}
            transparent
            opacity={0.1}
          />
        </Torus>
      </Float>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[0]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 2]} intensity={0.8} />
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
