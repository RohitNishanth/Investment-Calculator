import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { InvestmentInput } from '@/types';
import { INVESTMENT_TEMPLATES } from '../util/investment';

// Validation schema
const investmentSchema = z.object({
  initialInvestment: z
    .number()
    .min(0, 'Initial investment must be non-negative')
    .max(10000000, 'Initial investment too large'),
  annualInvestment: z
    .number()
    .min(0, 'Annual investment must be non-negative')
    .max(1000000, 'Annual investment too large'),
  expectedReturn: z
    .number()
    .min(0, 'Expected return must be non-negative')
    .max(100, 'Expected return cannot exceed 100%'),
  duration: z
    .number()
    .min(1, 'Duration must be at least 1 year')
    .max(100, 'Duration cannot exceed 100 years')
});

interface UserInputProps {
  input: InvestmentInput;
  onInputChange: (field: keyof InvestmentInput, value: number) => void;
  onMultipleInputChange: (updates: Partial<InvestmentInput>) => void;
  validation: { isValid: boolean; errors: string[] };
  className?: string;
}

const inputFields = [
  {
    key: 'initialInvestment' as keyof InvestmentInput,
    label: 'Initial Investment',
    placeholder: 'Enter initial amount',
    icon: '💰',
    description: 'The amount you start with',
    suffix: '$'
  },
  {
    key: 'annualInvestment' as keyof InvestmentInput,
    label: 'Annual Investment',
    placeholder: 'Enter annual contribution',
    icon: '📈',
    description: 'Amount invested each year',
    suffix: '$'
  },
  {
    key: 'expectedReturn' as keyof InvestmentInput,
    label: 'Expected Return',
    placeholder: 'Enter expected return',
    icon: '📊',
    description: 'Annual percentage return',
    suffix: '%'
  },
  {
    key: 'duration' as keyof InvestmentInput,
    label: 'Duration',
    placeholder: 'Enter investment period',
    icon: '⏰',
    description: 'Investment time period',
    suffix: 'years'
  }
];

export const UserInput = memo(function UserInput({
  input,
  onInputChange,
  onMultipleInputChange,
  validation,
  className = ''
}: UserInputProps) {
  const { register, setValue, formState: { errors } } = useForm<InvestmentInput>({
    resolver: zodResolver(investmentSchema),
    defaultValues: input,
    mode: 'onChange'
  });

  const handleInputChange = useCallback((field: keyof InvestmentInput, value: string) => {
    const numericValue = parseFloat(value) || 0;
    onInputChange(field, numericValue);
    setValue(field, numericValue);
  }, [onInputChange, setValue]);

  const handleTemplateSelect = useCallback((templateKey: keyof typeof INVESTMENT_TEMPLATES) => {
    const template = INVESTMENT_TEMPLATES[templateKey];
    onMultipleInputChange(template.defaultInput);
    Object.entries(template.defaultInput).forEach(([key, value]) => {
      setValue(key as keyof InvestmentInput, value);
    });
  }, [onMultipleInputChange, setValue]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`max-w-4xl mx-auto p-6 ${className}`}
    >
      <motion.div
        variants={itemVariants}
        className="card p-8 mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Investment Parameters
          </h2>
          
          <div className="flex gap-2">
            {Object.entries(INVESTMENT_TEMPLATES).map(([key, template]) => (
              <motion.button
                key={key}
                onClick={() => handleTemplateSelect(key as keyof typeof INVESTMENT_TEMPLATES)}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={template.description}
              >
                {template.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <motion.div
              key={field.key}
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="mr-2">{field.icon}</span>
                {field.label}
              </label>
              
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register(field.key, {
                    valueAsNumber: true,
                    onChange: (e) => handleInputChange(field.key, e.target.value)
                  })}
                  className={`input-field pr-12 ${
                    errors[field.key] ? 'border-red-500 focus:ring-red-500/50' : ''
                  }`}
                  placeholder={field.placeholder}
                  aria-describedby={`${field.key}-description ${field.key}-error`}
                />
                
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                  {field.suffix}
                </div>
              </div>

              <p id={`${field.key}-description`} className="text-xs text-gray-500 dark:text-gray-400">
                {field.description}
              </p>

              {errors[field.key] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id={`${field.key}-error`}
                  className="text-xs text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {errors[field.key]?.message}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {!validation.isValid && validation.errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Please fix the following errors:
            </h3>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
});

export default UserInput;
