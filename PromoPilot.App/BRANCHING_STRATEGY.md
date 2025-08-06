# Git Branching Strategy & Workflow

## Branch Structure

Our repository follows a **GitFlow-inspired** branching strategy optimized for web application development:

### 🌟 **Main Branches**

#### `master` (Main/Stable)
- **Purpose**: Production-ready code
- **Protection**: Protected branch, requires PR approval
- **Deployment**: Automatically deploys to production environment
- **Merge Source**: Only from `production` branch via PR

#### `production` 
- **Purpose**: Production staging and release preparation
- **Protection**: Protected branch, requires PR approval  
- **Testing**: Final production testing and smoke tests
- **Merge Source**: Only from `qa` branch via PR

#### `qa` (Quality Assurance)
- **Purpose**: Quality assurance testing and validation
- **Testing**: Full regression testing, user acceptance testing
- **Environment**: QA/Staging environment deployment
- **Merge Source**: Only from `develop` branch via PR

#### `develop` (Development Integration)
- **Purpose**: Integration branch for ongoing development
- **Testing**: Automated tests, basic integration testing
- **Environment**: Development environment deployment
- **Merge Source**: Feature branches via PR

### 🚀 **Supporting Branches**

#### `feature/*` (Feature Development)
- **Naming**: `feature/feature-name` or `feature/ticket-number`
- **Purpose**: Individual feature development
- **Lifespan**: Temporary (deleted after merge)
- **Branch From**: `develop`
- **Merge To**: `develop`

#### `hotfix/*` (Emergency Fixes)
- **Naming**: `hotfix/issue-description`
- **Purpose**: Critical production fixes
- **Branch From**: `master`
- **Merge To**: `master`, `develop`, and active release branches

#### `release/*` (Release Preparation)
- **Naming**: `release/v1.0.0`
- **Purpose**: Release preparation and final testing
- **Branch From**: `develop`
- **Merge To**: `master` and `develop`

## 🔄 **Workflow Process**

### 1. Feature Development
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Work on feature...
git add .
git commit -m "feat: add user authentication system"
git push origin feature/user-authentication

# Create PR: feature/user-authentication → develop
```

### 2. QA Testing
```bash
# After feature merge to develop
git checkout qa
git pull origin qa
git merge develop
git push origin qa

# Deploy to QA environment for testing
```

### 3. Production Release
```bash
# After QA approval
git checkout production
git pull origin production
git merge qa
git push origin production

# Deploy to production staging
# After final approval
git checkout master
git merge production
git push origin master

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 4. Hotfix Process
```bash
# Emergency fix needed
git checkout master
git pull origin master
git checkout -b hotfix/critical-security-fix

# Make fix...
git add .
git commit -m "fix: resolve critical security vulnerability"
git push origin hotfix/critical-security-fix

# Create PR: hotfix/critical-security-fix → master
# After merge, also merge to develop
git checkout develop
git merge master
git push origin develop
```

## 📋 **PR Requirements & Guidelines**

### Pull Request Rules
- **All branches**: Require PR for merges (no direct pushes)
- **Code Review**: Minimum 1 reviewer approval required
- **Automated Tests**: Must pass all CI/CD checks
- **Branch Protection**: `master`, `production`, `qa` are protected

### PR Templates
- **Feature PRs**: Include feature description, testing notes
- **Hotfix PRs**: Include issue description, impact assessment
- **Release PRs**: Include changelog, deployment notes

### Commit Message Convention
```
type(scope): description

feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: test additions/modifications
chore: maintenance tasks
```

## 🏷️ **Versioning Strategy**

### Semantic Versioning (SemVer)
- **MAJOR**: Breaking changes (v2.0.0)
- **MINOR**: New features, backwards compatible (v1.1.0)
- **PATCH**: Bug fixes, backwards compatible (v1.0.1)

### Release Tags
- Format: `v1.0.0`
- Created on `master` branch after production deployment
- Include release notes and changelog

## 🚨 **Emergency Procedures**

### Rollback Process
```bash
# Immediate rollback
git checkout master
git revert HEAD~1
git push origin master

# Or rollback to specific version
git checkout master
git reset --hard v1.0.0
git push --force-with-lease origin master
```

### Branch Recovery
```bash
# If develop branch has issues
git checkout master
git checkout -b develop-recovery
git push origin develop-recovery

# Coordinate with team before replacing develop
```

## 🔧 **Local Development Setup**

### Initial Setup
```bash
git clone https://github.com/danharap/PromoPilot.git
cd PromoPilot
git checkout develop
npm install
```

### Daily Development
```bash
# Start of day - sync with remote
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-new-feature

# End of day - push progress
git add .
git commit -m "wip: progress on new feature"
git push origin feature/my-new-feature
```

## 📊 **Branch Status & Environments**

| Branch | Environment | Auto-Deploy | Purpose |
|--------|-------------|-------------|---------|
| `master` | Production | ✅ | Live application |
| `production` | Staging | ✅ | Pre-production testing |
| `qa` | QA/Test | ✅ | Quality assurance |
| `develop` | Development | ✅ | Integration testing |
| `feature/*` | Local | ❌ | Feature development |

---

**Questions?** Reach out to the development team or check our project documentation.
