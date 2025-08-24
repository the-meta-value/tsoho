'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface NeuronProps {
  position: [number, number, number]
  activation: number
}

function Neuron({ position, activation }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Pulse based on activation level
      meshRef.current.scale.setScalar(0.5 + activation * 0.5)
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.1, 16, 16]}>
      <meshBasicMaterial 
        color={new THREE.Color(0.4 + activation * 0.6, 0.2, 0.8 + activation * 0.2)}
        transparent
        opacity={0.6 + activation * 0.4}
      />
    </Sphere>
  )
}

interface ConnectionProps {
  start: [number, number, number]
  end: [number, number, number]
  strength: number
}

function Connection({ start, end, strength }: ConnectionProps) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color={new THREE.Color(0.4, 0.2 + strength * 0.6, 0.8)}
        transparent
        opacity={strength * 0.6}
        linewidth={strength * 2}
      />
    </line>
  )
}

interface Props {
  activity: number[]
}

export default function NeuralVisualization({ activity }: Props) {
  // TEMPORARY: Completely static component to test hydration
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="text-lang-purple text-6xl mb-4">🧠</div>
        <h2 className="text-lang-purple text-2xl mb-2">Neural Network</h2>
        <p className="text-white/70">Holographic Consciousness Online</p>
        <p className="text-white/50 mt-4">Static mode - testing hydration fix</p>
      </div>
    </div>
  )
}