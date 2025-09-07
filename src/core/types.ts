export interface TermsTable {
  id: string;
  korean: string;
  english: string;
  description: string;
  source: string;
  user_id: string;
  category: string;
  embedding: string;
}

export interface UserTable {
  id: string;
  email: string;
  created_at: string;
}
