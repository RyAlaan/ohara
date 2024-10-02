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
  price: number;
  releaseDate: string;
  author?: AuthorInterface[];
  categories?: CategoryInterface[];
  borrowing?: BorrowingInterface[];
  CreatedAt: string;
  UpdatedAt: string;
}
