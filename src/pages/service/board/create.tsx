import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { createBoard } from '@/api/boarad.ts'
import Footer from '@/pages/common/footer'
import Header from '@/pages/common/header'
import { CreateBoardInfo, boardSchema } from '@/pages/service/schema/board-schema.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

export default function Create() {
    const { handleSubmit, register } = useForm<CreateBoardInfo>({
        resolver: zodResolver(boardSchema),
    })
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            alert('글이 정상적으로 등록되었습니다.')
            navigate('/board')
        },
        onError: (error) => {
            alert('에러가 발생했습니다. ' + error.message)
        },
    })
    const onSubmit = (data: CreateBoardInfo) => {
        mutation.mutate({ ...data })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <section className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">제목</label>
                            <input
                                type="text"
                                {...register('title')}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">내용</label>
                            <textarea
                                {...register('content')}
                                required
                                rows={10}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                            >
                                등록하기
                            </button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}
