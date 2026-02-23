// Conner Stefan - CIS440
class FeedbackDraftService {
  constructor() {
    this.drafts = new Map();
  }

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

  async getDraft(employeeId) {
    return this.drafts.get(employeeId) || null;
  }

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

  async deleteDraft(employeeId) {
    const draft = this.drafts.get(employeeId);
    this.drafts.delete(employeeId);
    return draft;
  }

  async hasDraft(employeeId) {
    return this.drafts.has(employeeId);
  }
}

module.exports = FeedbackDraftService;
