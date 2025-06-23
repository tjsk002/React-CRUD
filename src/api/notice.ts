import { api } from '@/api/axios.ts'

const ENDPOINT_NOTICES = '/api/notices'

export const getNotices = async () => {
    const response = await api.get(ENDPOINT_NOTICES)
    return response.data.resultData.data.list
}

export const getNoticeDetail = async (noticeId: number) => {
    const response = await api.get(`${ENDPOINT_NOTICES}/${noticeId}`)
    console.log(response.data)
    return response.data.resultData.data
}
