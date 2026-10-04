import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CoreSceneProps {
  isHovered?: boolean;
  intensityBoost?: number;
  rotationMultiplier?: number;
}

function AICoreMesh({ isHovered = false, intensityBoost = 1, rotationMultiplier = 1 }: CoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerGeomRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);

  // Particle positions
  const particleCount = 180;
  const [particlesPos] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [particleCount]);

  // Track pointer for smooth dampening
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.x = ny * 0.35;
      targetRotation.current.y = nx * 0.45;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollOffset.current = (window.scrollY / maxScroll) * Math.PI;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = rotationMultiplier;

    if (groupRef.current) {
      // Smooth lerp to mouse coords + scroll influence
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x + Math.sin(t * 0.2) * 0.05 + scrollOffset.current * 0.15,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y + t * 0.12 * speed,
        0.05
      );
    }

    // Core pulsing emissive scale
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        const baseIntensity = isHovered ? 1.6 : 1.1;
        material.emissiveIntensity = (baseIntensity + Math.sin(t * 2) * 0.2) * intensityBoost;
      }
    }

    // Counter-rotating outer geodesic wireframe
    if (outerGeomRef.current) {
      outerGeomRef.current.rotation.y = -t * 0.18 * speed;
      outerGeomRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
    }

    // Orbital rings with multi-axis rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.35 * speed;
      ring1Ref.current.rotation.x = Math.sin(t * 0.25) * 0.2 + 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.28 * speed;
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.25 + 0.8;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.22 * speed;
      ring3Ref.current.rotation.y = -t * 0.15 * speed;
    }

    // Orbiting energy node positions
    if (node1Ref.current) {
      const angle = t * 0.8 * speed;
      const r = 2.4;
      node1Ref.current.position.set(
        Math.cos(angle) * r,
        Math.sin(angle) * Math.sin(0.4) * r,
        Math.sin(angle) * Math.cos(0.4) * r
      );
    }
    if (node2Ref.current) {
      const angle = -t * 0.65 * speed + 1.2;
      const r = 3.0;
      node2Ref.current.position.set(
        Math.cos(angle) * Math.cos(0.8) * r,
        Math.sin(angle) * r,
        Math.cos(angle) * Math.sin(0.8) * r
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Deep Core Solid Glowing Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#0891B2"
          emissiveIntensity={1.2}
          roughness={0.18}
          metalness={0.85}
        />
      </mesh>

      {/* 2. Inner Refractive Transparent Lattice */}
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* 3. Outer Geodesic Geometric Wireframe Shell */}
      <mesh ref={outerGeomRef}>
        <icosahedronGeometry args={[1.68, 2]} />
        <meshStandardMaterial
          color="#818CF8"
          emissive="#6366F1"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 4. Orbital Ring 1 (Cyan Primary Track) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#06B6D4"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 5. Orbital Ring 2 (Indigo Inclined Track) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.9, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#818CF8"
          emissive="#4F46E5"
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 6. Orbital Ring 3 (Outer Subtle Slanted Ring) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.45, 0.014, 16, 100]} />
        <meshStandardMaterial
          color="#C084FC"
          emissive="#9333EA"
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* 7. Traveling Energy Node 1 */}
      <mesh ref={node1Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#38BDF8"
          emissiveIntensity={2.5}
          roughness={0.0}
        />
      </mesh>

      {/* 8. Traveling Energy Node 2 */}
      <mesh ref={node2Ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#A855F7"
          emissiveIntensity={2.5}
          roughness={0.0}
        />
      </mesh>

      {/* 9. Ambient Particle Constellation */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#38BDF8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

interface Core3DCanvasProps {
  className?: string;
  intensityBoost?: number;
  rotationMultiplier?: number;
  interactive?: boolean;
}

export function Core3DCanvas({
  className = 'w-full h-full min-h-[350px]',
  intensityBoost = 1,
  rotationMultiplier = 1,
  interactive = true,
}: Core3DCanvasProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    return () => {
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // WebGL Fallback container (stylish CSS/SVG animated core)
  if (hasWebGL === false) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#090D16] border border-white/10 ${className}`}
        aria-label="NEXORA AI Core Visualization Fallback"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]" />
        <div className="relative flex flex-col items-center">
          <div className="w-48 h-48 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
            <div className="w-36 h-36 rounded-full border border-indigo-500/40 border-dashed flex items-center justify-center animate-reverse-spin">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-[0_0_40px_rgba(6,182,212,0.6)] animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-xs font-mono text-cyan-400/80">WebGL Offline · Render Fallback Active</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className} select-none`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Three-Point Studio Lighting */}
        {/* 1. Key Light (Crisp Warm Cyan) */}
        <directionalLight position={[6, 5, 5]} intensity={2.2} color="#E0F2FE" />
        
        {/* 2. Fill Light (Soft Cool Ambient Indigo) */}
        <ambientLight intensity={0.8} color="#1E1B4B" />
        
        {/* 3. Rim Light (Sharp Back Rim for Silhouette Separation) */}
        <pointLight position={[-6, -4, -4]} intensity={2.8} color="#06B6D4" />
        
        {/* Secondary Back Rim Light (Violet Depth Accent) */}
        <pointLight position={[4, -5, -6]} intensity={2.0} color="#818CF8" />

        <AICoreMesh
          isHovered={isHovered}
          intensityBoost={intensityBoost}
          rotationMultiplier={prefersReducedMotion ? 0.1 : rotationMultiplier}
        />
      </Canvas>
    </div>
  );
}
