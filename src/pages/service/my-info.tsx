import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { myInfoEdit, myInfoProcess } from '@/api/user.ts'
import FormButton from '@/pages/admins/common/form-button.tsx'
import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import { useMutation } from '@tanstack/react-query'

type MyInfo = {
    id: number
    username: string
    nickName: string
    description: string
    gender: string
    isActive: boolean
    role: string
    type: string
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}

export default function MyInfo() {
    const { register, reset, watch, handleSubmit } = useForm<MyInfo>()
    const updatedAt = watch('updatedAt')
    const fetchMy = async () => {
        await myInfoProcess()
            .then(async (res) => {
                reset({
                    id: res.id,
                    username: res.username,
                    nickName: res.nickName,
                    gender: res.gender,
                    isActive: res.isActive,
                    description: res.description,
                    role: res.role,
                    type: res.type,
                    createdAt: parseDate(res.createdAt),
                    updatedAt: parseDate(res.updatedAt),
                })
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    useEffect(() => {
        fetchMy().then()
    }, [])

    function parseDate(data: string) {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }).format(new Date(data))
    }

    const mutation = useMutation({
        mutationFn: myInfoEdit,
        onSuccess: (data: MyInfo) => {
            alert('회원 정보가 수정되었습니다.')
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    id: data.id,
                    nickName: data.nickName,
                    username: data.username,
                    role: data.role,
                })
            )
            window.dispatchEvent(new Event('userData'))
        },
    })
    const onSubmit = (data: MyInfo) => {
        mutation.mutate(data)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="pt-28 px-40 flex-grow">
                <section className="mb-12">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">내 정보</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">사용자 이름: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                                        id="username"
                                        {...register('username')}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">닉네임: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 rounded-md px-3 py-2 text-sm text-gray-500"
                                        id="nickName"
                                        {...register('nickName')}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">성별: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                                        id="gender"
                                        {...register('gender')}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">역할: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                                        id="role"
                                        {...register('role')}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">가입일: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                                        id="createdAt"
                                        {...register('createdAt')}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">최근 수정일: </strong>
                                    <input
                                        className="w-[80%] border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                                        id="updatedAt"
                                        value={updatedAt}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="text-gray-700 font-medium flex items-center mb-2">
                                    <strong className="w-[20%]">계정 상태: </strong>
                                    <label>
                                        <input type="checkbox" {...register('isActive')} /> 활성
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    자기소개
                                </h2>
                                <textarea
                                    className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm text-gray-500"
                                    id="description"
                                    {...register('description')}
                                    style={{ height: '100px' }}
                                />
                            </div>
                            <FormButton mode={'edit'} />
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}
