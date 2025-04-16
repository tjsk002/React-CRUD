import { useForm } from 'react-hook-form'

import { createComment } from '@/api/comment.ts'
import { CommentInfo } from '@/pages/service/schema/comment-info-schema.tsx'
import { useMutation } from '@tanstack/react-query'

type CommentProps = {
    targetDate: string
}

export default function CommentForm({ targetDate }: CommentProps) {
    const { register, handleSubmit, reset } = useForm<CommentInfo>()
    const mutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            alert('댓글이 정상적으로 등록되었습니다.')
            reset({
                content: '',
            })
        },
        onError: (error) => {
            alert(error)
        },
    })
    const onSubmit = (data: CommentInfo) => {
        mutation.mutate({
            ...data,
            targetDate,
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 border-t border-gray-200 pt-4 space-y-3"
        >
            <h4 className="text-sm font-semibold text-gray-700">💬 댓글 작성</h4>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value="dlatjsdk"
                    readOnly
                    className="flex-shrink-0 sm:w-32 border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                />
                <input
                    type="text"
                    placeholder="내용을 입력하세요"
                    {...register('content')}
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all"
                >
                    등록
                </button>
            </div>
        </form>
    )
}
