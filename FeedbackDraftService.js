// Conner Stefan - CIS440
// Save Feedback Draft feature

class FeedbackDraftService {
  constructor() {
    this.drafts = new Map(); // Conner Stefan - store drafts in memory
  }

  // Conner Stefan - save draft
  async saveDraft(employeeId, content) {
    const draft = {
      id: Date.now().toString(),
      employeeId: employeeId,
      content: content,
      savedAt: new Date(),
      lastModified: new Date()
    };

    this.drafts.set(employeeId, draft);
    return draft;
  }

  // Conner Stefan - get draft for employee
  async getDraft(employeeId) {
    return this.drafts.get(employeeId) || null;
  }

  // Conner Stefan - update existing draft
  async updateDraft(employeeId, content) {
    const existingDraft = this.drafts.get(employeeId);
    
    if (existingDraft) {
      existingDraft.content = content;
      existingDraft.lastModified = new Date();
      this.drafts.set(employeeId, existingDraft);
      return existingDraft;
    }
    
    return await this.saveDraft(employeeId, content);
  }

  // Conner Stefan - delete draft
  async deleteDraft(employeeId) {
    const draft = this.drafts.get(employeeId);
    this.drafts.delete(employeeId);
    return draft;
  }

  // Conner Stefan - check if draft exists
  async hasDraft(employeeId) {
    return this.drafts.has(employeeId);
  }
}

module.exports = FeedbackDraftService;