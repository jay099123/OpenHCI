"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.3; // Rotate planet
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2; // Rotate inner ring
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.15; // Counter-rotate outer ring
    }
  });

  return (
    <>
      {/* Planet with Earth-like colors */}
      <Sphere ref={planetRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#1e40af" // Deep blue base
          shininess={100}
          specular="#ffffff"
          emissive="#0f172a" // Dark blue glow
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Add surface details as smaller spheres */}
      <Sphere args={[2.02, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#22c55e" // Green continents
          transparent
          opacity={0.4}
        />
      </Sphere>

      {/* Inner planetary ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshBasicMaterial
          color="#fbbf24" // Golden ring
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer planetary ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 4.2, 64]} />
        <meshBasicMaterial
          color="#e5e7eb" // Silver/gray ring
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Asteroid belt particles */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 5, 32]} />
        <meshBasicMaterial
          color="#7c3aed" // Purple asteroid belt
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow 
      />
      <pointLight 
        position={[-8, -8, 10]} 
        intensity={0.8} 
        color="#3b82f6" // Blue light
      />
      <pointLight 
        position={[8, 8, -10]} 
        intensity={0.6} 
        color="#f59e0b" // Orange light
      />
    </>
  );
}

interface Planet3DProps {
  onClick?: () => void;
}

export default function Planet3D({ onClick }: Planet3DProps) {
  return (
    <div 
      className="w-80 h-80 cursor-pointer bg-transparent"
      onClick={onClick}
    >
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Stars 
          radius={150} 
          depth={50} 
          count={8000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        <Planet />
      </Canvas>
    </div>
  );
}