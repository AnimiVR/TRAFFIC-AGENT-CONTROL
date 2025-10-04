# Contributing to Agent Mission Control ( AMC )

Thank you for your interest in contributing to Agent Mission Control ( AMC )! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account (for database testing)

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/AnimiVR/TRAFFIC-AGENT-CONTROL.git
   cd TRAFFIC-AGENT-CONTROL
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Database Setup**
   - Create a Supabase project
   - Run the SQL scripts to create tables
   - Add sample data for testing

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint rules (run `npm run lint`)
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Structure
- Use functional components with hooks
- Follow the existing component patterns
- Use Tailwind CSS for styling
- Keep components focused and reusable

### Database Changes
- Always provide SQL migration scripts
- Test database changes thoroughly
- Document schema changes in PR descriptions

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - OS and version
   - Node.js version
   - Browser and version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional Context**
   - Screenshots if applicable
   - Console errors
   - Network requests (if relevant)

## ✨ Feature Requests

When requesting features:

1. **Describe the Problem**
   - What problem does this solve?
   - Who would benefit from this feature?

2. **Propose a Solution**
   - How should this feature work?
   - Any design considerations?

3. **Additional Context**
   - Screenshots or mockups
   - Related issues or discussions

## 🔄 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Changes**
   - Write clean, well-documented code
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### PR Guidelines
- Use descriptive titles
- Include detailed descriptions
- Reference related issues
- Add screenshots for UI changes
- Ensure all checks pass

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write tests for new features
- Aim for good test coverage
- Use descriptive test names
- Test both success and error cases

## 📚 Documentation

### Code Documentation
- Document complex functions
- Use JSDoc for public APIs
- Keep README.md updated
- Document breaking changes

### User Documentation
- Update in-app documentation
- Keep FAQ section current
- Document new features

## 🏗️ Architecture

### Project Structure
```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── landing/           # Landing page components
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── wallet/           # Wallet utilities
│   └── ...               # Other utilities
├── public/               # Static assets
└── ...                   # Configuration files
```

### Key Technologies
- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Wallet**: Solana Web3.js
- **State**: Zustand

## 🎯 Areas for Contribution

### High Priority
- Bug fixes and performance improvements
- Documentation improvements
- Test coverage improvements
- Accessibility enhancements

### Medium Priority
- New mission types
- Enhanced leaderboard features
- Mobile responsiveness improvements
- Additional wallet integrations

### Low Priority
- UI/UX enhancements
- Additional language support
- Advanced analytics features
- Custom themes

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the `/docs` page in the application

## 📄 License

By contributing to Agent Mission Control ( AMC ), you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Agent Mission Control ( AMC )! 🚀
