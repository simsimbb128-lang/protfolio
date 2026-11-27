import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import type { PointerPosition } from '../../hooks/usePointerPosition'

const glassVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMotion;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec3 transformed = position;

    float drift =
      sin(position.y * 2.6 + uTime * 0.46) * 0.026 +
      sin(position.x * 3.4 - uTime * 0.31) * 0.016;
    transformed += normal * drift * uMotion;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);

    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    vLocalPosition = transformed;

    gl_Position = projectionMatrix * mvPosition;
  }
`

const glassFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewPosition);

    float fresnel = pow(1.0 - clamp(dot(normal, viewDirection), 0.0, 1.0), 2.15);
    float prism = 0.5 + 0.5 * sin(vLocalPosition.y * 3.1 + vLocalPosition.x * 1.7 + uTime * 0.22);

    vec3 color = mix(uColorA, uColorB, prism);
    color = mix(color, uColorC, fresnel * 0.82);

    float alpha = uOpacity + fresnel * 0.56;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.92));
  }
`

interface CrystalProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  detail?: number
  speed?: number
  colorA?: string
  colorB?: string
  colorC?: string
  opacity?: number
  motion: number
}

function Crystal({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  detail = 1,
  speed = 1,
  colorA = '#eefaff',
  colorB = '#b8ddec',
  colorC = '#f4dce3',
  opacity = 0.15,
  motion,
}: CrystalProps) {
  const material = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMotion: { value: motion },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
      uOpacity: { value: opacity },
    }),
    [colorA, colorB, colorC, motion, opacity],
  )

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime * speed
    material.current.uniforms.uMotion.value = motion
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={glassVertexShader}
          fragmentShader={glassFragmentShader}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.006, detail]} />
        <meshBasicMaterial
          color={colorC}
          transparent
          opacity={0.2}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function SoftHalo() {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#c5e8f6') },
      uCoreColor: { value: new THREE.Color('#f6e3e7') },
    }),
    [],
  )

  return (
    <mesh position={[0, 0, -1.8]}>
      <planeGeometry args={[8.5, 8.5]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColor;
          uniform vec3 uCoreColor;
          varying vec2 vUv;
          void main() {
            float distanceToCenter = length(vUv - 0.5);
            float halo = smoothstep(0.5, 0.04, distanceToCenter);
            float inner = smoothstep(0.32, 0.0, distanceToCenter);
            vec3 color = mix(uColor, uCoreColor, inner * 0.58);
            gl_FragColor = vec4(color, halo * 0.26);
          }
        `}
      />
    </mesh>
  )
}

function FloatingDust({ motion }: { motion: number }) {
  const points = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const count = 38
    const positions = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399963
      const radius = 1.9 + ((index * 17) % 23) / 18
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = Math.sin(angle * 1.4) * 2.3
      positions[index * 3 + 2] = Math.sin(angle) * 0.9
    }

    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return buffer
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.02 * motion
    points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.14) * 0.05 * motion
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#88b8cc"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Sculpture({
  pointer,
  reducedMotion,
}: {
  pointer: RefObject<PointerPosition>
  reducedMotion: boolean
}) {
  const sculpture = useRef<THREE.Group>(null)
  const innerCore = useRef<THREE.Mesh>(null)
  const motion = reducedMotion ? 0 : 1

  useFrame((state, delta) => {
    if (!sculpture.current) return

    const elapsed = state.clock.elapsedTime
    const targetX = pointer.current.y * 0.07
    const targetY = pointer.current.x * 0.11
    const damping = Math.min(1, delta * 2.4)

    sculpture.current.rotation.x = THREE.MathUtils.lerp(
      sculpture.current.rotation.x,
      targetX,
      damping,
    )
    sculpture.current.rotation.y = THREE.MathUtils.lerp(
      sculpture.current.rotation.y,
      elapsed * 0.05 + targetY,
      damping,
    )
    sculpture.current.position.y = Math.sin(elapsed * 0.42) * 0.055 * motion

    if (innerCore.current) {
      innerCore.current.rotation.x = elapsed * 0.08
      innerCore.current.rotation.y = -elapsed * 0.1
    }
  })

  return (
    <group ref={sculpture} rotation={[0.03, -0.16, 0.035]}>
      <SoftHalo />

      <Crystal
        position={[0, 0, 0]}
        rotation={[0.14, 0.2, 0.28]}
        scale={[1.16, 1.45, 0.82]}
        detail={1}
        speed={0.8}
        colorA="#f3fbff"
        colorB="#b5dceb"
        colorC="#f1d7df"
        opacity={0.17}
        motion={motion}
      />

      <mesh ref={innerCore} scale={0.64}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial
          color="#f6fdff"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2 + 0.44, 0.2, 0.08]}>
        <torusGeometry args={[2.18, 0.0042, 8, 256]} />
        <meshBasicMaterial color="#6ca9c1" transparent opacity={0.52} />
      </mesh>

      <mesh rotation={[0.26, 0.82, -0.18]}>
        <torusGeometry args={[2.52, 0.0032, 8, 256]} />
        <meshBasicMaterial color="#d9b5c1" transparent opacity={0.46} />
      </mesh>

      <mesh rotation={[1.06, -0.22, 0.58]}>
        <torusGeometry args={[1.72, 0.0038, 8, 220]} />
        <meshBasicMaterial color="#a9d1e2" transparent opacity={0.34} />
      </mesh>

      <mesh position={[2.18, 0, 0]}>
        <sphereGeometry args={[0.026, 16, 16]} />
        <meshBasicMaterial color="#f9fdff" />
      </mesh>
      <mesh position={[-1.78, 1.18, 0.26]}>
        <sphereGeometry args={[0.019, 12, 12]} />
        <meshBasicMaterial color="#e9c6d0" />
      </mesh>

      <Crystal
        position={[2.08, 1.38, -0.46]}
        rotation={[0.3, 0.6, 0.1]}
        scale={[0.2, 0.2, 0.2]}
        detail={0}
        speed={1.4}
        colorB="#f1d6de"
        colorC="#fbfeff"
        opacity={0.22}
        motion={motion}
      />
      <Crystal
        position={[-2.26, 0.72, 0.18]}
        rotation={[0.7, 0.2, 0.3]}
        scale={[0.14, 0.14, 0.14]}
        detail={0}
        speed={1.1}
        colorA="#f6fdff"
        colorB="#bfe3f1"
        colorC="#f0dce3"
        opacity={0.24}
        motion={motion}
      />
      <Crystal
        position={[1.46, -1.92, 0.38]}
        rotation={[0.1, 0.4, 0.8]}
        scale={[0.17, 0.17, 0.17]}
        detail={0}
        speed={1.7}
        colorA="#fdf9fa"
        colorB="#e8cfd7"
        colorC="#d3eef9"
        opacity={0.2}
        motion={motion}
      />
      <Crystal
        position={[-1.26, -1.76, -0.34]}
        rotation={[0.4, 0.1, 0.5]}
        scale={[0.22, 0.22, 0.22]}
        detail={1}
        speed={1.2}
        colorA="#f2fbff"
        colorB="#a9d3e6"
        colorC="#f8e4e9"
        opacity={0.16}
        motion={motion}
      />

      <FloatingDust motion={motion} />
    </group>
  )
}

export interface SpatialSceneProps {
  pointer: RefObject<PointerPosition>
  reducedMotion: boolean
  active: boolean
}

export function SpatialScene({ pointer, reducedMotion, active }: SpatialSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [0, 0, 7.1], fov: 34, near: 0.1, far: 40 }}
      frameloop={reducedMotion ? 'demand' : active ? 'always' : 'never'}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.06
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <Sculpture pointer={pointer} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
