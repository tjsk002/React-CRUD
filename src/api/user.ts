import { api } from '@/api/axios.ts'
import { MyInfo } from '@/pages/service/schema/my-info-schema.tsx'

const ENDPOINT_AUTH = '/user'

export const myInfoProcess = async () => {
    const response = await api.get(`${ENDPOINT_AUTH}/my`)
    return response.data.resultData.data
}

export const myInfoEdit = async (data: MyInfo) => {
    const response = await api.put(`${ENDPOINT_AUTH}/my`, data)
    return response.data.resultData.data
}
