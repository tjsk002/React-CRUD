export interface ApiResponse<T> {
    resultCode: string
    resultData: ApiData<T>
    resultMessage: string
}

interface ApiData<T> {
    content: T
    pageInfo?: {
        pageNumber: number
        pageSize: number
        totalElements: number
        totalPages: number
    }
}

export interface ErrorResponse {
    resultCode: string
    resultMessage: string
}
