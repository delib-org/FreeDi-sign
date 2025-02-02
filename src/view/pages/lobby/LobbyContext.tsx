// LobbyContext.tsx
import { createContext, ReactNode, useState, useContext } from 'react';

// Define the context interface
interface LobbyContextProps {
    showExplanation: boolean;
    setShowExplanation: (show: boolean) => void;
}

// Create the context with default values
export const LobbyContext = createContext<LobbyContextProps>({
    showExplanation: false,
    setShowExplanation: () => { },
});

// Provider component props interface
interface LobbyProviderProps {
    children: ReactNode;
}

// Provider component
export const LobbyProvider = ({ children }: LobbyProviderProps) => {
    const [showExplanation, setShowExplanation] = useState(false);
  
    return (
        <LobbyContext.Provider value={{ showExplanation, setShowExplanation }}>
            {children}
        </LobbyContext.Provider>
    );
};

// Custom hook for using the context
export const useLobby = () => {
    const context = useContext(LobbyContext);
    if (!context) {
        throw new Error('useLobby must be used within a LobbyProvider');
    }
    return context;
};