import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

import { api } from '@/api/axios.ts'
import FormButton from '@/pages/common/form-button.tsx'
import Header from '@/pages/common/header.tsx'
import { UserInfo, userInfoSchema } from '@/pages/users/schema/user-info-schema.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

export default function UsersEditPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfo>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: user,
    })

    const mutation = useMutation({
        mutationFn: (data: UserInfo) =>
            api.put(`/users/edit/${data.userId}`, {
                userData: {
                    ...data,
                },
            }),
        onSuccess: () => {
            alert('사용자 정보가 성공적으로 수정되었습니다.')
            navigate('/')
        },
        onError: (error) => {
            alert('오류 발생 ' + error)
        },
    })

    const onSubmit = (data: UserInfo) => {
        mutation.mutate(data)
    }

    return (
        <div className="p-4">
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg border">
                    <h2 className="text-3xl font-bold mb-6 text-center">사용자 수정</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('userId')} />
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="username">
                                * 이름
                            </label>
                            <input
                                id="username"
                                {...register('username')}
                                className="w-full p-2 border rounded mt-1"
                            />
                            <p className="text-red-500">{errors.username?.message}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="nickName">
                                * 닉네임
                            </label>
                            <input
                                id="nickName"
                                {...register('nickName')}
                                className="w-full p-2 border rounded mt-1"
                            />
                            <p className="text-red-500">{errors.nickName?.message}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">성별</label>
                            <div className="flex gap-4">
                                <label>
                                    <input type="radio" value="female" {...register('gender')} />{' '}
                                    Female
                                </label>
                                <label>
                                    <input type="radio" value="male" {...register('gender')} /> Male
                                </label>
                            </div>
                            <p className="text-red-500">{errors.gender?.message}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">상태</label>
                            <div className="flex gap-4">
                                <label>
                                    <input type="checkbox" {...register('isActive')} /> 활성
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">* 유형</label>
                            <select
                                {...register('type')}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="front">Front-end</option>
                                <option value="back">Back-end</option>
                                <option value="dba">DBA</option>
                                <option value="infra">Infra</option>
                            </select>
                            <p className="text-red-500">{errors.type?.message}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="description">
                                설명
                            </label>
                            <textarea
                                id="description"
                                {...register('description')}
                                className="w-full p-2 border rounded mt-1"
                                rows={3}
                            ></textarea>
                        </div>

                        <FormButton mode="edit" />
                    </form>
                </div>
            </div>
        </div>
    )
}
