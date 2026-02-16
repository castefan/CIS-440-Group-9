// Conner Stefan - CIS440
import React, { useState, useEffect } from 'react';

function FeedbackDraft({ employeeId }) {
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Conner Stefan - load draft on mount
  useEffect(() => {
    loadDraft();
  }, [employeeId]);

  // Conner Stefan - auto save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (content.trim()) {
        saveDraft();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [content]);

  // Conner Stefan - load existing draft
  const loadDraft = async () => {
    try {
      const response = await fetch(`/api/draft/${employeeId}`);
      const data = await response.json();
      
      if (data.success) {
        setContent(data.data.content);
        setLastSaved(new Date(data.data.lastModified));
      }
    } catch (error) {
      console.log('No draft found');
    }
  };

  // Conner Stefan - save draft
  const saveDraft = async () => {
    try {
      const response = await fetch('/api/draft/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, content })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSaved(true);
        setLastSaved(new Date());
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  // Conner Stefan - delete draft
  const deleteDraft = async () => {
    try {
      await fetch(`/api/draft/${employeeId}`, { method: 'DELETE' });
      setContent('');
      setLastSaved(null);
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  return (
    <div className="feedback-draft">
      <h3>Write Your Feedback</h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your feedback... (auto-saves every 30 seconds)"
        rows={10}
        style={{ width: '100%', padding: '10px' }}
      />

      <div className="draft-actions">
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={deleteDraft}>Clear Draft</button>
        
        {isSaved && <span className="saved-indicator">✓ Saved!</span>}
        {lastSaved && (
          <span className="last-saved">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default FeedbackDraft;