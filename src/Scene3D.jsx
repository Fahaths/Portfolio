import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei'

function HeroObject(props) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

        <Float
          speed={2}
          rotationIntensity={1}
          floatIntensity={1}
          floatingRange={[-0.2, 0.2]}
        >
          <HeroObject />
        </Float>

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </div>
  )
}
