//LoadingQueueContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context shape
interface LoadingQueueContextType {
  queue: string[];
  addToQueue: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const LoadingQueueContext = createContext<LoadingQueueContextType | undefined>(undefined);

export const useLoadingQueue = (): LoadingQueueContextType => {
  const context = useContext(LoadingQueueContext);
  if (!context) {
    throw new Error("useLoadingQueue must be used within a LoadingQueueProvider");
  }
  return context;
};

interface LoadingQueueProviderProps {
  children: ReactNode;
}

export const LoadingQueueProvider: React.FC<LoadingQueueProviderProps> = ({ children }) => {
  const [queue, setQueue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToQueue = (url: string) => {
    setQueue((prev) => [...prev, url]);
  };

  

  return (
    <LoadingQueueContext.Provider value={{ queue, addToQueue, isLoading, setIsLoading }}>
      {children}
    </LoadingQueueContext.Provider>
  );
};
