import { useState } from 'react'

import { getMovies } from '@/api/movie.ts'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import SubHeader from '@/pages/common/sub-header.tsx'
import CommentList from '@/pages/service/comment-list.tsx'
import CommentForm from '@/pages/service/comment.tsx'
import { useQuery } from '@tanstack/react-query'

type movieListInfo = {
    rnum: string // 순번
    rank: string // 해당 날짜의 박스 오피스 순위
    rankInten: string // 전일 대비 순위의 증감분
    rankOldAndNew: string // 랭킹 신규 진입여부 old(기준), new(신규)
    movieCd: string // 영화의 대표 코드
    movieNm: string // 영화명(국문)
    openDt: string // 영화 개봉일
    salesAmt: string // 해당일 매출액
    salesShare: string // 해당일자 상영작의 매출 총액 대비 해당 영화의 매출 비율
    salesInten: string // 전일 대비 매출액 증감분
    salesChange: string // 전일 대비 매출액 증감 비율
    salesAcc: string // 누적매출액
    audiCnt: string // 관객수
    audiInten: string // 전일 대비 관객수 증감분
    audiChange: string //전일 대비 관객수 증감 비율
    audiAcc: string // 누적관객수
    scrnCnt: string // 상영한 스크린 수
    showCnt: string // 상영한 횟수
}

export default function Movie() {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    const yesterday = today.toISOString().slice(0, 10)
    const [date, setDate] = useState(yesterday)

    const maxYesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const { data, isLoading } = useQuery({
        queryKey: ['movies', date.replace(/-/g, '')],
        queryFn: () => getMovies(date.replace(/-/g, '')),
    })

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <SubHeader />
            <div className="flex flex-grow pt-20 px-40 gap-8">
                <main className="w-2/3">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">일별 박스오피스</h2>
                        <p className="text-gray-600 mt-1">날짜 기준으로 인기 영화 확인하기</p>
                    </div>
                    <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="date" className="text-gray-700 font-medium">
                                날짜 선택
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                max={maxYesterday}
                                className="border border-gray-300 rounded px-3 py-1 text-sm shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            data?.map((movie: movieListInfo) => (
                                <div
                                    key={movie.rank}
                                    className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-bold text-blue-600">
                                            #{movie.rank}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {movie.movieNm}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                개봉일: {movie.openDt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p className="text-gray-700">
                                            관객수: {parseInt(movie.audiCnt).toLocaleString()}명
                                        </p>
                                        <p className="text-gray-700">
                                            누적: {parseInt(movie.audiAcc).toLocaleString()}명
                                        </p>
                                        <p>
                                            {movie.rankOldAndNew === 'NEW' && (
                                                <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded text-xs">
                                                    신규
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-gray-700">
                                            <span>
                                                스크린: {parseInt(movie.scrnCnt).toLocaleString()}개
                                            </span>
                                        </p>
                                        <p className="text-gray-700">
                                            <span>
                                                상영: {parseInt(movie.showCnt).toLocaleString()}회
                                            </span>
                                        </p>
                                        <p className="text-gray-400">
                                            순위 변화:{' '}
                                            {movie.rankInten == '0'
                                                ? '-'
                                                : Number(movie.rankInten) > 0
                                                  ? `▲${movie.rankInten}`
                                                  : `▼${Math.abs(Number(movie.rankInten))}`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
                <aside className="w-1/3">
                    <div className="sticky top-24 animate-slide-up transition-all duration-500">
                        <CommentForm targetDate={date} />
                        <CommentList targetDate={date} />
                    </div>
                </aside>
            </div>
            <Footer />
        </div>
    )
}
