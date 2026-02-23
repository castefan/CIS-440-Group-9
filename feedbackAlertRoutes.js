// Conner Stefan - CIS440
const express = require('express');
const router = express.Router();

// Conner Stefan - store data
let feedbacks = [
  { id: '1', employeeId: 'emp1', content: 'Great job on the project!', submittedAt: new Date(), isRead: false },
  { id: '2', employeeId: 'emp2', content: 'Need to improve communication', submittedAt: new Date(), isRead: false }
];

let alerts = [];

// Conner Stefan - submit new feedback
router.post('/feedback/submit', (req, res) => {
  const { employeeId, content } = req.body;
  
  const newFeedback = {
    id: Date.now().toString(),
    employeeId: employeeId,
    content: content,
    submittedAt: new Date(),
    isRead: false
  };
  
  feedbacks.push(newFeedback);
  
  res.json({
    success: true,
    message: 'Feedback submitted - Conner Stefan',
    data: newFeedback
  });
});

// Conner Stefan - mark as read
router.post('/feedback/:id/mark-read', (req, res) => {
  const feedback = feedbacks.find(f => f.id === req.params.id);
  
  if (feedback) {
    feedback.isRead = true;
    feedback.readAt = new Date();
    
    const alert = {
      id: Date.now().toString(),
      employeeId: feedback.employeeId,
      message: 'Your feedback has been read!',
      sentAt: new Date()
    };
    alerts.push(alert);
    
    res.json({ success: true, data: feedback });
  } else {
    res.status(404).json({ success: false, message: 'Not found' });
  }
});

// Conner Stefan - get alerts
router.get('/alerts', (req, res) => {
  res.json({ success: true, data: alerts });
});

// Conner Stefan - get feedbacks
router.get('/feedbacks', (req, res) => {
  res.json({ success: true, data: feedbacks });
});

module.exports = router;
