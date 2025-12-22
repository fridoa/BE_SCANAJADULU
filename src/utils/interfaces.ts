export interface IPaginationQuery {
    page: number;
    limit: number;
    search?: string;
    startDate?: string;
    endDate?: string;
}