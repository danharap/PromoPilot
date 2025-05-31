# PromoPilot – AI-Powered Social Media Promotion Dashboard

A React-based front-end application that helps small businesses automate their social media marketing using AI-generated content.

## Features

- **Personalized Dashboard**: View post performance metrics and upcoming scheduled posts
- **Multi-Platform Publishing**: Create and schedule posts across Instagram, TikTok, Reddit, and Twitter/X
- **Campaign Management**: Organize posts into themed campaigns
- **Analytics**: Track engagement rates, reach, and conversion metrics
- **AI-Powered Content**: Get AI suggestions for captions and content ideas
- **Business Settings**: Configure platform integrations and brand voice preferences

## Tech Stack

- **React 18** with functional components and hooks
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side navigation
- **Lucide React** for beautiful icons
- **Responsive Design** optimized for desktop and mobile

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danharap/PromoPilot.git
   cd PromoPilot
   ```

2. Switch to the develop branch for latest features:
   ```bash
   git checkout develop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Git Workflow & Branching

This project follows a structured Git branching strategy for organized development:

### Branch Structure
- **`master`** - Production-ready code (protected)
- **`production`** - Production staging and release preparation
- **`qa`** - Quality assurance testing and validation
- **`develop`** - Development integration branch (default for new features)
- **`feature/*`** - Individual feature development branches

### Quick Start for Contributors
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Make changes, then push
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# Create Pull Request: feature/your-feature-name → develop
```

📋 **For detailed workflow guidelines, see [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md)**

## Project Structure

The application follows a modular React architecture with clean separation of concerns:

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Customizable button component
│   ├── Card.jsx        # Container card component
│   └── Input.jsx       # Form input component
├── layouts/            # Layout wrapper components
│   ├── Header.jsx      # Top navigation and user menu
│   ├── Sidebar.jsx     # Side navigation menu
│   └── MainLayout.jsx  # Main layout wrapper
├── pages/              # Individual page components
│   ├── Dashboard.jsx   # Main dashboard view
│   ├── CreatePost.jsx  # Post creation interface
│   ├── ScheduledPosts.jsx # Posts management
│   ├── Campaigns.jsx   # Campaign management
│   ├── Analytics.jsx   # Performance analytics
│   ├── Settings.jsx    # User settings
│   └── SignIn.jsx      # Authentication page
├── data/               # Mock data and business logic
│   ├── mockUser.js     # User profile and stats
│   └── mockPosts.js    # Posts and platform data
├── styles/             # CSS stylesheets
│   └── index.css       # Global styles and Tailwind
└── App.js              # Main application router
```

### Architecture Benefits
- **Modularity**: Each component has a single responsibility
- **Reusability**: UI components can be used across multiple pages
- **Maintainability**: Easy to locate and modify specific functionality
- **Scalability**: Simple to add new features and components

## Features Overview

### Authentication
- Simple sign-in page with form validation
- Mock authentication for development

### Dashboard
- Welcome message with business name
- Key performance metrics cards
- Upcoming posts table with platform indicators

### Create Post
- Rich text editor for captions
- Multi-platform selection
- File upload for media
- Scheduling options (immediate or future)
- Live preview for each platform

### Campaigns
- Organize posts into themed collections
- Track campaign performance
- Manage multiple campaigns simultaneously

### Scheduled Posts
- View all scheduled and posted content
- Filter by platform and status
- Quick actions (view, edit, delete)

### Analytics
- Performance metrics visualization
- Engagement tracking
- Reach and conversion analytics

### Settings
- Business profile management
- Platform integrations
- Notification preferences
- AI style and voice configuration

## Mock Data

The application uses mock data for development and prototyping. This includes:
- Sample user profile
- Performance statistics
- Scheduled posts
- Campaign data

## Styling

The project uses Tailwind CSS for styling with:
- Responsive design patterns
- Custom color scheme
- Consistent spacing and typography
- Modern card-based layouts

## Development Workflow

### 🌿 **Branching Strategy**
We follow a structured Git workflow with the following branches:

- **`master`** - Production-ready code
- **`production`** - Production staging and release preparation  
- **`qa`** - Quality assurance testing
- **`develop`** - Development integration branch
- **`feature/*`** - Individual feature development

📖 **See [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md) for detailed workflow guidelines.**

### 🚀 **Getting Started with Development**

1. **Clone and setup:**
   ```bash
   git clone https://github.com/danharap/PromoPilot.git
   cd PromoPilot
   git checkout develop
   npm install
   npm start
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # Make your changes
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** to merge into `develop`

### 📋 **Code Standards**
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling consistency
- Write descriptive commit messages
- Ensure responsive design across devices
- Add comments for complex logic

## Contributing

This project welcomes contributions! Please:

1. Read the [branching strategy](./BRANCHING_STRATEGY.md)
2. Create an issue for bugs or feature requests
3. Follow the PR template when submitting changes
4. Ensure all tests pass before submitting

### Future Enhancements
- Backend API integration
- Real platform integrations (Instagram, TikTok, etc.)
- Advanced analytics and reporting
- AI content generation
- User management and authentication system
- Team collaboration features

## License

This project is private and proprietary.
