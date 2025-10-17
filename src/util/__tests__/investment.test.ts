import {
  calculateInvestmentResults,
  validateInvestmentInput,
  convertToChartData,
  calculatePortfolioBreakdown,
  calculateCAGR,
  adjustForInflation,
  CurrencyFormatter
} from '../investment';
import type { InvestmentInput } from '@/types';

describe('Investment Utilities', () => {
  describe('validateInvestmentInput', () => {
    it('should validate correct input', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 5000,
        expectedReturn: 6,
        duration: 10
      };

      const result = validateInvestmentInput(input);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative initial investment', () => {
      const input: InvestmentInput = {
        initialInvestment: -1000,
        annualInvestment: 5000,
        expectedReturn: 6,
        duration: 10
      };

      const result = validateInvestmentInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Initial investment cannot be negative');
    });

    it('should reject invalid expected return', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 5000,
        expectedReturn: 150,
        duration: 10
      };

      const result = validateInvestmentInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Expected return must be between 0% and 100%');
    });

    it('should reject invalid duration', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 5000,
        expectedReturn: 6,
        duration: 0
      };

      const result = validateInvestmentInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Duration must be between 1 and 100 years');
    });
  });

  describe('calculateInvestmentResults', () => {
    it('should calculate correct results for simple case', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 0,
        expectedReturn: 10,
        duration: 2
      };

      const results = calculateInvestmentResults(input);
      
      expect(results.yearlyData).toHaveLength(2);
      expect(results.yearlyData[0].year).toBe(1);
      expect(results.yearlyData[0].valueEndOfYear).toBe(11000); // 10000 * 1.1
      expect(results.yearlyData[1].year).toBe(2);
      expect(results.yearlyData[1].valueEndOfYear).toBe(12100); // 11000 * 1.1
      
      expect(results.summary.totalInvested).toBe(10000);
      expect(results.summary.totalInterest).toBe(2100);
      expect(results.summary.finalValue).toBe(12100);
    });

    it('should calculate results with annual contributions', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 5000,
        expectedReturn: 10,
        duration: 2
      };

      const results = calculateInvestmentResults(input);
      
      expect(results.yearlyData[0].valueEndOfYear).toBe(16500); // (10000 * 1.1) + 5000
      expect(results.yearlyData[1].valueEndOfYear).toBe(23150); // (16500 * 1.1) + 5000
      
      expect(results.summary.totalInvested).toBe(20000); // 10000 + 5000 + 5000
      expect(results.summary.finalValue).toBe(23150);
    });

    it('should throw error for invalid input', () => {
      const input: InvestmentInput = {
        initialInvestment: -1000,
        annualInvestment: 5000,
        expectedReturn: 6,
        duration: 10
      };

      expect(() => calculateInvestmentResults(input)).toThrow('Invalid input');
    });
  });

  describe('convertToChartData', () => {
    it('should convert results to chart data format', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 0,
        expectedReturn: 10,
        duration: 2
      };

      const results = calculateInvestmentResults(input);
      const chartData = convertToChartData(results);

      expect(chartData).toHaveLength(2);
      expect(chartData[0]).toEqual({
        year: 1,
        value: 11000,
        invested: 10000,
        interest: 1000
      });
      expect(chartData[1]).toEqual({
        year: 2,
        value: 12100,
        invested: 10000,
        interest: 2100
      });
    });
  });

  describe('calculatePortfolioBreakdown', () => {
    it('should calculate portfolio breakdown correctly', () => {
      const input: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 0,
        expectedReturn: 10,
        duration: 2
      };

      const results = calculateInvestmentResults(input);
      const breakdown = calculatePortfolioBreakdown(results);

      expect(breakdown).toHaveLength(2);
      expect(breakdown[0].category).toBe('Invested Capital');
      expect(breakdown[0].value).toBe(10000);
      expect(breakdown[1].category).toBe('Interest Earned');
      expect(breakdown[1].value).toBe(2100);
    });
  });

  describe('calculateCAGR', () => {
    it('should calculate CAGR correctly', () => {
      const cagr = calculateCAGR(10000, 12100, 2);
      expect(cagr).toBeCloseTo(10, 1);
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculateCAGR(0, 1000, 5)).toBe(0);
      expect(calculateCAGR(1000, 1000, 0)).toBe(0);
    });
  });

  describe('adjustForInflation', () => {
    it('should adjust for inflation correctly', () => {
      const adjusted = adjustForInflation(1000, 3, 1);
      expect(adjusted).toBeCloseTo(970.87, 2);
    });
  });

  describe('CurrencyFormatter', () => {
    it('should format currency correctly', () => {
      const formatter = new CurrencyFormatter('en-US', 'USD');
      expect(formatter.format(1000)).toBe('$1,000');
    });

    it('should format compact currency correctly', () => {
      const formatter = new CurrencyFormatter('en-US', 'USD');
      expect(formatter.formatCompact(1000000)).toBe('$1,000,000M');
      expect(formatter.formatCompact(1000)).toBe('$1,000K');
      expect(formatter.formatCompact(500)).toBe('$500');
    });
  });
});
