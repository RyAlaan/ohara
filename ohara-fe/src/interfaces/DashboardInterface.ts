import { BookInterface } from "./BookInterface";

export interface DashboardInterface {
  categories: DashboardCategories;
  users: DashboardUsers;
  borrowings: DashboardBorrowings;
  borrowingThisWeek: any;
  borrowingConfirmation: {
    id: string;
    user_id: number;
    book_id: string;
    exp_date: string;
    start_date: string | null;
    end_date: string | null;
    status: string;
    fine: string | number | null;
    created_at: string;
    updated_at: string;
  }[];
  booksData: BookInterface[];
}

export interface DashboardCategories {
  totalCategories: number;
  data: { id: number; label: string; value: number }[];
}

export interface DashboardUsers {
  usersPercentage: number;
  totalUsers: number;
}

export interface DashboardBorrowings {
  borrowingPercentage: number;
  totalBorrowing: number;
  borrowingTarget: number;
}
