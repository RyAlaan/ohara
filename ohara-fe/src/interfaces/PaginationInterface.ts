export interface PaginationInterface {
  perPage: number;
  totalData: number;
  currentPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
}
