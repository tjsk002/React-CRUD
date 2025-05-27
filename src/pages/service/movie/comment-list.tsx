import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import { getComments } from '@/api/comment.ts'
import { useQuery } from '@tanstack/react-query'

type CommentProps = {
    targetDate: string
}

type CommentListInfo = {
    targetDate: string
    nickName: string
    content: string
    createdAt: string
}

export default function CommentList({ targetDate }: CommentProps) {
    const initPage = 0
    const [currentPage, setCurrentPage] = useState(initPage)
    const { data } = useQuery({
        queryKey: ['comments', targetDate, currentPage],
        queryFn: () => getComments(currentPage, targetDate),
    })

    const handlePageChange = (page: { selected: number }) => {
        setCurrentPage(page.selected)
    }

    return (
        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">댓글</h4>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {data?.comment.length > 0 ? (
                    data.comment
                        .filter(
                            (commentData: CommentListInfo) => commentData.targetDate === targetDate
                        )
                        .map((commentData: CommentListInfo, index: number) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-gray-700">
                                        {commentData.nickName}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(commentData.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-800 text-sm">{commentData.content}</p>
                            </div>
                        ))
                ) : (
                    <p className="text-gray-500 text-sm">
                        아직 댓글이 없어요. 첫 댓글을 남겨보세요!
                    </p>
                )}
            </div>
            {data?.comment.length > 0 && (
                <ReactPaginate
                    pageCount={data?.pageInfo.totalPages || 0}
                    pageRangeDisplayed={10}
                    marginPagesDisplayed={1}
                    breakLabel={'...'}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                    containerClassName={'pagination'}
                    activeClassName={'current-page'}
                    previousClassName={'pageLabel-btn'}
                    nextClassName={'pageLabel-btn'}
                />
            )}
        </div>
    )
}
