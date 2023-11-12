import React, { useState, useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame } from '@react-three/fiber';
import { useLoadingQueue } from '../LoadingQueueContext';

const MiiladyModel = ({ url, initialRotation = { x: 0, y: 1.5708, z: 0 } }) => {
  const { isLoading, setIsLoading } = useLoadingQueue();
  const [gltf, setGltf] = useState(null);
  const modelRef = useRef();

  // Load the model
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const loader = new GLTFLoader();
      loader.load(url, (loadedGltf) => {
        setGltf(loadedGltf);
        setIsLoading(false);
      });
    }
  }, [url, isLoading]);

  // Set the initial rotation when the model is loaded
  useEffect(() => {
    if (modelRef.current && gltf) {
      modelRef.current.rotation.set(
        initialRotation.x,
        initialRotation.y,
        initialRotation.z
      );
    }
  }, [gltf, initialRotation]);

  // Rotate the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return gltf ? <primitive ref={modelRef} object={gltf.scene} /> : null;
};

export default MiiladyModel;
