# 💰 Investment Calculator

A modern, feature-rich investment calculator built with React, TypeScript, and Tailwind CSS. Plan your financial future with comprehensive calculations, beautiful visualizations, and advanced features.

![Investment Calculator](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.4.5-purple.svg)

## ✨ Features

### 🎯 Core Functionality
- **Investment Calculations**: Calculate compound interest with annual contributions
- **Real-time Updates**: See results update as you type
- **Multiple Templates**: Pre-configured scenarios for retirement, college fund, emergency fund, and house down payment
- **Comprehensive Results**: Detailed year-by-year breakdown with summary statistics

### 📊 Data Visualization
- **Interactive Charts**: Beautiful line charts showing investment growth over time
- **Portfolio Breakdown**: Pie charts displaying invested capital vs. interest earned
- **Responsive Design**: Charts adapt to all screen sizes
- **Export Capabilities**: Save charts as images (coming soon)

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support

### 🔧 Advanced Features
- **Form Validation**: Real-time validation with Zod schema
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Loading States**: Beautiful loading spinners and skeleton screens
- **Performance Optimized**: React.memo, useMemo, and useCallback for optimal performance
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/investment-calculator.git
   cd investment-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── Results.tsx
│   └── UserInput.tsx
├── contexts/           # React contexts
│   ├── InvestmentContext.tsx
│   └── ThemeContext.tsx
├── hooks/              # Custom hooks
│   ├── useInvestment.ts
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── types/              # TypeScript type definitions
│   ├── assets.d.ts
│   └── index.ts
├── util/               # Utility functions
│   └── investment.ts
├── App.tsx
├── index.tsx
└── index.css
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #1d4ed8)
- **Secondary**: Green gradient (#10b981 to #059669)
- **Accent**: Yellow gradient (#eab308 to #ca8a04)
- **Neutral**: Gray scale with dark mode variants

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)
- **Monospace**: System fonts (numbers)

### Components
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Clean design with focus states
- **Charts**: Custom styled with consistent theming

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

- Automatic system preference detection
- Manual toggle with smooth transitions
- Persistent user preference in localStorage
- Consistent theming across all components

## ♿ Accessibility

- **WCAG AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **High Contrast Mode**: Support for high contrast displays
- **Reduced Motion**: Respects user motion preferences

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Ensure accessibility compliance
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Recharts](https://recharts.org/) - Charts
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ by [Your Name]**
