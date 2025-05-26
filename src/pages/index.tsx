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

const notices = [
    {
        id: 1,
        title: '새로운 이벤트가 시작되었습니다!',
        url: '/events',
    },
    {
        id: 2,
        title: '사이트 점검 예정 안내',
        url: '/maintenance',
    },
]

export default function Index() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow flex flex-row">
                {/* 게시물 섹션 */}
                <section className="mb-12 w-2/3 pr-8">
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">인기 게시물</h1>
                    <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        {posts.map((post) => (
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
                    <h1 className="text-xl font-semibold text-gray-800 mb-6 mt-6">최신 게시물</h1>
                    <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                        {posts.map((post) => (
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

                {/* 공지사항 섹션 */}
                <section className="w-1/3">
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">공지사항</h1>
                    <div className="bg-white p-6 shadow-sm">
                        <div className="space-y-2">
                            {notices.map((notice) => (
                                <div key={notice.id} className="text-blue-500 hover:underline">
                                    <a href={notice.url}>{notice.title}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
