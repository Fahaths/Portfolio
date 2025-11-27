import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Float, PerspectiveCamera } from '@react-three/drei'

function ProfileMesh() {
    const meshRef = useRef()
    const texture = useTexture('/assets/profile-new.jpg')

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle mouse follow effect
            const t = state.clock.getElapsedTime()
            meshRef.current.rotation.y = Math.sin(t / 4) / 8 + (state.mouse.x * 0.1)
            meshRef.current.rotation.x = Math.cos(t / 4) / 8 - (state.mouse.y * 0.1)
        }
    })

    return (
        <mesh ref={meshRef} scale={[3, 3, 1]}>
            <planeGeometry args={[1, 1.2]} /> {/* Aspect ratio approx 200x240 */}
            <meshStandardMaterial
                map={texture}
                transparent
                alphaTest={0.5}
                roughness={0.4}
                metalness={0.2}
            />
        </mesh>
    )
}

export default function Profile3D() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <ProfileMesh />
                </Float>
            </Canvas>
        </div>
    )
}
