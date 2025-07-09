
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProContextType {
  isPro: boolean;
  unlockPro: (password: string) => boolean;
  lockPro: () => void;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

const PRO_PASSWORD = "toolsIA2024pro"; // Senha para acesso PRO

export const ProProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    // Verificar se já está desbloqueado no localStorage
    const proStatus = localStorage.getItem('toolsIA_pro_unlocked');
    if (proStatus === 'true') {
      setIsPro(true);
    }
  }, []);

  const unlockPro = (password: string): boolean => {
    console.log('Tentativa de desbloqueio PRO com senha:', password);
    
    if (password === PRO_PASSWORD) {
      setIsPro(true);
      localStorage.setItem('toolsIA_pro_unlocked', 'true');
      console.log('PRO desbloqueado com sucesso!');
      return true;
    }
    
    console.log('Senha incorreta para desbloqueio PRO');
    return false;
  };

  const lockPro = () => {
    setIsPro(false);
    localStorage.removeItem('toolsIA_pro_unlocked');
    console.log('PRO bloqueado');
  };

  return (
    <ProContext.Provider value={{ isPro, unlockPro, lockPro }}>
      {children}
    </ProContext.Provider>
  );
};

export const usePro = () => {
  const context = useContext(ProContext);
  if (context === undefined) {
    throw new Error('usePro must be used within a ProProvider');
  }
  return context;
};

// Mantém compatibilidade com useProContext
export const useProContext = usePro;
