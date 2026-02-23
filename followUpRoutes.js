// Conner Stefan - CIS440
const express = require('express');
const router = express.Router();
const AnonymousFollowUpService = require('./anonymousFollowUpService');

const followUpService = new AnonymousFollowUpService();

// Conner Stefan - submit follow-up question
router.post('/followup/submit', async (req, res) => {
  try {
    const { feedbackId, question } = req.body;
    
    if (!feedbackId || !question) {
      return res.status(400).json({ 
        success: false, 
        message: 'Feedback ID and question required' 
      });
    }

    const followUp = await followUpService.submitQuestion(feedbackId, question);
    
    res.json({
      success: true,
      message: 'Follow-up question submitted - Conner Stefan',
      data: followUp
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - get questions for feedback
router.get('/followup/:feedbackId', async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const questions = await followUpService.getQuestions(feedbackId);
    
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - get all unanswered questions
router.get('/followup/unanswered/all', async (req, res) => {
  try {
    const questions = await followUpService.getUnansweredQuestions();
    
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - answer a question
router.post('/followup/:id/answer', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    
    if (!answer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Answer required' 
      });
    }

    const question = await followUpService.answerQuestion(id, answer);
    
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Question not found' 
      });
    }

    res.json({
      success: true,
      message: 'Question answered - Conner Stefan',
      data: question
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;
