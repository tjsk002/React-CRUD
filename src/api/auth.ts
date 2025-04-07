import { api } from '@/api/axios.ts'
import { AdminInfo } from '@/pages/auth/schema/auth-info-schema.tsx'

const ENDPOINT_AUTH = '/auth'
const ROLE_ADMIN = 'ADMIN'

export const createAdmin = async (data: AdminInfo) => {
    const response = await api.post(`${ENDPOINT_AUTH}/signup`, {
        username: data.username,
        nickName: data.nickName,
        role: ROLE_ADMIN,
        password: data.password,
    })
    return response.data.resultData
}
