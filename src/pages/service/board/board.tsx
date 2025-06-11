import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router'

import { getBoards } from '@/api/boarad.ts'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import BoardList from '@/pages/service/board/list.tsx'
import { useQuery } from '@tanstack/react-query'

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
                                <option value="owner">내가쓴 글</option>
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
                    <BoardList boardList={data?.list} />
                </section>
            </main>
            <Footer />
        </div>
    )
}
