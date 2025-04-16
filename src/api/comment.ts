import { api } from '@/api/axios.ts'
import { CommentInfo } from '@/pages/service/schema/comment-info-schema.tsx'

const ENDPOINT_API_USERS = '/api/users'

export const getComments = async (date: string) => {
    const response = await api.get(`${ENDPOINT_API_USERS}`, {
        params: {
            date: date,
        },
    })
    return response.data.resultData.data
}

export const createComment = async (data: CommentInfo) => {
    console.log(data)
    const response = await api.post(`${ENDPOINT_API_USERS}/comments`, {
        ...data,
    })
    return response.data.resultData.data
}
