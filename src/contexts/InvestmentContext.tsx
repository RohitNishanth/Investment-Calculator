import { createContext, useContext, ReactNode } from 'react';
import { useInvestment } from '@/hooks/useInvestment';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { InvestmentInput, InvestmentScenario } from '@/types';

interface InvestmentContextType {
  // Current investment state
  input: InvestmentInput;
  results: any; // Will be properly typed when we import the type
  loadingState: { isLoading: boolean; error: string | null };
  validation: { isValid: boolean; errors: string[] };
  updateInput: (field: keyof InvestmentInput, value: number) => void;
  updateMultipleInputs: (updates: Partial<InvestmentInput>) => void;
  resetInput: () => void;
  
  // Saved scenarios
  savedScenarios: InvestmentScenario[];
  saveScenario: (name: string) => void;
  loadScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  clearAllScenarios: () => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

interface InvestmentProviderProps {
  children: ReactNode;
}

export function InvestmentProvider({ children }: InvestmentProviderProps) {
  const investmentHook = useInvestment();
  const [savedScenarios, setSavedScenarios] = useLocalStorage<InvestmentScenario[]>('investment-scenarios', []);

  const saveScenario = (name: string) => {
    if (!investmentHook.results) return;

    const newScenario: InvestmentScenario = {
      id: Date.now().toString(),
      name,
      input: investmentHook.input,
      results: investmentHook.results,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSavedScenarios(prev => [...prev, newScenario]);
  };

  const loadScenario = (id: string) => {
    const scenario = savedScenarios.find(s => s.id === id);
    if (scenario) {
      investmentHook.updateMultipleInputs(scenario.input);
    }
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  const clearAllScenarios = () => {
    setSavedScenarios([]);
  };

  const contextValue: InvestmentContextType = {
    ...investmentHook,
    savedScenarios,
    saveScenario,
    loadScenario,
    deleteScenario,
    clearAllScenarios
  };

  return (
    <InvestmentContext.Provider value={contextValue}>
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestmentContext(): InvestmentContextType {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestmentContext must be used within an InvestmentProvider');
  }
  return context;
}
