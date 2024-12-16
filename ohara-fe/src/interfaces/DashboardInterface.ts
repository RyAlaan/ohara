import { BookInterface } from "./BookInterface";
import { BorrowingInterface } from "./BorrowingInterface";

export interface DashboardInterface {
  categories: DashboardCategories;
  users: DashboardUsers;
  borrowings: DashboardBorrowings;
  borrowingThisWeek: any;
  borrowingConfirmation: BorrowingInterface[];
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
