import { BorrowingInterface } from "./BorrowingInterface";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  gender: "MALE" | "FEMALE";
  address?: string;
  phone?: string;
  borrowing: BorrowingInterface[] | null;
}
