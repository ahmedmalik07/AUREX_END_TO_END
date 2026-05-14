"use client"

import React, { Suspense, useRef, useEffect, useMemo, createContext, useContext } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useLiteMode } from "@/components/LiteModeContext"

/* ─── Mouse world position shared across butterflies ─── */
const MouseCtx = createContext<React.MutableRefObject<THREE.Vector3>>(
  { current: new THREE.Vector3(0, -0.5, -2) } as React.MutableRefObject<THREE.Vector3>
)

/* ─── Build wing ShapeGeometry for one side (side = 1 for right, -1 for left) ─── */
function buildWingGeo(side: 1 | -1) {
  const s = side

  // Upper forewing: large, sweeps upward and outward — the dominant wing
  const upper = new THREE.Shape()
  upper.moveTo(s * 0.05, 0.1)
  upper.bezierCurveTo(s * 0.3, 0.72, s * 1.0, 0.78, s * 1.38, 0.28)
  upper.bezierCurveTo(s * 1.48, 0.02, s * 1.12, -0.18, s * 0.05, 0.1)
  upper.closePath()

  // Lower hindwing: clearly smaller and rounder, hangs below body
  const lower = new THREE.Shape()
  lower.moveTo(s * 0.04, -0.08)
  lower.bezierCurveTo(s * 0.22, -0.18, s * 0.62, -0.44, s * 0.68, -0.58)
  lower.bezierCurveTo(s * 0.5, -0.7, s * 0.08, -0.38, s * 0.04, -0.08)
  lower.closePath()

  return new THREE.ShapeGeometry([upper, lower])
}

/* ─── Single butterfly ─── */
function Butterfly({
  wingColor,
  scale,
  flapSpeed,
  phaseOffset,
}: {
  wingColor: string
  scale: number
  flapSpeed: number
  phaseOffset: number
}) {
  const rootRef = useRef<THREE.Group>(null)
  const leftRef = useRef<THREE.Group>(null)
  const rightRef = useRef<THREE.Group>(null)
  const mouse = useContext(MouseCtx)
  const { camera } = useThree()

  /* Start each butterfly at a random lower-section position */
  const initPos = useMemo(
    () => new THREE.Vector3((Math.random() - 0.5) * 4, -1 + (Math.random() - 0.5) * 1.2, -2),
    []
  )
  const pos = useRef(initPos.clone())
  const prev = useRef(initPos.clone())
  const vel = useRef(new THREE.Vector3())

  const color = useMemo(() => new THREE.Color(wingColor), [wingColor])
  const geoL = useMemo(() => buildWingGeo(-1), [])
  const geoR = useMemo(() => buildWingGeo(1), [])

  useFrame((state, delta) => {
    if (!rootRef.current || !leftRef.current || !rightRef.current) return
    const t = state.clock.elapsedTime + phaseOffset * 2.5
    const d = Math.min(delta, 0.05)

    /* Target = mouse position + organic floating drift */
    const tx = mouse.current.x + Math.sin(t * 1.1 + phaseOffset * 7) * 0.38 + Math.sin(t * 2.3 + phaseOffset * 4) * 0.15
    const ty = mouse.current.y + Math.cos(t * 0.85 + phaseOffset * 6) * 0.28 + Math.cos(t * 1.9 + phaseOffset * 3) * 0.1
    const target = new THREE.Vector3(tx, ty, -2)

    /* Chase speed: lead butterfly faster, followers slower */
    const chaseSpeed = phaseOffset === 0 ? 6.0 : 3.5
    pos.current.lerp(target, Math.min(chaseSpeed * d, 0.6))

    /* Velocity for banking */
    vel.current.subVectors(pos.current, prev.current).divideScalar(d)
    prev.current.copy(pos.current)

    rootRef.current.position.copy(pos.current)

    /* Always face the camera */
    rootRef.current.lookAt(camera.position)

    /* Banking tilt based on lateral velocity */
    const bankZ = -Math.tanh(vel.current.x * 0.22) * 0.32 - Math.sin(t * 2.2 + phaseOffset * 5) * 0.07
    const bankX = Math.tanh(vel.current.y * 0.14) * 0.18 + Math.cos(t * 1.7 + phaseOffset * 3) * 0.05
    rootRef.current.rotateZ(bankZ)
    rootRef.current.rotateX(bankX)

    /* Wing flap — both wings rise and fall symmetrically */
    const flap = Math.abs(Math.sin(t * flapSpeed)) * 0.88
    rightRef.current.rotation.z = flap
    leftRef.current.rotation.z = -flap
  })

  return (
    <group ref={rootRef} scale={scale}>
      {/* Left wings */}
      <group ref={leftRef}>
        <mesh geometry={geoL}>
          <meshBasicMaterial color={color} transparent opacity={0.82} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Right wings */}
      <group ref={rightRef}>
        <mesh geometry={geoR}>
          <meshBasicMaterial color={color} transparent opacity={0.82} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Body */}
      <mesh position={[0, -0.28, 0]}>
        <capsuleGeometry args={[0.045, 0.42, 4, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow aura */}
      <pointLight position={[0, 0, 0.25]} intensity={0.9} color={wingColor} distance={2.8} />
    </group>
  )
}

/* ─── Sparkle trail that follows the cursor ─── */
function Trail({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const N = 22
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const history = useRef(Array.from({ length: N }, () => new THREE.Vector3(0, -99, 0)))

  useFrame(() => {
    if (!meshRef.current) return
    for (let i = N - 1; i > 0; i--) history.current[i].copy(history.current[i - 1])
    history.current[0].copy(mouseRef.current)
    for (let i = 0; i < N; i++) {
      dummy.position.copy(history.current[i])
      dummy.scale.setScalar(((N - i) / N) * 0.052)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, N]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#00ED64" transparent opacity={0.2} />
    </instancedMesh>
  )
}

/* ─── Scene: maps mouse events to world space ─── */
function Scene() {
  const mouse = useRef(new THREE.Vector3(0, -0.5, -2))
  const { viewport } = useThree()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.current.set(nx * (viewport.width / 2), ny * (viewport.height / 2), -2)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [viewport])

  return (
    <MouseCtx.Provider value={mouse}>
      <ambientLight intensity={0.25} />
      {/* Three butterflies: large leader + two smaller followers */}
      <Butterfly wingColor="#00ED64" scale={0.28} flapSpeed={8.5} phaseOffset={0} />
      <Butterfly wingColor="#4dffa8" scale={0.19} flapSpeed={9.8} phaseOffset={0.4} />
      <Butterfly wingColor="#1aff8c" scale={0.13} flapSpeed={11.2} phaseOffset={0.85} />
      <Trail mouseRef={mouse} />
    </MouseCtx.Provider>
  )
}

/* ─── Canvas: fixed full-viewport background, behind all content ─── */
export default function ButterflyBackground() {
  const { liteMode } = useLiteMode()
  if (liteMode) return null
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
