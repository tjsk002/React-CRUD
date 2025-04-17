import { api } from '@/api/axios.ts'
import { CommentInfo } from '@/pages/service/schema/comment-info-schema.tsx'

const ENDPOINT_API_USERS = '/api/users'

export const getComments = async (page: number, date: string) => {
    const response = await api.get(`${ENDPOINT_API_USERS}/comments`, {
        params: {
            date: date,
            page: page,
        },
    })
    return response.data
}

export const createComment = async (data: CommentInfo) => {
    const response = await api.post(`${ENDPOINT_API_USERS}/comments`, {
        ...data,
    })
    return response.data.resultData.data
}
