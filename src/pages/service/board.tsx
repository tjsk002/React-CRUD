import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'

const posts = [
    {
        id: 1,
        title: 'React 19 릴리즈 정리',
        author: 'dev_kim',
        datetime: '2025.05.23 14:30',
        comments: 12,
        likes: 34,
    },
    {
        id: 2,
        title: 'TailwindCSS로 커뮤니티 만들기',
        author: 'frontend_lee',
        datetime: '2025.05.22 09:15',
        comments: 8,
        likes: 22,
    },
    {
        id: 3,
        title: 'Kotlin과 Spring Boot 활용기',
        author: 'backend_choi',
        datetime: '2025.05.21 18:45',
        comments: 5,
        likes: 18,
    },
]

export default function Board() {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState<'popular' | 'recent'>('recent')

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortOption === 'popular') {
            return b.likes - a.likes // 인기순 정렬
        } else {
            return new Date(b.datetime).getTime() - new Date(a.datetime).getTime() // 최신순 정렬
        }
    })

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
                        </div>
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as 'popular' | 'recent')}
                        >
                            <option value="recent">최신순</option>
                            <option value="popular">인기순</option>
                        </select>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">게시물</h1>
                    <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        {sortedPosts.map((post) => (
                            <li
                                key={post.id}
                                className="px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {post.title}{' '}
                                        <span className="text-red-600 font-normal">
                                            [댓글 {post.comments}]
                                        </span>
                                    </h2>
                                    <div className="flex items-center space-x-6 text-sm text-gray-500 whitespace-nowrap">
                                        <span>
                                            {post.author} · {post.datetime}
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
