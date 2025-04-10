/**
 * axios로 api 요청 후 usersApiData 반환
 */
import { api } from '@/api/axios.ts'
import { UserInfo } from '@/pages/admins/users/schema/user-info-schema.tsx'

const ENDPOINT_USERS = '/users'

export const getUsers = async (page: number) => {
    const response = await api.get(`${ENDPOINT_USERS}`, {
        params: {
            page: page,
        },
    })
    return response.data.resultData
}

export const deleteUser = async (userId: number) => {
    const response = await api.delete(`${ENDPOINT_USERS}/${userId}`)
    return response.data.resultData
}

export const editUser = async (data: UserInfo) => {
    const response = await api.put(`${ENDPOINT_USERS}/${data.userId}`, {
        userData: {
            ...data,
        },
    })
    return response.data.resultData
}

export const createUser = async (data: UserInfo) => {
    const response = await api.post(`${ENDPOINT_USERS}`, {
        userData: {
            ...data,
        },
    })
    return response.data.refetch
}
