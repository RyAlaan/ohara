import { AuthorInterface } from "./AuthorInterface";
import { BorrowingInterface } from "./BorrowingInterface";
import { CategoryInterface } from "./CategoryInterface";

export interface BookInterface {
  id: string;
  ISBN: string;
  title: string;
  synopsis: string;
  publisher: string;
  cover: string;
  stock: number;
  release_date: string;
  authors?: AuthorInterface[];
  categories?: CategoryInterface[];
  borrowing?: BorrowingInterface[];
  CreatedAt: string;
  UpdatedAt: string;
}
