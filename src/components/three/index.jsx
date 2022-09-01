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

    // To combine animation we need a time line
    // Time line
    const timeline = gsap.timeline()

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
      '<'
    )

    // play
    // timeline.play()
  }, [ballRef.current])

  return (
    <>
      {/* CAMERA */}
      <PerspectiveCamera makeDefault position={[0, 1, 10]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={degreesToRaidans(30)}
        maxPolarAngle={degreesToRaidans(80)}
      />

      {/* BALL */}
      <mesh position={[1, 3, 0]} castShadow ref={ballRef}>
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
        args={['#FFFFFF', 1.5, 7, degreesToRaidans(45), 0.4]}
        position={[-3, 1, 0]}
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
