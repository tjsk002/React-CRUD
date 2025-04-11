import { api } from '@/api/axios.ts'
import { AuthInfo } from '@/pages/auth/schema/auth-info-schema.tsx'

const ENDPOINT_AUTH = '/auth'

export const createProcess = async (data: AuthInfo) => {
    console.log(data)
    const response = await api.post(`${ENDPOINT_AUTH}/signup`, {
        username: data.username,
        nickName: data.nickName,
        type: 'back',
        isActive: true,
        gender: data.gender,
        password: data.password,
        description: data.description,
    })
    return response.data.resultData
}
