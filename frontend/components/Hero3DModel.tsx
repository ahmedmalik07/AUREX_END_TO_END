"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PresentationControls, Stage } from '@react-three/drei'

function Model(props: any) {
  // Pass the exact path to the public GLB here
  const { scene } = useGLTF('/brick_valkyrie_machine.glb')
  return <primitive object={scene} {...props} />
}

export default function Hero3DModel() {
  return (
    <div className='w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing relative z-20'>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0.1, -Math.PI / 4, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI, Math.PI]}
        >
          <Suspense fallback={null}>
            {/* The <Stage> component completely automates centering and scaling models to fit the screen flawlessly */}
            <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
              <Model />
            </Stage>
          </Suspense>
        </PresentationControls>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/brick_valkyrie_machine.glb')

