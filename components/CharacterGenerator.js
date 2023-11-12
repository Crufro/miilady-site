import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Description from '../components/Description';
import MiiladyViewer from './utils3D/MiiladyViewer';
import styles from '../styles/Home.module.css';
import { LoadingQueueProvider } from '../components/LoadingQueueContext';

const mintCharacter = () => {
  alert("Mint button has been pressed");
};

function CharacterGenerator() {
  const [cameraPosition, setCameraPosition] = useState([4, 0, 8]);
  const targetPosition = [0, 5, 0]; // Set the target position for the camera
  const [traits, setTraits] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateCharacter = async () => {
    setLoading(true);
    const response = await fetch('/api/traits');
    const newTraits = await response.json();
    setTraits(newTraits);
    setLoading(false);
  };

  const debouncedGenerateCharacter = debounce(generateCharacter, 100);

  useEffect(() => {
    // Fetch traits on component mount
    generateCharacter();
  }, []);

  useEffect(() => {
    // Update models when traits change
    const defaultPosition = [0, 0, 0];
    const newModels = traits.map(trait => ({
      url: `/3D/${trait.model_name}`,
      position: defaultPosition
    }));
    setModels(newModels);
  }, [traits]); // Only re-run the effect if traits changes

  return (
    <LoadingQueueProvider>
      <div>
        {loading && <span className={styles.loadingIndicator}>Loading...</span>}

       <MiiladyViewer
        className={styles.MiiladyViewer}
        fov={13}
        models={models}
        cameraPosition={cameraPosition}
        targetPosition={targetPosition} // Use targetPosition instead of cameraRotation
      />

        <Description traits={traits} />

        <div className={styles.buttonContainer}>
          <button 
            onClick={debouncedGenerateCharacter} 
            className={styles.footerRollButton}
            disabled={loading}
          >Roll</button>
          <button 
            onClick={mintCharacter} 
            className={styles.footerMintButton}
          >Mint</button>
        </div>
      </div>
    </LoadingQueueProvider>
  );
}

export default CharacterGenerator;
