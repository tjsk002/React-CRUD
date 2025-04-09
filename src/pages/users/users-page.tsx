import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router'

import { ErrorResponse } from '@/api/axios.ts'
import { deleteUser, getUsers } from '@/api/users.ts'
import '@/assets/css/pagination.css'
import ActionButton from '@/pages/common/action-button.tsx'
import Header from '@/pages/common/header.tsx'
import { UserInfo } from '@/pages/users/schema/user-info-schema.tsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function UsersPage() {
    const initPage = 0
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [currentPage, setCurrentPage] = useState(initPage)

    const { data, isLoading } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => getUsers(currentPage),
    })

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            alert('회원이 성공적으로 탈퇴되었습니다.')
            queryClient.invalidateQueries({ queryKey: ['users'] }).then(() => {})
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            if (error?.response?.data.resultData.message) {
                alert(error?.response?.data.resultData.message)
            } else {
                alert('오류가 발생했습니다. ' + error)
            }
        },
    })

    const handlePageChange = (page: { selected: number }) => {
        setCurrentPage(page.selected)
    }

    const handleEditPage = (user: UserInfo) => {
        navigate(`/users/edit`, { state: user })
    }

    const handleCreateUserPage = () => {
        navigate(`/users/create`)
    }

    const handelDashboardPage = () => {
        navigate(`/users/all`)
    }

    const handleDelete = (user: UserInfo) => {
        if (!user.userId) {
            alert('해당 회원이 존재하지 않습니다.')
            return
        }

        if (!confirm(`${user.username}을(를) 탈퇴하시겠습니까?`)) return
        deleteUserMutation.mutate(user.userId)
    }

    const genderOptions: Record<string, string> = { male: '남성', female: '여성' }
    const typeOptions: Record<string, string> = {
        back: 'Back-end',
        front: 'Front-end',
        infra: 'Infra',
        dba: 'DBA',
    }

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-xl font-bold mb-4 mt-10">회원 목록</h1>
            <div className="flex justify-between items-center">
                <div>
                    {isLoading ? <p>Loading...</p> : <p>(총 {data?.pageInfo.totalElements}명)</p>}
                </div>
                <div>
                    <button
                        className="border p-2 px-3 py-1 mb-2 mr-2.5 rounded cursor-pointer hover:text-blue-600 transition"
                        onClick={handelDashboardPage}
                    >
                        대시보드 구경하러 가기
                    </button>
                    <button
                        className="border p-2 px-3 py-1 mb-2 rounded cursor-pointer hover:text-blue-600 transition"
                        onClick={handleCreateUserPage}
                    >
                        회원 추가
                    </button>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        <th className="border p-2">이름</th>
                        <th className="border p-2">닉네임</th>
                        <th className="border p-2">성별</th>
                        <th className="border p-2">상태</th>
                        <th className="border p-2">유형</th>
                        <th className="border p-2">설명</th>
                        <th className="border p-2">가입일자</th>
                        <th className="border p-2">수정/탈퇴</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={7} className="text-center p-4">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        data?.content.map((user: UserInfo, index: number) => (
                            <tr key={index} className="border">
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.nickName}</td>
                                <td className="border p-2">
                                    {user.gender && genderOptions[user.gender]}
                                </td>
                                <td className="border p-2">{user.isActive ? '활성' : '비활성'}</td>
                                <td className="border p-2">{typeOptions[user.type] || '기타'}</td>
                                <td className="border p-2">{user.description}</td>
                                <td className="border p-2">
                                    {' '}
                                    {user.createdAt &&
                                        new Intl.DateTimeFormat('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        }).format(new Date(user.createdAt))}
                                </td>
                                <td className="border p-2 text-center">
                                    <ActionButton
                                        text="수정"
                                        onClick={() => handleEditPage(user)}
                                        className="hover:text-blue-600"
                                    />
                                    <ActionButton
                                        text="탈퇴"
                                        onClick={() => handleDelete(user)}
                                        className="hover:text-red-600"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
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
        </div>
    )
}
