export interface IUserCreate {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserId {
  id: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  updated_at?: Date;
}
