import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router'

import { getBoards } from '@/api/boarad.ts'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'

type boardListInfo = {
    id: number
    user: {
        username: string
    }
    title: string
    content: string
    commentCount: number
    viewCount: number
    createdAt: string
}

export default function Board() {
    const navigate = useNavigate()
    const token = localStorage.getItem('accessToken')
    const userData = localStorage.getItem('userData')
    const { data } = useQuery({
        queryKey: ['boards'],
        queryFn: () => getBoards(),
    })

    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState<'popular' | 'recent'>('recent')

    function create() {
        if (token && userData) {
            navigate('/board/create')
            return
        }
        alert('로그인 한 사용자만 작성 가능합니다.')
        navigate('/auth/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <section className="mb-12">
                    <div className="flex justify-between mb-6 items-center">
                        <div className="flex items-center space-x-3">
                            <FiSearch className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="검색..."
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                value={sortOption}
                                onChange={(e) =>
                                    setSortOption(e.target.value as 'popular' | 'recent')
                                }
                            >
                                <option value="recent">최신순</option>
                                <option value="popular">인기순</option>
                            </select>
                        </div>
                        <a
                            onClick={create}
                            className="bg-blue-600 hover:bg-blue-700 cursor-default text-white px-4 py-2 rounded-md transition-colors"
                        >
                            글 작성하기
                        </a>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">게시물</h1>
                    <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        {data?.content?.map((board: boardListInfo) => (
                            <li
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
                                            {board.user.username} · {board.createdAt}
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
