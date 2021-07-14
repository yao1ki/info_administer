export interface BookItem {
  id?: number;
  author: string;
  name: string;
  category: string;
  intro: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookItem {
  name: string;
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Admin {
  id?: number;
  name: string;
  category: string;
  intro: string;
  auth: 0;
  status?: boolean;
  company_id?: number;
  created_at?: string;
  updated_at?: string;
}
