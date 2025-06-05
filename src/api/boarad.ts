import { api } from '@/api/axios.ts'
import { CreateBoardInfo } from '@/pages/service/schema/board-schema.tsx'

const ENDPOINT_BOARDS = '/api/boards'

export const getBoards = async (page = 0, size = 100, sort = 'createdAt,desc') => {
    const response = await api.get(`${ENDPOINT_BOARDS}`, {
        params: {
            page,
            size,
            sort,
        },
    })
    return response.data
}

export const createBoard = async (data: CreateBoardInfo) => {
    const response = await api.post(`${ENDPOINT_BOARDS}`, {
        ...data,
    })
    return response.data
}

export const getBoardDetail = async (boardId: number) => {
    const response = await api.get(`${ENDPOINT_BOARDS}/${boardId}`)
    return response.data.resultData.data
}

export const increaseViewCount = async (boardId: number) => {
    const response = await api.post(`${ENDPOINT_BOARDS}/view-count`, {
        boardId: boardId,
    })
    return response.data.resultData.data
}
