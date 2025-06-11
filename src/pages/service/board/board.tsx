import { useRef, useState } from 'react'
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
    const page = 0
    const size = 100
    const sort = 'createdAt,desc'
    const [searchKeyword, setSearchKeyword] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const { data } = useQuery({
        queryKey: ['boards', searchKeyword],
        queryFn: () => getBoards(page, size, sort, searchKeyword),
    })

    function searchBoard() {
        const keyword = inputRef.current?.value || ''
        setSearchKeyword(keyword)
    }

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
                                placeholder="제목"
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                ref={inputRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchBoard()
                                    }
                                }}
                            />
                            <button
                                onClick={searchBoard}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                            >
                                검색
                            </button>
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
