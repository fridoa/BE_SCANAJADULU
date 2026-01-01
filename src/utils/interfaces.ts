export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
  name?: string;
  sku?: string;
  startDate?: string;
  endDate?: string;
}
