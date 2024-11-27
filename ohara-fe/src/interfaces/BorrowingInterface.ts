import { BookInterface } from "./BookInterface";
import { UserInterface } from "./UserInterface";

export interface BorrowingInterface {
  id: string;
  user_id: number;
  book_id: string;
  exp_date: string;
  start_date: string;
  end_date: string;
  status: "awaiting confirmation" | "borrowed" | "lost" | "returned";
  fine: number;
  created_at: string;
  edited_at: string;
  book: BookInterface;
  user: UserInterface;
}
