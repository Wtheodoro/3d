import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { degreesToRaidans } from '../../utils/angleConvert'
import * as THREE from 'three'
import gsap from 'gsap'
import { CyberpunkCar } from './CyberpunkCar'

const Three = () => {
  const orbitControlsRef = useRef(null)

  // USE FRAME runs whenever a new frame is generated ex: 60 frams per second
  useFrame((state) => {
    if (!orbitControlsRef.current) return

    // Logic to move the camera
    // x and y goes from 0 to 1
    const { x, y } = state.mouse
    orbitControlsRef.current.setAzimuthalAngle(-x * degreesToRaidans(90))
    orbitControlsRef.current.setPolarAngle((y + 0.85) * degreesToRaidans(90))

    // every change needs to update the camera so it can update de scene
    orbitControlsRef.current.update()
  })

  // Animation
  const ballRef = useRef(null)
  useEffect(() => {
    if (!ballRef.current) return

    // x-axis motion
    gsap.to(ballRef.current.position, {
      x: 3,
      duration: 6,
      ease: 'power3.out',
    })

    // y-axis motion
    gsap.to(
      ballRef.current.position,
      {
        y: 0.5,
        duration: 1.5,
        ease: 'bounce.out',
      },
      '<' // this last parameter means that this animation starts simultaneously with the previous animation
    )
  }, [ballRef.current])

  return (
    <>
      {/* CAMERA */}
      <PerspectiveCamera makeDefault position={[3, 2, 8]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={degreesToRaidans(30)}
        maxPolarAngle={degreesToRaidans(80)}
      />

      {/* CyberpunkCar */}
      <CyberpunkCar
        scale={0.01}
        position={[0, 1.4, -3]}
        rotation={[0, degreesToRaidans(110), 0]}
      />

      {/* BALL */}
      <mesh position={[0, 3, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#FFFFFF' metalness={0.6} roughness={0.4} />
      </mesh>

      {/* FLOOR */}
      <mesh rotation={[-degreesToRaidans(90), 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color='#1EA3D8' />
        {/* <meshPhongMaterial color='#ef72d4' /> */}
      </mesh>

      {/* A realistc light can be made with a ambient light + (direction or point or spotlight) */}

      {/* AMBIENT LIGHT */}
      <ambientLight args={['#FFFFFF', 0.25]} />

      {/* DIRECTION LIGHT */}
      {/* <directionalLight args={['#FFFFFF', 1]} position={[-3, 2, 0]} /> */}

      {/* POINT LIGHT */}
      {/* <pointLight args={['#FFFFFF', 1]} position={[-3, 1, 0]} /> */}

      {/* SPOTLIGHT LIGHT*/}
      <spotLight
        args={['#FFFFFF', 2, 20, degreesToRaidans(60), 0.6]}
        position={[-7, 15, -1]}
        castShadow
      />

      {/* ENVIRONMENT */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='#2266CC' side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  )
}

export default Three
