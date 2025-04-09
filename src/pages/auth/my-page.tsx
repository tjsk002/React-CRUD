import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { myInfoProcess } from '@/api/auth.ts'
import Header from '@/pages/common/header.tsx'

type MyInfo = {
    id: number
    username: string
    nickName: string
    role: string
    createdAt: string
}

export default function MyPage() {
    const { register, reset } = useForm<MyInfo>()
    const fetchMy = async () => {
        await myInfoProcess()
            .then(async (res) => {
                const adminData = res.data.resultData.data
                const formattedDate = new Intl.DateTimeFormat('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }).format(new Date(adminData.createdAt))

                reset({
                    username: adminData.username,
                    nickName: adminData.nickName,
                    role: adminData.role,
                    createdAt: formattedDate,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchMy().then()
    }, [])

    return (
        <div className="p-4">
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg border">
                    <h2 className="text-3xl font-bold mb-6 text-center">내 정보</h2>
                    <form>
                        <input type="hidden" {...register('username')} />
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="username">
                                이름
                            </label>
                            <input
                                id="username"
                                {...register('username')}
                                className="w-full p-2 border rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="nickName">
                                닉네임
                            </label>
                            <input
                                id="nickName"
                                {...register('nickName')}
                                className="w-full p-2 border rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="nickName">
                                권한
                            </label>
                            <input
                                id="role"
                                {...register('role')}
                                className="w-full p-2 border rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="nickName">
                                생성일
                            </label>
                            <input
                                id="role"
                                {...register('createdAt')}
                                className="w-full p-2 border rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
