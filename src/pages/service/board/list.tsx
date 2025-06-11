import { useNavigate } from 'react-router'

import { increaseViewCount } from '@/api/boarad.ts'
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

type CommentProps = {
    boardList?: []
}

export default function BoardList({ boardList }: CommentProps) {
    const navigate = useNavigate()

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
        <ul className="divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            {boardList?.map((board: boardListInfo) => (
                <li
                    onClick={() => boardClick(board.id)}
                    key={board.id}
                    className="px-6 py-4 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 max-w-[70%]">
                            <span className="text-sm text-gray-900 truncate">{board.title}</span>
                            <span className="text-red-600 text-sm whitespace-nowrap">
                                [댓글 {board.commentCount}]
                            </span>
                            <span className="flex items-center space-x-1 text-sm text-gray-500">
                                <Eye size={16} />
                                <span>{board.viewCount}</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 whitespace-nowrap">
                            <span>
                                {board.user.nickName} |{' '}
                                {new Date(board.createdAt).toLocaleDateString()}
                                {new Date(board.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
