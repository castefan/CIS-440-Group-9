# Anonymous Feedback System
**Conner Stefan - CIS440**

## Complete Working Project - All Features Included

### Features:
1. **Alert When Feedback Is Read** - Employees notified when managers read feedback
2. **Save Feedback Draft** - Auto-save drafts, resume later
3. **Anonymous Follow-Up Questions** - Ask questions on your feedback after it's read

## Quick Start

1. **Extract this folder**
2. **Open terminal in this folder**
3. **Run:**
   ```bash
   npm install
   node server.js
   ```

## URLs

- **Employee Submit Feedback:** http://localhost:3000/
- **View My Submissions:** http://localhost:3000/submissions
- **Manager Dashboard (Mark as Read):** http://localhost:3000/dashboard
- **Manager Answer Questions:** http://localhost:3000/manager

## How It Works

### Employee Flow:
1. Go to http://localhost:3000
2. Type feedback (auto-saves every 30 seconds)
3. Click Submit or Save Draft
4. Go to "View My Submissions" to see YOUR feedback
5. Once manager marks it as "Read", ask follow-up questions

### Manager Flow:
1. Go to http://localhost:3000/dashboard
2. See all feedback submissions
3. Click "Mark as Read" on unread feedback
4. Go to "Answer Questions" tab to respond to employee questions

## File Structure
- server.js - Main server
- feedbackAlertRoutes.js - Feedback & alerts API
- feedbackDraftRoutes.js - Draft save/load API
- followUpRoutes.js - Follow-up questions API
- index.html - Main page
- viewSubmissions.html - Employee submissions view
- managerDashboard.html - Manager view all feedback
- managerView.html - Manager answer questions

Created by Conner Stefan - CIS440
