import { api } from '@/api/axios.ts'

const ENDPOINT_NOTICES = '/api/notices'

export const getNotices = async () => {
    const response = await api.get(ENDPOINT_NOTICES)
    return response.data.resultData.data
}

export const getNoticeDetail = async (noticeId: number) => {
    const response = await api.get(`${ENDPOINT_NOTICES}/${noticeId}`)
    return response.data.resultData.data
}

export const increaseViewCount = async (noticeId: number) => {
    const response = await api.post(`${ENDPOINT_NOTICES}/view-count`, {
        noticeId: noticeId,
    })
    return response.data.resultData.data
}
