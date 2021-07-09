export interface BookItem {
    id?: number;
    name: string;
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
    auth: 0;
    status?: boolean;
    company_id?: number;
    created_at?: string;
    updated_at?: string;
  }