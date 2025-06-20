import { api } from '@/api/axios.ts'

export const getNotices = async () => {
    const response = await api.get('/api/notices')
    return response.data.resultData.data.list
}
