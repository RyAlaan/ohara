import { BookInterface } from "@/BookInterface";

export interface AuthorInterface {
  id: number;
  name: string;
  CreatedAt: string;
  UpdatedAt: string;
  book?: BookInterface[];
}
