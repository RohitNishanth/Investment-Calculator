import { useState, useCallback, useMemo } from 'react';
import type { InvestmentInput, InvestmentResults, LoadingState } from '@/types';
import { calculateInvestmentResults, validateInvestmentInput } from '../util/investment';

/**
 * Custom hook for managing investment calculations
 */
export function useInvestment(initialInput?: Partial<InvestmentInput>) {
  const [input, setInput] = useState<InvestmentInput>({
    initialInvestment: 10000,
    annualInvestment: 5000,
    expectedReturn: 6,
    duration: 10,
    ...initialInput
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const validation = useMemo(() => validateInvestmentInput(input), [input]);

  const results = useMemo((): InvestmentResults | null => {
    if (!validation.isValid) return null;

    try {
      setLoadingState({ isLoading: true, error: null });
      const calculatedResults = calculateInvestmentResults(input);
      setLoadingState({ isLoading: false, error: null });
      return calculatedResults;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Calculation failed';
      setLoadingState({ isLoading: false, error: errorMessage });
      return null;
    }
  }, [input, validation.isValid]);

  const updateInput = useCallback((field: keyof InvestmentInput, value: number) => {
    setInput(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateMultipleInputs = useCallback((updates: Partial<InvestmentInput>) => {
    setInput(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const resetInput = useCallback(() => {
    setInput({
      initialInvestment: 10000,
      annualInvestment: 5000,
      expectedReturn: 6,
      duration: 10
    });
  }, []);

  return {
    input,
    results,
    loadingState,
    validation,
    updateInput,
    updateMultipleInputs,
    resetInput
  };
}
