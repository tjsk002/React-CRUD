import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getBoardDetail } from '@/api/boarad.ts'
import Footer from '@/pages/common/footer'
import Header from '@/pages/common/header'
import { useQuery } from '@tanstack/react-query'

export default function BoardDetail() {
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [isOwner, setOwner] = useState(false)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['boardDetail', boardId],
        queryFn: () => getBoardDetail(Number(boardId)),
    })
    console.log(data)
    useEffect(() => {
        const stored = localStorage.getItem('userData')
        if (stored && data?.user?.userId) {
            const userData = JSON.parse(stored)
            setOwner(userData.id == data.user.userId)
        }
    }, [data])

    if (isLoading) return <div className="pt-28 px-40">로딩 중...</div>
    if (isError) return <div className="pt-28 px-40">게시물을 불러오는 데 실패했습니다.</div>

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <div className="mt-10 flex justify-start mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-md"
                    >
                        목록으로
                    </button>
                </div>
                <section className="bg-white p-6 rounded-md shadow-md">
                    <div className="mb-4 border-b pb-2">
                        <span className="text-gray-500 text-sm">
                            {new Date(data.createdAt).toLocaleDateString()}{' '}
                            {new Date(data.createdAt).toLocaleTimeString()}
                        </span>
                        <h1 className="text-2xl font-bold mt-1">{data.title}</h1>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">작성자 : {data.user.nickName}</span>
                        </div>
                        <div className="space-x-4">
                            <span>
                                조회 수 <b>{data.viewCount}</b>
                            </span>
                            <span>
                                댓글 <b>{data.commentCount}</b>
                            </span>
                        </div>
                    </div>
                    <div
                        className="prose max-w-none text-gray-800 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    ></div>
                    {isOwner && (
                        <div className="mt-10">
                            <a className="py-2 font-xs underline hover:text-blue-600 rounded-md cursor-default">
                                수정하기
                            </a>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    )
}
