import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { createProcess } from '@/api/auth.ts'
import { ErrorResponse } from '@/api/axios.ts'
import { AuthInfo } from '@/pages/auth/schema/auth-info-schema.tsx'
import Header from '@/pages/common/header.tsx'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type FormData = {
    username: string
    nickName: string
    password: string
    gender: string
    confirmPassword: string
    description: string
}

export default function Signup() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [emailError, setEmailError] = useState('')
    const [nickNameError, setNickNameError] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            gender: 'female',
        },
    })

    const mutation = useMutation({
        mutationFn: createProcess,
        onSuccess: () => {
            setErrorMessage('')
            navigate('/auth/login')
            alert('회원가입 성공했습니다. 로그인 페이지로 이동합니다.')
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const res = error.response?.data?.resultData

            setErrorMessage(res?.message ?? '알 수 없는 에러')
            setNickNameError(res?.errors?.nickName ?? '')
            setEmailError(res?.errors?.username ?? '')
        },
    })

    const onSubmit = (data: AuthInfo) => {
        mutation.mutate(data)
    }

    const viewLogin = () => {
        navigate('/auth/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col px-40 py-8 flex-grow">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        회원가입
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                아이디*
                            </label>
                            <input
                                type="text"
                                {...register('username', { required: '아이디를 입력해주세요' })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                            {emailError && <p className="text-red-500">{emailError}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                닉네임*
                            </label>
                            <input
                                type="text"
                                {...register('nickName', { required: '닉네임을 입력해주세요' })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                            {errors.nickName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.nickName.message}
                                </p>
                            )}
                            {nickNameError && <p className="text-red-500">{nickNameError}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                성별*
                            </label>
                            <div className="flex gap-4">
                                <label>
                                    <input type="radio" value="female" {...register('gender')} />{' '}
                                    Female
                                </label>
                                <label>
                                    <input type="radio" value="male" {...register('gender')} /> Male
                                </label>
                            </div>
                            {errors.gender && (
                                <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                자기소개
                            </label>
                            <textarea
                                {...register('description')}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호*
                            </label>
                            <input
                                type="password"
                                {...register('password', { required: '비밀번호를 입력해주세요' })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호 확인*
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    validate: (value) =>
                                        value === watch('password') || '비밀번호가 일치하지 않아요',
                                })}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow-sm"
                        >
                            가입하기
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-500 mt-4">
                        이미 계정이 있으신가요?{' '}
                        <a
                            onClick={viewLogin}
                            className="text-blue-600 hover:underline cursor-default"
                        >
                            로그인
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
