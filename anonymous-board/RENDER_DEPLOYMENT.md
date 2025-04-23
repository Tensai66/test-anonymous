# Render Deployment Instructions

## Database Setup
1. Create a new PostgreSQL database in your Render dashboard
2. Note the database connection URL provided by Render

## Environment Variables
Set the following environment variables in your Render dashboard:
- `NODE_ENV=production`
- `DATABASE_URL=<your-postgres-connection-string>`
- `PORT=10000` (or any port Render assigns)

## Deployment Steps
1. Push your code to a GitHub repository
2. In Render dashboard, create a new Web Service
3. Connect to your GitHub repository
4. Select the "Node" environment
5. Set the build command: `cd backend && npm install && cd ../frontend && npm install && npm run build`
6. Set the start command: `cd backend && node server.js`
7. Add the environment variables mentioned above
8. Deploy the application

## Project Structure for GitHub
Make sure your GitHub repository has the following structure:
```
anonymous-board/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Notes
- The application is configured to serve the React frontend from the backend in production
- Database migrations will run automatically when the server starts
- All data is stored in Render's PostgreSQL database, no external services required
