
export type TaskStatus = 'PENDING' | 'DONE';
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  ownerId?: string,
}

export interface TaskEditable  {
  title: string;
  description?: string;
}
