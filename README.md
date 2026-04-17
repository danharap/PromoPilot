# PromoPilot – AI-Powered Social Media Promotion Dashboard

A React-based front-end application that helps small businesses automate their social media marketing using AI-generated content.

## Features

- **Personalized Dashboard**: View post performance metrics and upcoming scheduled posts
- **Multi-Platform Publishing**: Mastodon is the first live integration; other platforms are planned
- **Campaign Management**: Organize posts into themed campaigns
- **Analytics**: Track engagement rates, reach, and conversion metrics
- **AI-Powered Content**: Get AI suggestions for captions and content ideas
- **Business Settings**: Configure platform integrations and brand voice preferences

## Tech Stack

- **React 18** with functional components and hooks
- **Tailwind CSS** for utility-first styling
- **Supabase** for authentication and data (see [SETUP.md](SETUP.md))
- **Lucide React** for beautiful icons
- **Responsive Design** optimized for desktop and mobile

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd promopilot
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
├── contexts/           # AuthProvider (Supabase session)
├── hooks/              # usePosts, useSettings
├── lib/                # Supabase client
├── services/         # Data access (posts, settings, platforms)
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
- Supabase email/password sign-in and sign-up ([`src/contexts/AuthContext.js`](src/contexts/AuthContext.js))

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

## Contributing

This is a front-end prototype. Future enhancements may include:
- Backend API integration
- Real platform integrations
- Advanced analytics
- AI content generation
- User management system

## License

This project is private and proprietary.
