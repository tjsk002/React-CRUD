import { useNavigate } from 'react-router'

import { getBoards, increaseViewCount } from '@/api/boarad.ts'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'

type boardListInfo = {
    id: number
    user: {
        username: string
        nickName: string
    }
    title: string
    content: string
    commentCount: number
    viewCount: number
    createdAt: string
}

export default function Index() {
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ['boards'],
        queryFn: () => getBoards(),
    })

    function boardClick(boardId: number) {
        increaseViewCount(boardId)
            .then(() => {
                boardDetail(boardId)
            })
            .catch(() => {
                boardDetail(boardId)
            })
    }

    function boardDetail(boardId: number) {
        navigate(`/board/${boardId}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow flex flex-row">
                <section className="mb-12 w-2/3 pr-8">
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">인기 게시물</h1>
                    <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        {data?.content?.map((board: boardListInfo) => (
                            <li
                                onClick={() => boardClick(board.id)}
                                key={board.id}
                                className="px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2 max-w-[70%]">
                                        <h2 className="text-lg font-medium text-gray-900 truncate">
                                            {board.title}
                                        </h2>
                                        <span className="text-red-600 font-normal whitespace-nowrap">
                                            [댓글 {board.commentCount}]
                                        </span>
                                        <span className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Eye size={16} />
                                            <span>{board.viewCount}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-6 text-sm text-gray-500 whitespace-nowrap">
                                        <span>
                                            {board.user.nickName} | {board.createdAt}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    )
}
