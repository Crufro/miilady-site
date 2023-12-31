import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import MiiladyModel from './MiiladyModel';
import CameraControl from './CameraControl';

const MiiladyViewer = ({ fov, models, cameraPosition, targetPosition = [0, 0, 0], enablePanning = false, enableZoom = false }) => {
  return (
    <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '75vh' }}>
      <Canvas>
        <CameraControl 
          cameraPosition={cameraPosition} 
          fov={fov} 
          enablePanning={enablePanning} 
          enableZoom={enableZoom} 
        />
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          {models.map((model, index) => (
            <MiiladyModel key={index} url={model.url} position={model.position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MiiladyViewer;
