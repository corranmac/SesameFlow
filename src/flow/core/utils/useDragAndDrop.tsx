import { createContext, useContext, useState, ReactNode } from 'react';

// Type for the context state (type and setter function)
type DnDContextType = [string | null, (type: string | null) => void];

// Create context with a default value of a tuple (null, setter function)
const DnDContext = createContext<DnDContextType>([null, () => {}]);

interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider = ({ children }:DnDProviderProps) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

// Custom hook to access the context
export const useDnD = () => {
  return useContext(DnDContext);
};
