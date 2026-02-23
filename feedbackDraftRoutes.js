// Conner Stefan - CIS440
const express = require('express');
const router = express.Router();
const FeedbackDraftService = require('./FeedbackDraftService');

const draftService = new FeedbackDraftService();

// Conner Stefan - save draft
router.post('/draft/save', async (req, res) => {
  try {
    const { employeeId, content } = req.body;
    
    if (!employeeId || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Employee ID and content required' 
      });
    }

    const draft = await draftService.saveDraft(employeeId, content);
    
    res.json({
      success: true,
      message: 'Draft saved - Conner Stefan',
      data: draft
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - get draft
router.get('/draft/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const draft = await draftService.getDraft(employeeId);
    
    if (!draft) {
      return res.status(404).json({ 
        success: false, 
        message: 'No draft found' 
      });
    }

    res.json({
      success: true,
      data: draft
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - update draft
router.put('/draft/update', async (req, res) => {
  try {
    const { employeeId, content } = req.body;
    
    if (!employeeId || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Employee ID and content required' 
      });
    }

    const draft = await draftService.updateDraft(employeeId, content);
    
    res.json({
      success: true,
      message: 'Draft updated - Conner Stefan',
      data: draft
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Conner Stefan - delete draft
router.delete('/draft/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const draft = await draftService.deleteDraft(employeeId);
    
    res.json({
      success: true,
      message: 'Draft deleted - Conner Stefan',
      data: draft
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;
