// Conner Stefan - CIS440
const express = require("express");
const app = express();
const port = 3000;

// Conner Stefan - middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Conner Stefan - import routes
const feedbackAlertRoutes = require('./feedbackAlertRoutes');
const feedbackDraftRoutes = require('./feedbackDraftRoutes');
const followUpRoutes = require('./followUpRoutes');

app.use('/api', feedbackAlertRoutes);
app.use('/api', feedbackDraftRoutes);
app.use('/api', followUpRoutes);

// Conner Stefan - serve pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/submissions', (req, res) => {
  res.sendFile(__dirname + '/viewSubmissions.html');
});

app.get('/manager', (req, res) => {
  res.sendFile(__dirname + '/managerView.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/managerDashboard.html');
});

// Conner Stefan - start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Conner Stefan - CIS440');
});
