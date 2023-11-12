import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraControl = ({ cameraPosition, cameraRotation, fov }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.rotation.set(...cameraRotation);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [camera, cameraPosition, cameraRotation, fov]); // Include all props in the dependency array

  return null; // This component does not render anything
};

export default CameraControl;
