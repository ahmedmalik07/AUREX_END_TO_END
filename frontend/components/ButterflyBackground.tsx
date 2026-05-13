"use client"

import React, { Suspense, useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

/* ─── Cursor Tracker ─── */
function useMouseWorld(cameraZ = 6) {
  const mouse = useRef(new THREE.Vector3(0, 0, 0))
  const { camera, viewport } = useThree()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      const vec = new THREE.Vector3(x, y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = (cameraZ - camera.position.z) / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))
      mouse.current.set(pos.x, pos.y, cameraZ)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [camera, cameraZ])

  return mouse
}

/* ─── Single Butterfly ─── */
function Butterfly({
  scene,
  animations,
  scale = 0.3,
  animSpeed = 1,
  delay = 0,
  glowColor,
}: {
  scene: THREE.Group
  animations: THREE.AnimationClip[]
  scale?: number
  animSpeed?: number
  delay?: number
  glowColor?: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const cloned = useMemo(() => scene.clone(), [scene])
  const mouse = useMouseWorld(0)

  const pos = useRef(new THREE.Vector3(0, 0, 0))
  const vel = useRef(new THREE.Vector3(0, 0, 0))
  const target = useRef(new THREE.Vector3(0, 0, 0))

  // Play GLB wing animation
  useEffect(() => {
    const first = Object.values(actions || {})[0] as THREE.AnimationAction | undefined
    if (first) {
      first.reset().play()
      first.timeScale = animSpeed
    }
  }, [actions, animSpeed])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Target follows mouse with optional delay offset
    target.current.copy(mouse.current)

    // Add organic hover/bob on top of cursor position
    const bobX = Math.sin(t * 1.2 + delay * 10) * 0.4 + Math.sin(t * 2.3 + delay * 5) * 0.2
    const bobY = Math.cos(t * 1.0 + delay * 8) * 0.35 + Math.cos(t * 1.7 + delay * 3) * 0.15
    const bobZ = Math.sin(t * 0.8 + delay * 4) * 0.5
    target.current.x += bobX
    target.current.y += bobY
    target.current.z += bobZ

    // Smooth spring-like follow (different lerp per butterfly for trail effect)
    const lerpFactor = delay > 0 ? 2.5 * delta : 4.0 * delta
    pos.current.lerp(target.current, Math.min(lerpFactor, 1))

    // Compute velocity for banking
    const newVel = pos.current.clone().sub(groupRef.current.position).divideScalar(Math.max(delta, 0.001))
    vel.current.lerp(newVel, 0.15)

    // Apply position
    groupRef.current.position.copy(pos.current)

    // Natural flight rotation
    const vx = vel.current.x
    const vy = vel.current.y

    // Bank into turns (roll)
    const targetRoll = -vx * 1.2 - Math.sin(t * 2 + delay * 6) * 0.15
    // Pitch up/down
    const targetPitch = vy * 0.8 + Math.cos(t * 1.5 + delay * 4) * 0.1
    // Yaw to face movement direction
    const targetYaw = -vx * 1.5 + Math.sin(t * 0.5 + delay * 3) * 0.2

    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRoll, 0.1)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, 0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, 0.1)

    // Pulse scale slightly with wing beats
    const beat = 1 + Math.sin(t * 8 * animSpeed) * 0.03
    groupRef.current.scale.setScalar(scale * beat)
  })

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={cloned} />
      {glowColor && (
        <pointLight
          position={[0, 0, 1]}
          intensity={1.2}
          color={glowColor}
          distance={8}
        />
      )}
    </group>
  )
}

/* ─── Particle Trail ─── */
function Trail({ count = 20, mouseRef }: { count?: number; mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const positions = useRef<THREE.Vector3[]>(Array.from({ length: count }, () => new THREE.Vector3(0, -100, 0)))
  const opacities = useRef<number[]>(Array.from({ length: count }, () => 0))

  useFrame(() => {
    if (!meshRef.current) return

    // Shift trail
    for (let i = count - 1; i > 0; i--) {
      positions.current[i].copy(positions.current[i - 1])
      opacities.current[i] = opacities.current[i - 1] * 0.92
    }
    positions.current[0].copy(mouseRef.current)
    opacities.current[0] = 1

    for (let i = 0; i < count; i++) {
      dummy.position.copy(positions.current[i])
      const s = (1 - i / count) * 0.08
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00E676" transparent opacity={0.35} />
    </instancedMesh>
  )
}

/* ─── Scene ─── */
function Scene() {
  const { scene, animations } = useGLTF("/fantasy_butterfly_animation.glb")
  const mouse = useMouseWorld(0)

  return (
    <>
      {/* Warm magical lighting with neon green accent */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#00E676" />
      <directionalLight position={[-5, -3, 2]} intensity={0.3} color="#FBBB2E" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" distance={10} />

      {/* Main butterfly - neon green glow */}
      <Butterfly
        scene={scene}
        animations={animations}
        scale={0.35}
        animSpeed={1.3}
        delay={0}
        glowColor="#00E676"
      />

      {/* Follower 1 - brand orange trail */}
      <Butterfly
        scene={scene}
        animations={animations}
        scale={0.18}
        animSpeed={1.6}
        delay={0.4}
        glowColor="#FBBB2E"
      />

      {/* Follower 2 - cyan accent */}
      <Butterfly
        scene={scene}
        animations={animations}
        scale={0.12}
        animSpeed={1.9}
        delay={0.9}
        glowColor="#22d3ee"
      />

      {/* Particle trail behind leader */}
      <Trail count={25} mouseRef={mouse} />

      {/* Soft fog for depth */}
      <fog attach="fog" args={["#01011B", 12, 25]} />
    </>
  )
}

/* ─── Main Export ─── */
export default function ButterflyBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/fantasy_butterfly_animation.glb")
