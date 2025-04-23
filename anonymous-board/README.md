# Anonymous Posting Board

An anonymous posting board where users can create posts, comment, and vote without registration. Features a modern, mobile-friendly design with relaxing colors.

## Features

- Anonymous post creation
- Comment system with "see more" functionality (showing only first 3 comments initially)
- Upvote/downvote system for both posts and comments
- Timestamps for all content
- Modern, mobile-friendly design with relaxing colors
- Fully deployable to Render with built-in PostgreSQL database

## Technology Stack

- **Frontend**: React, Styled Components, Axios
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (production), SQLite (development)
- **ORM**: Sequelize

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository
```
git clone https://github.com/yourusername/anonymous-board.git
cd anonymous-board
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Start the backend server
```
cd ../backend
node server.js
```

5. Start the frontend development server
```
cd ../frontend
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## Deployment

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed instructions on deploying to Render.

## Project Structure

```
anonymous-board/
├── backend/
│   ├── config/         # Database configuration
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   ├── .env            # Environment variables
│   ├── package.json    # Backend dependencies
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── config/     # Frontend configuration
│   │   └── App.js      # Main App component
│   └── package.json    # Frontend dependencies
└── RENDER_DEPLOYMENT.md # Deployment instructions
```

## License

MIT
