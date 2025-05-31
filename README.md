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

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── pages/          # Page components
├── data/               # Mock data for development
├── styles/             # CSS and Tailwind configuration
└── App.js              # Main application component
```

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

## Contributing

This is a front-end prototype. Future enhancements may include:
- Backend API integration
- Real platform integrations
- Advanced analytics
- AI content generation
- User management system

## License

This project is private and proprietary.
