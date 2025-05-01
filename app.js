const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const agentRoutes = require('./routes/agent.routes');
const supervisorRoutes = require('./routes/supervisor.routes');

app.use('/agent', agentRoutes);
app.use('/supervisor', supervisorRoutes);

// Default route
app.get('/', (req, res) => {
  res.redirect('/supervisor/requests');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
