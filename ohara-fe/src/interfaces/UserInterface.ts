import { BorrowingInterface } from "./BorrowingInterface";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  address?: string;
  phone?: string;
  borrowing: BorrowingInterface[] | null;
}
