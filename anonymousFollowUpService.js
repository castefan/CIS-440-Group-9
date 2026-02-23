// Conner Stefan - CIS440
class AnonymousFollowUpService {
  constructor() {
    this.questions = new Map();
  }

  async submitQuestion(feedbackId, question) {
    const followUp = {
      id: Date.now().toString(),
      feedbackId: feedbackId,
      question: question,
      submittedAt: new Date(),
      isAnswered: false,
      answer: null,
      answeredAt: null
    };

    if (!this.questions.has(feedbackId)) {
      this.questions.set(feedbackId, []);
    }
    
    this.questions.get(feedbackId).push(followUp);
    return followUp;
  }

  async getQuestions(feedbackId) {
    return this.questions.get(feedbackId) || [];
  }

  async getUnansweredQuestions() {
    const allQuestions = [];
    this.questions.forEach((questions) => {
      const unanswered = questions.filter(q => !q.isAnswered);
      allQuestions.push(...unanswered);
    });
    return allQuestions;
  }

  async answerQuestion(questionId, answer) {
    let found = null;
    
    this.questions.forEach((questions) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        question.isAnswered = true;
        question.answer = answer;
        question.answeredAt = new Date();
        found = question;
      }
    });
    
    return found;
  }

  async getAllQuestions() {
    const allQuestions = [];
    this.questions.forEach((questions) => {
      allQuestions.push(...questions);
    });
    return allQuestions;
  }
}

module.exports = AnonymousFollowUpService;
