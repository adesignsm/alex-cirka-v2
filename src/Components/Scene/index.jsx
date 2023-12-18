import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, Noise, EffectComposer, DepthOfField, DotScreen, Scanline } from '@react-three/postprocessing'
import { OrbitControls, useTexture, useVideoTexture } from "@react-three/drei";
import { DoubleSide } from "three";

import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

const Scene = () => {
  const [data, setData] = useState([]);
  const [videoTexture, setVideoTexture] = useState([]);

  const imageBuilder = ImageUrlBuilder(sanityClient);
  const urlFor = (source) => {
      return imageBuilder.image(source);
  }

  useEffect(() => {
    sanityClient.fetch('*[_type == "projects"]').then((result) => {
      const thumbnailData = Object.keys(result).map((project) => 
        urlFor(result[project].projectThumbnail.asset._ref).url()
      );
      setData((prevData) => [...prevData, ...thumbnailData]);
    }).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch('*[_type == "videoReel"]').then((result) => {
      const assetRef = result[0].video.asset._ref;
      const withoutFilePrefix = assetRef.replace('file-', '');
      const modifiedAssetRef = withoutFilePrefix.replace(/-(?=[^-]*$)/, '.');

      console.log('https://cdn.sanity.io/files/bpugi0wz/production/' + modifiedAssetRef);
    }).catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
  }, []);

  const PlaneWithTexture = ({ source, name, xPos, yPos, zPos }) => {
    const planeRef = useRef();
    const texture = useTexture(source);
    const hoverOffset = useRef(0);

    useFrame(() => {
      planeRef.current.position.y = yPos + Math.sin(hoverOffset.current) * 0.05;
      hoverOffset.current += 0.01;
    });

    const regex = /(\d+)x(\d+)\.png$/;
    const match = source.match(regex);
    let xWidth, yHeight;

    if (match) {
      xWidth = parseInt(match[0]);
      yHeight = parseInt(match[1]);
    }
  
    return (
      <>
        <mesh name={name} ref={planeRef} scale={0.1} position={[xPos, yPos, zPos]}>
          <planeGeometry args={[xWidth / 100, yHeight / 100]} ref={geometry => geometry && geometry.computeVertexNormals()} />
          <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} depthTest={false} depthWrite={false}/>
        </mesh>
      </>
    )
  }

  return (
    <>
      <div id="home-canvas">
        <Suspense fallback={null}>
          <Canvas frameloop="always" camera={{ fov: 50, near: 1, far: 100000, position: [0, 0, 15] }}>
            <ambientLight intensity={1} />
            <OrbitControls enableZoom={false} />
            {data && (
                data.map((thumbnail, index) => {
                  return (
                    <PlaneWithTexture 
                      key={index}
                      name={`mesh-${index}`}
                      source={thumbnail} 
                      xPos={(Math.random() - 0.5) * 15}
                      yPos={(Math.random() - 0.5) * 5}
                      zPos={(Math.random() - 0.5) * 10}
                    />
                  )
                })
            )}
            <EffectComposer>
              {/* <DepthOfField focusDistance={15} bokehScale={2.5} focusRange={20}/> */}
              {/* <DotScreen scale={10} angle={Math.PI * 0.5}/> */}
              {/* <Scanline density={2} /> */}
              <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.005} height={window.innerHeight} width={window.innerWidth}/>
              {/* <Noise opacity={0.1} /> */}
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>
    </>
  )
}

export default Scene;