const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const { sequelize } = require('./models');
const path = require('path');
require('dotenv').config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Define port
const PORT = process.env.PORT || 5000;

// Connect to database and sync models
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Sync Sequelize models with database
    await sequelize.sync();
    console.log('Database synced successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
