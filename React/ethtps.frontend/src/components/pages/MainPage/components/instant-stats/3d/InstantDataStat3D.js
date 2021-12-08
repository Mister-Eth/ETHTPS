import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

 function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.0));
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : props.color} />
      </mesh>
    );
  }
  
  export default function InstantDataStat3D(props) {
    return (
      <Canvas style={{ height: '300px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {Object.keys(props.data).map((x, i)=> <Box color={props.colorDictionary[x]} position={[i, 0, 0]} />)}
      </Canvas>
    );
  }
  