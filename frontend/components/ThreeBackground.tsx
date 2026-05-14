"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei"
import * as THREE from "three"
import { useLiteMode } from "@/components/LiteModeContext"

function FloatingShape({ position, color, speed, distort }: { position: [number, number, number]; color: string; speed: number; distort: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeBackground() {
  const { liteMode } = useLiteMode()
  if (liteMode) return null
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00ED64" />

        <FloatingShape position={[-3, 2, -2]} color="#00ED64" speed={1.5} distort={0.4} />
        <FloatingShape position={[3, -1, -3]} color="#4dffa8" speed={1.2} distort={0.3} />
        <FloatingShape position={[0, 3, -4]} color="#009940" speed={0.8} distort={0.5} />
        <FloatingShape position={[-2, -2, -1]} color="#1aff8c" speed={1.0} distort={0.35} />

        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <fog attach="fog" args={["#020c1b", 10, 25]} />
      </Canvas>
    </div>
  )
}
