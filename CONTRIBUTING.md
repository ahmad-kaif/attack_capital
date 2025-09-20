# Contributing to Medical Intake Agent

Thank you for your interest in contributing to the Medical Intake Agent project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git
- Basic knowledge of React and Node.js

### Development Setup

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/medical-intake-agent.git
   cd medical-intake-agent
   ```

2. **Install Dependencies**
   ```bash
   npm run install:all
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

## 📋 Contribution Guidelines

### Code Style

- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code is automatically formatted
- **Conventional Commits**: Use conventional commit messages
- **TypeScript**: Consider using TypeScript for new features

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(ui): add real-time status indicators
fix(api): resolve webhook timeout issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add tests for new features
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   ```

4. **Submit a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

### Code Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Peer Review**: At least one maintainer reviews the code
3. **Feedback**: Address any requested changes
4. **Approval**: Maintainer approves and merges the PR

## 🏗️ Project Structure

```
medical-intake-agent/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── BotForm.jsx
│   │   │   ├── BotsTable.jsx
│   │   │   ├── LogsViewer.jsx
│   │   │   └── DomainPrompt.jsx
│   │   ├── api.js         # API client
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   │   ├── bots.js
│   │   │   ├── logs.js
│   │   │   └── webhooks.js
│   │   └── index.js       # Server entry point
│   └── package.json
├── docs/                  # Documentation
├── tests/                 # Test files
├── README.md
├── CONTRIBUTING.md
└── package.json
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and webhook flows
- **E2E Tests**: Test complete user workflows

### Test Structure

```javascript
// Example test structure
describe('Component Name', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Test implementation
  });

  afterEach(() => {
    // Cleanup
  });
});
```

## 📚 Documentation

### Documentation Standards

- **README**: Keep main README updated
- **Code Comments**: Document complex logic
- **API Docs**: Document all endpoints
- **Component Docs**: Document React components

### Documentation Types

1. **User Documentation**: Installation and usage guides
2. **Developer Documentation**: API and code documentation
3. **Architecture Documentation**: System design and decisions

## 🐛 Bug Reports

### Before Submitting

1. **Check Existing Issues**: Search for similar issues
2. **Reproduce the Bug**: Ensure you can reproduce it consistently
3. **Gather Information**: Collect relevant details

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Node.js Version: [e.g., 18.17.0]
- Browser: [e.g., Chrome, Firefox]

**Additional Context**
Any other relevant information.
```

## ✨ Feature Requests

### Before Submitting

1. **Check Existing Features**: Ensure the feature doesn't already exist
2. **Consider Scope**: Is this feature within the project's scope?
3. **Think About Implementation**: Consider how it might be implemented

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How would you like to see this implemented?

**Alternatives Considered**
Any alternative solutions you've considered.

**Additional Context**
Any other relevant information.
```

## 🏷️ Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated
- [ ] Release notes prepared

## 🤝 Community Guidelines

### Code of Conduct

- **Be Respectful**: Treat everyone with respect
- **Be Constructive**: Provide helpful feedback
- **Be Patient**: Remember that everyone is learning
- **Be Collaborative**: Work together towards common goals

### Communication

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Requests**: For code contributions
- **Email**: For sensitive or private matters

## 📞 Getting Help

### Resources

- **Documentation**: Check the README and inline comments
- **Issues**: Search existing GitHub issues
- **Discussions**: Ask questions in GitHub Discussions
- **Code Review**: Learn from code reviews

### Contact

- **Maintainers**: @maintainer-username
- **Email**: maintainer@example.com
- **Discord**: [Join our Discord server](https://discord.gg/example)

## 🎯 Areas for Contribution

### High Priority

- **Testing**: Add more comprehensive tests
- **Documentation**: Improve documentation
- **Performance**: Optimize performance
- **Accessibility**: Improve accessibility

### Medium Priority

- **UI/UX**: Enhance user interface
- **API**: Add new API endpoints
- **Integration**: Add new integrations
- **Monitoring**: Add monitoring and logging

### Low Priority

- **Refactoring**: Code cleanup and refactoring
- **Dependencies**: Update dependencies
- **Build**: Improve build process
- **Deployment**: Enhance deployment options

## 🏆 Recognition

Contributors will be recognized in:
- **README**: Listed as contributors
- **Releases**: Mentioned in release notes
- **Documentation**: Credited in relevant sections

Thank you for contributing to the Medical Intake Agent project! 🎉
