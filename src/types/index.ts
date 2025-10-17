/**
 * Investment calculation input parameters
 */
export interface InvestmentInput {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
}

/**
 * Yearly investment calculation result
 */
export interface InvestmentYearData {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalInvested: number;
}

/**
 * Complete investment calculation results
 */
export interface InvestmentResults {
  yearlyData: InvestmentYearData[];
  summary: {
    totalInvested: number;
    totalInterest: number;
    finalValue: number;
    totalReturn: number;
  };
}

/**
 * Investment scenario for comparison
 */
export interface InvestmentScenario {
  id: string;
  name: string;
  input: InvestmentInput;
  results: InvestmentResults;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
}

/**
 * Form validation error
 */
export interface FormError {
  field: string;
  message: string;
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Chart data point for visualization
 */
export interface ChartDataPoint {
  year: number;
  value: number;
  invested: number;
  interest: number;
}

/**
 * Portfolio breakdown data
 */
export interface PortfolioBreakdown {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

/**
 * Export format options
 */
export type ExportFormat = 'pdf' | 'csv' | 'json';

/**
 * Investment template types
 */
export type InvestmentTemplate = 
  | 'retirement'
  | 'college-fund'
  | 'emergency-fund'
  | 'house-down-payment'
  | 'vacation-fund'
  | 'custom';

/**
 * Investment template configuration
 */
export interface InvestmentTemplateConfig {
  id: InvestmentTemplate;
  name: string;
  description: string;
  defaultInput: Partial<InvestmentInput>;
  suggestedDuration: number;
  icon: string;
}

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: string;
  description: string;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

/**
 * App configuration
 */
export interface AppConfig {
  theme: ThemeConfig;
  accessibility: AccessibilityConfig;
  shortcuts: KeyboardShortcut[];
  defaultCurrency: string;
  defaultLocale: string;
}
