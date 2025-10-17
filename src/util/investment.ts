import type { 
  InvestmentInput, 
  InvestmentResults, 
  InvestmentYearData,
  ChartDataPoint,
  PortfolioBreakdown 
} from '@/types';

/**
 * Validates investment input parameters
 * @param input - Investment input parameters
 * @returns Validation result with errors if any
 */
export function validateInvestmentInput(input: InvestmentInput): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (input.initialInvestment < 0) {
    errors.push('Initial investment cannot be negative');
  }

  if (input.annualInvestment < 0) {
    errors.push('Annual investment cannot be negative');
  }

  if (input.expectedReturn < 0 || input.expectedReturn > 100) {
    errors.push('Expected return must be between 0% and 100%');
  }

  if (input.duration < 1 || input.duration > 100) {
    errors.push('Duration must be between 1 and 100 years');
  }

  if (input.initialInvestment === 0 && input.annualInvestment === 0) {
    errors.push('At least one investment amount must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Calculates comprehensive investment results
 * @param input - Investment input parameters
 * @returns Complete investment calculation results
 */
export function calculateInvestmentResults(input: InvestmentInput): InvestmentResults {
  const validation = validateInvestmentInput(input);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.errors.join(', ')}`);
  }

  const { initialInvestment, annualInvestment, expectedReturn, duration } = input;
  const yearlyData: InvestmentYearData[] = [];
  let investmentValue = initialInvestment;
  let totalInvested = initialInvestment;
  let totalInterest = 0;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    totalInvested += annualInvestment;
    totalInterest += interestEarnedInYear;

    const yearData: InvestmentYearData = {
      year: i + 1,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalInvested: totalInvested
    };

    yearlyData.push(yearData);
  }

  const finalValue = investmentValue;
  const totalReturn = ((finalValue - totalInvested) / totalInvested) * 100;

  return {
    yearlyData,
    summary: {
      totalInvested,
      totalInterest,
      finalValue,
      totalReturn
    }
  };
}

/**
 * Converts investment results to chart data format
 * @param results - Investment calculation results
 * @returns Chart data points for visualization
 */
export function convertToChartData(results: InvestmentResults): ChartDataPoint[] {
  return results.yearlyData.map(yearData => ({
    year: yearData.year,
    value: yearData.valueEndOfYear,
    invested: yearData.totalInvested,
    interest: yearData.totalInterest
  }));
}

/**
 * Calculates portfolio breakdown for pie chart
 * @param results - Investment calculation results
 * @returns Portfolio breakdown data
 */
export function calculatePortfolioBreakdown(results: InvestmentResults): PortfolioBreakdown[] {
  const { totalInvested, totalInterest } = results.summary;
  const totalValue = totalInvested + totalInterest;

  return [
    {
      category: 'Invested Capital',
      value: totalInvested,
      percentage: (totalInvested / totalValue) * 100,
      color: '#3b82f6'
    },
    {
      category: 'Interest Earned',
      value: totalInterest,
      percentage: (totalInterest / totalValue) * 100,
      color: '#10b981'
    }
  ];
}

/**
 * Compares multiple investment scenarios
 * @param scenarios - Array of investment scenarios
 * @returns Comparison data
 */
export function compareScenarios(scenarios: InvestmentResults[]): {
  finalValues: number[];
  totalReturns: number[];
  bestScenario: number;
  worstScenario: number;
} {
  const finalValues = scenarios.map(s => s.summary.finalValue);
  const totalReturns = scenarios.map(s => s.summary.totalReturn);
  
  const bestScenario = totalReturns.indexOf(Math.max(...totalReturns));
  const worstScenario = totalReturns.indexOf(Math.min(...totalReturns));

  return {
    finalValues,
    totalReturns,
    bestScenario,
    worstScenario
  };
}

/**
 * Calculates compound annual growth rate (CAGR)
 * @param initialValue - Initial investment value
 * @param finalValue - Final investment value
 * @param years - Number of years
 * @returns CAGR percentage
 */
export function calculateCAGR(initialValue: number, finalValue: number, years: number): number {
  if (initialValue <= 0 || years <= 0) return 0;
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
}

/**
 * Calculates future value with inflation adjustment
 * @param presentValue - Current value
 * @param inflationRate - Annual inflation rate (percentage)
 * @param years - Number of years
 * @returns Inflation-adjusted future value
 */
export function adjustForInflation(presentValue: number, inflationRate: number, years: number): number {
  return presentValue / Math.pow(1 + inflationRate / 100, years);
}

/**
 * Currency formatter with locale support
 */
export class CurrencyFormatter {
  private formatter: Intl.NumberFormat;

  constructor(locale: string = 'en-US', currency: string = 'USD') {
    this.formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  format(value: number): string {
    return this.formatter.format(value);
  }

  formatCompact(value: number): string {
    if (value >= 1000000) {
      return this.format(value / 1000000) + 'M';
    } else if (value >= 1000) {
      return this.format(value / 1000) + 'K';
    }
    return this.format(value);
  }
}

// Default formatter instances
export const formatter = new CurrencyFormatter('en-US', 'USD');
export const indianFormatter = new CurrencyFormatter('en-IN', 'INR');
export const euroFormatter = new CurrencyFormatter('en-EU', 'EUR');

/**
 * Investment templates with predefined configurations
 */
export const INVESTMENT_TEMPLATES = {
  retirement: {
    name: 'Retirement Fund',
    description: 'Long-term retirement savings with moderate risk',
    defaultInput: {
      initialInvestment: 10000,
      annualInvestment: 12000,
      expectedReturn: 7,
      duration: 30
    }
  },
  'college-fund': {
    name: 'College Fund',
    description: 'Education savings for children',
    defaultInput: {
      initialInvestment: 5000,
      annualInvestment: 6000,
      expectedReturn: 6,
      duration: 18
    }
  },
  'emergency-fund': {
    name: 'Emergency Fund',
    description: 'Short-term emergency savings',
    defaultInput: {
      initialInvestment: 1000,
      annualInvestment: 2000,
      expectedReturn: 3,
      duration: 5
    }
  },
  'house-down-payment': {
    name: 'House Down Payment',
    description: 'Savings for home purchase',
    defaultInput: {
      initialInvestment: 5000,
      annualInvestment: 10000,
      expectedReturn: 5,
      duration: 10
    }
  }
} as const;
