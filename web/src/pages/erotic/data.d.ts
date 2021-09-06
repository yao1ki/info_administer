export interface GhostItem {
  id?: number;
    name: STRING,
    lifetime:STRING,
    ghost_id:STRING,
    cause:STRING,
    sort:STRING,
    rein,
    rein_name:String,
    state:STRING,
    reason:STRING,
    gnosis:String,
    manager:STRING,
    time_start:string,
    time_end:string,
  servicelife:string,
  titles: string,

    emissary_id:String,
    created_at?: string;
    updated_at?: string;
}
export interface ToolItem {
  id?: number;
  name: string,
  username:String,
  titles: string,
  covers: string,
  desc: string,
  year: string,
  user_id: string,
  servicelife:string,
  created_at?: string;
  updated_at?: string;
}