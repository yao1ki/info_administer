export interface FruitItem {
    id?: number;
    breed: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface FruitItem {
    breed: string;
    id: number;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Admin {
    id?: number;
    breed: string;
    auth: 0;
    status?: boolean;
    company_id?: number;
    created_at?: string;
    updated_at?: string;
  }