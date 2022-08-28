import { PerspectiveCamera } from '@react-three/drei'
import { degreesToRaidans } from '../../utils/angleConvert'
const Three = () => {
  return (
    <>
      {/* CAMERA */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />

      {/* BALL */}
      <mesh position={[0, 1, 0]}>
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
