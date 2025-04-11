import { api } from '@/api/axios.ts'

const ENDPOINT_MOVIES = '/movies'

export const getMovies = async (date: string) => {
    const response = await api.get(`${ENDPOINT_MOVIES}`, {
        params: {
            date: date,
        },
    })
    return response.data.resultData.data.boxOfficeResult.dailyBoxOfficeList
}
