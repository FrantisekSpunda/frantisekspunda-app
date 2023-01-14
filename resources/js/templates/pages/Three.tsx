import React from 'react'
import { useState } from 'react'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}))

function Box(props: ThreeElements['mesh']) {
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      {...props}
      onClick={(e) => setTarget(e.object)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

export default function App() {
  const { target, setTarget } = useStore()
  const { mode } = useControls({
    mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
  })
  return (
    <Canvas dpr={[2, 2]} onPointerMissed={() => setTarget(null)}>
      <Box position={[1, 1, 0]} />
      <Box position={[-0.2, 0.5, -0.5]} />
      <Box />
      {target && <TransformControls object={target} mode={mode as any} />}
      <OrbitControls makeDefault />
    </Canvas>
  )
}
