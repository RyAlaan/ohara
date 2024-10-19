import { BookInterface } from "./BookInterface";

export interface CategoryInterface {
  id: string;
  name: string;
  book?: BookInterface[];
}
