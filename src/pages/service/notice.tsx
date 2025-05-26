import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'

const notices = [
    {
        id: 1,
        title: '새로운 이벤트가 시작되었습니다!',
        datetime: '2025.05.20',
        url: '/events',
    },
    {
        id: 2,
        title: '사이트 점검 예정 안내',
        datetime: '2025.05.18',
        url: '/maintenance',
    },
    {
        id: 3,
        title: '회원가입 기능 개선 안내',
        datetime: '2025.05.15',
        url: '/notice/signup-update',
    },
]

export default function Notice() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <h1 className="text-xl font-bold text-gray-800 mb-8">공지사항</h1>
                <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                    {notices.map((notice) => (
                        <a
                            key={notice.id}
                            href={notice.url}
                            className="block px-6 py-4 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    {notice.title}
                                </h2>
                                <span className="text-sm text-gray-500">{notice.datetime}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
