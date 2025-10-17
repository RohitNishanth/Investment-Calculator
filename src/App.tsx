import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { InvestmentProvider } from '@/contexts/InvestmentContext';
import Header from '@/components/Header';
import UserInput from '@/components/UserInput';
import Results from '@/components/Results';
import { useInvestmentContext } from '@/contexts/InvestmentContext';

function AppContent() {
  const {
    input,
    results,
    loadingState,
    validation,
    updateInput,
    updateMultipleInputs
  } = useInvestmentContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <UserInput
          input={input}
          onInputChange={updateInput}
          onMultipleInputChange={updateMultipleInputs}
          validation={validation}
        />

        {validation.isValid && (
          <Results
            results={results}
            loadingState={loadingState}
          />
        )}

        {!validation.isValid && validation.errors.length > 0 && (
          <div className="max-w-4xl mx-auto p-6">
            <div className="card p-8 text-center">
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Please fix the input errors above
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Adjust your investment parameters to see the results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <InvestmentProvider>
            <AppContent />
          </InvestmentProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
