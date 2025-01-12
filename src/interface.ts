export interface ITodo {
  name: string;
  status: string;
  priority_level: string;
  category: string;
  start_date: string;
  user: string;
  id: string;
  _id: string;
  description?: string;
  createdAt?: string;
  updatedAt: string;
  __v?: number;
}

export interface IFormdata {
  name: string;
  start_date: string;
  priority_level: string;
  description: string;
  status?: string;
  category?: string;
}
