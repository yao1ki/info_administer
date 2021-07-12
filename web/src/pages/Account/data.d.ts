export interface UserItem {
    id?: number;
    username: string;
    name: string;
    address:string;
    e_mile:string;
    telephone:string;
    password?: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CompanyItem {
    name: string;
    id: number;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Admin {
    id?: number;
    username: string;
    name: string;
    password?: string;
    account?: string;
    email?: string;
    auth: 0;
    status?: boolean;
    company_id?: number;
    created_at?: string;
    updated_at?: string;
  }