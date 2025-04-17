import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { ErrorResponse } from '@/api/axios.ts'
import { createComment } from '@/api/comment.ts'
import { CommentInfo } from '@/pages/service/schema/comment-info-schema.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type CommentProps = {
    targetDate: string
}

export default function CommentCreate({ targetDate }: CommentProps) {
    const { register, handleSubmit, reset } = useForm<CommentInfo>()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        nickName: '',
    })
    const mutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            alert('댓글이 정상적으로 등록되었습니다.')
            reset({
                content: '',
            })
            queryClient
                .invalidateQueries({
                    queryKey: ['comments', targetDate],
                })
                .then()
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            if (error.response?.status === 403) {
                alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
                navigate('/auth/login')
            } else {
                alert('댓글 등록에 실패했습니다.' + error)
            }
        },
    })
    const onSubmit = (data: CommentInfo) => {
        mutation.mutate({
            ...data,
            targetDate,
        })
    }
    useEffect(() => {
        const storedData = localStorage.getItem('userData')
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData)
                setUserData({
                    nickName: parsedData.nickName,
                })
            } catch (error) {
                alert(error)
            }
        }
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 border-t border-gray-200 pt-4 space-y-3"
        >
            <h4 className="text-sm font-semibold text-gray-700">💬 댓글 작성</h4>
            <div className="flex flex-col sm:flex-row gap-2">
                {userData?.nickName && (
                    <input
                        type="text"
                        value={userData.nickName}
                        readOnly
                        className="flex-shrink-0 sm:w-32 border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                    />
                )}
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
