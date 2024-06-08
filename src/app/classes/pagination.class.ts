import { IPagination } from "../interfaces/pagination.interface";

export class Pagination implements IPagination {
    page: number;
    limit: number;
    private initialPage: number;
    private initialLimit: number;

    constructor(page: number = 1, limit: number = 15) {
        this.page = page;
        this.initialPage = page;
        this.limit = limit;
        this.initialLimit = limit;
    }

    getAsObject(): object {
        return {
            page: this.page,
            limit: this.limit
        };
    }

    reset() {
        this.page = this.initialPage;
        this.limit = this.initialLimit;
    }
}