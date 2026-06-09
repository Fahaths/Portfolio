"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Torus, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useScroll } from "framer-motion";

function Worlds({ scrollYProgress }) {
  const groupRef = useRef(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotate entire world based on scroll
    const scroll = scrollYProgress.get();
    groupRef.current.rotation.y = scroll * Math.PI * 2;
    groupRef.current.position.y = scroll * -10;
  });

  return (
    <group ref={groupRef}>
      {/* World 1: SEO (Nodes) */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[-3, 2, -5]} scale={1.5}>
          <MeshDistortMaterial color="#81B29A" distort={0.4} speed={2} transparent opacity={0.3} wireframe />
        </Sphere>
      </Float>

      {/* World 2: Performance (Rings) */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Torus args={[1.5, 0.4, 16, 50]} position={[4, -6, -8]} scale={2}>
          <MeshDistortMaterial color="#E07A5F" distort={0.2} speed={1.5} transparent opacity={0.3} />
        </Torus>
      </Float>

      {/* World 3: Web Dev (Geometry) */}
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, -14, -6]} scale={2}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial color="#F2CC8F" distort={0.1} speed={1} transparent opacity={0.4} wireframe />
        </mesh>
      </Float>

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function JourneyWorlds3D() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[0] bg-[var(--color-bg)]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_50%)] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[0]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Worlds scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
