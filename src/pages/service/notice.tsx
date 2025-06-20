import { getNotices } from '@/api/notices.ts'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'

type noticeListInfo = {
    title: string
    content: string
    viewCount: number
    createdAt: string
    updatedAt: string
}

export default function Notice() {
    const { data } = useQuery({
        queryKey: ['notices'],
        queryFn: () => getNotices(),
    })
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <h1 className="text-xl font-bold text-gray-800 mb-8">공지사항</h1>
                <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
                    {data?.map((notice: noticeListInfo) => (
                        <li className="px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2 max-w-[70%]">
                                    <span className="text-sm text-gray-900 truncate">
                                        {notice.title}
                                    </span>
                                    <span className="flex items-center space-x-1 text-sm text-gray-500">
                                        <Eye size={16} />
                                        <span>{notice.viewCount}</span>
                                    </span>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-500 whitespace-nowrap">
                                    <span>
                                        {new Date(notice.createdAt).toLocaleDateString()}
                                        {new Date(notice.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </div>
    )
}
