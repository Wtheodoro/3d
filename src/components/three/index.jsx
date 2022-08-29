import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { degreesToRaidans } from '../../utils/angleConvert'
const Three = () => {
  const orbitControlsRef = useRef(null)

  // USE FRAME runs whenever a new frame is generated ex: 60 frams per second
  useFrame((state) => {
    if (!orbitControlsRef.current) return
    // x and y goes from 0 to 1
    const { x, y } = state.mouse
    orbitControlsRef.current.setAzimuthalAngle(-x * degreesToRaidans(90))
    orbitControlsRef.current.setPolarAngle((y + 0.85) * degreesToRaidans(90))

    // every change needs to update the camera to update de scene
    orbitControlsRef.current.update()
  })

  useEffect(() => {
    if (!orbitControlsRef.current) return
    console.log(orbitControlsRef.current)
  }, [orbitControlsRef.current])

  return (
    <>
      {/* CAMERA */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={degreesToRaidans(30)}
        maxPolarAngle={degreesToRaidans(80)}
      />

      {/* BALL */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='#FFFFFF' />
      </mesh>

      {/* FLOOR */}
      <mesh rotation={[-degreesToRaidans(90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color='#ef72d4' />
      </mesh>

      {/* AMBIENT LIGHT */}
      <ambientLight args={['#FFFFFF', 1]} />
    </>
  )
}

export default Three
