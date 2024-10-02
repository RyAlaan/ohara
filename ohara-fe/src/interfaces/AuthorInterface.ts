import { BookInterface } from "./BookInterface";

export interface AuthorInterface {
  id: number;
  name: string;
  book?: BookInterface[];
}
