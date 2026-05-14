"use client"

import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PresentationControls, Stage, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ATOMCAMP_GREEN = "#00ED64"
const ATOMCAMP_DARK = "#01011B"

/* ─── Main Valkyrie Model ─── */
function ValkyrieModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/techno_buddy.glb')

  const cloned = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      // stronger floating bob
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.12
      // breathing scale
      const s = 1 + Math.sin(t * 1.4) * 0.02
      groupRef.current.scale.setScalar(s)
      // slow auto-rotate on Y so it never feels static
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  )
}

/* ─── Robot Companion (background) ─── */
function RobotCompanion({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/robot.glb')
  const cloned = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * speed
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3
      groupRef.current.rotation.y = t * 0.2
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={cloned} />
    </group>
  )
}

/* ─── Floating Geometric Shapes (atomcamp green) ─── */
function FloatingShape({
  position,
  color,
  speed,
  distort,
  geometry = 'ico',
}: {
  position: [number, number, number]
  color: string
  speed: number
  distort: number
  geometry?: 'ico' | 'torus' | 'box'
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.rotation.x = t * speed * 0.3
      meshRef.current.rotation.y = t * speed * 0.25
      meshRef.current.position.y = position[1] + Math.sin(t * speed * 0.4) * 0.4
    }
  })

  const geo = useMemo(() => {
    if (geometry === 'torus') return <torusGeometry args={[0.6, 0.2, 16, 32]} />
    if (geometry === 'box') return <boxGeometry args={[0.8, 0.8, 0.8]} />
    return <icosahedronGeometry args={[0.7, 1]} />
  }, [geometry])

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geo}
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

/* ─── Mouse Parallax Camera ─── */
function MouseParallax() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.4 - target.current.x) * 0.04
    target.current.y += (mouse.current.y * 0.4 - target.current.y) * 0.04
    camera.position.x += (target.current.x - camera.position.x) * 0.03
    camera.position.y += (-target.current.y - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─── Dynamic Lights with atomcamp branding ─── */
function DynamicLights() {
  const greenRef = useRef<THREE.PointLight>(null)
  const cyanRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (greenRef.current) {
      greenRef.current.position.x = Math.sin(t * 0.4) * 5
      greenRef.current.position.y = Math.cos(t * 0.35) * 3
      greenRef.current.position.z = Math.sin(t * 0.3) * 4 + 2
    }
    if (cyanRef.current) {
      cyanRef.current.position.x = Math.cos(t * 0.45) * 4
      cyanRef.current.position.y = Math.sin(t * 0.5) * 3.5
      cyanRef.current.position.z = Math.cos(t * 0.25) * 3
    }
  })

  return (
    <>
      <pointLight ref={greenRef} intensity={3} color={ATOMCAMP_GREEN} distance={12} />
      <pointLight ref={cyanRef} intensity={2} color="#00BFA5" distance={10} />
      <spotLight position={[0, 8, 4]} angle={0.5} penumbra={1} intensity={1.5} color="#ffffff" />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
    </>
  )
}

/* ─── Main Export ─── */
export default function Hero3DModel() {
  return (
    <div className="w-full h-[500px] md:h-[750px] cursor-grab active:cursor-grabbing relative z-20 -mr-8 md:-mr-16">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <MouseParallax />
        <DynamicLights />

        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 1200 }}
          rotation={[0.1, -Math.PI / 5, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <Suspense fallback={null}>
            {/* Main hero model — bigger via adjustCamera */}
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
              <Stage environment="city" intensity={0.6} adjustCamera={0.9} shadows={false}>
                <ValkyrieModel />
              </Stage>
            </Float>

            {/* Background robot companions */}
            <RobotCompanion position={[-3.5, 1, -4]} scale={0.35} speed={0.8} />
            <RobotCompanion position={[3.2, -1.5, -5]} scale={0.3} speed={1.1} />
            <RobotCompanion position={[0, 2.5, -6]} scale={0.25} speed={0.9} />

            {/* Floating geometric accents — atomcamp green theme */}
            <FloatingShape position={[-2.5, 2, -3]} color={ATOMCAMP_GREEN} speed={1.2} distort={0.3} geometry="ico" />
            <FloatingShape position={[2.8, -2, -4]} color="#00BFA5" speed={1.0} distort={0.4} geometry="torus" />
            <FloatingShape position={[-1, -2.5, -2]} color={ATOMCAMP_GREEN} speed={0.8} distort={0.35} geometry="box" />
            <FloatingShape position={[3, 2.2, -3.5]} color="#69F0AE" speed={1.4} distort={0.25} geometry="ico" />
            <FloatingShape position={[-3, -0.5, -5]} color="#00ED64" speed={1.1} distort={0.5} geometry="torus" />

            {/* Sparkles in atomcamp green */}
            <Sparkles count={60} scale={10} size={2} speed={0.5} color={ATOMCAMP_GREEN} opacity={0.5} />
            <Sparkles count={30} scale={8} size={1.2} speed={0.3} color="#00BFA5" opacity={0.3} />
          </Suspense>
        </PresentationControls>

        <fog attach="fog" args={[ATOMCAMP_DARK, 12, 25]} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/techno_buddy.glb')
useGLTF.preload('/robot.glb')
