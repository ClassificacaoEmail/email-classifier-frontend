export type Email = {
  id: string;
  sender: string;
  subject: string;
  body: string;
};

export type ClassificationResult = {
  emailId: string;
  category: string;
  confidence: number;
};

export type ResponseSuggestion = {
  emailId: string;
  suggestions: string[];
};