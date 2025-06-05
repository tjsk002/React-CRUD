import { api } from '@/api/axios.ts'

const ENDPOINT_AUTH = '/user'

export const myInfoProcess = async () => {
    const response = await api.get(`${ENDPOINT_AUTH}/my`)
    return response.data.resultData.data
}
