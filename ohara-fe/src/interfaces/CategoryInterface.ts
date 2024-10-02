import { BookInterface } from "./BookInterface";

export interface CategoryInterface {
  id: number;
  name: string;
  book?: BookInterface[];
}
