import { useNavigate } from 'react-router'

import { Eye } from 'lucide-react'

type noticeListInfo = {
    id: number
    title: string
    content: string
    viewCount: number
    createdAt: string
}

type CommentProps = {
    noticeList?: []
}

export default function NoticeList({ noticeList }: CommentProps) {
    const navigate = useNavigate()

    function noticeClick(noticeId: number) {
        navigate(`/notice/${noticeId}`)
    }

    return (
        <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            {noticeList?.map((notice: noticeListInfo) => (
                <li className="px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 max-w-[70%]">
                            <span
                                className="text-sm text-gray-900 truncate"
                                onClick={() => noticeClick(notice.id)}
                            >
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
    )
}
