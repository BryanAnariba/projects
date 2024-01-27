export interface UserResponse {
  totalUsers:  number;
  page:        number;
  limit:       number;
  previusPage: string;
  currentPage: string;
  nextPage:    string;
  users:       User[];
}

export interface User {
  id:        string;
  name:      string;
  email:     string;
  password:  string;
  isActive:  boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
