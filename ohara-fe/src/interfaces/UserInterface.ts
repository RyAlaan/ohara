import { BorrowingInterface } from "./BorrowingInterface";

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  email_verified_at: any;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
  user_detail: UserDetailInterface | null;
  borrowing: BorrowingInterface[] | null;
}

export interface UserDetailInterface {
  id: number;
  user_id: number;
  gender: "male" | "female";
  profile: string | null;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}
