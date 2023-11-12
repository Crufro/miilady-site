import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import MiiladyModel from './MiiladyModel';
import CameraControl from './CameraControl'; // Import the custom camera control component

const MiiladyViewer = ({ fov, models, cameraPosition, cameraRotation = [0, 0, 0] }) => {
  return (
    <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '75vh' }}>
      <Canvas>
        {/* Pass all camera control props to CameraControl */}
        <CameraControl 
          cameraPosition={cameraPosition} 
          cameraRotation={cameraRotation} 
          fov={fov} 
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
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
