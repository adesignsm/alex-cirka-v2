import { Suspense, useContext, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, Noise, EffectComposer, DepthOfField, DotScreen, Scanline } from '@react-three/postprocessing'
import { Environment, useGLTF, OrbitControls, Box } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";

import './index.css';

const Scene = () => {
    const RotatingCube = () => {
        const mesh = useRef();
      
        useFrame(() => {
          if (mesh.current) {
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y += 0.01;
          }
        });
      
        return (
          <Box ref={mesh} scale={1}>
            <meshBasicMaterial attach="material" color="red" />
          </Box>
        );
    }

    return (
        <>
            <div id="home-canvas">
                <Suspense fallback={null}>
                    <Canvas frameloop="always" camera={{ fov: 50, near: 1, far: 100000, position: [0, 0, 5.5] }}>
                    <ambientLight intensity={0} />
                    <OrbitControls enableZoom={false} />
                    <RotatingCube />
                    <EffectComposer>
                        {/* <DepthOfField focusDistance={15} bokehScale={2.5} focusRange={20}/> */}
                        {/* <DotScreen scale={10} angle={Math.PI * 0.5}/> */}
                        {/* <Scanline density={2} /> */}
                        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.3} height={window.innerHeight} /> */}
                        {/* <Noise opacity={0.1} /> */}
                    </EffectComposer>
                    </Canvas>
                </Suspense>
            </div>
        </>
    )
}

export default Scene;