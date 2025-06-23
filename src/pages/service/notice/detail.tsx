import { useNavigate, useParams } from 'react-router'

import { getNoticeDetail } from '@/api/notice.ts'
import Footer from '@/pages/common/footer'
import Header from '@/pages/common/header'
import { useQuery } from '@tanstack/react-query'

export default function NoticeDetail() {
    const { noticeId } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['noticeDetail', noticeId],
        queryFn: () => getNoticeDetail(Number(noticeId)),
    })
    console.log(data)

    if (isLoading) return <div className="pt-28 px-40">로딩 중...</div>
    if (isError) return <div className="pt-28 px-40">공지사항을 불러오는 데 실패했습니다.</div>

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
                        <div className={'mt-2 mb-2'}>
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-600`}
                            >
                                공지사항
                            </span>
                        </div>
                        <div className="space-x-4">
                            <span>
                                조회 수 <b>{data.viewCount}</b>
                            </span>
                        </div>
                    </div>
                    <div
                        className="prose max-w-none text-gray-800 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    ></div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
