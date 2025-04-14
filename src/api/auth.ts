import { api } from '@/api/axios.ts'
import { LoginInfo } from '@/pages/auth/schema/auth-info-schema.tsx'
import { AuthInfo } from '@/pages/auth/schema/auth-info-schema.tsx'

const ENDPOINT_AUTH = '/auth'

export const createProcess = async (data: AuthInfo) => {
    const response = await api.post(`${ENDPOINT_AUTH}/signup`, {
        username: data.username,
        nickName: data.nickName,
        type: 'back',
        isActive: true,
        gender: data.gender,
        role: 'USER',
        password: data.password,
        description: data.description,
    })
    return response.data.resultData
}

export const loginProcess = async (data: LoginInfo) => {
    const response = await api.post(`${ENDPOINT_AUTH}/login`, {
        username: data.username,
        password: data.password,
    })
    return response.data.resultData
}
