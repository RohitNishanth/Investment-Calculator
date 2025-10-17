import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserInput } from '../UserInput';
import type { InvestmentInput } from '@/types';

// Mock the investment templates
jest.mock('../../util/investment', () => ({
  ...jest.requireActual('../../util/investment'),
  INVESTMENT_TEMPLATES: {
    retirement: {
      name: 'Retirement Fund',
      description: 'Long-term retirement savings',
      defaultInput: {
        initialInvestment: 10000,
        annualInvestment: 12000,
        expectedReturn: 7,
        duration: 30
      }
    }
  }
}));

const mockInput: InvestmentInput = {
  initialInvestment: 10000,
  annualInvestment: 5000,
  expectedReturn: 6,
  duration: 10
};

const mockValidation = {
  isValid: true,
  errors: []
};

const defaultProps = {
  input: mockInput,
  onInputChange: jest.fn(),
  onMultipleInputChange: jest.fn(),
  validation: mockValidation
};

describe('UserInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(<UserInput {...defaultProps} />);
    
    expect(screen.getByLabelText(/initial investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
  });

  it('displays current input values', () => {
    render(<UserInput {...defaultProps} />);
    
    expect(screen.getByDisplayValue('10000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('calls onInputChange when input values change', async () => {
    const user = userEvent.setup();
    render(<UserInput {...defaultProps} />);
    
    const initialInvestmentInput = screen.getByLabelText(/initial investment/i);
    await user.clear(initialInvestmentInput);
    await user.type(initialInvestmentInput, '15000');
    
    expect(defaultProps.onInputChange).toHaveBeenCalledWith('initialInvestment', 15000);
  });

  it('displays validation errors when input is invalid', () => {
    const invalidValidation = {
      isValid: false,
      errors: ['Initial investment cannot be negative', 'Duration must be at least 1 year']
    };
    
    render(<UserInput {...defaultProps} validation={invalidValidation} />);
    
    expect(screen.getByText(/please fix the following errors/i)).toBeInTheDocument();
    expect(screen.getByText(/initial investment cannot be negative/i)).toBeInTheDocument();
    expect(screen.getByText(/duration must be at least 1 year/i)).toBeInTheDocument();
  });

  it('applies template when template button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserInput {...defaultProps} />);
    
    const templateButton = screen.getByText('Retirement Fund');
    await user.click(templateButton);
    
    expect(defaultProps.onMultipleInputChange).toHaveBeenCalledWith({
      initialInvestment: 10000,
      annualInvestment: 12000,
      expectedReturn: 7,
      duration: 30
    });
  });

  it('shows field descriptions', () => {
    render(<UserInput {...defaultProps} />);
    
    expect(screen.getByText('The amount you start with')).toBeInTheDocument();
    expect(screen.getByText('Amount invested each year')).toBeInTheDocument();
    expect(screen.getByText('Annual percentage return')).toBeInTheDocument();
    expect(screen.getByText('Investment time period')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<UserInput {...defaultProps} />);
    
    const initialInvestmentInput = screen.getByLabelText(/initial investment/i);
    expect(initialInvestmentInput).toHaveAttribute('aria-describedby');
    
    const description = screen.getByText('The amount you start with');
    expect(description).toHaveAttribute('id', 'initialInvestment-description');
  });

  it('handles numeric input correctly', async () => {
    const user = userEvent.setup();
    render(<UserInput {...defaultProps} />);
    
    const expectedReturnInput = screen.getByLabelText(/expected return/i);
    await user.clear(expectedReturnInput);
    await user.type(expectedReturnInput, '8.5');
    
    expect(defaultProps.onInputChange).toHaveBeenCalledWith('expectedReturn', 8.5);
  });

  it('handles zero values correctly', async () => {
    const user = userEvent.setup();
    render(<UserInput {...defaultProps} />);
    
    const annualInvestmentInput = screen.getByLabelText(/annual investment/i);
    await user.clear(annualInvestmentInput);
    await user.type(annualInvestmentInput, '0');
    
    expect(defaultProps.onInputChange).toHaveBeenCalledWith('annualInvestment', 0);
  });
});
