import { api } from '@/api/axios.ts'
import { AdminInfo, LoginInfo } from '@/pages/admins/auth/schema/auth-info-schema.tsx'

const ENDPOINT_AUTH = '/admin/auth'
const ROLE_ADMIN = 'ADMIN'

export const createProcess = async (data: AdminInfo) => {
    const response = await api.post(`${ENDPOINT_AUTH}/signup`, {
        username: data.username,
        nickName: data.nickName,
        role: ROLE_ADMIN,
        password: data.password,
    })
    return response.data.resultData
}

export const loginProcess = async (data: LoginInfo) => {
    return await api.post(`${ENDPOINT_AUTH}/login`, {
        username: data.username,
        password: data.password,
    })
}

export const logoutProcess = async () => {
    return await api.post(
        `${ENDPOINT_AUTH}/logout`,
        {},
        {
            headers: {
                authorization: localStorage.getItem('accessToken'),
            },
        }
    )
}

export const myInfoProcess = async () => {
    return await api.get(`/admin/my`, {
        headers: {
            authorization: localStorage.getItem('accessToken'),
        },
    })
}
