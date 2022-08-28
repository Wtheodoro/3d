const Three = () => {
  return (
    <>
      {/* BALL */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='#FFFFFF' />
      </mesh>

      {/* AMBIENT LIGHT */}
      <ambientLight args={['#FFFFFF', 1]} />
    </>
  )
}

export default Three
